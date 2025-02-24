import React, { FC, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";


interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'; // Restricting to common input types
  error?: string;
  icon?: React.ReactNode;
}

const TextInput: FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  type = 'text',
  error,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 font-medium mb-2">{label}</label>}

      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            {icon}
          </span>
        )}
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-10 py-3 border rounded-lg focus:outline-none transition-all ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-gray-300 focus:ring-2 focus:ring-purple-500"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} `}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;