import { useDevices } from "../services/device";
import Device from "./Device";

function DevicesList() {
    const { data: devices, error } = useDevices();

    if (error)
        return <div></div>;
    if (!devices)
        return <div></div>
    return <ul>{devices.map(device => <Device device={device} />)}</ul>
}

export default DevicesList;