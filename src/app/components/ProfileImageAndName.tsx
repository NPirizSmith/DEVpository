import React from 'react'
import DefaultProfilePicture from '../../../public/default-profile-picture.jpg'
import Image from 'next/image';
import getSession from '../../../lib/getSession';
import Link from 'next/link';
import { Settings } from './icons/Settings';

export default async function ProfileImageAndName() {
    const session = await getSession()
    const userImageUrl = session?.user.image || DefaultProfilePicture
    const userName = session?.user.name
  return (
    <ul className='grid gap-y-4 mt-6 pb-8'> 
        <li className="justify-self-center"><Image src={userImageUrl} width={120} height={120} className='rounded-full' alt="Profile picture"></Image></li>
        <li className="justify-self-center flex items-center gap-x-2" title='Ajustar preferencias'>{userName}<Link href="/preferencias"><Settings w={20} h={20}/></Link></li>
    </ul>
  )
}
