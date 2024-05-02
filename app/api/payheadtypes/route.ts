import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const payheadtypes = await prisma.payheadType.findMany();
    return NextResponse.json(payheadtypes);
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const payheadtype = await prisma.payheadType.create({
        data: data
    });

    return NextResponse.json(payheadtype);
}