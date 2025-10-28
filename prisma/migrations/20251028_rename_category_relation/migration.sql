-- Rename _RealisationToCategory to _CategoryToRealisation
ALTER TABLE "_RealisationToCategory" RENAME TO "_CategoryToRealisation";

-- Rename the index
ALTER INDEX "_RealisationToCategory_AB_unique" RENAME TO "_CategoryToRealisation_AB_unique";
ALTER INDEX "_RealisationToCategory_B_index" RENAME TO "_CategoryToRealisation_B_index";

-- Rename the constraints
ALTER TABLE "_CategoryToRealisation" RENAME CONSTRAINT "_RealisationToCategory_A_fkey" TO "_CategoryToRealisation_A_fkey";
ALTER TABLE "_CategoryToRealisation" RENAME CONSTRAINT "_RealisationToCategory_B_fkey" TO "_CategoryToRealisation_B_fkey";