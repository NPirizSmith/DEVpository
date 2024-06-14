'use client'

import React, { useState, useEffect, useRef } from 'react';
import AddFavButton from './AddFavButton';
import DeletePostButton from './DeletePostButton';
import EditPost from './EditPost';

function PostMenu({ postId, isFavorite, favCount, authorId, userId } : {postId: string, isFavorite: boolean, favCount: number, authorId: string | null | undefined, userId: string | undefined}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div key={postId} className='relative flex' ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="z-[10] size-10 rounded-full text-xl text-center inline-flex justify-center items-center"
        type="button"
      >
        ...
      </button>

      {isDropdownOpen && (
        <div
          key={postId}
          id={postId}
          className="absolute right-0 bg-dark-100 dark:bg-dark-400 divide-y divide-gray-100 rounded-lg shadow  z-[9999] w-min "
        >
          <ul className="py-2 text-sm flex " aria-labelledby="dropdownDefaultButton">
            <li>
              <AddFavButton postId={postId} isFavorite={isFavorite} favCount={favCount} closeDropdown={closeDropdown} />
            </li>
            {authorId === userId && (
              <li className='flex'>
                <li>
                  <DeletePostButton postId={postId}/>
                </li>
                <li>
                  <EditPost postId={postId} />
                </li>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostMenu;
