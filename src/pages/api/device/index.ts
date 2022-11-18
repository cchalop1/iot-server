import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isValidToken = (req: NextApiRequest) => {
  const token = req.headers.authorization;

  if (token === process.env.ADMIN_AUTH_TOKEN) {
    return true;
  }
  return false;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isValidToken(req)) {
    return res.status(401).json({ message: "you are not allowed" });
  }
  if (req.method === "GET") {
    const allDevice = await prisma.device.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(allDevice);
  }
};
