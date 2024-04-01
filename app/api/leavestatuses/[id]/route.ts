import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const leaveStatuses = await prisma.leaveStatus.findUnique(
    {
      where: {
        id: parseInt(params.id, 10)
      }
    }
  );

  return NextResponse.json(leaveStatuses);
}


export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const data = await req.json();
  const updatedStatus = await prisma.leaveStatus.update({
    where: {
      id: parseInt(params.id, 10)
    },
    data: data,
  });

  return NextResponse.json(updatedStatus);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const deleteStatus = await prisma.leaveStatus.delete({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json({status: 200});
}