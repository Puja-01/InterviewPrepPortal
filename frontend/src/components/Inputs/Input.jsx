import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-5 w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className={`relative flex items-center border rounded-lg transition-all duration-200 ${
        isFocused 
          ? "border-blue-500 shadow-input-focus" 
          : error 
            ? "border-red-500" 
            : "border-gray-300 hover:border-gray-400"
      }`}>
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 rounded-lg"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 text-gray-500 hover:text-blue-600 focus:outline-none"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEyeSlash size={18} />
            ) : (
              <FaRegEye size={18} />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;