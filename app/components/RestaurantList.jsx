import React from "react";
import RestaurantCard from "./RestaurantCard";
import { useSearch } from "../contexts/searchContext";
const RestaurantList = ({ onCardClick, onHover }) => {
  const { result } = useSearch();
  return (
    <ul className="grid snap-mandatory list-none auto-cols-[150px] grid-flow-col auto-rows-[200px] gap-x-3 md:ml-2 md:h-full md:auto-cols-[35vw] md:grid-flow-row  md:auto-rows-[150px] md:gap-y-3">
      {result &&
        result.map((item) => (
          <RestaurantCard
            id={item.place_id}
            key={item.place_id}
            onCardClick={onCardClick}
            onHover={onHover}
            data={item}
          />
        ))}
    </ul>
  );
};

export default RestaurantList;
