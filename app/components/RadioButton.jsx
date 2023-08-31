import React from "react";

const RadioButton = ({ id, value, label, onChange, selectedValue, name }) => {
  return (
    <label htmlFor={id} className="flex items-center">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        className="active hidden"
        checked={selectedValue === value}
        onChange={onChange}
      />
      <span className="w-auto min-w-[50px] rounded-2xl border-2 border-solid border-gray-400 bg-slate-50 px-3 py-2 text-center ">
        <div className="flex">
          <span className="font-light text-black">{label}</span>
        </div>
      </span>
    </label>
  );
};

export default RadioButton;
