import React from "react";
import Carousel from "../elements/Carousel";
import { Menu } from "@headlessui/react";
import RatingStar from "../elements/RatingStar";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import ReviewCard from "../ReviewCard";
import { getDay } from "../../utils/getDay";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const Detail = ({ onClose, data }) => {
  const today = getDay({
    index: new Date().getDay(),
    array: data.detail.data.opening_hours.weekday_text,
  });
  console.log(data)

  return (
    <div
      className={`fixed inset-x-0 bottom-0 flex h-[200px] w-full items-end overflow-x-auto md:left-0 md:h-[90vh] md:w-[35vw] md:overflow-y-scroll md:bg-white`}
    >
      <div className={`relative z-50 hidden md:block md:h-full md:w-full`}>
        {/* scrollable container */}
        <div className="fixed inset-0 h-[80vh] overflow-y-auto md:absolute md:right-[unset] md:h-full md:w-full">
          {/* to center container */}
          <div className=" flex min-h-full items-end justify-center md:items-start">
            {/* used to dialog panel */}
            <div
              as="div"
              className="mx-auto max-w-sm rounded bg-white px-4 md:w-full md:max-w-[unset]"
            >
              <div className="my-2 flex h-6 justify-start">
                <ChevronLeftIcon className="cursor-pointer" onClick={onClose} />
              </div>
              <Carousel photos={data.detail.photos} />

              {/* 輪播圖以下詳細說明 */}
              <div className="mt-4 flex justify-between">
                <h3 className="text-green-600 text-3xl">
                  {data.detail.data.name}
                </h3>
                <div>
                  <div className="mb-px flex items-center ">
                    <TruckIcon className="h-6 w-6" />
                    <span>{data.distance.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6" />
                    <span>{data.distance.distance}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <RatingStar rating={data.detail.data.rating} />
                <span>{data.detail.data.rating}</span>
              </div>
              <div className="divide-y">
                <div className="flex py-4">
                  <MapPinIcon className="mr-4 h-6 w-6" />
                  <h4>{data.detail.data.formatted_address}</h4>
                </div>
                <div className="flex py-4">
                  <PhoneIcon className="mr-4 h-6 w-6" />
                  {/* production不顯示號碼 */}
                  <h4>{data.detail.data.formatted_phone_number}</h4>
                </div>
                <Menu as="div" className="flex items-center py-4">
                  <ClockIcon className="mr-4 h-6 w-6" />
                  <Menu.Button className="mr-4">營業時間</Menu.Button>
                  <div>{today}</div>
                  <Menu.Items className="ml-1">
                    <Menu.Item>
                      {({ active }) => (
                        <>
                          {data.detail.data.opening_hours.weekday_text.map(
                            (text, index) => (
                              <div key={index}>{text}</div>
                            ),
                          )}
                        </>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              {/* 評論區 */}
              <h4 className="text-2xl">評論</h4>
              <ol className="mt-6 divide-y">
                {data.detail.data.reviews.map((item, index) => (
                  <ReviewCard key={index} data={item} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
