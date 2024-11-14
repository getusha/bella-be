/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_ownerId_fkey";

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Languages",
    "accountType" "AccountType" NOT NULL DEFAULT 'DEFAULT'
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
