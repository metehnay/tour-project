export interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export interface InputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}