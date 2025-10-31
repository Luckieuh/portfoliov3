-- Fix table references - update foreign keys to reference the correct table
-- Drop foreign keys that reference the wrong table if they exist
ALTER TABLE "_RealisationToCategory" DROP CONSTRAINT IF EXISTS "_RealisationToCategory_A_fkey";
ALTER TABLE "_RealisationToTag" DROP CONSTRAINT IF EXISTS "_RealisationToTag_A_fkey";

-- Drop the incorrect Realisation table if it exists (it should be Realisations)
DROP TABLE IF EXISTS "Realisation" CASCADE;

-- Add foreign keys to the correct Realisations table
ALTER TABLE "_RealisationToCategory" ADD CONSTRAINT "_RealisationToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_RealisationToTag" ADD CONSTRAINT "_RealisationToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Also fix RealisationImage if it exists with wrong references
ALTER TABLE "RealisationImage" DROP CONSTRAINT IF EXISTS "RealisationImage_realisationId_fkey";
ALTER TABLE "RealisationImage" ADD CONSTRAINT "RealisationImage_realisationId_fkey" FOREIGN KEY ("realisationId") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
