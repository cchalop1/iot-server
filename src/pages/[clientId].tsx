import { NextPage } from "next";
import { useRouter } from "next/router";
import { useDebugValue, useEffect } from "react";
import { useDevices } from "services/device";
import styles from "../styles/Home.module.css";
// import mqtt from 'mqtt';
// import { useEffect } from "react";

const DevicePage = () => {
    const router = useRouter();
    const { fetchDeviceById } = useDevices();
    const { clientId } = router.query;

    useEffect(() => {
        if (clientId) {
            fetchDeviceById(clientId as string).then(device => {
                if (!device) {
                    router.push("/");
                }
            })
        }
    }, [clientId]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{clientId}</h1>
            </header>
        </div>
    );
};

export default DevicePage;

