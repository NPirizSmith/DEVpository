import CreatedPosts from '@/app/components/CreatedPosts'
import ParatiSuspense from '@/app/components/ParatiSuspense'
import React, { Suspense } from 'react'

export default function page({
  searchParams
} : { searchParams?: {

  pagina?: number,
} }) {

  const pagina = searchParams?.pagina || 1
  return (
    <div className='w-full'>
         <Suspense fallback={<ParatiSuspense/>}>
            <CreatedPosts pagina={pagina}/>
        </Suspense>
    </div>
  )
}