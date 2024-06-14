import React from 'react';
import Carousel from './Carousel';
import { Favorite } from '../components/icons/Favorite';
import { Pending } from '../components/icons/Pending';
import { Completed } from '../components/icons/Completed';
import { Plus } from '../components/icons/Plus';
import Page from '../preferencias/page';
import getSession from '../../../lib/getSession';

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

          <div>
            <ul className=' py-4  w-56 dark:bg-dark-500 bg-dark-100  rounded-md shadow-lg post-menu z-50'>
              <li className='flex items-center gap-2 p-2 w-full  relative text-sm'>
                <Favorite w={20} h={20} fill={'transparent'} />
                <span className={`absolute ml-8 transition-opacity self-center `}>
                  Agregar a favoritos
                </span>
              </li>
            </ul>
          </div>

        </span>
      </div >
    </div>,

    <div className="item3 flex items-center" key={"Item 3"}>
      <div className='grid w-full lg:w-[860px] h-96 justify-center'>
        <h1 className='text-balance text-center font-semibold text-2xl content-center'>¡Comparte!</h1>
        <p className='text-balance text-center text-xl max-w-96'>Comparte cualquier herramienta o recurso gratuito que encuentres en la web y ayuda a otros a usuarios .</p>
        <div className=" justify-self-center">
          <span className="w-52 rounded-md flex gap-x-4 p-2 content-center justify-center dark:bg-dark-300 bg-dark-100">
            <div><Plus /></div>
            <div className="justify-self-center">Compartir herramienta o recurso</div>
          </span>
        </div>
      </div >
    </div>,
    <div className="item4 flex items-center" key={"Item 4"}>
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


