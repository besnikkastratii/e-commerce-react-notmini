import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images, handleCategoryClick }) => {
  // eslint-disable-next-line
  const [selectedCategory, setSelectedCategory] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
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
