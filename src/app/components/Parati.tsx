import prisma from "../../../lib/prisma";
import Posts from "./Posts";
import Pagination from "./Pagination";
import { Post } from "../../../types";
import getSession from "../../../lib/getSession";
import { Settings } from "./icons/Settings";
import Link from "next/link";

type UserPreferences = string[];

interface SearchParams {
    pagina?: string;
    [key: string]: string | undefined;
  }

async function getPosts(userId: string, userPreferences: UserPreferences, searchParams: SearchParams) {

    const pagina = parseInt(searchParams.pagina || "1");

    const pageSize = 20   
    const startIndex = (pagina - 1) * pageSize;        
    const result = await prisma.$transaction([
        prisma.post.count({
            where: {
                AND: [
                    { published: true },
                    {
                        OR: userPreferences.map(preference => ({
                            OR: [
                                { title: { contains: preference, mode: 'insensitive' } },
                                { description: { contains: preference, mode: 'insensitive' } },
                                { url: { contains: preference, mode: 'insensitive' } },
                                { tags: { some: { name: preference } } }
                            ]
                        }))
                    }
                ]
            }
        }),
        prisma.post.findMany({
            take: pageSize,
            skip: startIndex,
            where: {
                AND: [
                    { published: true },
                    {
                        OR: userPreferences.map(preference => ({
                            OR: [
                                { title: { contains: preference, mode: 'insensitive' } },
                                { description: { contains: preference, mode: 'insensitive' } },
                                { url: { contains: preference, mode: 'insensitive' } },
                                { tags: { some: { name: preference } } }
                            ]
                        }))
                    }
                ]
            },
            include: {
                author: { select: { name: true } },
                userFavorites: true,
                tags: true,
            }
        })
    ]);

    const count = result[0] as number;
    const posts = result[1] as unknown as Post[];

    const totalPages = Math.ceil(count / pageSize);

    return { totalPages, posts };
}


export default async function ParaTi(searchParams: SearchParams) {
    const session = await getSession()
    
    const userId = session?.user.id || ""

    


    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { preferences: true }
    });

    const userPreferences = user?.preferences || [];

    const { posts, totalPages } = await getPosts(userId, userPreferences, searchParams);

    const formattedPosts = posts.map(post => ({
        ...post,
        isFavorite: post?.userFavorites?.some(favorite => favorite.id === userId),
        favCount: post.userFavorites.length || 0
      }));
    

    return (
        <main className="flex flex-wrap flex-col content-center w-full">
        
            {session?.user && userPreferences.length <= 0 ? <Link href='/preferencias' className="flex hover:text-dark-200 gap-x-2 items-center m-4"><Settings w={20} h={20}/>Ajusta tus preferencias para personalizar la página de inicio</Link> : <></> }
            {!session?.user ? <Link href='/conectar' className="flex hover:text-dark-200 gap-x-2 items-center m-4"><Settings w={20} h={20}/>Inicia sesión para ajustar tus preferencias</Link> : <></>}
            {posts.length == 0 ? 
                <span className="self-center content-center grow">
                No se encontraron herramientas o recursos con tus preferencias
                <Link href="/preferencias" className="flex justify-center items-center gap-x-2 hover:text-dark-200">
                Ajustar preferencias
                <Settings w={20} h={20}/>
                </Link>
      
                </span> : 

            <div className="w-full grow mb-12">
            {formattedPosts.reverse().map(post => (
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
                    favCount={post.favCount} 
                    userId={userId} 
                    authorId={post.authorId}
                    logo={post.logo}
            preview={post.preview}                 />
            ))}
            </div>
            }
          
        {totalPages > 1 &&  <Pagination totalPages={totalPages} />}
           
        </main>
    );
}

