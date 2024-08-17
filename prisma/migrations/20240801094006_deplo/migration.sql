/*
  Warnings:

  - Added the required column `imageId` to the `Specialization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Specialization` ADD COLUMN `imageId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Specialization` ADD CONSTRAINT `Specialization_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
