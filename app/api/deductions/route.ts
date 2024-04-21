import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const deductions = await prisma.deduction.findMany();
  return NextResponse.json(deductions);
}

export async function POST(req: NextRequest){
  const data = await req.json();
  const newDeduction = await prisma.deduction.create({
    data: data
  });
  
  return NextResponse.json(newDeduction);
}
