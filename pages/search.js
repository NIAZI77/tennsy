import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "@/components/Card";

const SearchPage = ({ addToCart }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async (searchQuery) => {
    try {
      const response = await fetch("/api/getProducts");
      const data = await response.json();

      if (Array.isArray(data)) {
        // Filter products based on the search query
        const filtered = data.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const { s } = router.query;
    if (s) {
      setSearchQuery(s);
      fetchProducts(s);
    }
  }, [router.query]);

  useEffect(() => {}, [filteredProducts]);
  return (
    <>
      <div>
        <h1 className="text-center pt-8 font-bold text-3xl">Search Results For: {searchQuery}</h1>
      </div>
      <div className="flex items-center justify-between flex-wrap md:mx-4 mx-auto">
        {fetchProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Card
              key={index}
              image={product.images[0]}
              title={product.title}
              discount={product.discountPercentage}
              price={product.price}
              addToCart={addToCart}
              productUrl={`/product?s=${product.id}`}
            />
          ))
        ) : (
          <div className="h-[70vh] w-screen flex items-center justify-center ">
            {" "}
            <img src="loading.webp" alt="loading..." />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
