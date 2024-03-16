import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const departments = await prisma.department.findUnique({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json(departments);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const data = await req.json();
  const updatedDepartment = await prisma.department.update({
    where: {
      id: parseInt(params.id, 10)
    },
    data: data
  });

  return NextResponse.json(updatedDepartment);
}
export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const deletedDepartment = await prisma.department.delete({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json({status: 200});
}
