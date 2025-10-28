-- CreateTable Tag
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable _RealisationToCategory
CREATE TABLE "_RealisationToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable _RealisationToTag
CREATE TABLE "_RealisationToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RealisationToCategory_AB_unique" ON "_RealisationToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_RealisationToCategory_B_index" ON "_RealisationToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RealisationToTag_AB_unique" ON "_RealisationToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RealisationToTag_B_index" ON "_RealisationToTag"("B");

-- Migrate existing categories data
INSERT INTO "Category" (name) VALUES ('photo') ON CONFLICT (name) DO NOTHING;
INSERT INTO "Category" (name) VALUES ('vidéo') ON CONFLICT (name) DO NOTHING;

-- Migrate existing string array data to relations (if any)
DO $$
DECLARE
    r RECORD;
    cat_id INTEGER;
BEGIN
    FOR r IN SELECT id, categories FROM "Realisation" WHERE categories IS NOT NULL AND array_length(categories, 1) > 0
    LOOP
        FOREACH cat_id IN ARRAY r.categories::integer[]
        LOOP
            INSERT INTO "_RealisationToCategory" ("A", "B") VALUES (r.id, cat_id)
            ON CONFLICT DO NOTHING;
        END LOOP;
    END LOOP;
EXCEPTION WHEN OTHERS THEN
    -- If categories are strings, we'll just skip this migration
    NULL;
END $$;

-- AddForeignKey
ALTER TABLE "_RealisationToCategory" ADD CONSTRAINT "_RealisationToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Realisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RealisationToCategory" ADD CONSTRAINT "_RealisationToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RealisationToTag" ADD CONSTRAINT "_RealisationToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Realisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RealisationToTag" ADD CONSTRAINT "_RealisationToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Drop old column
ALTER TABLE "Realisation" DROP COLUMN "categories";