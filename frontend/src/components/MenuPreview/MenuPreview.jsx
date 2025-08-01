import { menu_list } from "../../assets/assets";

const MenuPreview = () => {
  return (
    <section id="menu-preview" className="py-12 px-4 sm:px-6 md:px-8 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Discover HungerChase's Menu
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          From fresh salads to indulgent desserts, HungerChaseserves a wide variety of mouthwatering meals to match every craving and occasion.
        </p>
      </div>

      <div className="flex items-center justify-start md:justify-center gap-4 overflow-x-auto scrollbar-hide py-2">
        {menu_list.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[80px] sm:min-w-[100px] md:min-w-[120px] text-center flex-shrink-0"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className="w-[16vw] sm:w-[12vw] md:w-[7.5vw] max-w-[80px] md:max-w-[100px] aspect-square object-cover rounded-full mx-auto hover:scale-120 cursor-pointer transition-all duration-300"
            />
            <p className="mt-2 text-xs sm:text-sm text-gray-700">{item.menu_name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuPreview;
