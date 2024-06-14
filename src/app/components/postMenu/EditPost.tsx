'use client'

import { useRouter } from 'next/navigation';
import { Edit } from '../icons/Edit';

export default function EditPost( {postId} : {postId: string} ) {
    const router = useRouter();
    
    function handleClick() {
        router.push(`/modificar/${postId}`);
    }

    return (
        <button
        className='flex items-center gap-2 p-2 w-full relative text-sm rounded-full hover:bg-dark-200 dark:hover:bg-dark-300'
        onClick={handleClick}
        title="Editar post"
      >
     <Edit w={20} h={20} />
      
      </button>
    );
}
