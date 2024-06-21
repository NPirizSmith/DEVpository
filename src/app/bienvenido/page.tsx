import React from 'react';
import Carousel from './Carousel';
import { Favorite } from '../components/icons/Favorite';
import { Pending } from '../components/icons/Pending';
import { Completed } from '../components/icons/Completed';
import { Plus } from '../components/icons/Plus';
import Page from '../preferencias/page';
import getSession from '../../../lib/getSession';
import { Download } from '../components/icons/Download';
import Link from 'next/link';

const page: React.FC = async() => {
  const session = await getSession()
  const user = session?.user

  


  const items = [
    <div className="item0 flex items-center" key={"Item 0"}>
    <div className='grid w-full lg:w-[860px] h-96 justify-center'>
      <h1 className='text-balance text-center font-semibold text-2xl content-center '>¡Bienvenido/a, {user?.name}!</h1>
      <h1 className='text-balance text-center text-xl max-w-96'>Gracias por unirte a <span className='font-Bebas_Neue'>Devpository</span>. Aquí recopliamos aquellas herramientas y recursos para que el desarrollo front-end sea lo más fácil y productivo posible.</h1>
 
    </div >
  </div>,
    <div className="item1 flex items-center" key={"Item 1"}>
      <div className='grid w-full lg:w-[860px] h-96 justify-center'>
        <h1 className='text-balance text-center font-semibold text-2xl content-center '>¡Valora lo mejor!</h1>
        <h1 className='text-balance text-center text-xl max-w-96'>Califica las herramientas y recursos que más te gusten para dar una referencia a otros usuarios.</h1>
        <span className='flex text-yellow-500 content-center justify-center'><Favorite w={48} h={48} fill={"currentColor"} /> <Favorite w={48} h={48} fill={"currentColor"} /> <Favorite w={48} h={48} fill={"currentColor"} /> <Favorite w={48} h={48} fill={"currentColor"} /> <Favorite w={48} h={48} fill={"currentColor"} /></span>
      </div >
    </div>,

    <div className="item2 flex items-center" key={"Item 2"}>
      <div className='grid w-full lg:w-[860px] h-96 justify-center'>
        <h1 className='text-balance text-center font-semibold text-2xl content-center'>¡Guarda tus favoritos!</h1>
        <p className='text-balance text-center text-xl max-w-96'>Agrega herramientas y recursos a tu lista de favoritos, y accede fácilmente a ellos desde tu perfil.</p>
        <span className='flex content-center justify-center self-center'>

          <div className='p-2 w-full h-24 dark:bg-dark-300 bg-dark-100  rounded-md shadow-lg post-menu z-50'>
            
          <div className="flex w-full items-center">
      <div className='size-12 grid bg-dark-200 rounded-lg items-center justify-center'></div>
      <div className='flex-col me-auto'>
        <div className='flex items-center'>
          <span className="w-auto rounded-md max-w-56 h-4 overflow-hidden flex-1 ms-3 font-light text-nowrap bg-dark-200"></span>
        </div>
        <div className='flex items-center gap-x-2 mt-1'>
          <span className="w-24 h-4 ms-3 bg-dark-200 rounded-md"></span>
          <span className="w-24 h-4 ms-3 bg-dark-200 rounded-md"></span>
        </div>
        <div className='flex mt-1 overflow-clip flex-1 ms-3 text-sm whitespace-nowrap gap-x-2'>
          <div className='flex items-center gap-1 text-dark-200'>
            <div className="w-4 h-4 bg-dark-200 rounded-md"></div>
            <Favorite w={16} h={16} fill={"#3f3f3f"} />
            <div className="w-8 h-4 bg-dark-200 rounded-md"></div>
            <div className="w-12 h-4 bg-dark-200 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between items-center h-20'>
      </div>
      <div className='flex flex-col justify-between items-center h-20 text-dark-200'>
        <div className='flex content-center items-center size-10 rounded-md shadow-md bg-dark-500 animate-bounce'>
        <Favorite w={30} h={30} fill={"transparent"} className=" justify-self-center cent"/>
        </div>
        <div className="size-5 bg-dark-200 rounded-md z-10"></div>
      </div>
    </div>
          </div>

        </span>
      </div >
    </div>,

    <div className="item3 flex items-center" key={"Item 3"}>
      <div className='grid w-full lg:w-[860px] h-96 justify-center'>
        <h1 className='text-balance text-center font-semibold text-2xl content-center'>¡Comparte!</h1>
        <p className='text-balance text-center text-xl max-w-96'>Comparte cualquier herramienta o recurso gratuito que encuentres en la web y ayuda a otros a usuarios.</p>
        <div className=" justify-self-center">
          <span className="w-52 rounded-md flex gap-x-4 p-2 content-center justify-center dark:bg-dark-300 bg-dark-100">
            <div><Plus /></div>
            <div className="justify-self-center">Compartir</div>
          </span>
        </div>
      </div >
    </div>,
    
    <div className="item3 flex items-center" key={"Item 4"}>
    <div className='grid w-full lg:w-[860px] h-96 justify-center'>
      <h1 className='text-balance text-center font-semibold text-2xl content-center'>Descarga la extensión</h1>
      <p className='text-balance text-center text-xl max-w-96'>y accede aún más rápido a tus favoritos</p>
      <div className=" justify-self-center">
        <Link href={"https://github.com/NPirizSmith/DEVpository/releases/tag/v1.0.0"} target="_blank" className="w-52 rounded-md flex gap-x-4 p-2 content-center justify-center dark:bg-dark-300 bg-dark-100 hover:scale-110">
          <div><Download /></div>
          <span className="justify-self-center">Descargar</span>
        </Link>
      </div>
    </div >
  </div>,
  
    <div className="item4 flex items-center" key={"Item 5"}>
      <div className='grid w-full lg:w-[860px] h-96 justify-center justify-items-center'>
        <h1 className='text-balance text-center font-semibold text-2xl content-center'>Antes de comenzar, personaliza tus preferencias</h1>
        <div className='overflow-y-auto scrollbar-thin overflow-x-hidden '>

          <Page/>

        </div>
      </div >
    </div>];

  return (

    <div className='bienvenido absolute top-0 z-50 size-full dark:bg-dark-900 bg-dark-50'>

      <Carousel items={items} />

    </div>
  );
};

export default page;


