"use client";
import RestaurantScroller from "@/app/components/RestaurantScroller";
import { useSearch } from "../../contexts/searchContext";
import { nearbySearch } from "../../api/route";
import { useEffect } from "react";
const SearchPage = ({ params }) => {
  const { currentPosition, mapRef, setResult } = useSearch();
  const slugs = params.slug.map((item) => decodeURIComponent(item));

  useEffect(() => {
    const getNearbySearch = async () => {
      const data = await nearbySearch({
        map: mapRef.current,
        keyword: slugs[0],
        options: JSON.parse(slugs[2].split("=")[1]),
        location: new google.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng,
        ),
      });
      if (data) {
        console.log('search page', data)
        setResult(data)
      }
    }
    getNearbySearch()
  }, [slugs[0], slugs[1], slugs[2]])

  return (<RestaurantScroller />)
};

export default SearchPage;
