-- CreateTable
CREATE TABLE "RealisationImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "realisationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RealisationImage_pkey" PRIMARY KEY ("id")
);

-- DropForeignKey (if imageUrl constraint exists, drop it first)
-- AlterTable
ALTER TABLE "Realisations" DROP COLUMN "imageUrl";

-- AddForeignKey
ALTER TABLE "RealisationImage" ADD CONSTRAINT "RealisationImage_realisationId_fkey" FOREIGN KEY ("realisationId") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "RealisationImage_realisationId_idx" ON "RealisationImage"("realisationId");
