import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

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
  if (req.method === "POST") {
    const { name } = req.query as QueryPostDevice;
    const ip = getIpRequest(req);
    const id = name + '-' + randomId();
    const newDevice = await prisma.device.create({
      data: {
        id,
        ip,
        name,
      },
    });
    return res.json(newDevice);
  }
};
