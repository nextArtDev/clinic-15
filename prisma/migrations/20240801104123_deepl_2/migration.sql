/*
  Warnings:

  - You are about to drop the column `main_image` on the `Doctor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Specialization` DROP FOREIGN KEY `Specialization_imageId_fkey`;

-- AlterTable
ALTER TABLE `Doctor` DROP COLUMN `main_image`;
