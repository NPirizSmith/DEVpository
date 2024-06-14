import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const tags = await prisma.tag.findMany();
        return NextResponse.json(tags);
    } catch (error) {
        console.error('Error al obtener los tags:', error);
        return NextResponse.json({ error: 'Error al obtener los tags' }, { status: 500 });
    }
}
