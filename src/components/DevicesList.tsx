import { useEffect, useState } from "react";
import { useDevices } from "../services/device";
import Device from "./Device";

const localStorageId = "admin-token";

const getLocalToken = () => localStorage.getItem(localStorageId)
const saveLocalToken = (token) => localStorage.setItem(localStorageId, token)

function DevicesList() {
    if (typeof window !== "undefined") {
        const [adminToken, setAdminToken] = useState(getLocalToken());
        const { devices, error, fetchDevices } = useDevices();

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

        if (error)
            return <div>{error}</div>
        return <ul>{devices.map(device => <Device device={device} />)}</ul>
    }
    return <div></div>

}

export default DevicesList;