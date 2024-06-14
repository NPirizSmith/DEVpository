
'use client'
import Image from 'next/image'
import React from 'react'
import { signIn } from 'next-auth/react'

export default function Page() {

  return (  
    <main className='flex flex-col justify-center content-center text-center grow flex-wrap'>
        <h2 className='mb-12'>Conéctate y desbloquea todas las funcionalidades</h2>
      <div className='flex flex-col gap-y-4 items-center'>
    <button  onClick={() => signIn("google")} className="w-60 place-content-center px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <Image width={24} height={24} src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        <span>Conectar con Google</span>
    </button>
    <button  onClick={() =>  signIn('github')} className="w-60 place-content-center px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <Image width={24} height={24} src="https://www.svgrepo.com/show/475654/github-color.svg" loading="lazy" alt="google logo"/>
        <span>Conectar con Github</span>
    </button>
    </div>
    </main>
  )
}
