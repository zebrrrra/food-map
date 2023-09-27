import RestaurantCard from "./RestaurantCard";
import { useGlobal } from "../contexts/globalContext";
import { useMarkerContext } from "../contexts/hoverMarkerContext";
const RestaurantList = () => {
  const { listRef, result } = useGlobal();
  // const { result } = useMarkerContext()
  console.log(result);

  return (
    <ul
      className="grid snap-mandatory list-none auto-cols-[300px] grid-flow-col auto-rows-[160px] gap-x-3 md:h-full md:auto-cols-[18rem] md:grid-flow-row md:auto-rows-[150px]  md:gap-y-3 lg:auto-cols-[470px] "
      ref={listRef}
    >
      {result &&
        result.map((item) => (
          <RestaurantCard id={item.place_id} key={item.place_id} data={item} />
        ))}
    </ul>
  );
};

export default RestaurantList;
