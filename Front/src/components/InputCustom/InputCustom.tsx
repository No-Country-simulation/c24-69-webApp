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
      {type === "checkbox" || type === "radio" ? (
        // Div para checkbox/radio
        <div className="flex items-center space-x-2">
          <span className="ml-2 text-lg">{label}</span> {/* Texto al lado del checkbox */}
          <input
            type={type}
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
            className="hidden"
          />
          <span className="custom-checkbox" />
        </div>
      ) : (
        // Div para otros tipos de input
        <div className="flex flex-col">
          <label className="text-lg text-start font-medium">{label}</label>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`input-bg-theme w-full p-2 outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${customStyle}`}
          />
        </div>
      )}
    </div>
  );
};

export default InputCustom;
