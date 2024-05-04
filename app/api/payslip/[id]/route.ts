import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const payslipId = parseInt(params.id) 
  const payslip = await prisma.payslip.findUnique({
    where: { 
      id: payslipId
    }
  });

  return NextResponse.json(payslip);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const payslipId = parseInt(params.id) 
  const data = await req.json();
  const updatedPayslip = await prisma.payslip.update({
    where: { 
      id: payslipId
    },
    data: data
  });

  return NextResponse.json(updatedPayslip);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const payslipId = parseInt(params.id) 
  const deletedPayslip = await prisma.payslip.delete({
    where: { 
      id: payslipId
    }
  });

  return NextResponse.json(deletedPayslip, {status: 200});
}