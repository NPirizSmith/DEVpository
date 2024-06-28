import FavoritePosts from '@/app/components/FavPostsProfile'
import React, { Suspense } from 'react'
import ParatiSuspense from '../components/ParatiSuspense'

export default function page({
  searchParams
} : { searchParams?: {

  pagina?: number,
} }) {
 
  const pagina = searchParams?.pagina || 1

  return (
    <div className='w-full'>
        <Suspense fallback={<ParatiSuspense/>}>
            <FavoritePosts pagina={pagina}/>
        </Suspense>
    </div>
  )
}