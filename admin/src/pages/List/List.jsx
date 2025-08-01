import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../config/serverURL";
const List = () => {
  const [list, setList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/food/list`);
      // console.log(response)
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch data");
      }
    } catch (error) {
      toast.error("Error fetching food list");
      console.error(error);
    }
  };
  const removeFood = async (id) => {
    // console.log(id);
    const response = await axios.post(`${SERVER_URL}/api/v1/food/remove`, {
      id,
    });
    if (response.data.success) {
      await fetchFoodList();
      toast.success("Food Removed Successfully");
    } else {
      toast.error(response.data.message || "Failed to Delete Data");
    }
  };
  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <section className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          All Foods List
        </h2>

        {list.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No food items available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price (₹)</th>
                  <th className="p-3 text-left">Rating</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3">
                      <img
                        src={`${SERVER_URL}/images/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">₹{item.price}</td>
                    <td className="p-3">{item.rating}</td>
                    <td className="p-3">
                      <button
                        onClick={() => removeFood(item._id)}
                        className="text-red-600 hover:text-red-800 font-medium bg-neutral-100 rounded cursor-pointer px-4 py-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default List;
