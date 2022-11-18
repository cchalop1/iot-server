import iotAws, { iot, mqtt } from "aws-iot-device-sdk-v2";

const url = "a147utdkhxxgl-ats.iot.eu-west-3.amazonaws.com";
const region = "eu-west-3";

export const buildConfig = () => {
  return iot.AwsIotMqttConnectionConfigBuilder.new_default_builder()
    .with_client_id(`custom_authorizer_connect_sample(${new Date()})`)
    .with_endpoint(url)
    .with_credentials(
      region,
      process.env.NEXT_PUBLIC_AWS_KEY,
      process.env.NEXT_PUBLIC_AWS_PRIVATE
    )
    .with_keep_alive_seconds(30)
    .build();
};

export const connectClient = (config: mqtt.MqttConnectionConfig) => {
  const client = new mqtt.MqttClient();
  const connection = client.new_connection(config);

  connection.connect();
  return connection;
}
