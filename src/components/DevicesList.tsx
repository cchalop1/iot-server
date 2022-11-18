import { useEffect, useState } from "react";
import { useDevices } from "../services/device";
import Device from "./Device";

const localStorageId = "admin-token";

const getLocalToken = () => localStorage.getItem(localStorageId)
const saveLocalToken = (token) => localStorage.setItem(localStorageId, token)

function DevicesList() {
    if (typeof window === "undefined")
        return <div></div>
    const [adminToken, setAdminToken] = useState(getLocalToken());
    const { devices, error, fetchDevices, deleteDeviceById } = useDevices();

    const cleanLocalToken = () => {
        localStorage.removeItem(localStorageId);
        setAdminToken(null);
        location.reload();
    }

    useEffect(() => {
        if (adminToken) {
            fetchDevices(adminToken);
        } else {
            const token = window.prompt("admin password")
            saveLocalToken(token);
            setAdminToken(token);
            fetchDevices(token);
        }
    }, []);

    if (error) {
        return <div>{error}
            <button onClick={cleanLocalToken}>login</button>
        </div>
    }
    return (<>
        {devices.map(device =>
            <Device
                key={device.id}
                device={device}
                deleteDeviceById={deleteDeviceById}
                adminToken={adminToken}
            />)}
        <button onClick={cleanLocalToken} style={{ marginTop: "40px" }}>logout</button>
    </>);

}

export default DevicesList;