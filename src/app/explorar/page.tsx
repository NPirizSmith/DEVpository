import Explorar from '@/app/components/Explorar'
import ExplorarSuspense from '@/app/components/ExplorarSuspense'
import React, { Suspense } from 'react'

export default function page({
  searchParams
} : { searchParams?: {
  tag?: string,

  orden?: string,
  busqueda?: string,
  pagina?: number,
} }) {

   const tag = searchParams?.tag || ""
   const orden = searchParams?.orden || ""
   const busqueda = searchParams?.busqueda || ""
   const pagina = searchParams?.pagina || 1


  return (
    <div className='flex grow'>
        <Suspense fallback={<ExplorarSuspense/>}>
            <Explorar tag={tag} orden={orden} busqueda={busqueda} pagina={pagina}/>
        </Suspense>
    </div>
  )
}
