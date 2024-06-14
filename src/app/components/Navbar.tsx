'use client'


import Link from "next/link";
import DarkMode from "./DarkMode";
import { useEffect, useState } from "react";
import DefaultProfilePicture from '../../../public/default-profile-picture.jpg'
import Image from "next/image";
import { Explore } from "./icons/Explore";
import { Home } from "./icons/Home";
import { Profile } from "./icons/Profile";
import { SignOut } from "./icons/SignOut";
import { X } from "./icons/X";
import { usePathname, useSearchParams } from "next/navigation";
import { Plus } from "./icons/Plus";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Linkedin } from "./icons/Linkedin";
import { Github } from "./icons/Github";
import { Search } from "./icons/Search";
import { Session } from "../../../types";




function Navbar({ session }: { session: Session | null }) {



    const user = session?.user
    const userImageUrl = session?.user?.image || DefaultProfilePicture
    const userName = session?.user?.name
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter()
    const [searchbar, setSearchbar] = useState(searchParams.get('busqueda')?.toString() || "");

    const handleSearchChange = (event: string) => {
        if (pathname === "/explorar") {
            const params = new URLSearchParams(searchParams);
            setSearchbar(event);
            if (event) {
                params.set("busqueda", event);
            } else {
                params.delete("busqueda");

            }
            params.set('pagina', '1')


            replace(`${pathname}?${params.toString()}`);
        } else {
            const params = new URLSearchParams(searchParams);
            setSearchbar(event);
            if (event) {
                params.set("busqueda", event);
            } else {
                params.delete("busqueda");
            }
        }
    }

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="">
            <nav className="relative px-4 py-4 grid grid-flow-col justify-between items-center lg:fixed lg:top-16">
                <Link href="/" className="inline-block lg:hidden font-Bebas_Neue text-2xl mr-2">DEVpository</Link>
                <div className="flex w-auto h-10 items-center lg:hidden">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchbar}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        defaultValue={searchbar}
                        className="ps-8 h-full w-full bg-transparent dark:text-white dark:border-dark-50 border-black rounded-md focus:rounded-none focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b dark:focus:border-dark-50 focus:border-black transition-all focus:ring-transparent"
                        />
                        <Link href={`/explorar?busqueda=${searchbar}`} className="relative right-0 px-2 h-10 content-center rounded-md hover:scale-110 transition-all"><Search w={20} h={20} /></Link>
                </div>
                <div className="flex lg:hidden z-50">

                    <button className={` navbar-burger flex items-center p-3 ${isMenuOpen ? 'hidden' : 'block'}`} onClick={handleMenuToggle}>
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                    <button className={`fixed right-4 top-4 navbar-burger flex items-center p-3 z-50 ${!isMenuOpen ? 'hidden' : 'block'}`} onClick={handleMenuToggle}>
                        <X />
                    </button>
                </div>
                <div id="sidebar" className={`grid lg:hidden fixed size-full self-baseline bg-dark-100 dark:bg-dark-400 w-full z-40 transition-all transition-500 ${isMenuOpen ? 'visible-menu' : 'hidden-menu'}`}>
                    <ul className="grid pt-12 gap-y-6 self-center justify-self-center" >
                        <div className={`${user ? "grid" : "hidden"}`}>
                            <li className="justify-self-center"><Image className="rounded-full" src={userImageUrl} width={120} height={120} alt="Profile picture"></Image></li>
                            <li className="justify-self-center pt-8"><h1>{userName}</h1></li>
                            <button className={`text-dark-300 hover:text-black dark:text-dark-200 dark:hover:text-white hover:scale-110 items-center flex gap-x-1 justify-center pt-4 text-sm ${user ? "block" : "hidden"}`} onClick={() => {
                                signOut({ redirect: true });
                                handleMenuToggle()
                            }}>
                                <SignOut />
                                <p>Cerrar sesión</p>
                            </button>
                        </div>

                        <Link onClick={handleMenuToggle} className={`pb-24 underline justify-self-center ${user ? "hidden" : "grid"}`} href="/conectar">Inicia sesión o regístrate</Link>
                        <Link onClick={handleMenuToggle} href="/perfil" className={`w-24 flex gap-x-8 pt-3 ${user ? "block" : "hidden"}`}>
                            <div><Profile /></div>
                            <div className="justify-self-center">Perfil</div>
                        </Link>
                        <Link onClick={handleMenuToggle} href="/explorar" className="w-24 flex gap-x-8">
                            <div><Explore /></div>
                            <div className="justify-self-center">Explorar</div>
                        </Link>
                        <Link onClick={handleMenuToggle} href="/" className="w-24 flex gap-x-8">
                            <div><Home /></div>
                            <div className="justify-self-center" >Inicio</div>
                        </Link>
                        <DarkMode>
                            <div className="justify-self-center" >Cambiar de tema</div>
                        </DarkMode>



                    </ul>
                    <ul className="grid">
                        <li className="flex gap-x-2 pt-6 justify-self-center ">
                            <Link className="text-dark-300 hover:text-black dark:text-dark-200 dark:hover:text-white hover:scale-110" target="_blank" href="https://www.linkedin.com/in/nahuel-piriz-smith/"><Linkedin w={20} h={20} /></Link>
                            <Link className="text-dark-300 hover:text-black dark:text-dark-200 dark:hover:text-white hover:scale-110" target="_blank" href="https://github.com/NPirizSmith"><Github w={20} h={20} /></Link>
                        </li>
                    </ul>
                    <div className="grid">
                        <Link onClick={handleMenuToggle} className="justify-self-center self-center font-Bebas_Neue text-xl" href="/">DEVpository</Link>
                    </div>
                </div>

                <div className="hidden lg:block h-svh ">
                    <aside id="default-sidebar" className="relative top-0 left-0 z-40 w-52 h-full" aria-label="Sidebar">
                        <div className="h-full px-3 py-4 grow">
                            <div className="flex flex-col justify-between space-y-2 font-medium content-between h-4/5">
                                <ul>
                                    <li className={`hover:bg-dark-100 dark:hover:bg-dark-300 rounded-md ${pathname === "/" && "bg-dark-50 dark:bg-dark-400"}`}>
                                        <Link href="/" className="w-full flex gap-x-4 p-2">
                                            <div><Home /></div>
                                            <div className="justify-self-center" >Inicio</div>
                                        </Link>
                                    </li>

                                    <li className={`hover:bg-dark-100 dark:hover:bg-dark-300 rounded-md ${pathname === "/explorar" && "bg-dark-50 dark:bg-dark-400"}`}>
                                        <Link href="/explorar" className="w-full flex gap-x-4 p-2">
                                            <div><Explore /></div>
                                            <div className="justify-self-center">Explorar</div>
                                        </Link>
                                    </li>

                                    <li className={`hover:bg-dark-100 dark:hover:bg-dark-300 rounded-md ${user ? "block" : "hidden"} ${pathname.startsWith("/perfil") && "bg-dark-50 dark:bg-dark-400"}`}>

                                        <Link href="/perfil" className="w-full flex gap-x-4 p-2">
                                            <div><Profile /></div>
                                            <div className="justify-self-center">Perfil</div>
                                        </Link>

                                    </li>
                                    <li className={`hover:bg-dark-100 dark:hover:bg-dark-300 rounded-md ${user ? "block" : "hidden"} ${pathname === "/compartir" && "bg-dark-50 dark:bg-dark-400"}`}>
                                        <Link href="/compartir" className="w-full flex gap-x-4 p-2">
                                            <div><Plus /></div>
                                            <div className="justify-self-center">Compartir</div>
                                        </Link>
                                    </li>
                                    <li className={`hover:bg-dark-100 dark:hover:bg-dark-300 p-2 rounded-md ${user ? "hidden" : "grid"}`}>
                                        <Link onClick={handleMenuToggle} className="underline justify-self-center" href="/conectar">Inicia sesión o regístrate</Link>
                                        <p>¡y desbloquea todas las funcionalidades!</p>
                                    </li>
                                </ul>

                                <ul className="grid">
                                    <button className={`text-dark-300 hover:text-black dark:text-dark-200 dark:hover:text-white hover:scale-110 gap-x-1 justify-center text-sm items-end mb-8 ${user ? "flex " : "hidden"}`} onClick={() => {
                                        signOut();
                                        handleMenuToggle()
                                    }}>
                                        <SignOut />
                                        <p>Cerrar sesión</p>
                                    </button>
                                    <li><p className="text-xs text-center pt-6 text-dark-300 dark:text-dark-200">Creado por Nahuel Píriz</p></li>
                                    <li className="flex gap-x-2 pt-3 justify-self-center ">
                                        <Link className="text-dark-300 hover:text-black dark:text-dark-200 dark:hover:text-white hover:scale-110" target="_blank" href="https://www.linkedin.com/in/nahuel-piriz-smith/"><Linkedin w={20} h={20} /></Link>
                                        <Link className="text-dark-300 hover:text-black dark:text-dark-200 dark:hover:text-white hover:scale-110" target="_blank" href="https://github.com/NPirizSmith"><Github w={20} h={20} /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;