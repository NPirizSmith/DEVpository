'use client'

import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { X } from '../components/icons/X';
import { Upload } from '../components/icons/Upload';
import { validateData } from './validation';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Tag {
    id: string;
    name: string;
    color: string;
    category: string;
}

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const router = useRouter();
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const session = useSession();
    const userId = session.data?.user.id;
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState('');
    const [previewFile, setPreviewFile] = useState<File | null>(null);
const [previewFileError, setPreviewFileError] = useState('');

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
    }, [session]);

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [urlError, setUrlError] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        const errors = validateData({ title: event.target.value });
        setTitleError(errors.titleRequired || errors.titleLength || '');
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        const errors = validateData({ description: event.target.value });
        setDescriptionError(errors.descriptionRequired || errors.descriptionLength || '');
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
        const errors = validateData({ url: event.target.value });
        setUrlError(errors.url || "");
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

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
    
            setPreviewFileError('');
            setPreviewFile(selectedFile);
        }
    };
    
    const handleCancelPreviewFile = () => {
        setPreviewFile(null);
        setPreviewFileError('');
    };

    const { getRootProps: getPreviewRootProps, getInputProps: getPreviewInputProps } = useDropzone({
        onDrop: handlePreviewFileChange,
        accept: {
            'image/jpeg, image/png, image/svg+xml': []
        },
        maxSize: 5 * 1024 * 1024,
    });
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

            setFileError('');
            setFile(selectedFile);
        }
    };

    const handleCancelFile = () => {
        setFile(null);
        setFileError('');
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleFileChange,
        accept: {
            'image/jpeg, image/png, image/svg+xml': []

        },
        maxSize: 5 * 1024 * 1024,
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast.loading('Creando el post...');
        let logo = '';
        let preview = '';
    
        if (!file) {
            toast.error('Por favor, sube un archivo válido para el logo');
            return;
        }
    
        if (!previewFile) {
            toast.error('Por favor, sube un archivo válido para el preview');
            return;
        }
    
        const uploadImage = async (file: File, endpoint: string) => {
            const formData = new FormData();
            formData.append('file', file);
    
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Error uploading file');
            }
    
            const data = await response.json();
            return data.url;
        };
    
        try {
            logo = await uploadImage(file, '/api/uploadImage');
            preview = await uploadImage(previewFile, '/api/uploadPreview');
        } catch (error) {
            toast.dismiss();
            toast.error('¡Hubo un error al subir las imágenes!');
            console.error(error);
            return;
        }
    
        const data = {
            title,
            description,
            url,
            logo,
            preview,
            userId,
            tags: selectedTags.map(tag => tag.id),
        };
    
        const errors = validateData(data);
    
        if (!title) {
            setTitleError(errors.titleRequired);
        }
        if (!description) {
            setDescriptionError(errors.descriptionRequired);
        }
        if (!url) {
            setUrlError(errors.url)
        }
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('/api/create-post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                if (response.ok) {
                    toast.dismiss();
                    toast.success('¡Post creado correctamente!');
                    const { url: newCourseUrl } = await response.json();
                    router.push(newCourseUrl);
                } else {
                    throw new Error('Error creating post');
                }
            } catch (error) {
                toast.dismiss();
                toast.error('¡Hubo un error al crear el post!');
                console.error(error);
                setFormErrors(errors);
            }
        } else {
            toast.dismiss();
            toast.error('¡Algunos campos son incorrectos!');
            setFormErrors(errors);
        }
    };
    

    if (!session.data) {
        return redirect('/conectar');
    }

    return (
        <main className='flex flex-col grow max-w-[1200px]'>
            <h1 className='justify-self-center self-center text-xl'>Agrega un nuevo recurso o herramienta</h1>
            <form className="flex flex-col gap-y-4 px-6" onSubmit={handleSubmit}>
                <div className='flex gap-2 items-end'>
                <div className='flex flex-col gap-y-2'>
                    <label>Logo</label>
                    <div {...getRootProps()} className='flex items-center justify-center border-dashed size-24 border-2 border-dark-200 dark:border-dark-400 rounded-md cursor-pointer text-center'>
                        <input {...getInputProps()} />
                        {file ? (
                                   <div className='overflow-hidden w-24 h-24 flex justify-center'>
                                <Image src={URL.createObjectURL(file)} alt="Preview" width={24} height={24} className='w-fit object-contain'/>
                               
                            </div>
                        ) : (
                            <Upload/>
                       
                        )}
                    </div>
                    {file ? (
                    <button onClick={handleCancelFile} className='w-24 bg-red-500 text-white p-1 rounded-md'>Cancelar</button>
                    ):(null)}
                    {fileError && <span className='text-xs text-red-500 font-light'>{fileError}</span>}
                </div>
                <div className='flex flex-col gap-y-2 w-full'>
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder='Añade un título'
                        className='dark:bg-dark-300 bg-dark-100 rounded-md resize-none p-1 h-min w-full placeholder:text-dark-200 placeholder:text-sm'
                    />
                    <span className='text-xs text-red-500 font-light'>{titleError && <h1>{titleError}</h1>}</span>
                    </div>
                    
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder='Añade una descripción sobre la herramienta o recurso'
                        className='dark:bg-dark-300 bg-dark-100 rounded-md resize-none p-1 placeholder:text-dark-200 placeholder:text-sm'
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
                    <label htmlFor="url">Dirección al recurso o la herramienta</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder='Añade la url de la herramienta o recurso'
                        className='dark:bg-dark-300 bg-dark-100 rounded-md resize-none p-1 placeholder:text-dark-200 placeholder:text-sm'
                    />
                    <span className='text-xs text-red-500 font-light'>{urlError && <h1>{urlError}</h1>}</span>
                </div>
             
                <div className='flex flex-col gap-y-2'>
    <label>Vista previa</label>
    <div {...getPreviewRootProps()} className='flex items-center justify-center border-dashed w-96 h-48 border-2 border-dark-200 dark:border-dark-400 rounded-md cursor-pointer text-center'>
        <input {...getPreviewInputProps()} />
        {previewFile ? (
            <div className='overflow-hidden w-96 h-48 flex justify-center'>
                <Image src={URL.createObjectURL(previewFile)} alt="Preview" width={384} height={192} className='w-fit'/>
            </div>
        ) : (
            <Upload/>
        )}
    </div>
    {previewFile ? (
        <button onClick={handleCancelPreviewFile} className='w-24 bg-red-500 text-white p-1 rounded-md'>Cancelar</button>
    ) : null}
    {previewFileError && <span className='text-xs text-red-500 font-light'>{previewFileError}</span>}
</div>


                <button
                    className={`flex gap-x-2 bg-dark-100 hover:bg-dark-200 dark:bg-dark-400 dark:hover:bg-dark-300 rounded-md p-2 mt-4 mb-6 self-center justify-self-center`}
                    type="submit">
                    Publicar recurso o herramienta <Upload />
                </button>
            </form>
        </main>
    );
}
