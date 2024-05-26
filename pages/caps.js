import React, { useState, useEffect } from "react";
import Card from "@/components/Card";

const Caps = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getProducts");
        const jsonData = await response.json();
        const filteredProducts = jsonData.filter(
          (product) => product.category === "cap"
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <>
      <div>
        <h1 className="text-center pt-8 font-bold text-3xl">Caps</h1>
      </div>
      <div className="flex items-center md:justify-around justify-center flex-wrap md:mx-4 mx-auto">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Card
                image={hoveredProduct === product.id ? product.images[1] : product.images[0]}
                title={product.title}
                discount={product.discountPercentage}
                price={product.price}
                addToCart={addToCart}
                productUrl={`/product?s=${product.id}`}
              />
            </div>
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

export default Caps;
