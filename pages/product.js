import React, { useEffect, useState } from "react";
import { ImageGallery } from "@/components/imageGallery";
import { useRouter } from "next/router";
import { FaCartArrowDown } from "react-icons/fa"; // Fixed import
import Product404 from "@/components/product404";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = ({ addToCart }) => {
  const router = useRouter();
  const { s } = router.query;
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // State to track selected size
  const [productNotFound, setProductNotFound] = useState(false); // State to track product not found


  const showToastMessage = () => {
    toast.success("Product Added To Cart");
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch data if `s` is defined
        if (s) {
          const response = await fetch("/api/getProducts");
          const cartItems = await response.json();
          const selectedItem = cartItems.find((element) => element.id === s);
          if (selectedItem) {
            setItem(selectedItem);
            setSelectedSize(selectedItem.sizes[0]);
          } else {
            setProductNotFound(true); // Set product not found state
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [s]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      {item !== null && !productNotFound ? (
        <>
              <ToastContainer />

          <Head>
            <title>{item.title} - Tennsy</title>
          </Head>
          <div className="md:flex md:items-center md:justify-around">
            <div className="md:py-10 py-4 mx-auto">
              <ImageGallery images={item.images} />
            </div>
            <div className="bg-slate-200 md:w-[40%] md:mx-auto relative md:p-10 p-4">
              {item.discountPercentage > 0 && (
                <span className="bg-slate-600 rounded-2xl text-white px-3 py-1 absolute top-5 right-5">
                  {" "}
                  {item.discountPercentage} % OFF
                </span>
              )}
              <div className="md:mt-4 mt-10 px-5 pb-5">
                <h1 className="text-4xl tracking-tight font-bold text-slate-900 select-text">
                  {item.title}
                </h1>
                <div className="flex items-center justify-between py-2">
                  <p>
                    <span className="text-lg font-bold text-slate-900">
                      PKR
                      {item.discountPercentage > 0
                        ? parseInt(
                            item.price -
                              (item.discountPercentage * item.price) / 100
                          )
                        : item.price}
                    </span>
                    {item.discountPercentage > 0 && (
                      <span className="text-sm text-slate-900 line-through">
                        PKR{item.price}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center justify-center font-semibold border-gray-100">
                    <span
                      onClick={decrementQuantity}
                      className="cursor-pointer rounded-l font-bold bg-gray-100 py-1 px-3.5 duration-100 hover:bg-slate-500 hover:text-slate-50 "
                    >
                      -
                    </span>
                    <span className="text-center px-2"> {quantity} </span>{" "}
                    {/* Fixed: item.display quantity from state */}
                    <span
                      onClick={incrementQuantity}
                      className="cursor-pointer rounded-r font-boldsazz bg-gray-100 py-1 px-3 duration-100 hover:bg-slate-500 hover:text-slate-50"
                    >
                      +
                    </span>
                  </div>
                  <div className="flex space-x-3 my-1">
                    {item.sizes.map((size, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => handleSizeSelect(size)}
                          className={`px-2 border-2 ${
                            selectedSize === size
                              ? "border-slate-600 bg-slate-600 text-white"
                              : "border-slate-400"
                          } cursor-pointer`}
                        >
                          {size}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  className="flex items-center justify-center w-full rounded-md bg-slate-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700"
                  onClick={() => {
                    addToCart(item, quantity, selectedSize); 
                    showToastMessage()
                  }}
                >
                  <FaCartArrowDown />
                  <span className="pl-2">Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : productNotFound ? ( // Conditional rendering for product not found
        <div>
          <Product404 />
        </div>
      ) : (
        <div className="h-[70vh] w-screen flex items-center justify-center ">
          {" "}
          <img src="loading.webp" alt="loading..." />
        </div>
      )}
    </>
  );
};

export default ProductPage;
