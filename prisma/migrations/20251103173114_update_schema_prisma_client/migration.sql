/*
  Warnings:

  - You are about to drop the `Realisation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToRealisation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RealisationToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RealisationToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RealisationImage" DROP CONSTRAINT "RealisationImage_realisationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CategoryToRealisation" DROP CONSTRAINT "_CategoryToRealisation_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CategoryToRealisation" DROP CONSTRAINT "_CategoryToRealisation_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RealisationToCategory" DROP CONSTRAINT "_RealisationToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RealisationToCategory" DROP CONSTRAINT "_RealisationToCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RealisationToTag" DROP CONSTRAINT "_RealisationToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RealisationToTag" DROP CONSTRAINT "_RealisationToTag_B_fkey";

-- DropTable
DROP TABLE "public"."Realisation";

-- DropTable
DROP TABLE "public"."_CategoryToRealisation";

-- DropTable
DROP TABLE "public"."_RealisationToCategory";

-- DropTable
DROP TABLE "public"."_RealisationToTag";

-- CreateTable
CREATE TABLE "_RealisationsToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RealisationsToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToRealisations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToRealisations_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RealisationsToTag_B_index" ON "_RealisationsToTag"("B");

-- CreateIndex
CREATE INDEX "_CategoryToRealisations_B_index" ON "_CategoryToRealisations"("B");

-- AddForeignKey
ALTER TABLE "RealisationImage" ADD CONSTRAINT "RealisationImage_realisationId_fkey" FOREIGN KEY ("realisationId") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RealisationsToTag" ADD CONSTRAINT "_RealisationsToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RealisationsToTag" ADD CONSTRAINT "_RealisationsToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRealisations" ADD CONSTRAINT "_CategoryToRealisations_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRealisations" ADD CONSTRAINT "_CategoryToRealisations_B_fkey" FOREIGN KEY ("B") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
