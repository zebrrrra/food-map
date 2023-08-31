import React from "react";
import Carousel from "./Carousel";
import { Dialog, Menu, Popover } from "@headlessui/react";
import Image from "next/image";
import RatingStar from "./RatingStar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import pin from "../../public/images/mapPin.svg";
import phone from "../../public/images/phone.svg";
import clock from "../../public/images/clock.svg";
import avatar from "../../public/images/avatar.svg";
const Detail = ({ open, onClose }) => {
  return (
    //  detail
    <div
      className={`relative z-50 hidden md:h-full md:w-full ${open && "md:block"
        }`}
    >
      {/* scrollable container */}
      <div className="fixed inset-0 h-[80vh] overflow-y-auto md:absolute md:right-[unset] md:h-full md:w-full">
        {/* to center container */}
        <div className=" flex min-h-full items-end justify-center md:items-start">
          {/* used to dialog panel */}
          <div
            as="div"
            className="mx-auto max-w-sm rounded bg-white px-4 md:w-full md:max-w-[unset]"
          >
            <div className="my-1 flex h-6 justify-start">
              <ArrowLeftIcon onClick={() => onClose(false)} />
            </div>
            <Carousel />

            {/* 輪播圖以下詳細說明 */}
            <div className="mt-4 flex justify-between">
              <h3 className="text-3xl text-green-600">家跟酒窖</h3>

              <div className="flex">
                <Image src={pin} alt="pin" />

                <span>1.5km</span>
              </div>
            </div>
            <div className="flex items-center">
              <RatingStar rating={3.7} />
              {/* rating變數 */}
              <span>3.7</span>
            </div>
            <div className="divide-y">
              <div className="flex  py-4">
                <Image
                  src={pin}
                  alt="pin"
                  width="auto"
                  height="auto"
                  className="mr-4"
                />
                <h4>台南市中西區中山路166號6樓 700, Tainan City, TNN</h4>
              </div>
              <div className="flex py-4">
                <Image
                  src={phone}
                  alt="phone"
                  width="auto"
                  height="auto"
                  className="mr-4"
                />
                <h4>0900000000</h4>
              </div>
              <Menu as="div" className="flex py-4">
                <Image
                  src={clock}
                  alt="clock"
                  width="auto"
                  height="auto"
                  className="mr-4"
                />
                <Menu.Button>營業時間</Menu.Button>
                <Menu.Items>
                  <Menu.Item>
                    {({ active }) => (
                      <>
                        <div>星期一 11:00~13:00</div>
                        <div>星期二 11:00~13:00</div>
                        <div>星期三 11:00~13:00</div>
                        <div>星期四 11:00~13:00</div>
                        <div>星期五 11:00~13:00</div>
                        <div>星期六 11:00~13:00</div>
                        <div>星期日 11:00~13:00</div>
                      </>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            {/* 評論區 */}
            <h4 className="text-2xl">評論</h4>
            <ol className="mt-6 divide-y">
              {/* li為單位作為ReviewCard */}
              <li className="flex flex-col py-4 ">
                <section className="mb-2 mr-4 flex items-center">
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <p>user55</p>
                </section>
                <section>
                  <section className="mb-4 flex">
                    <RatingStar rating={3.7} />
                    <p>在2023年8月13日用過餐</p>
                  </section>
                  <p>
                    跟以前吃起來不太一樣了 滑牛有筋
                    麻辣鍋底沒調整也沒那麼麻那麼辣 豬肚鍋還不錯 料蠻多的
                    還有排骨 這次桌邊服務生蠻忙的？後來換的都沒什麼服務到
                    要自己倒水 換盤子 有要求唱生日快樂歌有做到還不錯
                  </p>
                </section>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
