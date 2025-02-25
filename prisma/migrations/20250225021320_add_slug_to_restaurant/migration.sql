/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");

ALTER TABLE "Restaurant" ADD COLUMN "slug" TEXT;

UPDATE "Restaurant" SET "slug" = LOWER(REPLACE("name", ' ', '-')) WHERE "slug" IS NULL;

ALTER TABLE "Restaurant" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");