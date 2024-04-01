import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const employeeId = parseInt(params.id, 10);

  const employee = await prisma.employee.findUnique({
    where: {
      id: employeeId
    },
    include: {
      Role: {
        include: {
          Department: true
        }
      },
      EmployeeType: true
    }
  });
  return NextResponse.json(employee);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const employeeId = parseInt(params.id, 10);
  
  const data = await req.json();
  const updatedEmployee = await prisma.employee.update({
    where: {
      id: employeeId
    },
    data: data
  });
  
  return NextResponse.json(updatedEmployee);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const employeeId = parseInt(params.id, 10);

  const deleteEmployee = prisma.employee.delete({
    where: {
      id: employeeId
    }
  });

  const deleteApprovedSignatory = prisma.signatory.deleteMany({
    where: {
      approverId: employeeId
    },
  });

  const deleteEmployeeLeaveSignatory = prisma.signatory.deleteMany({
    where: {
      Leave: {
        employeeId: employeeId
      }
    },
  });

 
  const deleteLeave = prisma.leave.deleteMany({
    where: {
      employeeId: employeeId
    }
  });

  await deleteEmployeeLeaveSignatory
  await prisma.$transaction([deleteApprovedSignatory, deleteLeave, deleteEmployee])

  return NextResponse.json({status: 200});
}
