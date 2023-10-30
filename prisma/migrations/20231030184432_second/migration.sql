/*
  Warnings:

  - Added the required column `id_doctor` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "id_doctor" INTEGER NOT NULL,
ADD COLUMN     "id_user" INTEGER NOT NULL;
