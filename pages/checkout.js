import React, { useState } from "react";
import { useRouter } from "next/router";

const Checkout = () => {
  const router = useRouter();

  // State variables
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "",
    email: "",
    name: "",
    phoneNumber: "",
    zip: "",
    paymentM: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if cart is empty
  if (typeof localStorage !== "undefined" && localStorage.getItem("cart") === null) {
    router.push("/");
  } else if (typeof localStorage !== "undefined" && localStorage.getItem("cart").length === 0) {
    router.push("/");
  }
  
  // Event handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePaymentChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPaymentMethod(selectedPaymentMethod);
    setFormData({
      ...formData,
      paymentM: selectedPaymentMethod
    });
    console.log(selectedPaymentMethod)
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ detail: formData, cart: JSON.parse(localStorage.getItem("cart")), subTotal: JSON.parse(localStorage.getItem("subtotal")) }),
      });
      const data = await response.json();
      console.log(data);
      router.push(`/order?id=${data.orderId}`);
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      const res = await fetch('/api/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toMail: formData.email, conurl: `${process.env.NEXT_PUBLIC_HOST}/order?id=${data.orderId}` }),
      });
      if (!res.ok) {
        throw new Error('Failed to send email');
      }
  
      alert("Track Order Link Is send To Your Mail");
      localStorage.clear()
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex justify-around">
      <div className="md:w-[45vw] md:flex hidden justify-center items-center">
        <img src="/checkout.png" className="w-3/4" />
      </div>

      <div>
        <div className="leading-loose md:w-[45vw]">
          <form
            className="w-full mx-auto mt-5 px-10 py-5 bg-white rounded shadow-xl scale-75"
            onSubmit={handleSubmit}
          >
            <p className="text-slate-800 text-center font-bold text-2xl">
              Customer information
            </p>
            <div className="">
              <label
                className="font-bold block text-sm text-slate-600"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-5 py-1 text-slate-700 bg-slate-200 rounded"
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your Name"
                aria-label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="mt-2 md:w-[49%]">
                <label
                  className="font-bold block text-sm text-slate-600"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-2 text-slate-700 bg-slate-200 rounded"
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your Email"
                  aria-label="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 md:w-[49%]">
                <label
                  className="font-bold block text-sm text-slate-600"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className="w-full p-2 text-slate-700 bg-slate-200 rounded"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  placeholder="Your Phone Number"
                  aria-label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                className="font-bold block text-sm text-slate-600"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded"
                id="address"
                name="address"
                type="text"
                required
                placeholder="Street"
                aria-label="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <label
                className="font-bold block text-sm text-slate-600"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded"
                id="city"
                name="city"
                type="text"
                required
                placeholder="City"
                aria-label="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="inline-block mt-2 w-1/2 pr-1">
              <label
                className="font-bold block text-sm text-slate-600"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded"
                id="country"
                name="country"
                type="text"
                required
                placeholder="Country"
                aria-label="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label
                className="font-bold block text-sm text-slate-600"
                htmlFor="zip"
              >
                Zip
              </label>
              <input
                className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded"
                id="zip"
                name="zip"
                type="text"
                required
                placeholder="Zip"
                aria-label="Zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <input
                  type="radio"
                  id="JazzCash"
                  name="paymentMethod"
                  required
                  value="JazzCash"
                  checked={paymentMethod === "JazzCash"}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="JazzCash" className="ml-2">
                  <img src="jazzcash.png" alt="Jazzcash" className="w-20 inline" />
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="EasyPaisa"
                  name="paymentMethod"
                  value="EasyPaisa"
                  required
                  checked={paymentMethod === "EasyPaisa"}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="EasyPaisa" className="ml-2">
                  <img src="easypaisa.png" alt="EasyPaisa" className="w-20 inline" />
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="COD"
                  name="paymentMethod"
                  value="COD"
                  required
                  checked={paymentMethod === "COD"}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="COD" className="ml-2">
                  <img src="COD.png" alt="COD" className="w-20 inline" />
                </label>
              </div>
            </div>
            <div className="mt-4">
              {isSubmitting ? (
                <button className="py-2 w-full text-white font-light tracking-wider bg-gray-400 cursor-not-allowed" type="submit" disabled>
                  submitting...
                </button>
              ) : (
                <button className="py-2 w-full text-white font-light tracking-wider bg-slate-800" type="submit">
                  Place Order
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;