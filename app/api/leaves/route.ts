import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const leaves = await prisma.leave.findMany({
    include: {
      Employee: {
        select: {
          Role: {
            select: {
              Department: true
            }
          },
          EmployeeType: true, 
        }
      },
      LeaveStatus: true,
      LeaveType: true,
    }
  });
  
  return NextResponse.json(leaves);
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const newLeave = await prisma.leave.create({
    data: data
  });
  
  return NextResponse.json(newLeave);
}