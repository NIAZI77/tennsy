import React, { useState } from "react";

export function ImageGallery({ images }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="grid gap-4 md:max-w-[40vw] px-4">
      <div className="flex items-center justify-center md:h-[360px] h-60 bg-slate-300 border-slate-500 border-2  rounded p-4">
        <img
          className="w-full max-h-full rounded-lg object-contain object-center"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((imgelink, index) => (
          <div
            key={index}
            className="bg-slate-300 border-slate-500 border-2  rounded flex items-center justify-center p-2"
          >
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-20 max-w-ful max-h-full cursor-pointer rounded-lg object-cover object-center "
              alt="product Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
