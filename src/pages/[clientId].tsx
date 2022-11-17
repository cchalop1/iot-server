import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
// import mqtt from 'mqtt';
// import { useEffect } from "react";

const DevicePage = () => {
    const router = useRouter();
    const { clientId } = router.query;
    
    // useEffect(() => {
    //     const client = mqtt.connect("mqtt:a147utdkhxxgl-ats.iot.eu-west-3.amazonaws.com");
    //     client.on('connect', () => console.log("connect"));
    //     client.on('message', (topic, payload, packet) => {
    //         console.log(topic, payload, packet)
    //         // setMessages(messages.concat(payload.toString()));
    //     });
    // }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{clientId}</h1>
            </header>
        </div>
    );
};

export default DevicePage;

