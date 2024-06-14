'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import DarkMode from './DarkMode'
import { Search } from './icons/Search'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function LgNav() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchbar, setSearchbar] = useState(searchParams.get('busqueda')?.toString() || "");


  const handleSearchChange = (event: string) => {
    if (pathname === "/explorar") {
      const params = new URLSearchParams(searchParams);
      setSearchbar(event);
      if (event) {
        params.set("busqueda", event);
      } else {
        params.delete("busqueda");
      }
      params.set('pagina', '1')
      replace(`${pathname}?${params.toString()}`);
    } else {
      const params = new URLSearchParams(searchParams);
      setSearchbar(event);
      if (event) {
        params.set("busqueda", event);
      } else {
        params.delete("busqueda");
      }
    }
  }

  return (

    <div className=' bg-white border-b dark:bg-dark-950 dark:border-dark-200 fixed hidden lg:flex w-full items-center justify-between py-4 px-12 z-50'>
      <Link href="/" className="font-Bebas_Neue text-4xl">DEVpository</Link>
      <div className="flex w-96 h-10  items-center">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchbar}
          onChange={(event) => handleSearchChange(event.target.value)}
          defaultValue={searchbar}
          className="ps-8 h-full w-full bg-transparent dark:text-white dark:border-dark-50 border-black rounded-md focus:rounded-none focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b dark:focus:border-dark-50 focus:border-black transition-all focus:ring-transparent"
        />
        <Link href={`/explorar?busqueda=${searchbar}`} className="relative right-0 px-2 h-10 content-center rounded-md hover:scale-110 transition-all"><Search w={20} h={20} /></Link>
      </div>

      <DarkMode>
        <div className="justify-self-center"></div>
      </DarkMode>
    </div>
  )
}
