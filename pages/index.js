import React from "react";
import ImageSlider from "@/components/ImageSlider";
import ProductSlider from "@/components/ProductSlider";
const Home = () => {
  const images = ["/1.png", "/2.png", "/3.png"];
  return (
    <div>
      <div
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)" }}
        className="bg-slate-600 md:w-[calc(100vw-15px)] w-screen h-[calc(100vh-70px)] max-h-[90vh] md:!max-h-[600px] -z-10 absolute top-0"
      ></div>
      <div className="flex items-center justify-around md:flex-row flex-col-reverse min-h-[60vh] md:min-h-[400px]">
        <div className="content w-screen md:w-1/2 text-white text-center">
          <h1 className="font-bold  md:text-4xl text-2xl px-2 md:p-0 md:py-2 ">
            Our Exclusive Designs & Collections
          </h1>
          <p className="opacity-60 md:pb-0 pb-8">
            Express Your Attitude with Trendy T-shirt Designs
          </p>
        </div>
        <div className="img sm:w-1/2 md:w-1/4 w-10/12">
          <ImageSlider />
        </div>
      </div>
      <div className="Most-popular md:mt-[15%] mt-[50%] font-bold">
        <h2 className="md:text-3xl text-2xl text-center py-4">Trending</h2>
        <ProductSlider images={images} />
        <h2 className="md:text-3xl text-2xl text-center py-4 my-8">
          Recent Launch
        </h2>
        <ProductSlider images={images} />
        <h2 className="md:text-3xl text-2xl text-center py-4 my-8">
          Best Seller
        </h2>
        <ProductSlider images={images} />
      </div>
    </div>
  );
};

export default Home;
