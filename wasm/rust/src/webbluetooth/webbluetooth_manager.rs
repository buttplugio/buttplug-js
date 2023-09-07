use super::webbluetooth_hardware::WebBluetoothHardwareConnector;

use buttplug::{
  core::ButtplugResultFuture,
  server::device::{
    configuration::ProtocolCommunicationSpecifier,
    hardware::communication::{
      HardwareCommunicationManager, HardwareCommunicationManagerBuilder,
      HardwareCommunicationManagerEvent,
    },
  },
  util::device_configuration::create_test_dcm,
};
use futures::future;
use js_sys::Array;
use tokio::sync::mpsc::Sender;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::{spawn_local, JsFuture};
use web_sys::BluetoothDevice;

#[derive(Default)]
pub struct WebBluetoothCommunicationManagerBuilder {
}

impl HardwareCommunicationManagerBuilder for WebBluetoothCommunicationManagerBuilder {
  fn finish(&mut self, sender: Sender<HardwareCommunicationManagerEvent>) -> Box<dyn HardwareCommunicationManager> {
    Box::new(WebBluetoothCommunicationManager {
      sender,
    })
  }
}

pub struct WebBluetoothCommunicationManager {
  sender: Sender<HardwareCommunicationManagerEvent>,
}

#[wasm_bindgen]
extern "C" {
  // Use `js_namespace` here to bind `console.log(..)` instead of just
  // `log(..)`
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

impl HardwareCommunicationManager for WebBluetoothCommunicationManager {
  fn name(&self) -> &'static str {
    "WebBluetoothCommunicationManager"
  }

  fn can_scan(&self) -> bool {
    true
  }

  fn start_scanning(&mut self) -> ButtplugResultFuture {
    info!("WebBluetooth manager scanning");
    let sender_clone = self.sender.clone();
    spawn_local(async move {
      // Build the filter block
      let nav = web_sys::window().unwrap().navigator();
      if nav.bluetooth().is_none() {
        error!("WebBluetooth is not supported on this browser");
        return;
      }
      info!("WebBluetooth supported by browser, continuing with scan.");
      // HACK: As of buttplug v5, we can't just create a HardwareCommunicationManager anymore. This is
      // using a test method to create a filled out DCM, which will work for now because there's no
      // way for anyone to add device configurations through FFI yet anyways.
      let config_manager = create_test_dcm(false);
      let mut options = web_sys::RequestDeviceOptions::new();
      let filters = Array::new();
      let optional_services = Array::new();
      for vals in config_manager.protocol_device_configurations().iter() {
        for config in vals.1 {
          if let ProtocolCommunicationSpecifier::BluetoothLE(btle) = &config {
            for name in btle.names() {
              let mut filter = web_sys::BluetoothLeScanFilterInit::new();
              if name.contains("*") {
                let mut name_clone = name.clone();
                name_clone.pop();
                filter.name_prefix(&name_clone);
              } else {
                filter.name(&name);
              }
              filters.push(&filter.into());
            }
            for (service, _) in btle.services() {
              optional_services.push(&service.to_string().into());
            }
          }
        }
      }
      options.filters(&filters.into());
      options.optional_services(&optional_services.into());
      let nav = web_sys::window().unwrap().navigator();
      //nav.bluetooth().get_availability();
      //JsFuture::from(nav.bluetooth().request_device()).await;
      match JsFuture::from(nav.bluetooth().unwrap().request_device(&options)).await {
        Ok(device) => {
          let bt_device = BluetoothDevice::from(device);
          if bt_device.name().is_none() {
            return;
          }
          let name = bt_device.name().unwrap();
          let address = bt_device.id();
          let device_creator = Box::new(WebBluetoothHardwareConnector::new(bt_device));
          if sender_clone
            .send(HardwareCommunicationManagerEvent::DeviceFound {
              name,
              address,
              creator: device_creator,
            })
            .await
            .is_err()
          {
            error!("Device manager receiver dropped, cannot send device found message.");
          } else {
            info!("WebBluetooth device found.");
          }
        }
        Err(e) => {
          error!("Error while trying to start bluetooth scan: {:?}", e);
        }
      };
      let _ = sender_clone
        .send(HardwareCommunicationManagerEvent::ScanningFinished)
        .await;
    });
    Box::pin(future::ready(Ok(())))
  }

  fn stop_scanning(&mut self) -> ButtplugResultFuture {
    Box::pin(future::ready(Ok(())))
  }
}
