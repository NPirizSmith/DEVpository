"use server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const handleToggleFavorite = async (
  isFavorite: boolean,
  postId: string,
  userId: string
) => {
  try {
    console.log(
      `Received data: isFavorite=${isFavorite}`
    );
    if (!postId || !userId) {
      throw new Error("postId or userId is missing");
    }

    if (isFavorite) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          favoritePosts: {
            disconnect: { id: postId },
          },
        },
      });

      console.log(`Post eliminado de favoritos correctamente`, postId);
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          favoritePosts: {
            connect: { id: postId },
          },
        },
      });

      console.log(`Post agregado a favoritos correctamente`, postId);
    }
  } catch (error) {
    console.error("Error al manipular favoritos:", error);
  }
};
