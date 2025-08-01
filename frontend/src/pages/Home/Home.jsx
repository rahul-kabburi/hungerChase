import HeroSection from "../../components/HeroSection/HeroSection";
import AppDownload from "../../components/AppDownload/AppDownload";
import WhyUs from "../../components/WhyUs/WhyUs";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import MenuPreview from "../../components/MenuPreview/MenuPreview";

const Home = () => {

  return (
    <div>
      <HeroSection />
      <MenuPreview />
      <WhyUs />
      <HowItWorks />
      <AppDownload />
    </div>
  );
};

export default Home;
