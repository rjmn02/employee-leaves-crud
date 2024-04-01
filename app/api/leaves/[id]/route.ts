import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const leaveId = parseInt(params.id, 10);
  
  const leaves = await prisma.leave.findUnique({
    where: {
      id: leaveId
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
      Signatory: true,
      LeaveStatus: true,
      LeaveType: true,
    }
  });

  return NextResponse.json(leaves);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const leaveId = parseInt(params.id, 10);
  const data = await req.json();
  
  const updatedLeave = await prisma.leave.update({
    where: {
      id: leaveId
    },
    data: data
  });

  return NextResponse.json(updatedLeave);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const leaveId = parseInt(params.id, 10);
  
  const deletedLeaveSignatory = prisma.signatory.deleteMany({
    where: {
      leaveId: leaveId
    }
  });

  const deletedLeave = prisma.leave.delete({
    where: {
      id: leaveId
    }
  });

  await prisma.$transaction([deletedLeaveSignatory, deletedLeave]);

  return NextResponse.json({status: 200});
}