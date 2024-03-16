import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const leaveTypes = await prisma.leaveType.findUnique({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json(leaveTypes);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const data = await req.json();
  const updatedType = await prisma.leaveType.update({
    where: {
      id: parseInt(params.id, 10)
    },
    data: data,
  });

  return NextResponse.json(updatedType);
}
export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const deletedType = await prisma.leaveType.delete({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json({status: 200});
}
