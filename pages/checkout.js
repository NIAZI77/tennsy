import React, { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "", 
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(""); 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toMail: formData.email,conurl:"/" }),
      });
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
    alert("confirm your order from email")
    } catch (error) {
      console.error('Error sending email:', error);
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
                  htmlFor="phoneNumber" // Changed htmlFor to match input id
                >
                  Phone Number {/* Updated label */}
                </label>
                <input
                  className="w-full p-2 text-slate-700 bg-slate-200 rounded"
                  id="phoneNumber" // Changed id to match label htmlFor
                  name="phoneNumber" // Changed name to match formData key
                  type="tel" // Changed type to "tel" for phone numbers
                  required
                  placeholder="Your Phone Number"
                  aria-label="Phone Number" // Updated aria-label
                  value={formData.phoneNumber} // Changed value to match formData key
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
                  value="JazzCash"
                  checked={paymentMethod === "JazzCash"}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="JazzCash" className="ml-2">
               <img src="jazzcash.png" alt="Jazzcash" className="w-20 inline"/>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="EasyPaisa"
                  name="paymentMethod"
                  value="EasyPaisa"
                  checked={paymentMethod === "EasyPaisa"}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="EasyPaisa" className="ml-2">
                <img src="easypaisa.png" alt="EasyPaisa" className="w-20 inline"/>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="COD"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="COD" className="ml-2">
                <img src="COD.png" alt="COD" className="w-20 inline"/>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="py-2 w-full text-white font-light tracking-wider bg-slate-800"
                type="submit"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
