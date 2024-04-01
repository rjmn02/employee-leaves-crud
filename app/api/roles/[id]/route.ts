import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const roles = await prisma.role.findUnique({
    where: {
      id: parseInt(params.id, 10)
    },
    include: {
      Department: true,
    }
  });

  return NextResponse.json(roles);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const data = await req.json();
  const updatedRole = await prisma.role.update({
    where: {
      id: parseInt(params.id, 10)
    },
    data: data
  });

  return NextResponse.json(updatedRole);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const deleteRole = await prisma.role.delete({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json({status: 200});
}