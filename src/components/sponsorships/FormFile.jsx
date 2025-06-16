import React, { useRef } from 'react';
import { Translate } from 'translate-easy';

const FormFile = ({ label, name, onChange }) => {
    const fileInputRef = useRef(null);

    const handleLabelClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <label
                onClick={handleLabelClick}
                className="flex items-center justify-center outline-none cursor-pointer bg-[#F13B48] text-white rounded-full w-40 h-10 text-center ease-linear duration-100"
            >
                <Translate>{label}</Translate>
            </label>
            <input
                type="file"
                id="file-upload"
                name={name}
                ref={fileInputRef}
                className="hidden"
                onChange={onChange}
                accept=".pdf,.doc,.docx"
            />
        </div>
    );
};

export default FormFile;
