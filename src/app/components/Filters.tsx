"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowB } from "./icons/ArrowB";
import { Certificate } from "./icons/Certificate";
import { Search } from "./icons/Search";
import { Filter } from "./icons/Filter";

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
    };

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
    setIsOpenOrder(false);
    replace(`${pathname}?${params.toString()}`);
  };


  const handleTagSelect = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    setSelectedTag(tag);
    params.set("tag", tag);
    replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };



  const handleToggleDropdown = () => {
    setIsOpenOrder(false);
    setIsOpen(!isOpen);
  };

 
  const handleToggleDropdownOrder = () => {
    setIsOpen(false);
    setIsOpenOrder(!isOpenOrder);
  };
  
  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    setSearch("");
    params.delete("tag");
    setSelectedTag(null);
    replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
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
    <div className="flex px-6 w-full flex-wrap justify-end">
      <button className="lg:hidden top-[4.5rem] flex gap-x-1 items-center absolute" onClick={handleOpenFilter}><Filter w={20} h={20} /></button>
      {isOpenFilter && <div className="flex justify-center items-center absolute size-full bg-dark-900 bg-opacity-80 z-50 left-0 top-0"><div className="lg:hidden absolute z-[99] w-10/12 h-4/5 bg-dark-100 dark:bg-dark-900">
        <span onClick={handleOpenFilter} className="relative flex justify-end cursor-pointer p-2">x</span>
        <div className="w-full flex flex-col gap-x-2 justify-center gap-y-12 items-center mt-2">
       

          <div
            className=" w-40 justify-between"

          >
      
           
          </div>
          <div

            className="justify-between w-40 cursor-pointer">
            <div className={`flex bg-dark-50 dark:bg-dark-300 rounded-md h-10 justify-evenly hover:bg-dark-200 dark:hover:bg-dark-400 ${order && "bg-dark-500 hover:bg-dark-300 text-dark-50 dark:bg-dark-50 dark:text-dark-900 dark:hover:bg-dark-300 dark:hover:text-dark-50"}`}>
              <button
                className="flex overflow-hidden w-full items-center justify-center text-nowrap"
                onClick={handleToggleDropdownOrder}
              >
                {order === "mejor-calificado"
                  ? "Mejor calificado"
                      : "Ordenar"}
                {!order && <span className="pl-2"><ArrowB h={28} w={28} fill={"currentColor"} /></span>}
              </button>
              {order && (
                <button className="clear-filter p-2" onClick={handleClearFilterOrder}>
                  <span className="clear-icon">x</span>
                </button>
              )}
            </div>
            {isOpenOrder && (
              <div className="dropdown absolute bg-dark-50 dark:bg-dark-300 max-h-32 overflow-y-scroll z-10 shadow-md shadow-black w-[inherit]">
                <ul>
                  <li
                    className="hover:bg-dark-200 dark:hover:bg-dark-400 ps-4 pe-4"
                    key={1}
                    onClick={() => handleClearFilterOrder()}>
                    Predeterminado
                  </li>

                  <li
                    className="hover:bg-dark-200 dark:hover:bg-dark-400 ps-4 pe-4"
                    key={2}
                    onClick={() => handleOrder("mejor-calificado")}>
                    Mejor calificado
                  </li>
       
                </ul>
              </div>
            )}
          </div>

          <div
            className="justify-between w-40 cursor-pointer">
            <div className={`flex bg-dark-50 dark:bg-dark-300 rounded-md gap-x-2 h-10 justify-evenly hover:bg-dark-200 dark:hover:bg-dark-400 ${selectedTag && "bg-dark-500 hover:bg-dark-300 text-dark-50 dark:bg-dark-50 dark:text-dark-900 dark:hover:bg-dark-300 dark:hover:text-dark-50"}`}>
              <div
                className="flex w-full cursor-pointer items-center justify-center"
                onClick={handleToggleDropdown}>
                <button
                  className="flex overflow-hidden  items-center text-nowrap max-w-28"
                >
                  {selectedTag ? selectedTag : "Tag"}
                </button>
                {!selectedTag && <span className="pl-2 content-center"><ArrowB h={28} w={28} fill={"currentColor"} /></span>}
              </div>
              {selectedTag && (
                <button className="clear-filter p-2 self-center" onClick={handleClearFilter}>
                  <span className="clear-icon">x</span>
                </button>
              )}
            </div>
            {isOpen && (
              <div className="dropdown absolute bg-dark-50 max-h-32 overflow-y-scroll dark:bg-dark-300 z-10 shadow-md shadow-black w-[inherit]">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Buscar tag"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="ps-4 w-full bg-transparent dark:text-white dark:border-dark-50 border-black border-t-0 border-x-0 focus:border-b dark:focus:border-dark-50 focus:border-black transition-all focus:ring-transparent"
                    />
                </div>
                <ul>
                  {filteredTags.map((tag: Tag) => (
                    <li
                      className="hover:bg-dark-200 dark:hover:bg-dark-400 ps-4 pe-4"
                      key={tag.id}
                      onClick={() => handleTagSelect(tag.name)}
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>



        </div>
      </div>
      </div>}


      {/*                                             LARGE FILTERS ----------------------------------------------------------------------------------------------------------------------------------- */}

      <div className="hidden lg:flex w-full gap-x-2 justify-center mb-12">



        <div
          className="justify-between"

        >
   
        </div>
        <div
          className="w-max justify-between">
          <div className={`flex bg-dark-50 dark:bg-dark-300 rounded-md h-10 justify-evenly hover:bg-dark-200 dark:hover:bg-dark-400 ${order && "bg-dark-500 hover:bg-dark-300 text-dark-50 dark:bg-dark-50 dark:text-dark-900 dark:hover:bg-dark-300 dark:hover:text-dark-50"}`}>
            <button
              className="flex text-nowrap overflow-hidden items-center px-2"
              onClick={handleToggleDropdownOrder}
            >
              {order === "mejor-calificado"
                ? "Mejor calificado"
                    : "Ordenar"}
              {!order && <span className="pl-2"><ArrowB h={28} w={28} fill={"currentColor"} /></span>}
            </button>
            {order && (
              <button className="clear-filter p-2" onClick={handleClearFilterOrder}>
                <span className="clear-icon">x</span>
              </button>
            )}
          </div>
          {isOpenOrder && (
            <div className="dropdown absolute bg-dark-50 dark:bg-dark-300 max-h-32 z-10 shadow-md shadow-black w-[inherit]">
              <ul>
                <li
                  className="hover:bg-dark-200 dark:hover:bg-dark-400 ps-4 pe-4"
                  key={1}
                  onClick={() => handleClearFilterOrder()}>
                  Predeterminado
                </li>

                <li
                  className="hover:bg-dark-200 dark:hover:bg-dark-400 ps-4 pe-4"
                  key={2}
                  onClick={() => handleOrder("mejor-calificado")}>
                  Mejor calificado
                </li>
              
              </ul>
            </div>
          )}
        </div>

        <div
          className="justify-between w-min cursor-pointer">
          <div className={`flex bg-dark-50 dark:bg-dark-300 rounded-md h-10 justify-evenly hover:bg-dark-200 dark:hover:bg-dark-400 ${selectedTag && "bg-dark-500 hover:bg-dark-300 text-dark-50 dark:bg-dark-50 dark:text-dark-900 dark:hover:bg-dark-300 dark:hover:text-dark-50"}`}>
            <div
              className="flex w-full cursor-pointer items-center justify-center"
              onClick={handleToggleDropdown}>
              <button
                className="flex overflow-hidden  items-center text-nowrap justify-center px-2"
              >
                {selectedTag ? selectedTag : "Tag"}
              </button>
              {!selectedTag && <span className="pl-2"><ArrowB h={28} w={28} fill={"currentColor"} /></span>}
            </div>
            {selectedTag && (
              <button className="clear-filter p-2 self-center" onClick={handleClearFilter}>
                <span className="clear-icon">x</span>
              </button>
            )}
          </div>
          {isOpen && (
            <div className="dropdown absolute bg-dark-50 dark:bg-dark-300 max-h-32 overflow-y-scroll z-10 shadow-md shadow-black w-[inherit]">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Buscar tag"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="ps-4 w-full bg-transparent dark:text-white dark:border-dark-50 border-black border-t-0 border-x-0 focus:border-b dark:focus:border-dark-50 focus:border-black transition-all focus:ring-transparent"
                />
              </div>
              <ul>
                {filteredTags.map((tag: Tag) => (
                  <li
                    className="hover:bg-dark-200 dark:hover:bg-dark-400 ps-4 pe-4"
                    key={tag.id}
                    onClick={() => handleTagSelect(tag.name)}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>


    </div>
  );
}

export default Filters;
