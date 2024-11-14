-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "language" DROP NOT NULL;
