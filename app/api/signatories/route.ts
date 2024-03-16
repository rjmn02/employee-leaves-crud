import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const signatories = await prisma.signatory.findMany({
    include: {
      Leave: true,
      Employee: true,
    }
  });

  return NextResponse.json(signatories);
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const newSignatory = await prisma.signatory.create({
    data: data
  });

  return NextResponse.json(newSignatory);
}