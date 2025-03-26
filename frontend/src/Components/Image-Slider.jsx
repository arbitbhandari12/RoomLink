import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function ImageSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };
  

  return (
    <div className="relative">
      <img
        src={images[currentImageIndex]}z
        className="w-full h-full max-h-[35em] object-cover rounded-lg"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-md"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-md"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}

export default ImageSlider;
