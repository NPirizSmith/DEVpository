import Image from 'next/image';
import { ExternalLink } from './icons/ExternalLink';
import Link from 'next/link';
import { Favorite } from './icons/Favorite';
import PostMenu from './postMenu/PostMenu';
import { getAverageColor } from 'fast-average-color-node';

interface PostsProps {
  favCount: number;
  id: string;
  title: string;
  description: string | null | undefined;
  tags: { id: string; name: string; color: string}[];
  isFavorite: boolean;
  userId: string | undefined;
  generalRating: number | null | undefined;
  url: string;
  authorId: string | null | undefined;
  authorName: string | null | undefined;
  preview: string | null | undefined;
  logo: string | null | undefined
}

async function getAverageColorWrapper(param: string) {
  const color = await getAverageColor(param);
  return color;
}

export default async function Posts({
  favCount,
  id,
  title,
  description,
  tags,
  isFavorite,
  userId,
  generalRating,
  url,
  authorId,
  authorName,
  preview,
  logo
}: PostsProps) {

  let averageColor = null;
  if (logo) {
    averageColor = await getAverageColorWrapper(logo);
  }



  const imageWrapperClass = averageColor?.isLight ? 'bg-dark-500' : 'bg-dark-50';
  

  
  return (
    <div className="flex w-full items-center p-3 font-bold text-gray-900 bg-gray-50 hover:bg-gray-100 hover:shadow dark:bg-dark-400 dark:hover:bg-dark-300 dark:text-dark-50 relative">
      <div className="flex w-full items-center">
        <div className={`size-12 flex justify-center items-center rounded-lg ${imageWrapperClass}`}>
        <Image src={logo || ""} width={52} height={52} alt={`${title} logo`} className={`object-contain max-w-full h-full grid rounded-md items-center justify-center`}/>
        </div>
        <div className="flex-col me-auto">
          <div className="flex items-center">
            <span className="w-auto max-w-56 overflow-hidden flex-1 ms-3 font-light text-nowrap" title={title}>
              {title}
            </span>
          </div>

          <div className="flex overflow-clip flex-1 ms-3 text-sm whitespace-nowrap gap-x-2">
            <div className="flex items-center gap-1">
              {generalRating}
              <Favorite w={16} h={16} fill={"transparent"} />
            </div>
          
    
          </div>
          <div className='flex gap-x-2 ms-3 text-xs max-w-64 sm:max-w-[450px] md:max-w-[560px] lg:max-w-none  overflow-hidden'>
          {tags.map((tag)=><div key={tag.id} className='rounded-lg p-1 ' style={{backgroundColor:`${tag.color}`}}>{tag.name}</div>)}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center h-20">
        <PostMenu postId={id} isFavorite={isFavorite} favCount={favCount} authorId={authorId} userId={userId} />
          <Link title={url} className="z-10 self-end p-2" target="_blank" href={url}>
            <ExternalLink />
          </Link>
        </div>
      </div>
      <Link href={`/post/${id}`} className="absolute inset-0 z-0"></Link>
    </div>
  );
}
