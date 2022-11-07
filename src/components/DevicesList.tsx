import { useDevices } from "../services/device";
import Device from "./Device";

function DevicesList() {
    const { data: devices, error } = useDevices();

    if (error)
        return <div></div>;
    if (!devices)
        return <div></div>
    return <div>{devices.map(device => <Device device={device} />)}</div>
}

export default DevicesList;