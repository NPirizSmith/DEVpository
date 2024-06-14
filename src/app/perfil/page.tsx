import FavoritePosts from '@/app/components/FavPostsProfile'
import React, { Suspense } from 'react'
import ParatiSuspense from '../components/ParatiSuspense'

export default function page() {
 
  const searchParams = { pagina: 1 };

  return (
    <div className='w-full'>
        <Suspense fallback={<ParatiSuspense/>}>
            <FavoritePosts {...searchParams}/>
        </Suspense>
    </div>
  )
}