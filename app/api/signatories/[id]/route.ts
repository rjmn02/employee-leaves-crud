import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const signatory = await prisma.signatory.findUnique({
    where: {
      id: parseInt(params.id, 10)
    },
    include: {
      Employee: true,
      Leave: {
        include: {
          Employee: true
        }
      }
    }
  });

  return NextResponse.json(signatory);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const data = await req.json();
  const updatedSignatory = await prisma.signatory.update({
    where: {
      id: parseInt(params.id, 10)
    },
    data: data
  });

  return NextResponse.json(updatedSignatory);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const deleteSignatory = await prisma.signatory.delete({
    where: {
      id: parseInt(params.id, 10)
    }
  });

  return NextResponse.json({status: 200});
}
