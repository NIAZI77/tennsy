import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { CldUploadWidget } from "next-cloudinary";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["authToken"]);
  const router = useRouter();
  const [uploadDisabled, setUploadDisabled] = useState(false);

  const inputFields = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Title",
    },
    { label: "Price", name: "price", type: "number", placeholder: "Price" },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      placeholder: "Quantity",
    },
    {
      label: "Discount Percentage",
      name: "discountPercentage",
      type: "number",
      placeholder: "Discount Percentage",
    },
    { label: "Color", name: "color", type: "text", placeholder: "Color" },
    {
      label: "Category",
      name: "category",
      type: "text",
      placeholder: "Category",
    },
  ];

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    quantity: "",
    discountPercentage: "",
    color: "",
    category: "",
    sizes: [],
    images: [],
  });

  useEffect(() => {
    if (!cookies.authToken) {
      router.replace("/admin/login");
    } else {
      setLoading(false);
    }
  }, [cookies.authToken, router]);

  useEffect(() => {
    setProductData({ ...productData, images });
    if (images.length >= 4) {
      setUploadDisabled(true);
    } else {
      setUploadDisabled(false);
    }
  }, [images]);

  const gSizes = ["S", "M", "L", "XL", "XXL"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setProductData({
          ...productData,
          sizes: [...productData.sizes, value],
        });
      } else {
        setProductData({
          ...productData,
          sizes: productData.sizes.filter((size) => size !== value),
        });
      }
    } else if (name === "images") {
      setProductData({
        ...productData,
        [name]: e.target.files,
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleUploadSuccess = (response) => {
    if (images.length < 4) {
      setImages((prevImages) => [...prevImages, response.info.secure_url]);
    }
    // Manually trigger form submission if image count is valid
    if (images.length === 3) {
      handleSubmit();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any fields in productData are empty
    const isProductDataValid = Object.values(productData).every(
      (value) => value !== ""
    );

    // Check if exactly 4 images have been uploaded
    const isImageCountValid = images.length === 4;

    if (isProductDataValid && isImageCountValid) {
      console.log("Product data:", productData);
      fetch("/api/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          // Reset productData and images after successful submission
          setProductData({
            title: "",
            price: "",
            quantity: "",
            discountPercentage: "",
            color: "",
            category: "",
            sizes: [],
            images: [],
          });
          setImages([]);
          const checkboxes = document.querySelectorAll(
            'input[type="checkbox"]'
          );
          checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
          });
          // Handle success response
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });
    } else {
      // Notify user about validation errors
      if (!isProductDataValid) {
        alert("Please fill in all product information fields.");
        console.log(isProductDataValid)
        console.log(productData)
      }
      if (!isImageCountValid) {
        alert("Please upload exactly 4 images.");
      }
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] w-screen flex items-center justify-center ">
        <img src="/loading.webp" alt="loading..." />
      </div>
    );
  }

  return (
    <div>
      <div className="leading-loose">
        <form
          className="md:w-1/2 w-screen mx-auto mt-4 p-10 bg-white rounded shadow-xl"
          onSubmit={handleSubmit}
        >
          <p className="text-slate-800 text-center font-bold text-2xl">
            Product Information
          </p>

          {inputFields.map((field, index) => (
            <div key={index} className={`mt-2`}>
              <label
                className="font-bold block text-sm text-slate-600"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <input
                className="w-full p-2 text-slate-700 bg-slate-200 rounded"
                id={field.name}
                name={field.name}
                type={field.type}
                required
                placeholder={field.placeholder}
                aria-label={field.label}
                value={productData[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="mt-2 flex justify-between ">
            <label className="font-bold block text-sm text-slate-600 mt-2">
              Size
            </label>
            {gSizes.map((size) => (
              <div key={size} className="flex items-center">
                <input
                  type="checkbox"
                  id={`size-${size.toLowerCase()}`}
                  name="size"
                  value={size}
                  onChange={handleChange}
                />
                <label htmlFor={`size-${size.toLowerCase()}`} className="ml-2">
                  {size}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-2">
            {images.length > 0 && (
              <div className="mt-4">
                <p className="font-bold block text-sm text-slate-600">
                  Uploaded Images:
                </p>
                <div className="flex flex-wrap">
                  {images.map((image, index) => (
                    <div key={index} className="w-1/4 p-2">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="max-w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={`mt-2 ${uploadDisabled ? "hidden" : ""}`}>
            <label
              className="font-bold block text-sm text-slate-600"
              htmlFor="images"
            >
              Images
            </label>
            <div className="text-center border-2 border-slate-600 text-lg py-1 font-bold hover:text-white hover:bg-slate-600 transition-all">
              <CldUploadWidget
                uploadPreset="preset"
                onSuccess={handleUploadSuccess}
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      onClick={open}
                      disabled={uploadDisabled}
                    >
                      Upload Product Images
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>
          <div className="mt-4">
            <button
              className="py-2 w-full text-white font-light tracking-wider bg-slate-800"
              type="submit"
              disabled={!uploadDisabled}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
