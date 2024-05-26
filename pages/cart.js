import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // State to hold subtotal value
  const shippingThreshold = 2999; // Purchase threshold for free shipping
  const shippingFee =
    cart.length === 0 ? 0 : subtotal >= shippingThreshold ? 0 : 199; // Updated shipping fee calculation

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const subTotalValue = calculateSubtotal();
    setSubtotal(subTotalValue);
    localStorage.setItem("subtotal", subTotalValue); // Store subtotal in local storage
  }, [cart]); // Recalculate subtotal whenever cart changes

  const updateCartQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const incrementQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        const discountedTotal =
          item.discountPercentage > 0
            ? itemTotal - (itemTotal * item.discountPercentage) / 100
            : itemTotal;
        return acc + discountedTotal;
      }, 0)
      .toFixed(2);
  };

  // Calculate total including subtotal and shipping fee
  const total = parseInt(subtotal) + shippingFee;

  return (
    <div className="h-screen bg-gray-100 pt-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="rounded-lg md:w-2/3 max-h-[70vh] overflow-auto">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className="justify-between mb-6 rounded-lg bg-white md:py-0 pt-12 pb-2 px-6 shadow-md relative sm:flex sm:justify-start"
              >
                <span>
                  {item.discountPercentage > 0 && (
                    <span className="bg-slate-500 text-white px-3 font-bold absolute top-2 right-5 rounded-2xl">
                      {item.discountPercentage}% OFF
                    </span>
                  )}
                </span>

                <img
                  src={item.images[0]}
                  className="w-full rounded-lg sm:w-40 object-contain"
                  alt={item.title}
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between sm:items-center md:min-h-44">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900 md:text-left text-center">
                      {item.title}
                    </h2>
                  </div>
                  <div className="mt-1 flex justify-between im sm:space-y-1 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center font-semibold border-gray-100 py-1 ">
                      <span
                        onClick={() => decrementQuantity(item.id)}
                        className="cursor-pointer font-bold rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-slate-500 hover:text-slate-50 "
                      >
                        -
                      </span>
                      <span className="text-center w-6">{item.quantity}</span>
                      <span
                        onClick={() => incrementQuantity(item.id)}
                        className="font-bold cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-slate-500 hover:text-slate-50"
                      >
                        +
                      </span>
                    </div>
                    <span className="px-2 h-full mt-2 ml-4 bg-slate-600 font-bold text-white"> {item.size}</span>
                    <div className="flex items-center w-full md:justify-start justify-around">
                      <p className="text-sm md:relative md:right-5">
                        PKR
                        {parseInt(
                          item.price * item.quantity -
                            (item.discountPercentage > 0
                              ? (item.price *
                                  item.quantity *
                                  item.discountPercentage) /
                                100
                              : 0)
                        )}
                      </p>
                      <MdDelete
                        onClick={() => removeFromCart(item.id)} // Call removeFromCart function with item id
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="font-bold text-3xl my-10 text-center">
              Cart Is Empty!
            </p>
          )}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">PKR {parseInt(subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">
              PKR {shippingFee}
              {shippingFee === 0 && cart.length > 0 ? "(Free)" : ""}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold text-right">PKR {total}</p>
              <p className="text-sm text-gray-700">
                Free shipping on PKR 2999+ Purchase
              </p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-slate-500 py-1.5 font-medium text-slate-50 hover:bg-slate-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
