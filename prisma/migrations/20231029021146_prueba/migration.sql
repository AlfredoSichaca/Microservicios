-- CreateEnum
CREATE TYPE "appointments_status" AS ENUM ('Pagada', 'Deuda');

-- CreateTable
CREATE TABLE "appointments" (
    "id_appointment" SERIAL NOT NULL,
    "start_time" VARCHAR(150) NOT NULL,
    "status" "appointments_status" NOT NULL,
    "notes" VARCHAR(150) NOT NULL,
    "price_cop" INTEGER NOT NULL,
    "end_time" VARCHAR(150) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id_appointment")
);
