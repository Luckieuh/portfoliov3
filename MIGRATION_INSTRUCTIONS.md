# INSTRUCTIONS POUR CRÉER LES TABLES

## ⚠️ Important
Vercel n'a pas les permissions pour créer les tables automatiquement.
Vous devez exécuter le SQL manuellement via Neon Console.

## 📋 Étapes:

1. Allez sur https://console.neon.tech
2. Sélectionnez votre projet
3. Cliquez sur "SQL Editor"
4. Copiez tout le SQL ci-dessous
5. Collez dans l'éditeur
6. Cliquez sur "Run"
7. Rafraîchissez votre site!

## 📄 Script SQL:

```sql
CREATE TABLE IF NOT EXISTS "admin" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Category" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "Tag" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "Realisations" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "location" TEXT,
  "imageUrl" TEXT,
  "videoUrl" TEXT,
  "youtubeUrl" TEXT,
  "link" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "RealisationImage" (
  "id" SERIAL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "position" INTEGER NOT NULL DEFAULT 0,
  "realisationId" INTEGER NOT NULL,
  CONSTRAINT "RealisationImage_realisationId_fkey" FOREIGN KEY ("realisationId") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "SiteImage" (
  "id" SERIAL PRIMARY KEY,
  "key" TEXT NOT NULL UNIQUE,
  "url" TEXT NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "_CategoryToRealisations" (
  "A" INTEGER NOT NULL,
  "B" INTEGER NOT NULL,
  CONSTRAINT "_CategoryToRealisations_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "_CategoryToRealisations_B_fkey" FOREIGN KEY ("B") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "_CategoryToRealisations_AB_unique" ON "_CategoryToRealisations"("A", "B");
CREATE INDEX IF NOT EXISTS "_CategoryToRealisations_B_index" ON "_CategoryToRealisations"("B");

CREATE TABLE IF NOT EXISTS "_RealisationsToTag" (
  "A" INTEGER NOT NULL,
  "B" INTEGER NOT NULL,
  CONSTRAINT "_RealisationsToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "_RealisationsToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "_RealisationsToTag_AB_unique" ON "_RealisationsToTag"("A", "B");
CREATE INDEX IF NOT EXISTS "_RealisationsToTag_B_index" ON "_RealisationsToTag"("B");
```

## ✅ Après avoir exécuté le SQL

Vos tables sont créées! Vous pouvez maintenant:
- Vous connecter au backend via /auth/login
- Créer des réalisations
- Tout devrait fonctionner!
