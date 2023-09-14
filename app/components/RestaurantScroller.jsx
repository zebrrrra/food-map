import RestaurantList from "./RestaurantList";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

const RestaurantScroller = () => {
  const router = useRouter();
  const handleCardClick = (id) => {
    router.push(`/detail/${id}`);
  };

  return (
    <>
      {/* 取消md:top-[85px] */}
      <div
        className={`fixed inset-x-0 bottom-0 flex h-[200px] w-full items-end overflow-x-auto md:left-0 md:h-[90vh] md:w-72 md:overflow-y-scroll md:bg-white lg:w-[470px]`}
      >
        <RestaurantList onCardClick={(value) => handleCardClick(value)} />
      </div>
    </>
  );
};

export default RestaurantScroller;
