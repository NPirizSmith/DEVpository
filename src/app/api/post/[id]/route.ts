import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {
    const id = params.id;
    
    try {
        const updatedPost = await prisma.post.update({
          where: { id: id },
          data: { published: false }
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        return NextResponse.error();
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        const updatedPost = await prisma.post.update({
            where: { id: id },
            data: { published: true }
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error al publicar el post:', error);
        return NextResponse.error();
    }
}
