import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const employeetypes = await prisma.employeeType.findMany();

  return NextResponse.json(employeetypes);
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const newEmployeeType = await prisma.employeeType.create({
    data: data
  });

  return NextResponse.json(newEmployeeType);
}