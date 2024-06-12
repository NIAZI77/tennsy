import "@/styles/globals.css";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, size) => {
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += quantity;
    } else {
      const newProduct = {
        id: product.id,
        title: product.title,
        discountPercentage: product.discountPercentage,
        image: product.images[0],
        size: size,
        price: product.price,
        quantity: quantity,
      };
      existingCart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.svg" type="image/svg" />
        <title>
          Express Your Attitude with Exclusive T-Shirt Designs - Tennsy
        </title>
        <meta
          name="description"
          content="Shop exclusive t-shirt designs that speak volumes about your attitude. Explore trending styles, recent launches, and best sellers at Tennsy."
        />
        <link rel="canonical" href="https://tennsy.vercel.app/" />
        <meta
          name="description"
          content="Shop exclusive t-shirt designs that speak volumes about your attitude. Explore trending styles, recent launches, and best sellers at Tennsy."
        />
        <meta
          property="og:title"
          content="Express Your Attitude with Exclusive T-Shirt Designs - Tennsy"
        />
        <meta
          property="og:description"
          content="Shop exclusive t-shirt designs that speak volumes about your attitude. Explore trending styles, recent launches, and best sellers at Tennsy."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://tennsy.vercel.app/logo.svg"
        />
        <meta property="og:url" content="https://tennsy.vercel.app/" />
        <meta property="og:site_name" content="Tennsy" />
        <meta
          property="twitter:title"
          content="Express Your Attitude with Exclusive T-Shirt Designs - Tennsy"
        />
        <meta
          property="twitter:description"
          content="Shop exclusive t-shirt designs that speak volumes about your attitude. Explore trending styles, recent launches, and best sellers at Tennsy."
        />
        <meta property="twitter:type" content="website" />
        <meta
          property="twitter:image"
          content="https://tennsy.vercel.app/ltwittero.svg"
        />
        <meta property="twitter:url" content="https://tennsy.vercel.app/" />
        <meta property="twitter:site_name" content="Tennsy" />
      </Head>
      <Navbar />
      <div className="md:max-w-[calc(100vw-15px)] w-screen min-h-screen py-16 overflow-x-hidden">
        <Component addToCart={addToCart} cart={cart} {...pageProps} />
      </div>
      <Footer />
    </>
  );
}