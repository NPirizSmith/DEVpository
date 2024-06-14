import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
  id: string;
  userId?: string;
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  if (req.method !== "POST") {
    return NextResponse.json("Método no permitido", { status: 405 });
  }

  const postId = params.id;
  const { value, userId } = await req.json();

  try {
    const existingRating = await prisma.rating.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (existingRating) {
      const updatedRating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: { value },
      });

      await updateGeneralRating(postId);
      
      return NextResponse.json(updatedRating);
    } else {
      const newRating = await prisma.rating.create({
        data: {
          value,
          userId,
          postId,
        },
      });

      await updateGeneralRating(postId);

      return NextResponse.json(newRating);
    }
  } catch (error) {
    console.error('Error al calificar la herramienta o recurso. postId:', postId, 'userId:', userId, error);
    return NextResponse.json('Error al calificar la herramienta o recurso', { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  if (req.method !== "GET") {
    return NextResponse.json("Método no permitido", { status: 405 });
  }

  const postId = params.id;
  const userId = params.userId;

  try {
    const userRating = await prisma.rating.findFirst({
      where: {
        userId,
        postId,
      },
    });

    const allRatings = await prisma.rating.findMany({
      where: {
        postId,
      },
    });

    const totalRatings = allRatings.length;
    const sumOfRatings = allRatings.reduce((acc, rating) => acc + rating.value, 0);
    const generalRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

    return NextResponse.json({ userRating, generalRating });
  } catch (error) {
    console.error('Error al obtener el rating de la herramienta o recurso:', error);
    return NextResponse.json('Error al obtener el rating de la herramienta o recurso', { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  if (req.method !== "DELETE") {
    return NextResponse.json("Método no permitido", { status: 405 });
  }

  const postId = params.id;
  const userId = params.userId;

  try {
    await prisma.rating.deleteMany({
      where: {
        userId,
        postId,
      },
    });

    await updateGeneralRating(postId);

    return NextResponse.json({ value: 0 });
  } catch (error) {
    console.error('Error al eliminar el rating de la herramienta o recurso:', error);
    return NextResponse.json('Error al eliminar el rating de la herramienta o recurso', { status: 500 });
  }
}

async function updateGeneralRating(postId: string) {
  const allRatings = await prisma.rating.findMany({
    where: {
      postId,
    },
  });

  const totalRatings = allRatings.length;
  const sumOfRatings = allRatings.reduce((acc, rating) => acc + rating.value, 0);
  const generalRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

  await prisma.post.update({
    where: { id: postId },
    data: { generalRating },
  });
}
