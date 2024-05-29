/*
  Warnings:

  - You are about to drop the column `basePay` on the `Payroll` table. All the data in the column will be lost.
  - Added the required column `basePay` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `governmentContributionId` to the `EmployeeDeduction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GovernmentContribution" DROP CONSTRAINT "GovernmentContribution_payrollId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "basePay" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeDeduction" ADD COLUMN     "governmentContributionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "basePay";

-- AddForeignKey
ALTER TABLE "EmployeeDeduction" ADD CONSTRAINT "EmployeeDeduction_governmentContributionId_fkey" FOREIGN KEY ("governmentContributionId") REFERENCES "GovernmentContribution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
