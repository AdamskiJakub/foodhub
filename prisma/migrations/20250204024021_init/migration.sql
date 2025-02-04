/*
  Warnings:

  - The `paymentMethods` column on the `Restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `coordinates` on the `Restaurant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "paymentMethods",
ADD COLUMN     "paymentMethods" JSONB,
DROP COLUMN "coordinates",
ADD COLUMN     "coordinates" JSONB NOT NULL;
