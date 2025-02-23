import React from "react";
import { InputProps } from "@/types/common";

export const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon,
  iconPosition = 'right',
  className = "" 
}) => {
  const inputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`;

  const iconContainerClasses = `absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}:
      </label>
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className={iconContainerClasses}>
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          className={inputClasses}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
        />
        {icon && iconPosition === 'right' && (
          <div className={iconContainerClasses}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};