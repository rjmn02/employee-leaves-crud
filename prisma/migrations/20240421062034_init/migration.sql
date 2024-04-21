/*
  Warnings:

  - You are about to drop the column `monthlySalary` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `GovernmentContribution` table. All the data in the column will be lost.
  - You are about to drop the column `incomeTax` on the `GovernmentContribution` table. All the data in the column will be lost.
  - You are about to drop the `Payslip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `payrollId` to the `GovernmentContribution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePay` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeeId` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netPay` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GovernmentContribution" DROP CONSTRAINT "GovernmentContribution_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Payslip" DROP CONSTRAINT "Payslip_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Payslip" DROP CONSTRAINT "Payslip_payrollId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "monthlySalary";

-- AlterTable
ALTER TABLE "GovernmentContribution" DROP COLUMN "employeeId",
DROP COLUMN "incomeTax",
ADD COLUMN     "payrollId" INTEGER NOT NULL,
ADD COLUMN     "withholdingTax" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Payroll" ADD COLUMN     "basePay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "employeeeId" INTEGER NOT NULL,
ADD COLUMN     "netPay" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Payslip";

-- AddForeignKey
ALTER TABLE "GovernmentContribution" ADD CONSTRAINT "GovernmentContribution_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_employeeeId_fkey" FOREIGN KEY ("employeeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
