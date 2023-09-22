import RestaurantCard from "./RestaurantCard";
import { useSearch } from "../contexts/searchContext";

const RestaurantList = ({ data }) => {
  const { listRef } = useSearch();

  return (
    <ul
      className="grid snap-mandatory list-none auto-cols-[300px] grid-flow-col auto-rows-[160px] gap-x-3 md:h-full md:auto-cols-[18rem] md:grid-flow-row md:auto-rows-[150px]  md:gap-y-3 lg:auto-cols-[470px] "
      ref={listRef}
    >
      {data &&
        data.map((item) => (
          <RestaurantCard id={item.place_id} key={item.place_id} data={item} />
        ))}
    </ul>
  );
};

export default RestaurantList;
