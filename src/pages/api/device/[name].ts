import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type QueryPostDevice = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name } = req.query as QueryPostDevice;
    const ip = "233.232.11.3";
    const newDevice = await prisma.device.create({
      data: {
        ip,
        name,
      },
    });
    return res.json(newDevice);
  }
};
