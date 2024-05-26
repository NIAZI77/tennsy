import React from "react";
import Link from "next/link";

const ProductCard = ({ image, title, discount = 0, price, productUrl }) => {
  return (
    <div className="my-6">
      <Link title="Tennsy" href={productUrl}>
        <div className="product-card bg-white h-[300px] py-3 rounded-lg shadow-md w-72 flex items-center justify-center flex-col">
          {discount > 0 && (
            <span className="card-tag bg-slate-600 relative right-[90px] bottom-1 px-3 py-1 text-white rounded">
              {discount}% OFF
            </span>
          )}
          <div className="card-header h-40 w-full py-1 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="max-h-36 w-full mx-auto object-contain rounded scale-110"
            />
          </div>
          <div className="card-body text-center">
            <h2 className="product-title text-gray-700 font-bold mt-4 text-lg">
              {title}
            </h2>
            <div className="flex items-center justify-center">
              <h3 className="product-price text-xl text-gray-700 font-bold">
                PKR
                {discount > 0
                  ? parseInt(price - (discount * price) / 100)
                  : price}
              </h3>
              {discount > 0 && (
                <p className="text-sm text-gray-700 line-through">
                  PKR {price}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
