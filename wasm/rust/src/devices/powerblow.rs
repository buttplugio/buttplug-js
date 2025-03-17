use async_trait::async_trait;
use buttplug::{
  core::{
    message::{Endpoint, LinearCmd, ActuatorType},
    errors::ButtplugDeviceError,
  },
  server::device::{
    configuration::{ProtocolAttributesType, ProtocolDeviceAttributes},
    hardware::{Hardware, HardwareCommand, HardwareWriteCmd},
    protocol::{ProtocolHandler, ProtocolIdentifier, ProtocolInitializer, ProtocolIdentifierFactory},
    ServerDeviceIdentifier,
  },
};
use std::sync::Arc;

pub struct PowerblowInitializer;

#[async_trait]
impl ProtocolInitializer for PowerblowInitializer {
  async fn initialize(
    &mut self,
    _hardware: Arc<Hardware>,
    _attributes: &ProtocolDeviceAttributes,
  ) -> Result<Arc<dyn ProtocolHandler>, ButtplugDeviceError> {
    Ok(Arc::new(PowerblowHandler))
  }
}

pub struct PowerblowHandler;

impl ProtocolHandler for PowerblowHandler {
  fn handle_linear_cmd(
    &self,
    message: LinearCmd,
  ) -> Result<Vec<HardwareCommand>, ButtplugDeviceError> {
    let mut hardware_commands = Vec::new();
    for cmd in message.vectors() {
      let pwm = ((cmd.position().clamp(0.0, 1.0) * 255.0) as u32).min(255) as u8; // 0.0-1.0 to 0-255
      let time = (cmd.duration() / 50).min(255) as u8; // ms to 0-255
      let data = vec![pwm, time];
      match cmd.index() {
        0 => {
          // Motor (suction) - 0x1401
          hardware_commands.push(HardwareCommand::Write(HardwareWriteCmd::new(
            Endpoint::Tx,
            data,
            false,
          )));
        }
        1 => {
          // Solenoid (release) - 0x1402
          let release_data = if cmd.position() == 0.0 {
            vec![0u8, time] // PWM 0 to release
          } else {
            data
          };
          hardware_commands.push(HardwareCommand::Write(HardwareWriteCmd::new(
            Endpoint::Rx,
            release_data,
            false,
          )));
        }
        _ => return Err(ButtplugDeviceError::ProtocolSpecificError(
          "Powerblow".to_string(),
          format!("Unknown actuator index: {}", cmd.index()),
        )),
      }
    }
    Ok(hardware_commands)
  }

  fn handle_scalar_cmd(
    &self,
    _commands: &[Option<(ActuatorType, u32)>],
  ) -> Result<Vec<HardwareCommand>, ButtplugDeviceError> {
    Err(ButtplugDeviceError::ProtocolSpecificError(
      "Powerblow".to_string(),
      "Scalar commands not supported - use LinearCmd".to_string(),
    ))
  }
}

#[derive(Default)]
pub struct PowerblowIdentifier;

#[async_trait]
impl ProtocolIdentifier for PowerblowIdentifier {
  async fn identify(
    &mut self,
    hardware: Arc<Hardware>,
  ) -> Result<(ServerDeviceIdentifier, Box<dyn ProtocolInitializer>), ButtplugDeviceError> {
    let name = hardware.name();
    if name.contains("PowerBlow") {
      let identifier = ServerDeviceIdentifier::new(
        &hardware.address(),
        "Powerblow",
        &ProtocolAttributesType::Identifier("Powerblow".to_string()),
      );
      Ok((identifier, Box::new(PowerblowInitializer)))
    } else {
      Err(ButtplugDeviceError::ProtocolSpecificError(
        "Powerblow".to_string(),
        "Device not recognized as Powerblow".to_string(),
      ))
    }
  }
}

#[derive(Default)]
pub struct PowerblowIdentifierFactory;

impl ProtocolIdentifierFactory for PowerblowIdentifierFactory {
  fn identifier(&self) -> &str {
    "Powerblow"
  }

  fn create(&self) -> Box<dyn ProtocolIdentifier> {
    Box::new(PowerblowIdentifier::default())
  }
}
