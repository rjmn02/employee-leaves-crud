import { Payhead } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const payroll = await prisma.payroll.findMany({
    include: {
      Employee: true,
      PayrollType: true,
      Payslip: true,
    }
  });
  return NextResponse.json(payroll);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newPayroll = await prisma.payroll.create({
    data: data
  });
  const employee = await prisma.employee.findUnique({
    where: {
      id: newPayroll.employeeId
    }
  }); 

  const govcons= await prisma.governmentContribution.findMany({
    where: {
      employeeId: newPayroll.employeeId
    }
  });

  const payheads = await prisma.payhead.findMany({
    where: {
      employeeId: newPayroll.employeeId
    },
    include: {
      PayheadType: true
    }
  });

  const totalGovContribution = (govcons: any): number => {
    let total: number = 0;
    for(const govcon of govcons) {
      total += govcon.totalAmount;
    }

    return total;
  }

  const totalDeduction = (payheads: any): number => {
    let total: number = 0;
    for(const payhead of payheads){
      const effectiveDate = new Date(payhead.effectiveDate);
      const cutoffStartDate = new Date(newPayroll.cutoffStartDate);
      const cutoffEndDate = new Date(newPayroll.cutoffEndDate);
      if(payhead.PayheadType.name == 'Deduction' && (effectiveDate > cutoffStartDate && effectiveDate < cutoffEndDate)){
        total += payhead.amount;
      }
    }
    
    return total;
  };

  const totalEarning = (payheads: any): number => {
    let total: number = 0;
    for(const payhead of payheads){
      const effectiveDate = new Date(payhead.effectiveDate);
      const cutoffStartDate = new Date(newPayroll.cutoffStartDate);
      const cutoffEndDate = new Date(newPayroll.cutoffEndDate);
      if(payhead.PayheadType.name == 'Earnings' && (effectiveDate > cutoffStartDate && effectiveDate < cutoffEndDate)){
        total += payhead.amount;
      }
    }
    
    return total;
  }

  const newPayslip = await prisma.payslip.create({
    data: {
      payrollId: newPayroll.id,
      totalDeduction: totalDeduction(payheads),
      totalEarning: totalEarning(payheads),
      netPay: (employee) 
      ? (employee.basePay + totalEarning(payheads) - totalDeduction(payheads) - totalGovContribution(govcons))
      : 0
    }
  })


  
  return NextResponse.json(newPayslip);
}