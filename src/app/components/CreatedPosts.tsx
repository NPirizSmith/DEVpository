import prisma from "../../../lib/prisma";
import Posts from "./Posts";
import Pagination from "./Pagination";
import getSession from "../../../lib/getSession";
import { Post } from "../../../types";

interface searchParams {
  pagina: number,
}

async function getCreatedPosts(id: string | undefined, searchParams: searchParams) {
  const pagina = searchParams.pagina || 1;
  const pageSize = 10;
  const startIndex = (pagina - 1) * pageSize;
  const result = await prisma.$transaction([
    prisma.post.count({
      where: {
        published: true,
        authorId: id,
      },
    }),
    prisma.post.findMany({
      take: pageSize,
      skip: startIndex,
      where: {
        AND: [
          {published: true},
          {authorId: id}
        ]
      },
      include: {
        author: { select: { name: true } },
        userFavorites: true,
        tags: true,
      },
    })
  ])

  const count = result[0] as number;
  const posts = result[1] as unknown as Post[];

  const formattedPosts = posts.map(post => ({
    ...post,
    isFavorite: post.userFavorites.some(favorite => favorite.id === id),
    favCount: post.userFavorites.length || 0
  }));

  const totalPages = Math.ceil(count / pageSize);

  return { posts: formattedPosts, totalPages };
}

export default async function CreatedPosts(searchParams: searchParams) {
  const session = await getSession();
  const id = session?.user.id;
  const { posts, totalPages } = await getCreatedPosts(id, searchParams);

  if (posts?.length == 0) {
    return (
      <div className="flex flex-wrap flex-col content-center justify-center pt-16 text-dark-200">
        <h1 className="grow">Aún no tienes posts creados</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap flex-col content-center">
      <div className="w-full grow mb-12">
        {posts?.map(post => (
          <div key={post.id}>
            <Posts
              id={post.id}
              title={post.title}
              description={post.description}
              authorName={post.author?.name}
              url={post.url}
              tags={post.tags}
              isFavorite={post.isFavorite}
              generalRating={post.generalRating}
              authorId={post.authorId}
              favCount={post.favCount}
              userId={id}
              logo={post.logo}
              preview={post.preview}
            />
          </div>
        ))}
      </div>
      {totalPages > 1 ? <Pagination totalPages={totalPages} /> : <></>}
    </div>
  );
};
