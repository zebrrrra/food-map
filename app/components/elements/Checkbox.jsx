const Checkbox = ({ id, value, label, name, onChange, checked }) => {
  return (
    <label htmlFor={id} className="flex items-center">
      <input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        className="relative h-5 w-5  appearance-none border-[2px] border-solid border-black before:absolute before:ml-[2px] before:mt-[2px] before:h-3 before:w-3 before:bg-brand-700 before:opacity-0 before:content-[''] checked:before:opacity-100 "
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-1 flex items-center">
        <span className="text-black ">{label}</span>
      </span>
    </label>
  );
};

export default Checkbox;
