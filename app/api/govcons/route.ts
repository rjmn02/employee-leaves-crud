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
    data: {
      employeeId: data.employeeId,
      sss: computeSSS(data.employee.basePay),
      pagIbig: computePagIbig(data.employee.basePay),
      philHealth: computePhilHealth(data.employee.basePay),
      totalAmount: computeSSS(data.employee.basePay) + computePagIbig(data.employee.basePay) + computePhilHealth(data.employee.basePay)
    }
  })

  return NextResponse.json(newGovCon);
}

