import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-full h-[60vh] sm:h-[70vh] md:h-[34vw] my-7 bg-cover bg-no-repeat bg-center rounded-2xl overflow-hidden"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30 rounded-2xl"></div>

      <div className="absolute left-5 sm:left-10 lg:left-[6vw] bottom-10 flex flex-col gap-4 sm:gap-5 max-w-[90%] sm:max-w-[80%] md:max-w-[60%] animate-fadeIn">
        <h2 className="text-white font-bold text-xl sm:text-3xl md:text-3xl lg:text-5xl leading-tight">
          Order and satisfy your cravings with HungerChase
        </h2>

        <p className="text-white text-sm sm:text-base md:text-base xl:hidden leading-relaxed">
          Delicious meals, delivered fast — enjoy food your way with HungerChase.
        </p>

        <p className="hidden xl:block text-white text-base leading-relaxed">
          Explore a wide range of mouthwatering dishes made with premium
          ingredients and expert craftsmanship. Whether you're hungry for
          comfort food or gourmet delights, HungerChasebrings the best flavors to
          your doorstep — making every meal a delicious experience.
        </p>

        <button
          onClick={()=>navigate("/menu")}
          className="bg-white text-gray-700 px-6 sm:px-8 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300 w-fit cursor-pointer"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
