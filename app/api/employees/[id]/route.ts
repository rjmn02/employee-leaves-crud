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
  const deletedEmployee = await prisma.employee.delete({
    where: {
      id: employeeId
    }
  });

  return NextResponse.json({status: 200});
}
