import { Device } from "../types";
import styles from "../styles/Device.module.css";
import homeStyles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useDevices } from "../services/device";


type DeviceProps = {
    device: Device;
    deleteDeviceById: (adminToken: string, id: string) => Promise<void>;
    adminToken: string;
}

function Device({ device, deleteDeviceById, adminToken }: DeviceProps) {
    const router = useRouter();

    const navigateToDivicePage = () => {
        router.push(device.id);
    }

    return (<li className={styles.container} onClick={navigateToDivicePage}>
        <div>
            <div className={styles.name}>{device.name}</div>
            <div>{device.ip}</div>
            <div>{device.id}</div>
        </div>
        <button className={homeStyles.addButton} onClick={(e) => {
            e.stopPropagation()
            deleteDeviceById(adminToken, device.id)
        }}>Suprimer</button>
    </li>);
}

export default Device;