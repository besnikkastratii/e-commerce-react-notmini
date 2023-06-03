import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images, handleCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true, // Adjusts the height of the slider based on the current slide
  };

  const handleSlideChange = (index) => {
    setSelectedCategory(images[index].category);
  };

  return (
    <div className="slider-container">
      <Slider {...settings} beforeChange={handleSlideChange}>
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <img src={image.src} alt={`Slide ${index}`} className="slider-image" />
            <button className="slider-button" onClick={() => handleCategoryClick(image.category)}>
              {image.category}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
