import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ images }) => {
  const sliderRef = useRef(null);
  const [slider, setSlider] = useState(null);

  useEffect(() => {
    if (sliderRef.current) {
      setSlider(sliderRef.current);
    }
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2
        }
      }]
  };

  return (
    <Slider {...settings} ref={sliderRef} className="mx-auto w-[80vw]">
      {images.map((image, index) => (
        <div key={index} className="px-1">
          <img width={100} height={100} src={image} className="w-full bg-slate-200 py-2" alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
