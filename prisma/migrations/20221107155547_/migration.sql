/*
  Warnings:

  - You are about to drop the `Divice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Divice";

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastConnection" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);
