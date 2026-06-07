-- DropIndex
DROP INDEX "Booking_slotId_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "hrEmail" TEXT,
ADD COLUMN     "hrName" TEXT,
ADD COLUMN     "hrPhone" TEXT,
ADD COLUMN     "round" TEXT;
