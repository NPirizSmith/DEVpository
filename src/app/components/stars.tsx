'use client'

import { MouseEventHandler, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Favorite } from './icons/Favorite';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function Star({ selected, onSelect }: { selected: boolean; onSelect: MouseEventHandler }) {
  return (
    <span className={`hover:scale-125 text-sm cursor-pointer ${selected ? 'text-yellow-500' : 'text-gray-400'}`} onClick={onSelect}>
      <Favorite w={20} h={20} fill={selected ? "currentColor" : "none"} />
    </span>
  );
}

export default function Rating({ postId }: { postId: string }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    async function fetchRating() {
      try {
        if (!session) {
          setUserRating(0);
          return;
        }

        const userId = session.user.id;
        const response = await fetch(`/api/courseRating/${postId}?userId=${userId}`);
        const data = await response.json();
        setUserRating(data.userRating?.value || 0);
      } catch (error) {
        console.error('Error al obtener el rating del usuario:', error);
      }
    }
    fetchRating();
  }, [postId, session]);

  const handleStarClick = async (value: number) => {
    if (!session) {
      router.push("/conectar");
      return;
    }

    if (userRating === value) {
      try {
        const userId = session.user.id;
        const response = await fetch(`/api/courseRating/${postId}?userId=${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          toast.error('Error al eliminar el rating');
          throw new Error('Error al eliminar el rating del usuario');
        }

        toast.success('Rating eliminado con éxito');
        setUserRating(0);
        router.refresh();
      } catch (error) {
        console.error('Error al eliminar el rating de la herramienta o recurso:', error);
      }
    } else {
      try {
        const userId = session?.user.id;
        setUserRating(value);
        const response = await fetch(`/api/courseRating/${postId}`, {
          method: 'POST',
          body: JSON.stringify({ value, userId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          toast.error('Error al calificar la herramienta o recurso');
          throw new Error('Error al actualizar el rating del usuario');
        }

        toast.success('Herramienta o recurso calificado con éxito');
        router.refresh();
      } catch (error) {
        console.error('Error al calificar la herramienta o recurso:', error);
      }
    }
  };

  return (
    <div className='flex gap-x-1 justify-center'>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star key={index} selected={index <= userRating} onSelect={() => handleStarClick(index)} />
      ))}
    </div>
  );
}
