/*
  Warnings:

  - The `coordinates` column on the `Restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "coordinates",
ADD COLUMN     "coordinates" DOUBLE PRECISION[],
ALTER COLUMN "paymentMethods" SET DATA TYPE TEXT;
