import { ButtonProps } from "@/types/common";

export const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  const defaultClasses = 'font-semibold py-2 px-4 rounded focus:outline-none';
  return (
    <button className={`${defaultClasses} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};