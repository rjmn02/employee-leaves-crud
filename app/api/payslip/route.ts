import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const payslips = await prisma.payslip.findMany();
  return NextResponse.json(payslips);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const payslip = await prisma.payslip.create({ 
    data: data 
  });
}