import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { Tag } from "../../../../types";

export async function POST(request: NextRequest) {
    
    try {
        const { title, description, url, tags, logo, preview, userId } = await request.json();

    console.log(tags);
     

        if (title.length < 10 || title.length > 30) {
            return NextResponse.json({ error: "El título debe tener entre 10 y 30 caracteres" }, { status: 400 });
        }

        if (description.length < 50 || description.length > 400) {
            return NextResponse.json({ error: "La descripción debe tener entre 50 y 400 caracteres" }, { status: 400 });
        }

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(url)) {
            return NextResponse.json({ error: "La URL proporcionada no es válida" }, { status: 400 });
        }

        if (tags.length <= 0) {
            return NextResponse.json({ error: "Debe incluir al menos un tag" }, { status: 400 });
        }

        const result = await prisma.post.create({
            data: {
                title,
                description,
                url,
                logo,
                preview,
                tags: { connect: tags.map((tag: Tag) => ({ id: tag })) },
                author: { connect: { id: userId } },
                generalRating: 0,
            }
        });

        const newPostUrl = `/post/${result.id}`;
        return NextResponse.json({ result, url: newPostUrl });
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
