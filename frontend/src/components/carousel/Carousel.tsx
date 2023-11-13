import React, { useState } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };
  
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="carousel flex transition-transform duration-300 ease-in-out">
        {children.map((child, index) => (
          <div
            key={index}
            className={`w-full flex-shrink-0`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-DEDE p-1 h-8 w-8 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-DEDE p-1 h-8 w-8 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Carousel;
