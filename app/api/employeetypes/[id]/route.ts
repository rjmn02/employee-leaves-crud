import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const employeetypes = await prisma.employeeType.findUnique({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json(employeetypes);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const data = await req.json();
  const newType = await prisma.employeeType.update({
    where: {
      id: parseInt(params.id, 10)
    },
    data: data,
  });

  return NextResponse.json(newType);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const deleteType = await prisma.employeeType.delete({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json({status: 200});
}

