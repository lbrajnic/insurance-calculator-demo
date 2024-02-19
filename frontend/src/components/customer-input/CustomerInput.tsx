import React from "react";

type className = {
  base: string;
  label: string;
  input: string;
};

type CustomerInputProps = {
  id: string;
  className: className;
  extraLabel?: string;
  name: string;
  text: string;
  type: string;
  value: number | string | undefined;
  required?: boolean;
  min?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomerInput: React.FC<CustomerInputProps> = ({
  id,
  className,
  extraLabel,
  name,
  text,
  type,
  value,
  required,
  onChange,
  min,
}) => {
  return (
    <div className={`flex ${className.base}`}>
      <label htmlFor={id} className={`mr-2 ${className.label}`}>
        {text}
      </label>
      <input
        id={id}
        aria-labelledby={id}
        className={`pl-1 border border-gray-600 rounded ${className.input}`}
        name={name}
        title={text}
        type={type}
        value={value !== undefined ? value : ""}
        onChange={onChange}
        required={required}
        min={min}
      />
      {extraLabel && <span className="ml-2">{extraLabel}</span>}
    </div>
  );
};

export default CustomerInput;
