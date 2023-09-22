"use client";
import RestaurantScroller from "@/app/components/RestaurantScroller";
import { useQuery } from "@tanstack/react-query";
import { nearbySearch } from "../../api/frontend/nearbySearch";
import { useSearch } from "../../contexts/searchContext";
import Loading from "@/app/components/Loading";
import { useMarkerContext } from "@/app/contexts/hoverMarkerContext";
import { useEffect } from "react";
const SearchPage = ({ params }) => {
  const { currentPosition, mapRef } = useSearch();
  const { setResult } = useMarkerContext();
  // keyword, @lat,lng, options=
  const slugs = params.slug.map((item) => decodeURIComponent(item));
  // console.log(slugs);
  // slugs[2].split('=')[1]先以空物件做設計
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      "nearbySearch",
      {
        keyword: slugs[0],
        options: JSON.parse(slugs[2].split("=")[1]),
        location: slugs[1],
      },
    ],
    queryFn: ({ queryKey }) =>
      nearbySearch({
        map: mapRef.current,
        keyword: queryKey[1].keyword,
        options: queryKey[1].options,
        location: new google.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng,
        ),
        refetchOnWindowFocus: false,
      }),
  });
  // 供restaurant Marker使用
  useEffect(() => {
    if (data) {
      setResult(data);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <RestaurantScroller data={data} />
    </>
  );
};

export default SearchPage;
