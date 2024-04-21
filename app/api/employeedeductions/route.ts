import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const employeeDeductions = await prisma.employeeDeduction.findMany();

  return NextResponse.json(employeeDeductions);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const employeeDeductions = await prisma.employeeDeduction.create({
    data: data
  });

  return NextResponse.json(employeeDeductions);

}
