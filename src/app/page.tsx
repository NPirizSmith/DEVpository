import Parati from '@/app/components/Parati'
import ParatiSuspense from '@/app/components/ParatiSuspense'
import React, { Suspense } from 'react'

export default function page({
  searchParams
} : { searchParams?: {
  pagina?: string ,

} }) {
  const pagina = searchParams?.pagina || "1"
  return (
    <div className='flex grow'>
        <Suspense fallback={<ParatiSuspense/>}>
            <Parati pagina={pagina}/>
        </Suspense>
    </div>
  )
}
