import { useState } from "react";
import DisplayFood from "../../components/DisplayFood/DisplayFood";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";

const Menu = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="my-5">
      <ExploreMenu category={category} setCategory={setCategory} />
      <DisplayFood category={category} />
    </div>
  );
};

export default Menu;
