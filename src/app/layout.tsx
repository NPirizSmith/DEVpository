import type { Metadata } from "next";
import { Inter  } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import Navbar from "./components/Navbar";
import HomeNav from "./components/HomeNav";
import MobileNav from "./components/MobileNav";
import LgNav from "./components/LgNav";
import getSession from "../../lib/getSession";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "DEVpository",
  description: "DEVpository es tu destino principal para encontrar y gestionar herramientas y recursos para el Front-End. Recopilamos las mejores herramientas y recursos disponibles en internet para desarrolladores que buscan aprender y agilizar sus habilidades en el desarrollo front-end, UX/UI, y más.",
  icons: {
    icon: "/icon.svg"
  }
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();
  
  
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
        
      <body className="w-full flex flex-col min-h-screen lg:flex-row scrollbar-thin">
    
        <Providers>
        <LgNav/>
        <div className="flex flex-col lg:flex-row lg:mt-12 w-full grow">
        <Navbar session={session}/>
        <HomeNav/>
        <div className="w-full lg:mx-56 lg:mt-12 flex grow justify-center">
        {children}
        </div>
        <MobileNav/>
        <Toaster position="bottom-right"/>
        </div>
        </Providers>
        </body>
    </html>
  );
}
