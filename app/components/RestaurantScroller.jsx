import React from "react";
import { useState, useEffect } from "react";
import DetailModal from "./DetailModal";
import RestaurantList from "./RestaurantList";
import Detail from "./Detail";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RestaurantScroller = ({ mapRef, currentPosition, onHover }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isClickCard, setIsClickCard] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [detailData, setDetailData] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [distance, setDistance] = useState({ distance: "", duration: "" });

  const handleCardClick = (id) => {
    const PlaceService = new google.maps.places.PlacesService(mapRef.current);
    const DistanceService = new google.maps.DistanceMatrixService();
    // const origin = new google.maps.LatLng(currentPosition.lat, currentPosition.lng)

    const distanceRequest = {
      origins: [currentPosition],
      destinations: [{ placeId: `${id}` }],
      travelMode: "DRIVING",
    };
    const detailRequest = {
      placeId: id,
      fields: [
        "name",
        "formatted_address",
        "photo",
        "opening_hours",
        "formatted_phone_number",
        "rating",
        "reviews",
      ],
      language: "zh-TW",
    };

    DistanceService.getDistanceMatrix(distanceRequest, (result, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setDistance((prev) => ({
          ...prev,
          distance: result.rows[0].elements[0].distance.text,
          duration: result.rows[0].elements[0].duration.text,
        }));
      }
    });

    PlaceService.getDetails(detailRequest, (result, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.table(result);
        const photoArr = result.photos.map(({ getUrl }) =>
          getUrl({ maxWidth: 200, maxHeight: 200 }),
        );
        setPhotos(photoArr);
        setDetailData(result);
        // result.opening_hours.isOpen()
      }
    });
    console.log(isSmallScreen);
    if (isSmallScreen) {
      // 如果小螢幕
      setIsOpenModal(true);
    } else {
      // 如果大螢幕
      setIsClickCard(true);
    }
  };

  // const handleClose = (state) => {
  //   setIsClickCard(state);
  // };

  useEffect(() => {
    const mmObj = window.matchMedia("(max-width: 768px)");
    const handleResize = () => {
      if (mmObj.matches) {
        /* 窗口小于或等于 768 像素 */
        setIsSmallScreen(true);
      } else {
        /*窗口大于 768 像素 */
        setIsSmallScreen(false);
      }
    };
    // Initial check
    handleResize();
    // Add event listener for window resize
    mmObj.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      mmObj.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // 接在搜尋bar後面
    <>
      {/* 取消md:top-[85px] */}
      <div className="fixed inset-x-0 bottom-0 flex h-[200px] w-full items-end overflow-x-auto md:left-0 md:h-[90vh] md:w-[35vw] md:overflow-y-scroll md:bg-white">
        {detailData && (
          <DetailModal
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            detailData={detailData}
            photos={photos}
            distance={distance}
          />
        )}

        <Detail open={isClickCard} onClose={(state) => setIsClickCard(state)} />
        {!isClickCard && (
          <RestaurantList onCardClick={handleCardClick} onHover={onHover} />
        )}
      </div>
    </>
  );
};

export default RestaurantScroller;
