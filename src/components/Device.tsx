import { Device } from "../types";
import styles from "../styles/Device.module.css";
import { useRouter } from "next/router";


type DeviceProps = {
    device: Device;
}

function Device({ device }: DeviceProps) {
    const router = useRouter();

    const navigateToDivicePage = () => {
        router.push(device.id);
    }

    return (<li className={styles.container} onClick={navigateToDivicePage}>
        <div className={styles.name}>{device.name}</div>
        <div>{device.ip}</div>
        <div>{device.id}</div>
    </li>);
}

export default Device;