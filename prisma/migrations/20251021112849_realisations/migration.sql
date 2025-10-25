-- CreateTable-- CreateTable

CREATE TABLE "Realisations" (CREATE TABLE "Realisations" (

    "id" SERIAL NOT NULL,    "id" SERIAL NOT NULL,

    "title" TEXT NOT NULL,    "title" TEXT NOT NULL,

    "description" TEXT NOT NULL,    "description" TEXT NOT NULL,

    "imageUrl" TEXT,    "imageUrl" TEXT,

    "videoUrl" TEXT,    "videoUrl" TEXT,

    "link" TEXT,    "link" TEXT,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,



    CONSTRAINT "Realisations_pkey" PRIMARY KEY ("id")    CONSTRAINT "Realisations_pkey" PRIMARY KEY ("id")

););

