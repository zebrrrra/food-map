import RestaurantList from "./RestaurantList";

const RestaurantScroller = ({ data }) => {
  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 flex h-[200px] w-full items-end overflow-x-auto md:left-0 md:h-[90vh] md:w-72 md:overflow-y-scroll md:bg-white lg:w-[470px]`}
      >
        <RestaurantList data={data} />
      </div>
    </>
  );
};

export default RestaurantScroller;
