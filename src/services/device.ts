import { useState } from "react";
import { Device } from "../types";

const devicePath = "/api/device";

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async (adminToken) => {
    const option: RequestInit = {
      headers: { Authorization: adminToken },
    };
    const res = await fetch(devicePath, option);
    const json = await res.json();
    if (res.status === 200) {
      setDevices(json);
    } else {
      setError(json.message);
    }
  };

  const fetchDeviceById = async (id: string) => {
    const res = await fetch(devicePath + "/" + id);
    if (res.status !== 200)
      return null;
    const json = await res.json();
    return json;
  }

  const deleteDeviceById = async (adminToken: string, id: string) => {
    const option: RequestInit = {
      headers: { Authorization: adminToken },
      method: "DELETE"
    };
    const res = await fetch(devicePath + "/" + id, option);
    const json = await res.json();
    if (res.status === 200) {
      await fetchDevices(adminToken);
    } else {
      console.error(json);
    }
  }

  return {
    devices,
    error,
    fetchDevices,
    fetchDeviceById,
    deleteDeviceById,
  };
};
