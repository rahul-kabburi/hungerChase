import { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ item }) => {
  const id = item._id;
  const { name, price, image, description, rating } = item;
  const { cartItems, removeFromCart, addToCart, SERVER_URL } =
    useContext(StoreContext);

  return (
    <div className="w-full rounded-[15px] shadow-md hover:shadow-lg transition-all duration-300 bg-white animate-fadeIn overflow-hidden hover:scale-100">
      {/* Image */}
      <div className="relative">
        <img
          src={SERVER_URL + "/images/" + image}
          alt={name}
          className="w-full h-44 sm:h-48 md:h-52 object-cover transform hover:scale-105 transition duration-300"
        />
        {/* Add/Remove Cart Button */}
        <div className="absolute bottom-3 right-3">
          {!cartItems[id] ? (
            <button
              onClick={() => addToCart(id)}
              className="rounded-full p-0.5 bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              <img
                src={assets.add_icon_white}
                alt="add icon"
                className="w-8 h-8"
              />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md">
              <button
                onClick={() => removeFromCart(id)}
                className="cursor-pointer"
              >
                <img
                  src={assets.remove_icon_red}
                  alt="remove"
                  className="w-6 h-6"
                />
              </button>
              <span className="text-sm font-semibold text-gray-700">
                {cartItems[id]}
              </span>
              <button onClick={() => addToCart(id)} className="cursor-pointer">
                <img
                  src={assets.add_icon_green}
                  alt="add"
                  className="w-6 h-6"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            {name}
          </h2>
          <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">
            ⭐ {rating}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <p className="text-lg font-bold text-primary">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
