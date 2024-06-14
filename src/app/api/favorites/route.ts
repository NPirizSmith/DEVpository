import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  
  console.log(authHeader); 
  if (!authHeader) {
    return new NextResponse(JSON.stringify({ error: 'Authorization header is missing' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return new NextResponse(JSON.stringify({ error: 'Token is missing' }), { status: 401 });
  }

  try {
    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: {
        user: {
          include: {
            favoritePosts: {
              where: { published: true },
              include: {
                userFavorites: true,
                tags: true,
              }
            }
          }
        }
      }
    });

    if (!session || !session.user) {
      return new NextResponse(JSON.stringify({ error: 'Invalid session token or user not found' }), { status: 401 });
    }

    const user = session.user;
    const posts = user.favoritePosts;

    const formattedPosts = posts.map(post => ({
      ...post,
      isFavorite: post.userFavorites.length > 0,
      favCount: post.userFavorites.length,
      title: post.title,
      url: post.url,
      logo: post.logo,
      
    }));

    return new NextResponse(JSON.stringify({ favorites: formattedPosts }), { status: 200 });
  } catch (error) {
    console.error('Error fetching favorite posts:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
