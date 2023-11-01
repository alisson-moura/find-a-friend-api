-- CreateTable
CREATE TABLE "Address" (
    "org_id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "types" (
    "type_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "requirements" (
    "requirement_id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("requirement_id")
);

-- CreateTable
CREATE TABLE "PetRequirement" (
    "requirement_id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetRequirement_pkey" PRIMARY KEY ("requirement_id","pet_id")
);

-- CreateTable
CREATE TABLE "photos" (
    "photo_url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pets" (
    "pet_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "energy_level" INTEGER NOT NULL,
    "independence_level" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "date_of_adoption" TIMESTAMP(3),

    CONSTRAINT "pets_pkey" PRIMARY KEY ("pet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "requirements_requirement_key" ON "requirements"("requirement");

-- CreateIndex
CREATE UNIQUE INDEX "photos_photo_url_key" ON "photos"("photo_url");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetRequirement" ADD CONSTRAINT "PetRequirement_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetRequirement" ADD CONSTRAINT "PetRequirement_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "requirements"("requirement_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
