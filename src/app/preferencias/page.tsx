'use client'

import React, { ChangeEvent, useEffect, useState } from 'react';
import { X } from '../components/icons/X';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Tag } from '../../../types';

export default function Page() {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true)
  const [showRecommendation, setShowRecommendation] = useState(false)
  const { data: session } = useSession()
  const userId = session?.user.id
  const router = useRouter()  
  const preferences = session?.user.preferences
  
 
  useEffect(() => {
    setLoading(true);
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        setLoading(false)
        setTags(data);
      } catch (error) {
        setLoading(true)
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
    setSelectedTags(preferences || []);
  }, [preferences]);


  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags?.filter((tag) => tag !== tag)
    );
  };

  async function handleClick() {
    if(selectedTags?.length <= 2){
        setShowRecommendation(true);
    } else {
      handleSavePreferences()
    }
  }

  const handleSavePreferences = async () => {
    try {
      toast.loading("Guardando preferencias")
      const response = await fetch(`/api/preferences/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTags: selectedTags,
        }),
      });

      if (!response.ok) {
        toast.error("Error al guardar tus preferencias")
        setShowRecommendation(false)
        throw new Error('Error saving preferences');
        
      }
      toast.dismiss()
      toast.success("¡Preferencias guardadas!")
      setShowRecommendation(false)
    } catch (error) {
      toast.dismiss()
      toast.error("Error al guardar tus preferencias")
    }
  };

  const filteredTags = tags.filter(
    (tag: Tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTags?.includes(tag.name)
  ).slice(0, 5);


  if(session === undefined){
    return (
    <h1>Cargando</h1>
    )
  }

  if(session === null){
    return (
    <h1>Inicia sesión</h1>
    )
  }


  return (
    <div className='flex flex-col content-center justify-self-center p-6 w-full max-w-96'>

      <h1 className='text-2xl text-center font-bold mt-4'>Elige algunas preferencias</h1>
      <p className='text-xs font-light text-center'>Esto modificará tu página de inicio</p>
      <div className='flex flex-col gap-y-2 px-6'>
        <input
          type='text'
          id='searchTerm'
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder='Buscar tags'
          disabled={loading}
          className="ps-4 w-full bg-transparent dark:text-white dark:border-dark-50 border-black border-t-0 border-x-0 focus:border-b dark:focus:border-dark-50 focus:border-black transition-all focus:ring-transparent"
          />
      </div>
      {searchTerm && (
        <div>
          <h2 className='text-dark-200 text-sm'>Resultados de la búsqueda</h2>
          <div>
            {filteredTags.map((tag: Tag) => (
              <div
                key={tag.id}
                onClick={() => {

                  setSelectedTags([...selectedTags, tag.name]);
                  setSearchTerm('');
                }}
                className='bg-dark-100 hover:bg-dark-200 dark:bg-dark-400 dark:hover:bg-dark-300 ps-4 cursor-pointer rounded-md p-2 m-1'
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='flex flex-col gap-y-2'>
        <h2 className='text-center pt-12'>Tus preferencias:</h2>
        {loading ? (
          <h1 className='text-xl animate-pulse text-center pt-24'>Cargando...</h1>
        ) :
          <ul className='flex flex-wrap justify-center self-center gap-y-2 pt-12 mb-6 lg:w-[460px]'>
            {selectedTags?.map((tag, index) => (
              <li key={index} className='flex justify-center content-center bg-dark-100 hover:bg-dark-200 dark:bg-dark-400 dark:hover:bg-dark-300 gap-x-2 text-nowrap h-min cursor-pointer rounded-md p-2 m-1'>
                {tag}
                <button type='button' onClick={() => handleRemoveTag(tag)}>
                  <X />
                </button>
              </li>
            ))}
          </ul>
        }
        {!loading && selectedTags?.length == 0 ? <h1 className='text-center pt-20 mb-12'>Agrega algunas preferencias</h1> : ""}

      </div>
      <button className="mt-auto w-min text-nowrap self-center bg-dark-100 hover:bg-dark-200 dark:bg-dark-400 dark:hover:bg-dark-300 rounded-md p-2" onClick={handleClick}>Guardar preferencias</button>
      {showRecommendation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-dark-500 p-8 rounded-lg">
            <p className="text-dark-900 dark:text-dark-200">Te recomendamos agregar al menos 3 preferencias</p>
            <div className="flex justify-end mt-4">


              <button className="px-4 py-2 mr-4 text-nowrap bg-dark-300 hover:bg-opacity-50  text-white rounded-md" onClick={handleSavePreferences}>
                {loading ? (
                  <span className="animate-pulse">...</span>) : (
                  <span>Guardar preferencias</span>)}
              </button>
              <button className="px-4 py-2 bg-dark-300 hover:bg-opacity-50  text-dark-100 rounded-md w-28 " onClick={() => setShowRecommendation(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}
