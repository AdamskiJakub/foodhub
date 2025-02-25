/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");


-- Krok 1: Dodaj kolumnę slug jako opcjonalną
ALTER TABLE "Restaurant" ADD COLUMN "slug" TEXT;

-- Krok 2: Uzupełnij kolumnę slug na podstawie name (możesz użyć np. funkcji w SQL lub manualnie)
UPDATE "Restaurant" SET "slug" = LOWER(REPLACE("name", ' ', '-')) WHERE "slug" IS NULL;

-- Krok 3: Zaktualizuj kolumnę slug, aby była NOT NULL
ALTER TABLE "Restaurant" ALTER COLUMN "slug" SET NOT NULL;

-- Krok 4: Utwórz unikalny indeks na kolumnie slug
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");