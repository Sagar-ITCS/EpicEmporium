import { useState, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";

function Images({ images, mainImage, setMainImage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setMainImage(images[currentIndex - 1]);
    }
  };

  const handleNextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setMainImage(images[currentIndex + 1]);
    }
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setMainImage(images[index]);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current - touchEndXRef.current > 50) {
      // Swiped left
      handleNextSlide();
    }

    if (touchStartXRef.current - touchEndXRef.current < -50) {
      // Swiped right
      handlePrevSlide();
    }
  };

  return (
    <div className="lg:w-1/2 w-full lg:h-auto md:flex gap-x-4">
      <div
        className="relative lg:order-last w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, i) => (
            <img
              key={i}
              alt="ecommerce"
              className="rounded w-full flex-shrink-0"
              src={image}
            />
          ))}
        </div>
        <button
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-2 rounded-full"
        >
          <BiArrowBack />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-2 rounded-full"
        >
          <BiArrowBack className="transform rotate-180" />
        </button>
      </div>

      {/* Preview images */}
      <div className="flex gap-x-2 md:flex-col gap-y-2 mt-4 lg:order-first">
        {images.map((image, i) => (
          <img
            key={i}
            alt="ecommerce"
            className={`object-cover object-center rounded w-20 h-20 p-2 cursor-pointer ${
              mainImage === image
                ? "border-2 border-yellow-400"
                : "border-2 border-gray-200"
            }`}
            src={image}
            onClick={() => handleImageClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Images;
