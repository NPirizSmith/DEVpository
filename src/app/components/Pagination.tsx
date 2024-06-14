'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type Page = number | { type: 'ellipsis'; value: number };

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<Page[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const queryPage = searchParams.get("pagina")?.toString();
    setCurrentPage(Number(queryPage || 1));
  }, [searchParams]);

  useEffect(() => {
    const generatePages = (current: number, range: number, total: number): Page[] => {
      const from = Math.max(2, current - range);
      const to = Math.min(total - 1, current + range);
      let pages: number[] = [];
  
      for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= from && i <= to)) {
          pages.push(i);
        }
      }
      
      return insertEllipses(pages, current, total);
    };

    setPages(generatePages(currentPage, 1, totalPages));
  }, [currentPage, totalPages]);

  const insertEllipses = (pages: number[], current: number, total: number): Page[] => {
    let newPages: Page[] = [];
    let final = pages.pop();
    if (final !== undefined) {
      newPages.push(pages[0]);

      for (let i = 1; i < pages.length; i++) {
        if (pages[i] !== pages[i - 1] + 1) {
          newPages.push({
            type: 'ellipsis',
            value: pages[i - 1] + (pages[i] > pages[i - 1] + 2 ? 1 : -1)
          });
        }
        newPages.push(pages[i]);
      }

      if (final !== pages[pages.length - 1] + 1) {
        newPages.push({
          type: 'ellipsis',
          value: pages[pages.length - 1] + (final > pages[pages.length - 1] + 2 ? 1 : -1)
        });
      }

      newPages.push(final);
    }
    return newPages;
  };

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pagina", page.toString());
    replace(`${pathname}?${params.toString()}`);
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex self-center py-4'>
      <button className='size-10 dark:bg-dark-400 rounded-md' onClick={handlePrevPage} disabled={currentPage === 1}>{'<'}</button>
      <div className='px-4'>
        {pages.map((page, index) => (
          <button
            key={index}
            className={`size-10 ${typeof page === 'number' && currentPage === page ? "bg-dark-200 dark:bg-dark-400 rounded-full" : ""}`}
            onClick={() => typeof page === 'number' ? onPageChange(page) : onPageChange(page.value)}
            disabled={typeof page === 'number' ? currentPage === page : currentPage === page.value}
          >
            {typeof page === 'number' ? page : '...'}
          </button>
        ))}
      </div>
      <button className='size-10 dark:bg-dark-400 rounded-md' onClick={handleNextPage} disabled={currentPage === totalPages}>{'>'}</button>
    </div>
  );
};

export default Pagination;
