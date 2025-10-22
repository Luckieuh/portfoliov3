-- Renommer la table Realisations en Realisation
ALTER TABLE "Realisations" RENAME TO "Realisation";

-- Mettre à jour la contrainte de clé étrangère
ALTER TABLE "RealisationImage" DROP CONSTRAINT "RealisationImage_realisationId_fkey";

ALTER TABLE "RealisationImage" ADD CONSTRAINT "RealisationImage_realisationId_fkey" 
  FOREIGN KEY ("realisationId") REFERENCES "Realisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
