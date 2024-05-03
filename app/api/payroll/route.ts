import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const payroll = await prisma.payroll.findMany();
  return NextResponse.json(payroll);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newPayroll = await prisma.payroll.create({
    data: data
  });

  return NextResponse.json(newPayroll);
}