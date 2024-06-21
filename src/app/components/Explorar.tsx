import prisma from "../../../lib/prisma";
import Posts from "./Posts";
import HomeNav from "./HomeNav";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { Post } from "../../../types";
import getSession from "../../../lib/getSession";

interface searchParams {
  tag: string | undefined,
  orden: string | undefined,
  busqueda: string | undefined,
  pagina: number | undefined

}

async function getPosts(userId: string | undefined, searchParams: searchParams) {
  const tag = searchParams.tag || "";
  const orden = searchParams.orden || "";
  const busqueda = searchParams.busqueda || "";
  const pagina = searchParams.pagina || 1;

  const pageSize = 20;
  const startIndex = (pagina - 1) * pageSize;
  const result = await prisma.$transaction([
    prisma.post.count({
      where: {
        AND: [
          { published: true },
          tag ? { tags: { some: { name: tag} } } : {},
          busqueda
            ? {
              OR: [
                { title: { contains: busqueda, mode: "insensitive" } },
                { description: { contains: busqueda, mode: "insensitive" } },
                { tags: { some: { name: { contains: busqueda, mode: "insensitive" } } } }
              ]
            }
            : {}
        ]
      }
    }),
    prisma.post.findMany({
      take: pageSize,
      skip: startIndex,
      where: {
        AND: [
          { published: true },
          tag ? { tags: { some: { name: {contains: tag} } }} : {},
          busqueda
            ? {
              OR: [
                { title: { contains: busqueda, mode: "insensitive" } },
                { description: { contains: busqueda, mode: "insensitive" } },
                { tags: { some: { name: { contains: busqueda, mode: "insensitive" } } } }
              ]
            }
            : {}
        ]
      },
      include: {
        author: { select: { name: true } },
        userFavorites: true,
        tags: true,
      },
       orderBy: orden === "mejor-calificado" ? { generalRating: 'asc' } : undefined
    })
  ]);

  const count = result[0] as number;
  const posts = result[1] as unknown as Post[];

  const totalPages = Math.ceil(count / pageSize);


  const formattedPosts = posts.map(post => ({
    ...post,
    isFavorite: post?.userFavorites?.some(favorite => favorite.id === userId),
    favCount: post.userFavorites.length || 0
  }));

  return { totalPages, posts: formattedPosts };
}

export default async function Explorar(searchParams: searchParams) {
  const session = await getSession();
  const userId = session?.user.id;

  const { posts, totalPages } = await getPosts(userId, searchParams);


  return (
    <main className="flex flex-wrap flex-col content-center w-full">
      <Filters />
      <div className="w-full grow mb-12">
        {posts.length > 0 ? (
          posts.reverse().map(post => (
            <Posts
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              authorName={post.author?.name}
              url={post.url}
              tags={post.tags}
              isFavorite={post.isFavorite}
              generalRating={post.generalRating}
              userId={userId}
              authorId={post.authorId}
              favCount={post.favCount}
              logo={post.logo}
            preview={post.preview} 
            />
          ))
        ) : (
          <h1 className=" text-center">No se encontraron resultados</h1>
        )}
      </div>
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </main>
  );
}
