import prisma from "@/lib/prisma";
import { computeSSS, computePagIbig, computePhilHealth } from "@/lib/calculators";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const govConId = parseInt(params.id);
  const govCon = await prisma.governmentContribution.findUnique({
    where: {
      id: govConId
    }
  });

  return NextResponse.json(govCon);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const govConId = parseInt(params.id);
  const data = await req.json();
  const updatedGovCon = await prisma.governmentContribution.update({
    where: {
      id: govConId
    },
    data: {
      employeeId: data.employeeId,
      sss: computeSSS(data.employee.basePay),
      pagIbig: computePagIbig(data.employee.basePay),
      philHealth: computePhilHealth(data.employee.basePay),
      totalAmount: computeSSS(data.employee.basePay) + computePagIbig(data.employee.basePay) + computePhilHealth(data.employee.basePay)
    }
  });
  
  return NextResponse.json(updatedGovCon);
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const govConId = parseInt(params.id);
  const deletedGovCon = await prisma.governmentContribution.delete({
    where: {
      id: govConId
    }
  });

  return NextResponse.json(deletedGovCon, {status: 200});
}
