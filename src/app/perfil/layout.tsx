import React, { Suspense } from 'react'
import ProfileNav from '../components/ProfileNav'
import ProfileImageAndName from '../components/ProfileImageAndName'
import getSession from '../../../lib/getSession'
import { redirect } from 'next/navigation'


export default async function Layout({ children }: {children: React.ReactNode}) {
  const session = await getSession()
  if(!session){
    return redirect('/conectar')
  }
  return (

    <div className='w-full flex flex-wrap flex-col flex-grow'>
      <div className=''>
        <ProfileImageAndName />
        <ProfileNav />
        <div className=''>{children}</div>
      </div>
    </div>
  )
}
