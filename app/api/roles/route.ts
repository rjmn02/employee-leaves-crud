import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const roles = await prisma.role.findMany({
    include: {
      Department: true,
    }
  });

  return NextResponse.json(roles);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newRole = await prisma.role.create({
    data: data
  });

  return NextResponse.json(newRole);
}