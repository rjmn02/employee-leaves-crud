import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { parse } from "path";

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  const payheadTypeId = parseInt(params.id);
  const payheadType = await prisma.payheadType.findUnique({
    where: {
      id: payheadTypeId
    }
  });

  return NextResponse.json(payheadType);
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
  const payheadTypeId = parseInt(params.id);
  const data = await request.json();
  const updatedPayheadType = await prisma.payheadType.update({
    where: {
      id: payheadTypeId
    },
    data: data
  });

  return NextResponse.json(updatedPayheadType);
}
export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
  const payheadTypeId = parseInt(params.id);
  const deletedPayheadType = await prisma.payheadType.delete({
    where: {
      id: payheadTypeId
    }
  })

  return NextResponse.json(deletedPayheadType, {status: 200});
}

