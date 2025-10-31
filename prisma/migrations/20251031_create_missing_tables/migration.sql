-- CreateTable Realisations (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "Realisations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "videoUrl" TEXT,
    "youtubeUrl" TEXT,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Realisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable Category (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable Tag (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable RealisationImage (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "RealisationImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "realisationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RealisationImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable SiteImage (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "SiteImage" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable admin (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable _RealisationToCategory (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "_RealisationToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable _RealisationToTag (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "_RealisationToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "Tag_name_key" ON "Tag"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "SiteImage_key_key" ON "SiteImage"("key");
CREATE UNIQUE INDEX IF NOT EXISTS "admin_username_key" ON "admin"("username");

-- CreateIndex for junction tables
CREATE UNIQUE INDEX IF NOT EXISTS "_RealisationToCategory_AB_unique" ON "_RealisationToCategory"("A", "B");
CREATE INDEX IF NOT EXISTS "_RealisationToCategory_B_index" ON "_RealisationToCategory"("B");
CREATE UNIQUE INDEX IF NOT EXISTS "_RealisationToTag_AB_unique" ON "_RealisationToTag"("A", "B");
CREATE INDEX IF NOT EXISTS "_RealisationToTag_B_index" ON "_RealisationToTag"("B");

-- AddForeignKey
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'RealisationImage_realisationId_fkey'
  ) THEN
    ALTER TABLE "RealisationImage" ADD CONSTRAINT "RealisationImage_realisationId_fkey" FOREIGN KEY ("realisationId") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = '_RealisationToCategory_A_fkey'
  ) THEN
    ALTER TABLE "_RealisationToCategory" ADD CONSTRAINT "_RealisationToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = '_RealisationToCategory_B_fkey'
  ) THEN
    ALTER TABLE "_RealisationToCategory" ADD CONSTRAINT "_RealisationToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = '_RealisationToTag_A_fkey'
  ) THEN
    ALTER TABLE "_RealisationToTag" ADD CONSTRAINT "_RealisationToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Realisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = '_RealisationToTag_B_fkey'
  ) THEN
    ALTER TABLE "_RealisationToTag" ADD CONSTRAINT "_RealisationToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
