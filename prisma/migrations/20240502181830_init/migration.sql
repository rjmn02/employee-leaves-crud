/*
  Warnings:

  - You are about to drop the column `payrollId` on the `GovernmentContribution` table. All the data in the column will be lost.
  - You are about to drop the column `withholdingTax` on the `GovernmentContribution` table. All the data in the column will be lost.
  - You are about to drop the column `netPay` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the `Bonus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeDeduction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `employeeId` to the `GovernmentContribution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bonus" DROP CONSTRAINT "Bonus_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeDeduction" DROP CONSTRAINT "EmployeeDeduction_deductionId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeDeduction" DROP CONSTRAINT "EmployeeDeduction_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeDeduction" DROP CONSTRAINT "EmployeeDeduction_governmentContributionId_fkey";

-- AlterTable
ALTER TABLE "GovernmentContribution" DROP COLUMN "payrollId",
DROP COLUMN "withholdingTax",
ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "netPay";

-- DropTable
DROP TABLE "Bonus";

-- DropTable
DROP TABLE "Deduction";

-- DropTable
DROP TABLE "EmployeeDeduction";

-- CreateTable
CREATE TABLE "Payhead" (
    "id" SERIAL NOT NULL,
    "payheadTypeId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "effectiveDate" DATE NOT NULL,

    CONSTRAINT "Payhead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayheadType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Deduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payslip" (
    "id" SERIAL NOT NULL,
    "payrollId" INTEGER NOT NULL,
    "totalDeduction" DOUBLE PRECISION,
    "totalEarning" DOUBLE PRECISION,
    "netPay" DOUBLE PRECISION,

    CONSTRAINT "Payslip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GovernmentContribution" ADD CONSTRAINT "GovernmentContribution_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payhead" ADD CONSTRAINT "Payhead_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payhead" ADD CONSTRAINT "Payhead_payheadTypeId_fkey" FOREIGN KEY ("payheadTypeId") REFERENCES "PayheadType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payslip" ADD CONSTRAINT "Payslip_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
