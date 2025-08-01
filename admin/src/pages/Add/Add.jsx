import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../config/serverURL";
const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    rating: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("rating", data.rating);
    formData.append("image", image);

    const response = await axios.post(
      `${SERVER_URL}/api/v1/food/add`,
      formData
    );
    console.log(response);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
        rating: "",
      });
      setImage(null);
      toast.success(response.data.message);
    } else {
      console.log("Error Occured in Adding Food Data from Admin Side");
      toast.error(response.data.message);
    }
  };

  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Add New Product Items
        </h2>
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div>
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Upload Image
            </p>
            {!image ? (
              <label
                htmlFor="image"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 border border-dashed border-primary rounded-md cursor-pointer hover:bg-gray-100 transition"
              >
                <img
                  src={assets.upload_area}
                  alt="upload"
                  className="h-6 w-6 object-contain"
                />
                <span className="text-gray-600">Choose file</span>
              </label>
            ) : (
              <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              name="image"
              id="image"
              hidden
              required
            />
          </div>

          <div>
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Product Name
            </p>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Product Description
            </p>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              rows="5"
              placeholder="Enter Description here"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          <div>
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Product Category
            </p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Product Price (₹)
            </p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="Enter product price"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Rating (out of 5)
            </p>
            <input
              type="number"
              name="rating"
              value={data.rating}
              onChange={onChangeHandler}
              placeholder="Enter Rating"
              max="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-black text-white font-semibold py-3 rounded-md transition duration-200 cursor-pointer"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default Add;
