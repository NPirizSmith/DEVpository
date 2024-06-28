import React from 'react';
import { Favorite } from './icons/Favorite';



function PostSkeleton() {
  return (
    <div className="flex w-full items-center">
      <div className='size-12 grid bg-dark-300 rounded-lg items-center justify-center'></div>
      <div className='flex-col me-auto'>
        <div className='flex items-center'>
          <span className="w-auto rounded-md max-w-56 h-4 overflow-hidden flex-1 ms-3 font-light text-nowrap bg-dark-300"></span>
        </div>
        <div className='flex items-center gap-x-2 mt-1'>
          <span className="w-24 h-4 ms-3 bg-dark-300 rounded-md"></span>
          <span className="w-24 h-4 ms-3 bg-dark-300 rounded-md"></span>
        </div>
        <div className='flex mt-1 overflow-clip flex-1 ms-3 text-sm whitespace-nowrap gap-x-2'>
          <div className='flex items-center gap-1 text-dark-300'>
            <div className="w-4 h-4 bg-dark-300 rounded-md"></div>
            <Favorite w={16} h={16} fill={"#3f3f3f"} />
            <div className="w-8 h-4 bg-dark-300 rounded-md"></div>
            <div className="w-12 h-4 bg-dark-300 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between items-center h-20'>
      </div>
      <div className='flex flex-col justify-between items-center h-20 text-dark-300'>
        <span>...</span>
        <div className="size-5 bg-dark-300 rounded-md z-10"></div>
      </div>
    </div>
  );
}

export default function ExplorarSuspense() {
  return (
    <main className="w-full animate-pulse">
      <div className="flex flex-col w-full items-center p-3 font-bold text-gray-900 bg-gray-50 dark:bg-dark-400 dark:text-dark-50 relative">
        {Array(5).fill(null).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
