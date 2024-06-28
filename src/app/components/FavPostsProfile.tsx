import prisma from "../../../lib/prisma";
import Posts from "./Posts";
import Pagination from "./Pagination";
import getSession from "../../../lib/getSession";
import { redirect, usePathname, useRouter } from "next/navigation";

interface searchParams {
  pagina: number | null;
}

export default async function FavoritePosts(searchParams: searchParams) {
  const session = await getSession()
  const id = session?.user.id
  if (!session) {
    redirect('/conectar')
  }

  const { posts, totalPages } = await getFavPosts(id, searchParams);

  if (posts?.length == 0) {
    return (
      <div className="flex flex-wrap flex-col content-center justify-center pt-16 text-dark-200">
        <h1 className="grow">Aún no tienes posts favoritos</h1>
      </div>
    )
  }


  const formattedPosts = posts?.map(post => ({
    ...post,
    isFavorite: true,
    favCount: post.userFavorites.length || 0
  }));



  return (
    <div className="flex flex-wrap flex-col content-center">
      <div className="w-full grow mb-12">
        {formattedPosts?.reverse().map(post => (
          <Posts
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            authorName={post.author?.name}
            url={post.url}
            tags={post.tags}
            isFavorite={true}
            generalRating={post.generalRating}
            userId={id}
            authorId={post.authorId}
            favCount={post.favCount}
            logo={post.logo}
            preview={post.preview} />
        ))}
      </div>
      {totalPages > 1 ? <Pagination totalPages={totalPages} /> : <></>}

    </div>
  );
};

async function getFavPosts(id: string | undefined, searchParams: searchParams) {
  const pagina = searchParams.pagina || 1;
  const pageSize = 10;
  const startIndex = (pagina - 1) * pageSize ;
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      favoritePosts: {
        where: { published: true },
        take: pageSize,
        skip: startIndex,
        include: {
          author: { select: { name: true } },
          userFavorites: true,
          tags: true,
        }
      }
    },
  });

  const posts = user?.favoritePosts || [];
  const totalPosts = await prisma.post.count({
    where: {
      published: true,
      userFavorites: {
        some: { id: id }
      }
    }
  });

  const totalPages = Math.ceil(totalPosts / pageSize);

  return { posts, totalPages };
}