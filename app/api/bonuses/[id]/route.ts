import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const bonusId: number = parseInt(params.id);
  const bonus = await prisma.bonus.findUnique(
    {
      where: {
        id: bonusId
      }
    }
  );

  return NextResponse.json(bonus);
  
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const bonusId: number = parseInt(params.id);
  const data = await req.json();
  const updatedBonus = await prisma.bonus.update({
    where: {
      id: bonusId
    },
    data: data
  });

  return NextResponse.json(updatedBonus);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const bonusId: number = parseInt(params.id);
  await prisma.bonus.delete({
    where: {
      id: bonusId
    }
  });

  return NextResponse.json({status: 200});
}