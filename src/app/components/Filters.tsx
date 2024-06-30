"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowB } from "./icons/ArrowB";
import { Filter } from "./icons/Filter";
import { X } from "./icons/X";

type Tag = {
  id: number;
  name: string;
};

type Difficulty = {
  id: number;
  name: string;
};

function Filters() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState<string | undefined | null>("");
  const [search, setSearch] = useState("");
  const [searchDiff, setSearchDiff] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [order, setOrder] = useState<string | undefined | null>("");
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }
    const queryTag = searchParams.get("tag")?.toString();
    const queryOrder = searchParams.get("orden")?.toString();
    setSelectedTag(queryTag);
    setOrder(queryOrder);
    fetchTags();
  }, [searchParams]);


  function handleOpenFilter() {
    setIsOpenFilter(!isOpenFilter)
  }

  const handleOrder = (order: string) => {
    const params = new URLSearchParams(searchParams);
    setOrder(order);
    params.set("orden", order);
    params.delete("pagina")
    replace(`${pathname}?${params.toString()}`);
  };


  const handleTagSelect = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    setSelectedTag(tag);
    params.set("tag", tag);
    params.delete("pagina")
    replace(`${pathname}?${params.toString()}`);
  };



  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

 
  const handleToggleDropdownOrder = () => {
    setIsOpenOrder(!isOpenOrder);
  };
  
  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    setSearch("");
    params.delete("tag");
    setSelectedTag(null);
    replace(`${pathname}?${params.toString()}`);
  };


  const handleClearFilterOrder = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("orden");
    setOrder(null);
    replace(`${pathname}?${params.toString()}`);
    setIsOpenOrder(false);
  };


  const filteredTags = tags.filter((tag: Tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-end right-0 absolute">
      <button className="lg:hidden -top-[2rem] px-4 flex gap-x-1 items-center absolute" onClick={handleOpenFilter}><Filter w={20} h={20} /></button>
      {isOpenFilter && 
        <div className="lg:hidden dark:bg-dark-900 bg-dark-50 w-screen h-screen top-0 fixed select-none z-50">
        <span onClick={handleOpenFilter} className="relative flex justify-end cursor-pointer p-2"><X/></span>
<div className="flex flex-col items-center content-center asdfasdf">
        <span className="flex font-semibold w-48 justify-between mb-8">Filtros <Filter h="24" w="24"/></span>
        <div className="w-48">
           <div className={`flex rounded-md h-10 justify-between`}>
            <div
              className="flex w-48 cursor-pointer items-center justify-between"
              onClick={handleToggleDropdownOrder}>
              <button
                className='flex overflow-hidden  items-center text-nowrap px-2 font-semibold'
              >
              Ordenar
              </button>
            <div className={`transition-all transform origin-center ${isOpenOrder && "-rotate-180"}`}><ArrowB h={28} w={28} fill={"currentColor"} /></div>
            </div>
          </div>
          {isOpenOrder && (
            <div>
              <ul>
                <li
                  className="hover:bg-dark-200 dark:hover:bg-dark-400 ps-4 pe-4"
                  key={1}
                  onClick={() => handleClearFilterOrder()}>
                  Predeterminado
                </li>

                <li
                  className={`hover:bg-dark-200 dark:hover:bg-dark-400 ps-4 pe-4  ${order === "mejor-calificado" && "border-l-2"}`}
                  key={2}
                  onClick={() => handleOrder("mejor-calificado")}>
                  Mejor calificado
                </li>
              
              </ul>
            </div>
          )}
        </div>

        <div
          className="justify-between w-48 cursor-pointer">
          <div className={`flex rounded-md h-10 justify-between`}>
            <div
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={handleToggleDropdown}>
              <button
                className='flex overflow-hidden  items-center text-nowrap px-2 font-semibold'
              >
              Tag
              </button>
            <div className={`transition-all transform origin-center ${isOpen && "-rotate-180"}`}><ArrowB h={28} w={28} fill={"currentColor"} /></div>
            </div>
          </div>
          {isOpen && (

<div className=" overflow-y-auto mb-10 min-h-min h-48 max-h-56" style={{scrollbarWidth:"thin"}}>
<ul>
<li
                    className={`flex hover:bg-dark-200 dark:hover:bg-dark-400 ps-6 pe-4 text-nowrap cursor-pointer`}
                  
                  >
                   <span   onClick={handleClearFilter}>Todos</span>
                  </li>
                {tags.map((tag: Tag) => (
                  <li
                    className={`flex hover:bg-dark-200 dark:hover:bg-dark-400 ps-6 pe-4 text-nowrap cursor-pointer ${selectedTag === tag.name && "border-l-2"}`}
                    key={tag.id}
                  
                  >
                   <span   onClick={() => handleTagSelect(tag.name)}>{tag.name}</span>
                  </li>
                
                ))}
                
              </ul>
      </div>
            
          )}
        </div>
        </div>

      </div>}


      {/*                                             LARGE FILTERS ----------------------------------------------------------------------------------------------------------------------------------- */}


      <div className="hidden lg:flex flex-col left-0 w-56 px-4 select-none">
            <span className="flex font-semibold w-full justify-between mb-8">Filtros <Filter h="24" w="24"/></span>

        <div
          className="w-full ">
           <div className={`flex rounded-md h-10 justify-between`}>
            <div
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={handleToggleDropdownOrder}>
              <button
                className='flex overflow-hidden  items-center text-nowrap px-2 font-semibold'
              >
              Ordenar
              </button>
            <div className={`transition-all transform origin-center ${isOpenOrder && "-rotate-180"}`}><ArrowB h={28} w={28} fill={"currentColor"} /></div>
            </div>
          </div>
          {isOpenOrder && (
            <div>
              <ul>
                <li
                  className="ps-4 pe-4 hover:scale-x-105 cursor-pointer"
                  key={1}
                  onClick={() => handleClearFilterOrder()}>
                  Predeterminado
                </li>

                <li
                  className={`ps-4 pe-4 hover:scale-x-105 cursor-pointer ${order === "mejor-calificado" && "border-l-2"}`}
                  key={2}
                  onClick={() => handleOrder("mejor-calificado")}>
                  Mejor calificado
                </li>
              
              </ul>
            </div>
          )}
        </div>

        <div
          className="justify-between w-full cursor-pointer">
          <div className={`flex rounded-md h-10 justify-between`}>
            <div
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={handleToggleDropdown}>
              <button
                className='flex overflow-hidden  items-center text-nowrap px-2 font-semibold'
              >
              Tag
              </button>
            <div className={`transition-all transform origin-center ${isOpen && "-rotate-180"}`}><ArrowB h={28} w={28} fill={"currentColor"} /></div>
            </div>
          </div>
          {isOpen && (

<div className="h-96 overflow-y-auto overflow-x-hidden mb-10" style={{scrollbarWidth:"thin"}}>
<ul>
<li
                    className={`flex ps-6 pe-4 text-nowrap cursor-pointer hover:scale-110`}
                  
                  >
                   <span   onClick={handleClearFilter}>Todos</span>
                  </li>
                {tags.map((tag: Tag) => (
                  <li
                    className={`flex ps-6 pe-4 text-nowrap cursor-pointer hover:scale-110 ${selectedTag === tag.name && "border-l-2"}`}
                    key={tag.id}
                  
                  >
                   <span   onClick={() => handleTagSelect(tag.name)}>{tag.name}</span>
                  </li>
                
                ))}
                
              </ul>
      </div>
            
          )}
        </div>

{/* 
      <div
                    className="flex items-center hover:bg-dark-200 w-min self-center dark:text-dark-900 text-dark-50 dark:hover:bg-dark-400 ps-4 pe-4 text-nowrap bg-dark-300 dark:bg-dark-50 rounded-md"
                    onClick={() => handleClearFilter()}
                  >
                    <Delete h="18" w="18"/>
                    Limpiar tags
                  </div> */}
      </div>

    </div>
  );
}

export default Filters;