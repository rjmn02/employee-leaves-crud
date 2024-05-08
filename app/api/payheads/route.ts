import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const payheads = await prisma.payhead.findMany({
    include: {
      PayheadType: true
    }
  });

  return NextResponse.json(payheads);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newPayhead = await prisma.payhead.create({
    data: data
  })

  return NextResponse.json(newPayhead);
}