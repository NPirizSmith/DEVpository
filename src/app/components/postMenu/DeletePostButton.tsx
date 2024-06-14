'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Delete } from "../icons/Delete";
import toast from "react-hot-toast";

export default function DeletePostButton( {postId}: {postId: string} ) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setShowConfirmation(true);
  }

  async function handleDelete() {
    try {
      if (!session) {
        console.error("No hay sesión activa.");
        return;
      }

      setLoading(true);

      await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId
        })
      });

      toast.success((t) => (
        <span>
          ¡Post borrado con éxito!
          <button className='pl-2 underline' onClick={() =>
            handleUndo()
          }>
            Deshacer
          </button>
        </span>
      ));
      router.refresh();
    } catch (error) {
      toast.error("Error al borrar el post");
      console.error(error);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  }

  async function handleUndo() {
    toast.dismiss()
    try {
      await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId
        })
      });
      toast.success('¡Post restaurado con éxito!');
      router.refresh();
    } catch (error) {
      toast.error('Error al restaurar el post');
      console.error(error);
    }
  }

  return (
    <div>
      <button
        className={`flex items-center gap-2 p-2 w-full relative text-sm rounded-full hover:bg-dark-200 dark:hover:bg-dark-300 ${loading ? 'post-not-allowed opacity-50' : ''}`}
        onClick={handleClick}
        disabled={loading}
        title="Borrar post"
      >

        <Delete w={20} h={20} />

      </button>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-dark-500 p-8 rounded-lg">
            <p className="text-dark-900 dark:text-dark-200">¿Estás seguro de que deseas borrar este post?</p>
            <div className="flex justify-end mt-4">


              <button className="px-4 py-2 mr-4 bg-red-500 text-white rounded-md w-28" onClick={handleDelete}>

        
                  {loading ? (
                    <span className="animate-pulse">...</span>) : (
                    <span>Eliminar</span>)}
              </button>
              <button className="px-4 py-2 bg-dark-300 text-dark-100 rounded-md w-28" onClick={() => setShowConfirmation(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
