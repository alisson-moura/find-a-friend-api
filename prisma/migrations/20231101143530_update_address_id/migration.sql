/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `org_id` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_org_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "org_id",
ADD COLUMN     "address_id" TEXT NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id");

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "address_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_address_id_key" ON "Address"("address_id");

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;
