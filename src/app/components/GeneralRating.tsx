'use client'

import { useEffect, useState } from 'react';

interface GeneralRatingProps {
  postId: string;
}

export default function GeneralRating({ postId }: GeneralRatingProps) {
  const [generalRating, setGeneralRating] = useState<number>(0);

  useEffect(() => {
    async function fetchGeneralRating() {
      try {
        const response = await fetch(`/api/courseRating/${postId}`);
        const data = await response.json();
        setGeneralRating(data.generalRating || 0);
      } catch (error) {
        console.error('Error al obtener el rating general de la herramienta o recurso:', error);
      }
    }
    fetchGeneralRating();
  }, [postId]);

  const formattedRating: string = generalRating.toFixed(1);




  return (
    <div>
      <span>{formattedRating}</span>
    </div>
  );
}