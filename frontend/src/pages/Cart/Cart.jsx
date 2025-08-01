import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    clearCart,
    removeParticularItemFromCart,
    getTotalCartAmount,
    SERVER_URL,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const isCartEmpty = Object.keys(cartItems).length === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

      {isCartEmpty ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-xl mb-4">🛒 Your cart is empty.</p>
          <p>Add some delicious food from the menu!</p>
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs sm:text-sm uppercase font-semibold">
                <tr>
                  <th className="p-3">Item</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {food_list.map((item) =>
                  cartItems[item._id] ? (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="p-3">
                        <img
                          src={SERVER_URL + "/images/" + item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                      </td>
                      <td className="p-3 font-medium">{item.name}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 py-1 w-fit">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-gray-700 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                          >
                            <MdRemove className="w-4 h-4" />
                          </button>
                          <span className="min-w-[24px] text-center font-medium">
                            {cartItems[item._id]}
                          </span>
                          <button
                            onClick={() => addToCart(item._id)}
                            className="text-gray-700 hover:text-green-600 p-1 rounded-full hover:bg-gray-100"
                          >
                            <MdAdd className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3 font-semibold">
                        ₹{item.price * cartItems[item._id]}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => removeParticularItemFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <MdDelete className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-start">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 w-full lg:max-w-sm">
                <p className="text-gray-700 font-medium mb-3">
                  Have a promo code?
                </p>
                <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full sm:w-auto flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button className="px-4 py-2 bg-primary text-white rounded hover:bg-black transition text-sm cursor-pointer">
                    Apply
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm border w-full lg:max-w-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-medium">Subtotal</span>
                    <span className="text-gray-800 font-semibold">
                      ₹{getTotalCartAmount()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-medium">
                      Delivery Fee
                    </span>
                    <span className="text-gray-800 font-semibold">₹40</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{getTotalCartAmount() + 40}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
                  <button
                    onClick={clearCart}
                    className="w-full sm:w-auto px-5 py-2 bg-white text-black border border-gray-300 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition cursor-pointer"
                  >
                    Clear Cart
                  </button>

                  <button
                    onClick={() => navigate("/order")}
                    className="w-full sm:w-auto px-6 py-2 rounded transition bg-primary text-white hover:bg-black cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
