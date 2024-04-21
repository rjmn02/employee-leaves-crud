import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const deductionId: number = parseInt(params.id);
  const deduction = await prisma.deduction.findUnique(
    {
      where: {
        id: deductionId
      }
    }
  );
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}){
  const deductionId: number = parseInt(params.id);
  const data = await req.json();
  const updatedDeduction = await prisma.deduction.update({
    where: {
      id: deductionId
    },
    data: data
  });
}
export async function DELETE(req: NextRequest, {params}: {params: {id: string}}){
  const deductionId: number = parseInt(params.id);
  const deletedDeduction = await prisma.deduction.delete({
    where: {
      id: deductionId
    }
  });
}