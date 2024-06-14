import React from 'react'

export default function     ProfileSuspense() {
  return (
<div className='w-full flex flex-wrap flex-col flex-grow animate-pulse'>
    <div className='gap-4 flex flex-col content-center'>
        <div>
    <ul className='grid gap-y-4 mt-6'>
        <li className="justify-self-center"><div className='bg-dark-200 dark:bg-dark-400 rounded-full size-32'></div></li>
        <li className="justify-self-center h-6 w-32 rounded-md bg-dark-200 dark:bg-dark-400"></li>
        </ul>
    </div>
    <div className='flex justify-center gap-x-6'>
         <div className="flex justify-center pb-2 size-6 bg-dark-200 dark:bg-dark-400 rounded-full"/>
         <div className="flex justify-center pb-2 size-6 bg-dark-200 dark:bg-dark-400 rounded-full"/>
         <div className="flex justify-center pb-2 size-6 bg-dark-200 dark:bg-dark-400 rounded-full"/>
         <div className="flex justify-center pb-2 size-6 bg-dark-200 dark:bg-dark-400 rounded-full"/>
         </div>
        </div>
        </div>  
  )
}
