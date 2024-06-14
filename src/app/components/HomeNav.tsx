'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function HomeNav() {
  const pathname = usePathname()

if(pathname === "/" || pathname === "/explorar"){
  return (
    
    <div className='self-center flex'>
    <div className="lg:hidden gap-x-40 px-16 w-full contents flex-wrap justify-between lg:mt-0 mt-16">
      <Link className={`h-10 w-20  ${pathname === "/" ? 'border-solid border-b-2 border-dark-900 dark:border-white' : 'dark:text-dark-200 text-dark-200 text-opacity-50 hover:border-solid hover:border-b-2 hover:border-b-dark-200 hover:border-opacity-50'}`} href={"/"}><h1 className={`text-center mb-3 text-base font-semibold md:text-xl
      `}>Para ti</h1>
      </Link>
      <Link className={`h-10 w-20 ${pathname === "/explorar" ? 'border-solid border-b-2 border-dark-900 dark:border-white' : 'dark:text-dark-200 text-dark-200 dark:text-opacity-50 hover:border-solid hover:border-b-2 hover:border-b-dark-200 hover:border-opacity-50'}`} href={"/explorar"}><h1 className={`text-center mb-3 text-base font-semibold md:text-xl
     
      `}>Explorar</h1>
      </Link>
    </div>
    </div>
  );
}
  
}
