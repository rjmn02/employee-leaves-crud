import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const payrollTypeId: number = parseInt(params.id);
  const payrollType = await prisma.payrollType.findUnique(
    {
      where: {
        id: payrollTypeId
      }
    }
  );

  return NextResponse.json(payrollType);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const payrollTypeId: number = parseInt(params.id);
  const data = await req.json();
  const updatedPayrollType = await prisma.payrollType.update({
    where: {
      id: payrollTypeId
    },
    data: data
  });

  return NextResponse.json(updatedPayrollType);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const payrollTypeId: number = parseInt(params.id);
  await prisma.payrollType.delete({
    where: {
      id: payrollTypeId
    }
  });

  return NextResponse.json({status: 200});
}

