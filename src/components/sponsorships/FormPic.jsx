import React from "react";
import { Translate } from "translate-easy";

function FormPic({ label, name, onChange }) {
  return (
    <div>
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center
                   outline-none cursor-pointer bg-[#F13B48] text-white rounded-full w-40 h-10
                   text-center ease-linear duration-100"
      >
        <Translate>{label}</Translate>
      </label>
      <input
        type="file"
        id="file-upload"
        name={name}
        className="hidden"
        onChange={onChange}
        multiple
        accept="image/*"
        alt={label}
      />
    </div>
  );
}

export default FormPic;
