import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {computePagIbig, computePhilHealth, computeSSS, computeWithholdingTax } from "@/lib/calculators";

export async function GET(req: NextRequest) {
  const governmentContributions = await prisma.governmentContribution.findMany();
  return NextResponse.json(governmentContributions);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const basePay = data.payroll.basePay;
  const payrollPeriod = data.payroll.payrollTypeId;
  const newGovernmentContribution = await prisma.governmentContribution.create({
    data: {
      payrollId: data.payrollId,
      sss: computeSSS(basePay),
      philHealth: computePhilHealth(basePay),
      pagIbig: computePagIbig(basePay),
      withholdingTax: computeWithholdingTax(basePay, payrollPeriod),
    }
  });

  return NextResponse.json(newGovernmentContribution);
}