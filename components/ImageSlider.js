import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
const ImageSlider = () => {
  const sliderRef = useRef(null);
  const [slider, setSlider] = useState(null);
  const images = [
    "/1.png",
    "/2.png",
    "/3.png"
  ];
  const link = [
    "/caps",
    "/t-shirts",
    "/hoodies"
  ]
  useEffect(() => {
    if (sliderRef.current) {
      setSlider(sliderRef.current);
    }
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    autoplay:true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} ref={sliderRef} className="w-full">
      {images.map((image, index) => (
        <div key={index}>
          <Link title="Tennsy" href={link[index]}>
          <img height={100} width={100} src={image} className="w-full" alt={`Slide ${index + 1}`} />
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
