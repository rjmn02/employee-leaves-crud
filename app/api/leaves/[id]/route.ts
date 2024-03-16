import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const leaves = await prisma.leave.findUnique({
    where: {
      id: parseInt(params.id, 10)
    },
    include: {
      Employee: {
        include: {
          Role: {
            include: {
              Department: true
            }
          },
          EmployeeType: true
        }
      },
      LeaveStatus: true,
      LeaveType: true,
    }
  });

  return NextResponse.json(leaves);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const data = await req.json();
  const updatedLeave = await prisma.leave.update({
    where: {
      id: parseInt(params.id, 10)
    },
    data: data
  });

  return NextResponse.json(updatedLeave);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const deletedLeave = await prisma.leave.delete({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json({status: 200});
}