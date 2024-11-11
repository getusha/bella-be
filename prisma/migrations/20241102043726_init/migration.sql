-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('DEFAULT', 'PEMIUM');

-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('AMHARIC', 'OROMO', 'TIGRIGNA');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('ONCE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "ReminderPriorityType" AS ENUM ('HIGH', 'MODERATE', 'LOW');

-- CreateEnum
CREATE TYPE "ReminderDeliveryType" AS ENUM ('NOTIFICATION', 'SMS');

-- CreateEnum
CREATE TYPE "ReminderStatus" AS ENUM ('UPCOMING', 'PAST', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Languages" NOT NULL,
    "accountType" "AccountType" NOT NULL DEFAULT 'DEFAULT'
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "ReminderPriorityType" NOT NULL,
    "type" "ReminderType" NOT NULL DEFAULT 'ONCE',
    "delivery" "ReminderDeliveryType" NOT NULL DEFAULT 'NOTIFICATION',
    "deliveryOffset" INTEGER NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ReminderStatus" NOT NULL DEFAULT 'UPCOMING',
    "ownerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_id_key" ON "Reminder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_ownerId_key" ON "Reminder"("ownerId");

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
