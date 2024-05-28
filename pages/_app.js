import "@/styles/globals.css";
import React, { useState } from "react";
import Head from "next/head";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, size) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product already exists, update its quantity
      const updatedCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // Product does not exist, add it to the cart
      const updatedCart = [...cart, { ...product, quantity, size }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.svg" type="image/svg" />
        <title>Wear Your Atitude - Tennsy</title>
        <meta
          name="description"
          content="Shop exclusive t-shirt designs that speak volumes about your attitude. Explore trending styles, recent launches, and best sellers at Tennsy."
        />
        <link rel="canonical" href="https://tennsy.vercel.app/" />
        <meta name="description" content="Shop exclusive t-shirt designs that speak volumes about your attitude. Explore trending styles, recent launches, and best sellers at Tennsy." />
        <meta property="og:title" content="Wear Your Attitude - Tennsy" />
        <meta property="og:description" content="Shop exclusive t-shirt designs that speak volumes about your attitude. Explore trending styles, recent launches, and best sellers at Tennsy." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tennsy.vercel.app/logo.svg" />
        <meta property="og:url" content="https://tennsy.vercel.app/" />
        <meta property="og:site_name" content="Tennsy" />
      </Head>
      <Navbar />
      <div className="md:max-w-[calc(100vw-15px)] w-screen min-h-screen py-16 overflow-x-hidden">
        <Component addToCart={addToCart} cart={cart} {...pageProps} />;
      </div>
      <Footer />
    </>
  );
}
