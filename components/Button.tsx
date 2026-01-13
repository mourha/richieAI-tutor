
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-sm";
  
  const variants = {
    primary: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/25 hover:shadow-lg",
    secondary: "bg-white text-indigo-900 border-2 border-indigo-50 hover:bg-indigo-50/50",
    outline: "bg-transparent border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50",
    glass: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
