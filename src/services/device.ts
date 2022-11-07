import useSWR, { mutate } from "swr";
import { Device } from "../types";

const devicePath = "/api/device";

export const useDevices = () => useSWR<Device[]>(devicePath);