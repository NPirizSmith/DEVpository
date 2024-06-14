import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import getSession from "../../../../../lib/getSession";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getSession();
  const userId = session?.user?.id;

  try {
    const post = await prisma.post.findUnique({
      where: { 
        id: id,
        published: true
      },
      include: {
        tags: true,
        userFavorites: { where: { id: userId } }
      }
    });

    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Post encontrado', post }, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Server error fetching post' }, { status: 500 });
  }
}
