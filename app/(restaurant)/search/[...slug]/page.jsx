"use client";
import RestaurantScroller from "@/app/components/search/RestaurantScroller";
import { useQuery } from "@tanstack/react-query";
import { nearbySearch } from "../../../api/frontend/nearbySearch";
import { useGlobal } from "../../../contexts/globalContext";
import { useEffect } from "react";
import Loading from "@/app/components/elements/Loading";

const SearchPage = ({ params }) => {
  const slugs = params.slug.map((item) => decodeURIComponent(item));
  const { currentPosition, mapRef, setResult } = useGlobal()
  console.log(params)

  const { data, isLoading, isSuccess, error, isError } = useQuery({
    queryKey: ["search", { keyword: slugs[0], options: slugs[2] }],
    queryFn: ({ queryKey }) =>
      nearbySearch({
        map: mapRef.current, keyword: queryKey[1].keyword, options: JSON.parse(slugs[2].split("=")[1]), location: new google.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng,
        )
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });
  // 在資料回來之前已經執行過一次
  useEffect(() => {
    if (isSuccess) {
      console.log('search page', data)
      setResult(data)
    }
    if (isError) {
      console.log(error)
    }
  }, [slugs[0], slugs[1], slugs[2], isSuccess])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <RestaurantScroller data={data} />
    </>
  );
};

export default SearchPage;
