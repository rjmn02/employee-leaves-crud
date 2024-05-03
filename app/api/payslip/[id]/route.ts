import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const payslipId = parseInt(params.id) 
  const payslip = await prisma.payslip.findUnique({
    where: { 
      id: payslipId
    }
  });
}

//put
//delete