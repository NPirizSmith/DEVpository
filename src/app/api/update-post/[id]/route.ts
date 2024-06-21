import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { Tag } from "../../../../../types";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        if (req.method !== 'PUT') {
            return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
        }
        const requestBody = await req.json();

        const postId = params.id;
        const userId = requestBody.userId;
        if (!userId) {
            return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
        }

        const title = requestBody.title;
        const description = requestBody.description;
        const url = requestBody.url;
        const tags = requestBody.tags;
        const logo = requestBody.logo;
        const preview = requestBody.preview;

        if (!requestBody) {
            return NextResponse.json({ error: 'Título no disponible' }, { status: 400 });
        }

        if (!postId) {
            return NextResponse.json({ error: 'ID de post no proporcionado' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true, tags: true }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
        }

        if (post.authorId !== userId) {
            return NextResponse.json({ error: 'No tiene permiso para editar este post' }, { status: 403 });
        }

        const tagsToDisconnect = post.tags.filter(
            (tag) => !tags.some((newTag: Tag) => newTag.id === tag.id)
        );

        const tagsToConnect = tags.filter(
            (newTag: Tag) => !post.tags.some((tag) => tag.id === newTag.id)
        );

        console.log("tag para conectar", tagsToConnect);
        

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                description,
                url,
                tags: {
                    disconnect: tagsToDisconnect.map((tag) => ({ id: tag.id })),
                    connect: tagsToConnect.map((tag: Tag) => ({ id: tag }))
                },
                logo,
                preview
            }
        });

        const newCourseUrl = `/post/${postId}`;
        return NextResponse.json({ message: 'Post actualizado correctamente', post: updatedPost, url: newCourseUrl }, { status: 200 });
    } catch (error) {
        console.error('Error al editar el post:', error);
        return NextResponse.json({ error: 'Error del servidor al editar el post' }, { status: 500 });
    }
}
