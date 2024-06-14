'use client'

import { redirect, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { X } from '@/app/components/icons/X';
import { Upload } from '@/app/components/icons/Upload';
import ModPostSuspense from '../ModPostSuspense';
import { validateData } from '@/app/compartir/validation';
import toast from 'react-hot-toast';
import { Post, Tag } from '../../../../types';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const ModificarPost = () => {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname?.split('/');
  const postId = segments[segments.length - 1];
  const [post, setPost] = useState<Post>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [previewFile, setPreviewFile] = useState<File | null>(null);
const [previewFileError, setPreviewFileError] = useState('');
const [actualFile, setActualFile] = useState('')
const [actualPreview, setActualPreview] = useState('')


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) {
          console.error('No se pudo obtener el ID del post');
          return;
        }

        const response = await fetch(`/api/post-by-id/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData.post);
          setSelectedTags(postData.post.tags.map((tag: Tag) => tag));
          setFormData({
            title: postData.post.title,
            description: postData.post.description,
            url: postData.post.url,
          });
          setActualFile(postData.post.logo);
          setActualPreview(postData.post.preview)
        } else {
          console.error('Error fetching post:', response);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  //ESTADO DE ERRORES
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: event.target.value
    }));
    const errors = validateData({ title: event.target.value });
    setTitleError(errors.titleRequired || errors.titleLength || '');
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: event.target.value
    }));
    const errors = validateData({ description: event.target.value });
    setDescriptionError(errors.descriptionRequired || errors.descriptionLength || '');
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      url: event.target.value
    }));
    const errors = validateData({ url: event.target.value });
    setUrlError(errors.url || "");
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags((prevTags) =>
        prevTags.filter((tag) => tag.id !== tagId)
    );

    if (selectedTags.length === 1) {
        setFormErrors({ tags: 'Debe seleccionar al menos un tag' });
    }
    
};

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    && !selectedTags.some(selectedTag => selectedTag.id === tag.id)
).slice(0, 5);

const handleFileChange = (acceptedFiles: File[]) => {
  const selectedFile = acceptedFiles[0];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
          setFileError('Solo se permiten archivos de imagen');
          setFile(null);
          return;
      }

      if (selectedFile.size > maxSize) {
          setFileError('El tamaño máximo del archivo es de 5MB');
          setFile(null);
          return;
      }
      setActualFile('');
      setFileError('');
      setFile(selectedFile);
  }
};

const handleCancelFile = () => {
  setFile(null);
  setFileError('');
  setActualFile('')
};

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: {
      'image/*': []
  },
    maxSize: 5 * 1024 * 1024,
});




const handlePreviewFileChange = (acceptedFiles: File[]) => {
  const selectedFile = acceptedFiles[0];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
          setPreviewFileError('Solo se permiten archivos de imagen');
          setPreviewFile(null);
          return;
      }

      if (selectedFile.size > maxSize) {
          setPreviewFileError('El tamaño máximo del archivo es de 5MB');
          setPreviewFile(null);
          return;
      }
      setActualFile('')
      setPreviewFileError('');
      setPreviewFile(selectedFile);
  }
};

const handleCancelPreviewFile = () => {
  setPreviewFile(null);
  setPreviewFileError('');
  setActualPreview('')
};

const { getRootProps: getPreviewRootProps, getInputProps: getPreviewInputProps } = useDropzone({
  onDrop: handlePreviewFileChange,
  accept: {
    'image/*': []
},
  maxSize: 5 * 1024 * 1024,
});


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading('Modificando el post...');

    let updatedLogo = file;
    let updatedPreview = previewFile;
    if (file) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      try {
        const uploadResponse = await fetch('/api/uploadImage', {
          method: 'POST',
          body: uploadFormData
        });

        if (!uploadResponse.ok) {
          throw new Error('Error uploading file');
        }

        const uploadData = await uploadResponse.json();
        updatedLogo = uploadData.url; 

        toast.success('Archivo subido correctamente');
      } catch (error) {
        toast.dismiss();
        toast.error('¡Hubo un error al subir la imagen!');
        console.error(error);
        return;
      }
    }

    if (previewFile) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', previewFile);

      try {
        const uploadResponse = await fetch('/api/uploadPreview', {
          method: 'POST',
          body: uploadFormData
        });

        if (!uploadResponse.ok) {
          throw new Error('Error uploading file');
        }

        const uploadData = await uploadResponse.json();
        updatedPreview = uploadData.url;

        toast.success('Archivo de vista previa subido correctamente');
      } catch (error) {
        toast.dismiss();
        toast.error('¡Hubo un error al subir la imagen de vista previa!');
        console.error(error);
        return;
      }
    }

    const data = {
      title: formData.title,
      description: formData.description,
      tags: selectedTags.map(tag => tag.id),
      url: formData.url,
      userId: userId,
      logo: updatedLogo,
      preview: updatedPreview,
    };    

    const errors = validateData(data);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`/api/update-post/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          console.log("AAA", data);
          
          toast.dismiss();
          toast.success('¡El post se modificó con éxito!');
          router.push(`/post/${post?.id}`);
          router.refresh()
        } else {
          toast.dismiss();
          toast.error('¡Hubo un error al modificar el post!');
        }
      } catch (error) {
        toast.dismiss();
        toast.error('¡Hubo un error al modificar el post!');
      }
    } else {
      toast.dismiss();
      toast.error('¡Hubo un error al modificar el post!');
      setFormErrors(errors);
    }
  };


  if (status === "loading" || !post) {
    return <ModPostSuspense />;
  }

  return (
    <main className='flex flex-col grow max-w-[1200px]'>
      <h1 className='justify-self-center self-center text-xl'>Editar post</h1>
      {post?.authorId === userId ? (
        <form className="flex flex-col gap-y-4 px-6" onSubmit={handleSubmit}>
          <div className='flex gap-2 items-end'>
            <div className='flex flex-col gap-y-2'>
              <label>Logo</label>
              <div {...getRootProps()} className='flex items-center justify-center border-dashed size-24 border-2 border-dark-200 dark:border-dark-400 rounded-md cursor-pointer text-center'>
                        <input {...getInputProps()} />
                        {actualFile ? (<Image src={post.logo || ""} alt="Preview" width={24} height={24} className='w-fit'/>) 
                        :
                        (file ? (  <div className='overflow-hidden w-24 h-24 flex justify-center'>
                          <Image src={URL.createObjectURL(file)} alt="Preview" width={24} height={24} className='w-fit'/>
                         
                      </div>) : ( <Upload/>))
                        }
                   
                    </div>
                    {file || actualFile ? (
                    <button onClick={handleCancelFile} className='w-24 bg-red-500 text-white p-1 rounded-md'>Cancelar</button>
                    ):(null)}
                    {fileError && <span className='text-xs text-red-500 font-light'>{fileError}</span>}
                </div>
            <div className='flex flex-col gap-y-2 w-full'>
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder='Añade un título'
                className='bg-dark-100 dark:bg-dark-300 rounded-md resize-none p-1 placeholder:text-dark-200 placeholder:text-sm'
              />
              <span className='text-xs text-red-500 font-light'>{titleError && <h1>{titleError}</h1>}</span>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder='Añade una descripción sobre el recurso o herramienta'
              className='bg-dark-100 dark:bg-dark-300 rounded-md resize-none p-1 placeholder:text-dark-200 placeholder:text-sm'
            />
            <span className='text-xs text-red-500 font-light'>{descriptionError && <h1>{descriptionError}</h1>}</span>
          </div>
          <div className='flex flex-col gap-y-2'>
                    <label htmlFor="searchTerm">Tags</label>
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        placeholder='Buscar tags'
                        className="ps-4 w-full bg-transparent dark:text-white dark:border-dark-50 border-black border-t-0 border-x-0 focus:border-b dark:focus:border-dark-50 focus:border-black transition-all focus:ring-transparent"
                        />
                    <span className='text-xs text-red-500 font-light'>{formErrors.tags && <h1>{formErrors.tags}</h1>}</span>
                </div>
                {searchTerm && (
                    <div>
                        <h2 className='text-dark-200 text-sm'>Resultados de la búsqueda</h2>
                        <div>
                            {filteredTags.map((tag) => (
                                <div
                                    key={tag.id}
                                    onClick={() => {
                                        setSelectedTags([...selectedTags, tag]);
                                        setSearchTerm("");
                                        setFormErrors({ tags: "" })
                                    }}
                                    className="bg-dark-100 hover:bg-dark-200 dark:bg-dark-400 dark:hover:bg-dark-300 cursor-pointer rounded-md p-2 m-1 w-min text-nowrap " style={{backgroundColor:`${tag.color}`}}
                                >
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedTags.length > 0 &&
                    <div className='gap-y-2'>
                        <h2>Tags seleccionados:</h2>
                        <ul className='flex flex-wrap justify-center gap-y-2'>
                            {selectedTags.map((tag) => (
                                <li key={tag.id} className={`flex justify-center content-center gap-x-2 text-nowrap h-min rounded-md p-2 m-1`} style={{backgroundColor:`${tag.color}`}}>
                                    {tag.name}
                                    <button onClick={() => handleRemoveTag(tag.id)}>
                                        <X />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
          <div className='flex flex-col gap-y-2'>
            <label htmlFor="url">Dirección del recurso o herramienta</label>
            <input
              id="url"
              name="url"
              value={formData.url}
              onChange={handleUrlChange}
              required
              placeholder='Añade la url del recurso o herramienta'
              className='dark:bg-dark-300 rounded-md resize-none p-1 placeholder:text-dark-200 placeholder:text-sm'
            />
            <span className='text-xs text-red-500 font-light'>{urlError && <h1>{urlError}</h1>}</span>
          </div>

          <div className='flex flex-col gap-y-2'>
              <label>Vista previa</label>
           <div {...getPreviewRootProps()} className='flex items-center justify-center border-dashed w-96 h-48 border-2 border-dark-200 dark:border-dark-400 rounded-md cursor-pointer text-center'>
        <input {...getPreviewInputProps()} />
        <div className='overflow-hidden w-96 h-48 flex justify-center items-center'>
                {actualPreview ? ( <Image src={post.preview || ""} alt="Preview" width={384} height={192} className='w-fit'/> ) 
                :
                previewFile ? (
                  
                      <Image src={URL.createObjectURL(previewFile)} alt="Preview" width={384} height={192} className='w-fit'/>
                
              ) : (
                  <Upload/>
              )
                }
       </div>
    </div>
    {previewFile || actualPreview ? (
        <button onClick={handleCancelPreviewFile} className='w-24 bg-red-500 text-white p-1 rounded-md'>Cancelar</button>
    ) : null}
    {previewFileError && <span className='text-xs text-red-500 font-light'>{previewFileError}</span>}
</div>


          <button className="flex gap-x-2 bg-dark-100 hover:bg-dark-200 dark:bg-dark-400 dark:hover:bg-dark-300 rounded-md p-2 mt-4 mb-6 self-center justify-self-center" type="submit">Actualizar post <Upload /></button>
        </form>
      ) : (
        <div className='grow flex flex-col gap-y-12 text-center content-center justify-center'>
          <h1 className='flex flex-wrap content-center justify-center'>No tienes permiso para modificar este post</h1>
          <button className='self-center bg-dark-50 hover:bg-dark-100 dark:bg-dark-400 dark:hover:bg-dark-300 p-2 rounded-md w-min' onClick={router.back}>Regresar</button>
        </div>
      )}
    </main>
  );
};

export default ModificarPost;
