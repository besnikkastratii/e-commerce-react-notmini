import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: 'block', color: 'black', fontSize: '32px' }} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: 'block', color: 'black', fontSize: '32px'}} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};


const ImageSlider = ({ images, handleCategoryClick }) => {
  // eslint-disable-next-line
  const [selectedCategory, setSelectedCategory] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Set arrows to true to show navigation arrows
    prevArrow: <SamplePrevArrow />, // Replace with your custom previous arrow component
    nextArrow: <SampleNextArrow />, // Replace with your custom next arrow component
    autoplay: true,
    autoplaySpeed: 6000,
    adaptiveHeight: true, // Adjusts the height of the slider based on the current slide
    beforeChange: (current, next) => setSelectedCategory(images[next].category), // Update the selected category before the slide changes
    afterChange: (index) => setSelectedCategory(images[index].category), // Update the selected category after the slide changes
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
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
