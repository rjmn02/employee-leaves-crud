import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const employeeDeductionId: number = parseInt(params.id);
  const employeeDeductions = await prisma.employeeDeduction.findUnique({
    where: {
      id: employeeDeductionId
    }
  });

  return NextResponse.json(employeeDeductions);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const employeeDeductionId: number = parseInt(params.id);
  const data = await req.json();
  const employeeDeductions = await prisma.employeeDeduction.update({
    where: {
      id: employeeDeductionId
    },
    data: data
  });

  return NextResponse.json(employeeDeductions);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const employeeDeductionId: number = parseInt(params.id);
  const employeeDeductions = await prisma.employeeDeduction.delete({
    where: {
      id: employeeDeductionId
    }
  });

  return NextResponse.json(employeeDeductions);
}


