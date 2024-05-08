import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const employeeId = parseInt(params.id);
  
  const payrolls = await prisma.payroll.findMany({
    where: {
      employeeId: employeeId
    },
    select: {
      id: true
    }
  });

  const payrollIds = payrolls.map(payroll => payroll.id);

  const payslips = await prisma.payslip.findMany({
    where: {
      payrollId: {
        in: payrollIds
      }
    },
    select: {
      id: true,
      totalDeduction: true,
      totalEarning: true,
      netPay: true,
      Payroll: {
        select: {
          cutoffStartDate: true,
          cutoffEndDate: true,
          dateCreated: true,
          Employee: {
            select: {
              firstName: true,
              middleName: true,
              lastName: true,
              email: true,
              addressLine: true,
              city: true,
              province: true,
              country: true,
              basePay: true,
              EmployeeType: true,
              Role: true,
              GovernmentContribution: true
            }
          }
        }
      }
    }
  });

  return NextResponse.json(payslips);
}