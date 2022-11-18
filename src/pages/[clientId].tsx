import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDevices } from "services/device";
import styles from "../styles/Home.module.css";
import Graphs from "components/Graphs";
// import mqtt from 'mqtt';
// import { useEffect } from "react";
import iotAws, { iot, mqtt } from "aws-iot-device-sdk-v2";

const connectAwsMqtt = () => {
  let config =
    iot.AwsIotMqttConnectionConfigBuilder.new_default_builder()
      .with_client_id(`custom_authorizer_connect_sample(${new Date()})`)
      .with_endpoint("a147utdkhxxgl-ats.iot.eu-west-3.amazonaws.com")
      .with_credentials("eu-west-3", 'AKIATE6FJP5MRQHWAUFE', "InBQN8o55QM1ASHwop2on1a45XcXfhqsLccLmvAU")
      .with_keep_alive_seconds(30)
      .build();
  const client = new mqtt.MqttClient();

  const connection = client.new_connection(config);
  connection.on("connect", (session_present) => {
    connection.subscribe("esp8266/pub/Val", mqtt.QoS.AtLeastOnce, (topic, payload, dup, qos, retain) => {
      const decoder = new TextDecoder("utf8");
      let message = decoder.decode(new Uint8Array(payload));
      console.log(message);
      connection.disconnect();
    })
    console.log(session_present)
  });
  connection.on("interrupt", (error) => {
  });
  connection.on("resume", (return_code, session_present) => {
  });
  connection.on("disconnect", () => {
  });
  connection.on("error", (error) => {
    console.log(error)
  });
  connection.connect();
}

const DevicePage = () => {
  const router = useRouter();
  const { fetchDeviceById } = useDevices();
  const { clientId } = router.query;

  useEffect(() => {
    connectAwsMqtt();


  }, []);

  // useEffect(() => {
  //     if (clientId) {
  //         fetchDeviceById(clientId as string).then(device => {
  //             if (!device) {
  //                 router.push("/");
  //             }
  //         })
  //     }
  // }, [clientId]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{clientId}</h1>
      </header>
      <div>
        <Graphs />
      </div>
    </div>
  );
};

export default DevicePage;

