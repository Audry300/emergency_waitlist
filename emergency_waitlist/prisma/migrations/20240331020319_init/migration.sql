-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('WAITING', 'TREATED');

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "estimatedWait" INTEGER,
    "severity" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "status" "PatientStatus" NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_code_key" ON "Patient"("code");
