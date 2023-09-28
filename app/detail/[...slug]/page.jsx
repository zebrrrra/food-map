"use client";
import React, { useState } from "react";
import Detail from "@/app/components/Detail";
import DetailModal from "@/app/components/DetailModal";
import { useSearch } from "@/app/contexts/searchContext";
import { useRouter } from "next/navigation";
import { getDetailData } from "@/app/api/frontend/placeDetail";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/search/loading";

const DetailPage = ({ params }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isSmallScreen, mapRef, currentPosition } = useSearch();
  const router = useRouter();
  const latLng = new google.maps.LatLng(
    currentPosition.lat,
    currentPosition.lng,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getDetail", { id: params.slug[1] }],
    queryFn: ({ queryKey }) =>
      getDetailData({
        id: queryKey[1].id,
        map: mapRef.current,
        location: latLng,
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });
  if (isLoading) {
    return <Loading />;
  }
  const handleClose = () => {
    if (isSmallScreen) {
      setIsOpenModal(false);
    }
    router.back();
  };

  return (
    <>
      {data && (
        <>
          {isSmallScreen ? (
            <DetailModal
              data={data}
              isOpen={isOpenModal}
              onClose={handleClose}
            />
          ) : (
            <Detail data={data} onClose={handleClose} />
          )}
        </>
      )}
    </>
  );
};

export default DetailPage;