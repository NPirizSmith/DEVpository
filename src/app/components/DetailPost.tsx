import React from 'react';
import { Post } from '../../../types';
import { Favorite } from './icons/Favorite';
import Link from 'next/link';
import { ExternalLink } from './icons/ExternalLink';
import Rating from './stars';
import Image from 'next/image';
import AddFavButton from './postMenu/AddFavButton';
import getSession from '../../../lib/getSession';
import DeletePostButton from './postMenu/DeletePostButton';
import EditPost from './postMenu/EditPost';
import { getAverageColor } from 'fast-average-color-node';

async function getPost(postId: string) {
  try {
    if (!postId) {
      console.error('No se pudo obtener el ID del post');
      return;
    }

    const response = await fetch(`https://devpository.vercel.app/api/post-by-id/${postId}?timestamp=${Date.now()}`);
    if (response.ok) {
      const post = await response.json();
      return post.post as Post;
    } else {
      console.error('Error fetching post:', response);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}

async function getAverageColorWrapper(param: string) {
  const color = await getAverageColor(param);
  return color;
}

export default async function DetailPost({ postId }: { postId: string }) {
  const post = await getPost(postId);
  const session = await getSession();

  let averageColor = null;
  if (post?.logo) {
    averageColor = await getAverageColorWrapper(post.logo);
  }

  const userId = session?.user.id;
  const isFavorite = post?.userFavorites?.some(favorite => favorite.id === userId) ?? false;
  const favCount = post?.userFavorites.length || 0;

  const imageWrapperClass = averageColor?.isLight ? 'bg-dark-900' : 'bg-dark-100';

  return (
    <main className='flex flex-col flex-wrap gap-y-2 grow px-6 w-full'>
      <div className='flex gap-x-2 items-center'>
        <div className={`overflow-hidden w-12 h-12 flex justify-center image-wrapper rounded-lg ${imageWrapperClass}`}>
          <Image src={post?.logo || ""} alt="logo" width={96} height={96} className={`w-fit rounded-md`} />
        </div>
        <span className=' text-xl'>{post?.title}</span>
      </div>
      <div className='text-lg break-words w-full font-light'>{post?.description}</div>
      <div className='flex gap-x-2 items-center text-lg'>
        <span className='opacity-60'>Calificación:</span>
        {post?.generalRating}
        <span className='text-yellow-500'><Favorite w={20} h={20} fill={"currentColor"} /></span>
      </div>
      <div className='flex items-center'>
        <span className='text-lg mr-8 mb-auto opacity-60'>Tags:</span>
        <ul className='flex flex-wrap gap-y-2 justify-center'>
          {post?.tags.map((tag, index) => (
            <Link href={`/explorar?tag=${tag.name}`} key={index} style={{ backgroundColor: `${tag.color}` }} className='flex justify-center content-center bg-dark-100 hover:bg-dark-200 dark:bg-dark-400 dark:hover:bg-dark-300 gap-x-2 text-nowrap h-min rounded-md p-2 m-1'>
              {tag.name}
            </Link>
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-y-6'>
        <Link className='flex gap-x-2 text-blue-400 self-center hover:underline' target='_blank' href={post?.url || "#"}>
          <span className=''>Visita la web</span>
          <span><ExternalLink /></span>
        </Link>
        <div className='overflow-hidden w-full h-auto flex justify-center self-center'>
          <Image src={post?.preview || ""} alt='preview' width={600} height={600} className='self-center rounded-lg' />
        </div>
        <div className='flex border-current border rounded-full w-min self-center'>
          <AddFavButton postId={postId} isFavorite={isFavorite} favCount={favCount} />
          {userId === post?.authorId &&
            <div className='flex'>
              <DeletePostButton postId={postId} />
              <EditPost postId={postId} />
            </div>
          }
        </div>
        <div className='self-center mb-2'>
          <span>Califica este post</span>
          <Rating postId={postId} />
        </div>
      </div>
    </main>
  );
}
