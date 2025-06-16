import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Translate, useLanguage } from "translate-easy";
function FormSelect({
  selectLabel,
  handleChange,
  options,
  value,
  name,
  headOption,
}) {
  const { selectedLanguage } = useLanguage();
  return (
    <div className="relative">
      <select
        onChange={handleChange}
        id={selectLabel}
        name={name}
        className="
         w-[7rem] p-2 py-2 px-2 mt-3 rounded-full border-gray-200
           border-1 border-solid shadow-md focus:outline-none text-gray-800 dark:text-black text-base
           appearance-none bg-white 
           "
        value={value}
      >
        <option value="" className="" disabled>
          <Translate>{headOption}</Translate>
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            <Translate>{option.label}</Translate>
          </option>
        ))}
      </select>
      <div className="pointer-events-none text-gray-600  font-bold">
        <MdKeyboardArrowDown
          className={`absolute top-[1.5rem] ${selectedLanguage.code === "ar" ? "left-1" : "right-1"
            }`}
          size={32}
        />
      </div>
    </div>
  );
}

export default FormSelect;
