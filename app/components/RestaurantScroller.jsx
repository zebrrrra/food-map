import RestaurantList from "./RestaurantList";
import { useRouter } from "next/navigation";

const RestaurantScroller = () => {
  const router = useRouter();
  const handleCardClick = (value) => {
    router.push(`/detail/${value.name}/${value.id}`);
  };

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 flex h-[200px] w-full items-end overflow-x-auto md:left-0 md:h-[90vh] md:w-72 md:overflow-y-scroll md:bg-white lg:w-[470px]`}
      >
        <RestaurantList onCardClick={(value) => handleCardClick(value)} />
      </div>
    </>
  );
};

export default RestaurantScroller;
