use async_trait::async_trait;
use buttplug::{
  core::{
    errors::ButtplugDeviceError,
    message::Endpoint,
  },
  server::device::{
  configuration::{BluetoothLESpecifier, ProtocolCommunicationSpecifier},
  hardware::{
      Hardware,
      HardwareConnector,
      HardwareEvent,
      HardwareInternal,
      HardwareReadCmd,
      HardwareReading,
      HardwareSpecializer,
      HardwareSubscribeCmd,
      HardwareUnsubscribeCmd,
      HardwareWriteCmd,
  },
},
  util::future::{ButtplugFuture, ButtplugFutureStateShared},
};
use futures::future::{self, BoxFuture};
use js_sys::{DataView, Uint8Array};
use std::{
  collections::HashMap,
  convert::TryFrom,
  fmt::{self, Debug},
};
use tokio::sync::{broadcast, mpsc};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::{spawn_local, JsFuture};
use web_sys::{
  BluetoothDevice,
  BluetoothRemoteGattCharacteristic,
  BluetoothRemoteGattServer,
  BluetoothRemoteGattService,
  Event,
  MessageEvent,
};

type WebBluetoothResultFuture = ButtplugFuture<Result<(), ButtplugDeviceError>>;
type WebBluetoothReadResultFuture = ButtplugFuture<Result<HardwareReading, ButtplugDeviceError>>;

struct BluetoothDeviceWrapper {
  pub device: BluetoothDevice
}


unsafe impl Send for BluetoothDeviceWrapper {
}
unsafe impl Sync for BluetoothDeviceWrapper {
}


pub struct WebBluetoothHardwareConnector {
  device: Option<BluetoothDeviceWrapper>,
}

impl WebBluetoothHardwareConnector {
  pub fn new(
    device: BluetoothDevice,
  ) -> Self {
    Self {
      device: Some(BluetoothDeviceWrapper {
        device,
      })
    }
  }
}

impl Debug for WebBluetoothHardwareConnector {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    f.debug_struct("WebBluetoothHardwareCreator")
      .field("name", &self.device.as_ref().unwrap().device.name().unwrap())
      .finish()
  }
}

#[async_trait]
impl HardwareConnector for WebBluetoothHardwareConnector {
  fn specifier(&self) -> ProtocolCommunicationSpecifier {
    ProtocolCommunicationSpecifier::BluetoothLE(BluetoothLESpecifier::new_from_device(
      &self.device.as_ref().unwrap().device.name().unwrap(),
      &HashMap::new(),
      &[]
    ))    
  }

  async fn connect(&mut self) -> Result<Box<dyn HardwareSpecializer>, ButtplugDeviceError> {
    Ok(Box::new(WebBluetoothHardwareSpecializer::new(self.device.take().unwrap())))
  }
}


pub struct WebBluetoothHardwareSpecializer {
  device: Option<BluetoothDeviceWrapper>,
}

impl WebBluetoothHardwareSpecializer {
  fn new(device: BluetoothDeviceWrapper) -> Self {
    Self {
      device: Some(device),
    }
  }
}

#[async_trait]
impl HardwareSpecializer for WebBluetoothHardwareSpecializer {
  async fn specialize(
    &mut self,
    specifiers: &[ProtocolCommunicationSpecifier],
  ) -> Result<Hardware, ButtplugDeviceError> {
    let (sender, mut receiver) = mpsc::channel(256);
    let (command_sender, command_receiver) = mpsc::channel(256);
    let name;
    let address;
    let event_sender;
    // This block limits the lifetime of device. Since the compiler doesn't
    // realize we move device in the spawn_local block, it'll complain that
    // device's lifetime lives across the channel await, which gets all
    // angry because it's a *mut u8. So this limits the visible lifetime to
    // before we start waiting for the reply from the event loop.
    let protocol = if let ProtocolCommunicationSpecifier::BluetoothLE(btle) = &specifiers[0] {
      btle
    } else {
      panic!("No bluetooth, we quit");
    };
    {
      let device = self.device.take().unwrap().device;
      name = device.name().unwrap();
      address = device.id();
      let (es, _) = broadcast::channel(256);
      event_sender = es;
      let event_loop_fut = run_webbluetooth_loop(
        device,
        protocol.clone(),
        sender,
        event_sender.clone(),
        command_receiver,
      );
      spawn_local(async move {
        event_loop_fut.await;
      });
    }

    match receiver.recv().await.unwrap() {
      WebBluetoothEvent::Connected(_) => {
        info!("Web Bluetooth device connected, returning device");

        let device_impl: Box<dyn HardwareInternal> = Box::new(WebBluetoothHardware::new(
          event_sender,
          receiver,
          command_sender,
        ));
        Ok(Hardware::new(&name, &address, &[], device_impl))
      }
      WebBluetoothEvent::Disconnected => Err(
        ButtplugDeviceError::DeviceCommunicationError(
          "Could not connect to WebBluetooth device".to_string(),
        )
        .into(),
      ),
    }
  }
}

#[derive(Debug, Clone)]
pub enum WebBluetoothEvent {
  // This is the only way we have to get our endpoints back to device creation
  // right now. My god this is a mess.
  Connected(Vec<Endpoint>),
  Disconnected,
}

pub enum WebBluetoothDeviceCommand {
  Write(
    HardwareWriteCmd,
    ButtplugFutureStateShared<Result<(), ButtplugDeviceError>>,
  ),
  Read(
    HardwareReadCmd,
    ButtplugFutureStateShared<Result<HardwareReading, ButtplugDeviceError>>,
  ),
  Subscribe(
    HardwareSubscribeCmd,
    ButtplugFutureStateShared<Result<(), ButtplugDeviceError>>,
  ),
  Unsubscribe(
    HardwareUnsubscribeCmd,
    ButtplugFutureStateShared<Result<(), ButtplugDeviceError>>,
  ),
}

async fn run_webbluetooth_loop(
  device: BluetoothDevice,
  btle_protocol: BluetoothLESpecifier,
  device_local_event_sender: mpsc::Sender<WebBluetoothEvent>,
  device_external_event_sender: broadcast::Sender<HardwareEvent>,
  mut device_command_receiver: mpsc::Receiver<WebBluetoothDeviceCommand>,
) {
  //let device = self.device.take().unwrap();
  let mut char_map = HashMap::new();
  let connect_future = device.gatt().unwrap().connect();
  let server: BluetoothRemoteGattServer = match JsFuture::from(connect_future).await {
    Ok(val) => val.into(),
    Err(_) => {
      device_local_event_sender
        .send(WebBluetoothEvent::Disconnected)
        .await
        .unwrap();
      return;
    }
  };
  for (service_uuid, service_endpoints) in btle_protocol.services() {
    let service = if let Ok(serv) =
      JsFuture::from(server.get_primary_service_with_str(&service_uuid.to_string())).await
    {
      info!(
        "Service {} found on device {}",
        service_uuid,
        device.name().unwrap()
      );
      BluetoothRemoteGattService::from(serv)
    } else {
      info!(
        "Service {} not found on device {}",
        service_uuid,
        device.name().unwrap()
      );
      continue;
    };
    for (chr_name, chr_uuid) in service_endpoints.iter() {
      info!("Connecting chr {} {}", chr_name, chr_uuid.to_string());
      let char: BluetoothRemoteGattCharacteristic =
        JsFuture::from(service.get_characteristic_with_str(&chr_uuid.to_string()))
          .await
          .unwrap()
          .into();
      char_map.insert(chr_name.clone(), char);
    }
  }
  {
    let event_sender = device_external_event_sender.clone();
    let id = device.id().clone();
    let ondisconnected_callback = Closure::wrap(Box::new(move |_: Event| {
      info!("device disconnected!");
      event_sender
        .send(HardwareEvent::Disconnected(id.clone()))
        .unwrap();
    }) as Box<dyn FnMut(Event)>);
    // set disconnection event handler on BluetoothDevice
    device.set_ongattserverdisconnected(Some(ondisconnected_callback.as_ref().unchecked_ref()));
    ondisconnected_callback.forget();
  }
  //let web_btle_device = WebBluetoothDeviceImpl::new(device, char_map);
  info!("device created!");
  let endpoints = char_map.keys().into_iter().cloned().collect();
  device_local_event_sender
    .send(WebBluetoothEvent::Connected(endpoints))
    .await;
  while let Some(msg) = device_command_receiver.recv().await {
    match msg {
      WebBluetoothDeviceCommand::Write(write_cmd, waker) => {
        debug!("Writing to endpoint {:?}", write_cmd.endpoint());
        let chr = char_map.get(&write_cmd.endpoint()).unwrap().clone();
        spawn_local(async move {
          JsFuture::from(chr.write_value_with_u8_array(&mut write_cmd.data().clone()))
            .await
            .unwrap();
          waker.set_reply(Ok(()));
        });
      }
      WebBluetoothDeviceCommand::Read(read_cmd, waker) => {
        debug!("Writing to endpoint {:?}", read_cmd.endpoint());
        let chr = char_map.get(&read_cmd.endpoint()).unwrap().clone();
        spawn_local(async move {
          let read_value = JsFuture::from(chr.read_value()).await.unwrap();
          let data_view = DataView::try_from(read_value).unwrap();
          let mut body = vec![0; data_view.byte_length() as usize];
          Uint8Array::new(&data_view).copy_to(&mut body[..]);
          let reading = HardwareReading::new(read_cmd.endpoint(), &body);
          waker.set_reply(Ok(reading));
        });
      }
      WebBluetoothDeviceCommand::Subscribe(subscribe_cmd, waker) => {
        debug!("Subscribing to endpoint {:?}", subscribe_cmd.endpoint());
        let chr = char_map.get(&subscribe_cmd.endpoint()).unwrap().clone();
        let ep = subscribe_cmd.endpoint();
        let event_sender = device_external_event_sender.clone();
        let id = device.id().clone();
        let onchange_callback = Closure::wrap(Box::new(move |e: MessageEvent| {
          let event_chr: BluetoothRemoteGattCharacteristic =
            BluetoothRemoteGattCharacteristic::from(JsValue::from(e.target().unwrap()));
          let value = Uint8Array::new_with_byte_offset(
            &JsValue::from(event_chr.value().unwrap().buffer()),
            0,
          );
          let value_vec = value.to_vec();
          debug!("Subscription notification from {}: {:?}", ep, value_vec);
          event_sender
            .send(HardwareEvent::Notification(id.clone(), ep, value_vec))
            .unwrap();
        }) as Box<dyn FnMut(MessageEvent)>);
        // set message event handler on WebSocket
        chr.set_oncharacteristicvaluechanged(Some(onchange_callback.as_ref().unchecked_ref()));
        onchange_callback.forget();
        spawn_local(async move {
          JsFuture::from(chr.start_notifications()).await.unwrap();
          debug!("Endpoint subscribed");
          waker.set_reply(Ok(()));
        });
      }
      WebBluetoothDeviceCommand::Unsubscribe(_unsubscribe_cmd, _waker) => {}
    }
  }
  debug!("run_webbluetooth_loop exited!");
}


#[derive(Debug)]
pub struct WebBluetoothHardware {
  device_command_sender: mpsc::Sender<WebBluetoothDeviceCommand>,
  device_event_receiver: mpsc::Receiver<WebBluetoothEvent>,
  event_sender: broadcast::Sender<HardwareEvent>,
}
/*
unsafe impl Send for WebBluetoothHardware {
}
unsafe impl Sync for WebBluetoothHardware {
}
*/

impl WebBluetoothHardware {
  pub fn new(
    event_sender: broadcast::Sender<HardwareEvent>,
    device_event_receiver: mpsc::Receiver<WebBluetoothEvent>,
    device_command_sender: mpsc::Sender<WebBluetoothDeviceCommand>,
  ) -> Self {
    Self {
      event_sender,
      device_event_receiver,
      device_command_sender,
    }
  }
}

impl HardwareInternal for WebBluetoothHardware {
  fn event_stream(&self) -> broadcast::Receiver<HardwareEvent> {
    self.event_sender.subscribe()
  }

  fn disconnect(&self) -> BoxFuture<'static, Result<(), ButtplugDeviceError>> {
    Box::pin(future::ready(Ok(())))
  }

  fn read_value(
    &self,
    msg: &HardwareReadCmd,
  ) -> BoxFuture<'static, Result<HardwareReading, ButtplugDeviceError>> {
    let sender = self.device_command_sender.clone();
    let msg = msg.clone();
    Box::pin(async move {
      let fut = WebBluetoothReadResultFuture::default();
      let waker = fut.get_state_clone();
      sender
        .send(WebBluetoothDeviceCommand::Read(msg, waker))
        .await;
      fut.await
    })
  }

  fn write_value(&self, msg: &HardwareWriteCmd) -> BoxFuture<'static, Result<(), ButtplugDeviceError>> {
    let sender = self.device_command_sender.clone();
    let msg = msg.clone();
    Box::pin(async move {
      let fut = WebBluetoothResultFuture::default();
      let waker = fut.get_state_clone();
      sender
        .send(WebBluetoothDeviceCommand::Write(msg.clone(), waker))
        .await;
      fut.await
    })
  }

  fn subscribe(&self, msg: &HardwareSubscribeCmd) -> BoxFuture<'static, Result<(), ButtplugDeviceError>> {
    let sender = self.device_command_sender.clone();
    let msg = msg.clone();
    Box::pin(async move {
      let fut = WebBluetoothResultFuture::default();
      let waker = fut.get_state_clone();
      sender
        .send(WebBluetoothDeviceCommand::Subscribe(msg.clone(), waker))
        .await;
      fut.await
    })
  }

  fn unsubscribe(&self, _msg: &HardwareUnsubscribeCmd) -> BoxFuture<'static, Result<(), ButtplugDeviceError>> {
    Box::pin(async move {
      error!("IMPLEMENT UNSUBSCRIBE FOR WEBBLUETOOTH WASM");
      Ok(())
    })
  }
}
