import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params: {id: string}}) {
  const payheadId = parseInt(params.id);
  const payhead = await prisma.payhead.findUnique({
    include: {
      PayheadType: true
    },
    where: {
      id: payheadId
    },
  });

  return NextResponse.json(payhead);
}

export async function PUT(req: NextRequest, {params} : {params: {id: string}}) {
  const payheadId = parseInt(params.id);
  const data = await req.json();
  const updatedPayhead = await prisma.payhead.update({
    where: {
      id: payheadId
    },
    data: data
  });

  return NextResponse.json(updatedPayhead);

}
export async function DELETE(req: NextRequest, {params} : {params: {id: string}}) {
  const payheadId = parseInt(params.id);
  const deletedPayhead = await prisma.payhead.delete({
    where: {
      id: payheadId
    }
  })

  return NextResponse.json(deletedPayhead, {status: 200});
}