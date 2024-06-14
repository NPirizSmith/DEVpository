import React from 'react';
import { Favorite } from './icons/Favorite';

const PostSkeleton = () => (
  <div className="flex w-full items-center">
    <div className='size-12 grid bg-dark-200 dark:bg-dark-300 rounded-lg items-center justify-center'></div>     
    <div className='flex-col me-auto'> 
      <div className='flex items-center'>
        <span className="w-auto rounded-md max-w-56 h-4 overflow-hidden flex-1 ms-3 font-light text-nowrap bg-dark-200 dark:bg-dark-300"></span>
      </div>
      <div className='flex items-center gap-x-2 mt-1'>
        <span className="w-24 h-4 ms-3 bg-dark-200 dark:bg-dark-300 rounded-md"></span>
        <span className="w-24 h-4 ms-3 bg-dark-200 dark:bg-dark-300 rounded-md"></span>
      </div>
      <div className='flex mt-1 overflow-clip flex-1 ms-3 text-sm whitespace-nowrap gap-x-2'>
        <div className='flex items-center gapbg-dark-200 -1 text-dark-300'>
          <div className="w-4 h-4 bg-dark-200 dark:bg-dark-300 rounded-md"></div>
          <span className='text-dark-200 dark:text-dark-300'>
            <Favorite w={16} h={16} fill={"currentColor"}/>
          </span>
          <div className="w-8 h-4 bg-dark-200 dark:bg-dark-300 rounded-md"></div>
          <div className="w-12 h-4 bg-dark-200 dark:bg-dark-300 rounded-md"></div>
        </div>
      </div>
    </div>
    <div className='flex flex-col justify-between items-center h-20'></div>
    <div className='flex flex-col justify-between items-center h-bg-dark-200 20 text-dark-300'>
      <span>...</span>
      <div className="size-5 bg-dark-200 dark:bg-dark-300 rounded-md z-10"></div>
    </div>
  </div>
);

export default function ParatiSuspense() {
  return (
    <main className='flex flex-wrap flex-col content-center w-full animate-pulse'>
      <div className="flex flex-col w-full items-center p-3 font-bold text-gray-900 dark:bg-gray-50 dark:dark:bg-dark-400 dark:text-dark-50 relative">
        {[...Array(4)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
