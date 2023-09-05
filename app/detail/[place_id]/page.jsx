"use client";
import React, { useEffect, useState } from "react";
import Detail from "@/app/components/Detail";
import DetailModal from "@/app/components/DetailModal";
import { useSearch } from "@/app/contexts/searchContext";
import useSelectMarkerHook from "@/app/hooks/selectMarkerHook";
import { useRouter } from "next/navigation";

const DetailPage = ({ params }) => {
  const [detail, setDetail] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const { isSmallScreen } = useSearch();
  const { getDetailData } = useSelectMarkerHook();
  const router = useRouter();

  useEffect(() => {
    const handleDetailData = async () => {
      const data = await getDetailData(params.place_id);
      if (data) {
        const { distance, detail } = data;
        setDetail(detail);
        setDistance(distance);

        if (isSmallScreen) {
          setIsOpenModal(true);
        } else {
          setIsOpenDetail(true);
        }
      }
    };
    handleDetailData();
    return () => {
      setIsOpenModal(false);
      setIsOpenDetail(false);
    };
  }, [params.place_id]);

  const handleClose = () => {
    if (isSmallScreen) {
      setIsOpenModal(false);
    } else {
      setIsOpenDetail(false);
    }
    router.back();
  };

  return (
    <>
      {detail && (
        <>
          {isSmallScreen ? (
            <DetailModal
              detail={detail}
              distance={distance}
              isOpen={isOpenModal}
              onClose={handleClose}
            />
          ) : (
            <Detail
              detail={detail}
              distance={distance}
              isOpen={isOpenDetail}
              onClose={handleClose}
            />
          )}
        </>
      )}
    </>
  );
};

export default DetailPage;
