import { Device } from "../types";

type DeviceProps = {
    device: Device;
}

function Device({ device }: DeviceProps) {
    return <div key={device.id}>
        <div>{device.name}</div>
        <div>{device.id}</div>
        <div>{device.ip}</div>
    </div>
}

export default Device;