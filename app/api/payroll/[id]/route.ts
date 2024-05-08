import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const payrollId = parseInt(params.id);
  const payroll = await prisma.payroll.findUnique({
    where: {
      id: payrollId
    }
  });
  return NextResponse.json(payroll);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const payrollId = parseInt(params.id);
  const data = await req.json();
  const updatedPayroll = await prisma.payroll.update({
    where: {
      id: payrollId
    },
    data: data
  });

  return NextResponse.json(updatedPayroll); 
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const payrollId = parseInt(params.id);
  const deletedPayroll = prisma.payroll.delete({
    where: {
      id: payrollId
    }
  });

  const deletedPayslip = prisma.payslip.deleteMany({
    where: {
      payrollId: payrollId
    }
  });

  
  await prisma.$transaction([deletedPayslip, deletedPayroll]);

  return NextResponse.json(deletedPayroll, {status: 200});
}