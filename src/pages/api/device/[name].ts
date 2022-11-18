import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { isValidToken } from ".";

const prisma = new PrismaClient();

type QueryPostDevice = {
  name: string;
};

const getIpRequest = (req: NextApiRequest) => {
  let ip;

  if (req.headers["x-forwarded-for"]) {
    const forwardedFor = req.headers["x-forwarded-for"] as string;
    ip = forwardedFor.split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  return ip;
};

const randomId = () => String(Math.round(Math.random() * 10000));

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { name } = req.query as QueryPostDevice;
    const device = await prisma.device.findUniqueOrThrow({
      where: { id: name },
    });
    if (!device) {
      return res.status(404);
    }
    return res.json(device);
  } else if (req.method === "POST") {
    const { name } = req.query as QueryPostDevice;
    const ip = getIpRequest(req);
    const id = name + "-" + randomId();
    const newDevice = await prisma.device.create({
      data: {
        id,
        ip,
        name,
      },
    });
    return res.json(newDevice);
  } else if (req.method === "DELETE") {
    if (!isValidToken(req)) {
      return res.status(401).json({ message: "you are not allowed" });
    }
    const { name } = req.query as QueryPostDevice;
    const result = await prisma.device.delete({ where: { id: name } });
    return res.json(result);
  }
};
