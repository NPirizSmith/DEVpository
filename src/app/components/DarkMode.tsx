'use client'

import { useTheme } from "next-themes";
import { Sun } from "./icons/Sun";
import { Moon } from "./icons/Moon";
import { ReactNode } from "react";

interface DarkModeProps {
    children: ReactNode;
  }
  
  export default function DarkMode({ children }: DarkModeProps) {
    const { setTheme, resolvedTheme } = useTheme();

    if (resolvedTheme === 'dark') {
        return <div className="cursor-pointer w-48 flex gap-x-8 lg:w-auto lg:gap-0 items-center" onClick={()=> setTheme('light')}>
            <Sun/>
            <div>{children}</div>
        </div>
    }

    if (resolvedTheme === 'light') {
        return <div className="cursor-pointer w-48 flex gap-x-8 lg:w-auto lg:gap-0 items-center" onClick={()=> setTheme('dark')}>
            <Moon/>
            <div>{children}</div>
        </div>
    }
}