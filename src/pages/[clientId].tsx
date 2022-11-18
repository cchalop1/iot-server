import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDevices } from "services/device";
import { buildConfig, connectClient } from "utils/mqtt";
import { mqtt } from "aws-iot-device-sdk-v2";
import styles from "../styles/Home.module.css";
import Graphs from "components/Graphs";

const mqttPath = "esp8266/pub/";

const DevicePage = () => {
  const router = useRouter();
  const { fetchDeviceById } = useDevices();
  const { clientId } = router.query;
  const [data, setData] = useState([]);

  const listenerEspPath = (topic, payload, dup, qos, retain) => {
    const decoder = new TextDecoder("utf8");
    let message = decoder.decode(new Uint8Array(payload));
    const json = JSON.parse(message);
    setData((data) => {
      return [...data, { ...json, time: new Date().toUTCString() }];
    });
  }

  const handleMqttConnection = (connection: mqtt.MqttClientConnection) => {
    connection.on("connect", (session_present) => {
      connection.subscribe(mqttPath + clientId, mqtt.QoS.AtLeastOnce, listenerEspPath);
    });
    connection.on("interrupt", (error) => {
    });
    connection.on("resume", (return_code, session_present) => {
    });
    connection.on("disconnect", () => {
    });
    connection.on("error", (error) => {
    });
  }

  useEffect(() => {
    if (clientId) {
      const config = buildConfig();
      const connection = connectClient(config);
      handleMqttConnection(connection);
    }
  }, [clientId]);


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
        <Graphs data={data} />
      </div>
    </div>
  );
};

export default DevicePage;

