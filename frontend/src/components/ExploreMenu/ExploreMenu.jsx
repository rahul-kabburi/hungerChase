import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="flex flex-col gap-5 px-4 sm:px-6 md:px-0" id="menu">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800">
        Explore our menu
      </h1>
      <p className="text-gray-600 text-sm sm:text-base max-w-full md:max-w-[70%]">
        Explore a rich variety of meals made to satisfy every craving — whether
        you're in the mood for something hearty, healthy, or indulgent.
      </p>

      <div className="flex items-center justify-between gap-5 overflow-x-auto scrollbar-hide py-2">
        {menu_list.map((item, idx) => (
          <div key={idx} className="min-w-[80px] sm:min-w-[100px] md:min-w-[120px] text-center flex-shrink-0">
            <img
              src={item.menu_image}
              alt={item.menu_name}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className={`w-[16vw] sm:w-[12vw] md:w-[7.5vw] max-w-[80px] md:max-w-[100px] aspect-square object-cover rounded-full mx-auto cursor-pointer transition-all duration-200 ease-in-out hover:scale-120 hover:shadow-2xl ${
                category === item.menu_name
                  ? "border-4 border-primary p-0.5"
                  : ""
              }`}
            />
            <p className="mt-2 text-xs sm:text-sm text-gray-700 cursor-pointer">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className="h-0.5 bg-slate-200 border-0" />
    </section>
  );
};

export default ExploreMenu;
