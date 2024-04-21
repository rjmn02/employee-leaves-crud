import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const bonuses = await prisma.bonus.findMany();
  return NextResponse.json(bonuses);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newBonus = await prisma.bonus.create({
    data: data
  });
  
  return NextResponse.json(newBonus);
}