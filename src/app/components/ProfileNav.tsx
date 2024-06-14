'use client'

import React from 'react'
import ProfileImageAndName from './ProfileImageAndName'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Favorite } from './icons/Favorite'
import { Pending } from './icons/Pending'
import { Completed } from './icons/Completed'
import { Plus } from './icons/Plus'


export default function ProfileNav() {

  
  const pathname = usePathname()
  return (
      <div className='gap-4 flex flex-col content-center'>
        <div className='flex justify-center gap-x-6'>
        <Link className={`flex justify-center border-dark-900 dark:border-white
      
      ${pathname === "/perfil" ? 'pb-2 w-7 border-b-2' : ''}
      `} href="/perfil"><Favorite w={24} h={24} fill={"none"} /></Link>
        <Link className={`flex justify-center border-dark-900 dark:border-white
    
      ${pathname === "/perfil/tus-posts" ? 'pb-2 w-7 border-b-2' : ''}
      `} href="/perfil/tus-posts"><Plus w={24} h={24}/></Link>
        </div>
    </div>
  )
}
