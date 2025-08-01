import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const DisplayFood = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <section className="mt-10 px-4 sm:px-6 md:px-0">
      <h2 className="font-bold text-xl sm:text-2xl text-gray-800">
        Top Dishes Near You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {food_list.map((item, idx) =>
          category === "All" || category === item.category ? (
            <FoodItem key={idx} item={item} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default DisplayFood;
