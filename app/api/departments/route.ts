import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const departments = await prisma.department.findMany();
  
  return NextResponse.json(departments);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newDepartment = await prisma.department.create({
    data: data
  });

  return NextResponse.json(newDepartment);
}

