import React, { Fragment, Suspense } from 'react'
import getSession from '../../../lib/getSession'
import { redirect } from 'next/navigation'


export default async function Layout({ children }: {children: React.ReactNode}) {
  const session = await getSession()
  if(session){
    return redirect('/perfil')
  }
  return (

        <Fragment>{children}</Fragment>
   
  )
}