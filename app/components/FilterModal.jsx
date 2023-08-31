import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import RadioButton from "./RadioButton";

const FilterModal = ({ open, onClose, onConfirm }) => {
  const [selectedOpenNow, setSelectedOpenNow] = useState("yes");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(3000);

  const priceCollection = [
    { id: "lowPrice", value: "low", label: "低" },
    { id: "middlePrice", value: "middle", label: "中" },
    { id: "highPrice", value: "high", label: "高" },
  ];
  const openNowCollection = [
    { id: "yes", value: "yes", label: "是" },
    { id: "not", value: "not", label: "否" },
  ];
  const distanceCollection = [
    { id: "three", value: 3000, label: "3公里以內" },
    { id: "five", value: 5000, label: "5公里以內" },
  ];
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
    <Dialog
      open={open}
      onClose={onClose}
      // className="relative z-50"
    >
      {/* id popup1 */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* 白色方框 */}
      <Dialog.Panel className="fixed inset-0 mx-[auto] my-[75px] w-[50vw] min-w-[300px] border border-solid border-zinc-400 bg-white p-5">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-2xl">篩選</Dialog.Title>
          <button
            className=" right-0 top-0 h-[30px] w-[30px]"
            onClick={onClose}
          >
            <XMarkIcon />
          </button>
        </div>
        <div className="max-h-[50vh] overflow-auto">
          <div className="flex flex-col gap-6">
            <div role="group" className="grid grid-cols-[1fr] gap-2">
              <h3 className="mt-4">營業中</h3>
              <form className="flex flex-wrap gap-2">
                {openNowCollection.map(({ id, value, label }) => (
                  <RadioButton
                    key={id}
                    id={id}
                    value={value}
                    label={label}
                    onChange={(e) => setSelectedOpenNow(e.target.value)}
                    selectedValue={selectedOpenNow}
                    name="openNow"
                  />
                ))}
              </form>
              {/* second option */}
              <h3 className="mt-4">價錢</h3>
              <form className="flex flex-wrap gap-2">
                {priceCollection.map(({ id, value, label }) => (
                  <label htmlFor={id} className="flex items-center" key={id}>
                    <input
                      id={id}
                      type="checkbox"
                      name="price"
                      // value={value}
                      className=" active hidden"
                      checked={selectedPrices.includes(value)}
                      onChange={(e) => handlePriceChange(e, value)}
                    />
                    <span className="w-auto min-w-[50px] rounded-2xl border-2 border-solid border-gray-400 bg-slate-50 px-3 py-2 text-center ">
                      <div className="flex">
                        <span className=" font-light text-black ">{label}</span>
                      </div>
                    </span>
                  </label>
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
                    selectedValue={selectedDistance}
                    name="distance"
                  />
                ))}
              </form>
            </div>
            <button onClick={handleConfirmClick}>確認</button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default FilterModal;
