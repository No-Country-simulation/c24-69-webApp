import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  customStyle?: string;
  checked?: boolean; // Para checkboxes y radio
}

const InputCustom: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  customStyle,
  checked,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-md font-medium">{label}</label>
      {type === "checkbox" || type === "radio" ? (
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type={type}
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
            className="hidden"
          />
          <span className="custom-checkbox" />
        </label>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`input-bg-theme w-full p-2 outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${customStyle}`}
        />
      )}
    </div>
  );
};

export default InputCustom;
