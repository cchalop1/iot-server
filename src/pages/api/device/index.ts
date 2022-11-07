import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const allDevice = await prisma.device.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(allDevice);
  }
};
