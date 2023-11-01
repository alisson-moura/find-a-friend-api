/*
  Warnings:

  - You are about to drop the `PetRequirement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pet_id` to the `requirements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PetRequirement" DROP CONSTRAINT "PetRequirement_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "PetRequirement" DROP CONSTRAINT "PetRequirement_requirement_id_fkey";

-- AlterTable
ALTER TABLE "requirements" ADD COLUMN     "pet_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "PetRequirement";

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;
