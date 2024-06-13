import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const OrderPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [productNotFound, setProductNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setLoading(true); // Set loading to true when fetching starts
          const response = await fetch("/api/allOrders");
          const orders = await response.json();
          const selectedOrder = orders.find((element) => element._id === id);
          if (selectedOrder) {
            setOrder(selectedOrder);
          } else {
            setProductNotFound(true);
          }
          setLoading(false); // Set loading to false when fetching is done
        }
      } catch (error) {
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="h-[50vh] w-screen flex items-center justify-center ">
      <img src="loading.webp" alt="loading..." />
    </div> // Display loading state
  }

  if (productNotFound) {
    return <div className="container mx-auto p-4">Product not found.</div>;
  }

  const { detail, cart, subTotal } = order;
  return (
    <>
      <div className="my-4">
        <p className="md:text-3xl text-xl font-bold my-5 text-center px-4">{detail.name} Thanks for your purchase!</p>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="md:text-3xl text-xl font-bold mb-4">Order Summary</h1>
        <div className="border p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Customer Details:</h2>
          <p>Name: {detail.name}</p>
          <p>Email: {detail.email}</p>
          <p>Phone Number: {detail.phoneNumber}</p>
          <p>Address: {detail.address}</p>
          <p>City: {detail.city}</p>
          <p>Country: {detail.country}</p>
          <p>Zip: {detail.zip}</p>
          <p>paymentMethod: {detail.paymentM}</p>
          <p className="text-lg font-bold">SubTotal: {parseInt(subTotal)}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Cart:</h2>
          {Array.isArray(cart) && cart.map((item, index) => (
            <div key={index} className="flex items-center border p-4 mb-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
              <div>
                <p className="text-lg font-semibold">{item.title}</p>
                <p>Size: {item.size}</p>
                <p>Price: PKR {item.discountPercentage > 0
                  ? parseInt(
                    item.price -
                    (item.discountPercentage * item.price) / 100
                  )
                  : item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
