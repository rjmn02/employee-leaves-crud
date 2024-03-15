import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const leaveStatuses = await prisma.leaveStatus.findMany();

  return NextResponse.json(leaveStatuses);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newStatus = await prisma.leaveStatus.create({
    data: data
  })

  return NextResponse.json(newStatus);
}

