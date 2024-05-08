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


  //get employee
  //get govcon
  //get payheads

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
    }
  });

  const totalDeduction = (payheads: any): number => {
    let total: number = 0;
    for(const payhead of payheads){
      if(payhead.PayheadType.name == 'Deduction' && payhead.effectiveDate < newPayroll.cutoffEndDate){
        total += payhead.amount;
      }
    }

    for(const govcon of govcons) {
      total += govcon.totalAmount || 0;
    }
    
    return total;
  };
  const totalEarning = (payheads: any): number => {
    let total: number = 0;
    for(const payhead of payheads){
      if(payhead.PayheadType.name == 'Earning' && payhead.effectiveDate < newPayroll.cutoffEndDate){
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
      netPay: employee 
      ? employee.basePay + (totalDeduction(payheads) - totalEarning(payheads))
      : 0
    }
  })

  
  return NextResponse.json(newPayroll);
}