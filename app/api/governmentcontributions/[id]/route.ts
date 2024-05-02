import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const govConId: number = parseInt(params.id);
  const governmentContributions = await prisma.governmentContribution.findUnique({
    where: {
      id: govConId
    }
  });

  return NextResponse.json(governmentContributions);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  //complete
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const govConId: number = parseInt(params.id);
  const deletedGovernmentContribution = await prisma.governmentContribution.delete({
    where: {
      id: govConId
    }
  });

  return NextResponse.json({status: 200});
}

