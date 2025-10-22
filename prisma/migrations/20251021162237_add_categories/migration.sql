-- AlterTable
ALTER TABLE "Realisations" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[];
