'use client'

import Link from 'next/link'
import React from 'react'
import { Home } from './icons/Home'
import { Explore } from './icons/Explore'
import { Profile } from './icons/Profile'
import { Plus } from './icons/Plus'
import { usePathname } from 'next/navigation'


export default function MobileNav() {


  const pathname = usePathname();





  return (
    <nav className='flex sticky bottom-0 justify-center gap-6 z-30 h-14 items-center mt-6 dark:bg-dark-900 lg:hidden bg-white shadow-black shadow-2xl'>
      <div className={`grid w-9 justify-center ${pathname === "/" ? "border-t-2 border-dark-900 dark:border-white h-full content-center" : ""}`}><Link href="/"><Home /></Link></div>
      <div className={`grid w-9 justify-center ${pathname === "/explorar" ? " border-t-2 border-dark-900 dark:border-white h-full content-center" : ""}`}><Link href="/explorar"><Explore /></Link></div>
      <div className={`grid w-9 justify-center ${pathname === "/crear" ? " border-t-2 border-dark-900 dark:border-white h-full content-center" : ""}`}><Link href="/crear"><Plus /></Link></div>
      <div className={`grid w-9 justify-center ${pathname.startsWith("/perfil") ? " border-t-2 border-dark-900 dark:border-white h-full content-center" : ""}`}><Link href="/perfil"><Profile /></Link></div>
    </nav>
  )
}



