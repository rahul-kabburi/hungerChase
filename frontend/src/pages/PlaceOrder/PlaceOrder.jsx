import React, { useContext, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, SERVER_URL, token, clearCart } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();

  const amount = getTotalCartAmount() + 40;

  const handlePayment = async (e) => {
    e.preventDefault();

    const address = {
      name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
      email: emailRef.current.value,
      street: streetRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zip: zipRef.current.value,
      country: countryRef.current.value,
      phone: phoneRef.current.value,
    };

    const items = Object.entries(cartItems).map(([id, qty]) => ({
      _id: id,
      quantity: qty,
    }));

    try {
      const orderRes = await axios.post(
        `${SERVER_URL}/api/v1/order/place`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const {
        id: order_id,
        currency,
        amount: razorpayAmount,
      } = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: razorpayAmount,
        currency,
        name: "HungerChase",
        description: "Payment for your delicious food",
        order_id,
        handler: async (response) => {
          const verificationRes = await axios.post(
            `${SERVER_URL}/api/v1/order/verify`,
            {
              ...response,
              address,
              amount,
              items,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verificationRes.data.success) {
            clearCart();
            navigate("/");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: "#F97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (getTotalCartAmount() <= 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-600 mb-6">
          Add some delicious food to place your order.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="px-6 py-2 bg-primary text-white rounded hover:bg-black transition"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Place Your Order
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
            🛵 Delivery Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              ref={firstNameRef}
              type="text"
              placeholder="First name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <input
              ref={lastNameRef}
              type="text"
              placeholder="Last name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <input
            ref={emailRef}
            type="email"
            placeholder="Email address"
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <input
            ref={streetRef}
            type="text"
            placeholder="Street"
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              ref={cityRef}
              type="text"
              placeholder="City"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <input
              ref={stateRef}
              type="text"
              placeholder="State"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              ref={zipRef}
              type="text"
              placeholder="Zip code"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <input
              ref={countryRef}
              type="text"
              placeholder="Country"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <input
            ref={phoneRef}
            type="text"
            placeholder="Phone"
            required
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700 font-medium">Subtotal</span>
            <span className="text-gray-800 font-semibold">
              ₹{getTotalCartAmount()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700 font-medium">Delivery Fee</span>
            <span className="text-gray-800 font-semibold">₹40</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{amount}</span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full px-6 py-3 rounded transition bg-primary text-white hover:bg-black cursor-pointer"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
