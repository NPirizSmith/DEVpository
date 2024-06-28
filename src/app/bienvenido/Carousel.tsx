'use client'

import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { ArrowL } from '../components/icons/ArrowL';
import { ArrowR } from '../components/icons/ArrowR';

interface CarouselProps {
  items: JSX.Element[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    setCurrentIndex(5);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startXRef.current !== null) {
      const deltaX = e.clientX - startXRef.current;
      if (deltaX > 100) {
        handlePrev();
        startXRef.current = null;
      } else if (deltaX < -100) {
        handleNext();
        startXRef.current = null;
      }
    }
  };

  const handleMouseUp = () => {
    startXRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current !== null) {
      const deltaX = e.touches[0].clientX - startXRef.current;
      if (deltaX > 100) {
        handlePrev();
        startXRef.current = null;
      } else if (deltaX < -100) {
        handleNext();
        startXRef.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    startXRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="carousel flex flex-col items-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute h-full flex carousel-item transition-opacity duration-500 justify-center select-none cursor-grab ${index === currentIndex ? 'opacity-100' : 'opacity-0 top-[-999999px]'}`}
        >
          <button className="mr-8 hidden lg:block" onClick={handlePrev}><ArrowL h={20} w={20} /></button>
          {item}
          <button className="ml-8 hidden lg:block" onClick={handleNext}><ArrowR h={20} w={20} /></button>
        </div>
      ))}

      {currentIndex === 5 ? (
        <Link className="text-white absolute bottom-4 p-2 rounded-md bg-accent-500 hover:bg-opacity-50 hover:scale-105" href="/">Empezar</Link>
      ) : (
        <button className="text-white absolute bottom-4 p-2 rounded-md bg-accent-500 hover:bg-opacity-50 hover:scale-105" onClick={handleSkip}>Saltar recorrido</button>
      )}

      <div className='flex absolute bottom-16 gap-x-2 justify-center'>
        {items.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`size-3 rounded-full ${index === currentIndex ? 'active-dot bg-dark-200' : 'dot bg-dark-400'}`}></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
