import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import RadioButton from "./RadioButton";
import Checkbox from "./Checkbox";

const priceCollection = [
  { id: "lowPrice", value: "low", label: "低" },
  { id: "middlePrice", value: "middle", label: "中" },
  { id: "highPrice", value: "high", label: "高" },
];
const openNowCollection = [{ id: "yes", value: "yes", label: "是" }];
const distanceCollection = [
  { id: 3000, value: 3000, label: "3公里以內" },
  { id: 5000, value: 5000, label: "5公里以內" },
];

const FilterModal = ({ open, onClose, onConfirm }) => {
  const [selectedOpenNow, setSelectedOpenNow] = useState("");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(3000);

  const handlePriceChange = (e, value) => {
    if (e.target.checked) {
      setSelectedPrices([...selectedPrices, value]);
    } else {
      setSelectedPrices(selectedPrices.filter((price) => price !== value));
    }
  };
  const handleConfirmClick = () => {
    const selectedData = {
      openNow: selectedOpenNow,
      prices: selectedPrices,
      distance: selectedDistance,
    };
    onConfirm(selectedData);
    onClose();
  };
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* overlay */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/*  center container*/}
        <div className=" flex min-h-full items-center justify-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* 白色方框 */}
            <Dialog.Panel className="border-zinc-400 fixed inset-0 mx-[auto] w-full min-w-[300px] border border-solid bg-white py-5 md:my-[75px] md:w-[50vw]">
              <div className="flex items-center justify-between border-b-2 border-solid border-gray-500 px-5 pb-5">
                <Dialog.Title className="text-2xl text-black">
                  篩選
                </Dialog.Title>
                <button
                  className=" right-0 top-0 h-[40px] w-[75px] rounded-2xl bg-brand-700 text-white"
                  onClick={handleConfirmClick}
                >
                  <span className="text-base tracking-[1px]">確認</span>
                </button>
              </div>
              <div className="max-h-[50vh] overflow-auto px-5">
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-[1fr] gap-2">
                    <h3 className="mt-4">營業中</h3>
                    <form className="flex flex-wrap gap-2">
                      {openNowCollection.map(({ id, value, label }) => (
                        <Checkbox
                          key={id}
                          id={id}
                          value={value}
                          label={label}
                          name="openNow"
                          onChange={(e) =>
                            setSelectedOpenNow(
                              e.target.checked ? e.target.value : "",
                            )
                          }
                          checked={selectedOpenNow === value}
                        />
                      ))}
                    </form>
                    {/* second option */}
                    <h3 className="mt-4">價錢</h3>
                    <form className="flex flex-wrap gap-2">
                      {priceCollection.map(({ id, value, label }) => (
                        <Checkbox
                          key={id}
                          id={id}
                          value={value}
                          label={label}
                          name="price"
                          onChange={(e) => handlePriceChange(e, value)}
                          checked={selectedPrices.includes(value)}
                        />
                      ))}
                    </form>
                    {/* third option */}
                    <h3 className="mt-4">距離</h3>
                    <form className="flex flex-wrap gap-2">
                      {distanceCollection.map(({ id, value, label }) => (
                        <RadioButton
                          key={id}
                          id={id}
                          value={value}
                          label={label}
                          onChange={(e) => setSelectedDistance(e.target.value)}
                          checked={Number(selectedDistance) === value}
                        />
                      ))}
                    </form>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FilterModal;
