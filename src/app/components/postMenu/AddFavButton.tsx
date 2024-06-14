'use client'

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AddFavButtonProps } from '../../../../types';
import { Favorite } from '../icons/Favorite';
import { handleToggleFavorite } from '../../actions/addFavorite';
import toast from 'react-hot-toast';

const AddFavButton: React.FC<AddFavButtonProps> = ({ postId, isFavorite, favCount, closeDropdown }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id ? session.user.id : '';
    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
    const [favCountState, setFavCountState] = useState(favCount);
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {


        setIsFavoriteState(isFavorite);
        setFavCountState(favCount);

    }, [isFavorite, favCount]);

    const onClickHandler = async () => {
        const newFavoriteState = !isFavoriteState;
        setIsFavoriteState(newFavoriteState);
        setFavCountState(prevCount => newFavoriteState ? prevCount + 1 : prevCount - 1);
        toast.loading(`${isFavoriteState ? 'Quitando de favoritos' : 'Agregando a favoritos'}`);
        try {
            await handleToggleFavorite(isFavoriteState, postId, userId);
            toast.dismiss()
            toast.success(`${isFavoriteState ? 'Quitado de favoritos' : 'Agregado a favoritos'}`);
            if(pathname === "/perfil" && closeDropdown){
                closeDropdown();}

        } catch (error) {
            setIsFavoriteState(!isFavoriteState);
            setFavCountState(favCount);
            console.error('Error updating favorite status:', error);
            toast.dismiss();

            toast.error("Error al manipular favoritos")
        } finally {
            router.refresh()
        }
    };

    return (
        <div key={postId}>
            <button key={postId}
                title='Agregar a favoritos'
                className={`flex items-center gap-2 text-black dark:text-dark-50 p-2 w-full relative text-sm rounded-full hover:bg-dark-200 dark:hover:bg-dark-300`}
                onClick={onClickHandler}
            >
                <Favorite w={20} h={20} fill={`${isFavoriteState ? 'currentColor' : 'transparent'}`} />
                <h1 className='font-semibold'>{favCountState}</h1>
            </button>
        </div>
    );
};

export default AddFavButton;