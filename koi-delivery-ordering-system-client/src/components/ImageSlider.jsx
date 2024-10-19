/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style/image_slider.scss'; // Import the CSS for the spinner
import { useEffect, useState } from "react";

const ImageSlider = ({ fishInfo, images, onImageChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    afterChange: (current) => setCurrentIndex(current), // Set the current index on image change
  };

  useEffect(() => {
    if (fishInfo) {
      if (onImageChange && fishInfo[currentIndex]) {
        // eslint-disable-next-line react/prop-types
        const currentFish = fishInfo[currentIndex]; // Get the fish id based on current index
        onImageChange(currentFish); // Send the fish id to the parent component
      }
    }
  }, [currentIndex]);

  return (
    <div className="image-slider">
      {images && images.length > 1 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>
      ) : (
        <img src={images[0]} alt={`Slide ${images[0]}`} />
      )}
    </div>
  );
};

export default ImageSlider;