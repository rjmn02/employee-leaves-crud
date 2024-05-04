import prisma from "@/lib/prisma";
import { computeSSS, computePagIbig, computePhilHealth } from "@/lib/calculators";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const govCons = await prisma.governmentContribution.findMany();

  return NextResponse.json(govCons);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newGovCon = await prisma.governmentContribution.create({
    data: data
  })

  return NextResponse.json(newGovCon);
}

