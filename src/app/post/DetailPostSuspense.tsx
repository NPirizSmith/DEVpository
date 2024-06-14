import React from 'react'
import { Favorite } from '../components/icons/Favorite'


export default function DetailPostSuspense() {



return (
  <main className='flex flex-col flex-wrap gap-y-2 grow px-6 animate-pulse'>
  <div className='bg-dark-200 dark:bg-dark-400 w-96 h-10 rounded-md'></div>
  <div className='bg-dark-200 dark:bg-dark-400 w-72 h-4 rounded-md'></div>
  <div className='bg-dark-200 dark:bg-dark-400 w-56 h-8 rounded-md'></div>
  <div className='bg-dark-200 dark:bg-dark-400 w-96 h-8 rounded-md'></div>
  <div className='bg-dark-200 dark:bg-dark-400 w-full h-24 rounded-md'></div>
  <div className='bg-dark-200 dark:bg-dark-400 w-96 h-8 rounded-md'></div>
  <div className='bg-dark-200 dark:bg-dark-400 w-72 h-8 rounded-md'></div>
  <div className='bg-dark-200 dark:bg-dark-400 w-56 h-8 rounded-md'></div>
  <div className='flex gap-x-4'>
  <div className='bg-dark-200 dark:bg-dark-400 w-48 h-8 rounded-md'></div>
  <div className='ml-6 bg-dark-200 dark:bg-dark-400 w-24 h-8 rounded-md'></div>
  <div className='bg-dark-200 dark:bg-dark-400 w-24 h-8 rounded-md'></div>
  </div>
  <div className='mt-10 bg-dark-200 dark:bg-dark-400 w-48 h-6 rounded-md self-center'></div>
  <div className='mt-4 bg-dark-200 dark:bg-dark-400 w-48 h-6 rounded-md self-center'></div>
  <div className='flex gap-x-2 text-dark-200 dark:text-dark-400 self-center'>
<Favorite w={24} h={24} fill={"currentColor"}/>
<Favorite w={24} h={24} fill={"currentColor"}/>
<Favorite w={24} h={24} fill={"currentColor"}/>
<Favorite w={24} h={24} fill={"currentColor"}/>
<Favorite w={24} h={24} fill={"currentColor"}/>
  </div>

  </main>
)

}
