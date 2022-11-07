/*
  Warnings:

  - Added the required column `name` to the `Divice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Divice" ADD COLUMN     "name" TEXT NOT NULL;
