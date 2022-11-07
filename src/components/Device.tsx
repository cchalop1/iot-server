import { Device } from "../types";

type DeviceProps = {
    device: Device;
}

function Device({ device }: DeviceProps) {
    return (<li key={device.id}>
        <div>{device.name}</div>
        <div>{device.id}</div>
        <div>{device.ip}</div>
    </li>);
}

export default Device;