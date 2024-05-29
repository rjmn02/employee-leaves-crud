import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const payrollTypes = await prisma.payrollType.findMany();
  return NextResponse.json(payrollTypes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newPayrollType = await prisma.payrollType.create({
    data: data
  });

  return NextResponse.json(newPayrollType);
}