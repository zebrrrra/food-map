import React from "react";
import Image from "next/image";
import openIcon from "../../public/images/openIcon.png";
import closedIcon from "../../public/images/closedIcon.png";
import RatingStar from "./RatingStar";
import { useSearch } from "../contexts/searchContext";
import { useMarkerContext } from "../contexts/hoverMarkerContext";

const RestaurantCard = ({ id, onCardClick, data }) => {
  const { isSmallScreen } = useSearch();
  const { setHoveredMarkerId } = useMarkerContext();

  const handleHover = (value) => {
    if (!isSmallScreen) {
      setHoveredMarkerId(value);
    }
  };
  const photoUrl =
    Object.keys(data).includes("photos") &&
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photo_reference=${data.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  const place = data.plus_code.compound_code.match(/[\u4e00-\u9fa5]+/);

  return (
    <li
      className="flex snap-start flex-col rounded-xl bg-slate-50 shadow-lg md:h-[150px] md:flex-row md:overflow-hidden"
      id={id}
      onClick={() => onCardClick(id)}
      onMouseOver={() => handleHover(id)}
    >
      <div className="h-[112px] w-full  md:flex md:h-full md:w-[140px]">
        {Object.keys(data).includes("photos") ? (
          <Image
            src={photoUrl}
            alt="site"
            width={150}
            height={112}
            className="h-[inherit] max-h-full rounded-t-xl"
          />
        ) : (
          <div>店家無提供照片</div>
        )}
      </div>
      {/* 圖片以下文字說明 */}
      <div className="mt-1 px-1 md:pl-4">
        <div className="grid grid-flow-col items-center justify-between md:flex md:grid-cols-3 md:gap-20">
          <h3 className=" h-[60px] max-w-[100px] overflow-hidden text-lg md:col-span-2 ">
            {data.name}
          </h3>
          <div>{data.opening_hours.open_now}</div>
          <div className="h-5 w-10 md:col-span-1">
            <Image
              src={data.opening_hours.open_now ? openIcon : closedIcon}
              alt="openState"
              width="auto"
              height="auto"
              className=""
            />
          </div>
        </div>
        <div className=" mt-1 flex justify-start">
          <RatingStar rating={data.rating} />
          <p className="text-black">{place[0]}</p>
        </div>
        <div className="hidden md:mt-1 md:flex md:items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <p className="">{data.vicinity}</p>
        </div>
      </div>
    </li>
  );
};

export default RestaurantCard;
