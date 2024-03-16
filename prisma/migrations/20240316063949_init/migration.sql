/*
  Warnings:

  - You are about to alter the column `name` on the `Department` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `firstName` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `lastName` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `addressLine` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `city` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `province` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `country` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `name` on the `EmployeeType` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `name` on the `LeaveStatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `name` on the `LeaveType` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `title` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "addressLine" SET NOT NULL,
ALTER COLUMN "addressLine" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "city" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "province" SET NOT NULL,
ALTER COLUMN "province" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "EmployeeType" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "LeaveStatus" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "LeaveType" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);
