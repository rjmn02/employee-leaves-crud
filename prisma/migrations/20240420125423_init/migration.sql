/*
  Warnings:

  - Added the required column `monthlySalary` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "monthlySalary" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Bonus" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "effectiveDate" DATE NOT NULL,

    CONSTRAINT "Bonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deduction" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Deduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeDeduction" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "deductionId" INTEGER NOT NULL,
    "effectiveDate" DATE NOT NULL,

    CONSTRAINT "EmployeeDeduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovernmentContribution" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "sss" DOUBLE PRECISION,
    "philHealth" DOUBLE PRECISION,
    "pagIbig" DOUBLE PRECISION,
    "incomeTax" DOUBLE PRECISION,

    CONSTRAINT "GovernmentContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" SERIAL NOT NULL,
    "payrollTypeId" INTEGER NOT NULL,
    "cutoffStartDate" DATE NOT NULL,
    "cutoffEndDate" DATE NOT NULL,
    "dateCreated" DATE NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "PayrollType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payslip" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER,
    "payrollId" INTEGER,
    "netPay" DOUBLE PRECISION,

    CONSTRAINT "Payslip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bonus" ADD CONSTRAINT "Bonus_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmployeeDeduction" ADD CONSTRAINT "EmployeeDeduction_deductionId_fkey" FOREIGN KEY ("deductionId") REFERENCES "Deduction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmployeeDeduction" ADD CONSTRAINT "EmployeeDeduction_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GovernmentContribution" ADD CONSTRAINT "GovernmentContribution_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_payrollTypeId_fkey" FOREIGN KEY ("payrollTypeId") REFERENCES "PayrollType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payslip" ADD CONSTRAINT "Payslip_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payslip" ADD CONSTRAINT "Payslip_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
