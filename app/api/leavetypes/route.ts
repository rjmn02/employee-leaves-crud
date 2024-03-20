import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const leaveTypes = await prisma.leaveType.findMany();

  return NextResponse.json(leaveTypes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newType = await prisma.leaveType.create({
    data: data
  })

  return NextResponse.json(newType);
}

