import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const requestBody = await request.json();
    const preferences = requestBody.selectedTags
    

    try {
        const updatedPost = await prisma.user.update({
            where: { id: id },
            data: { preferences: preferences }
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error al publicar el post:', error);
        return NextResponse.error();
    }
}
