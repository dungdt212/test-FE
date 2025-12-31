"use client";

import React from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';

interface ButtonProps {
  label: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'danger' | 'success' | 'outline';
  isBordered?: boolean; 
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  label,
  icon: Icon,
  iconPosition = 'left',
  variant = 'primary',
  isBordered = false,
  isLoading,
  onClick,
  className = '',
  type = 'button'
}: ButtonProps) {
  
  // Định nghĩa màu sắc chủ đạo cho từng variant
  const variantStyles = {
    primary: {
      base: 'bg-[#27ae60] text-white hover:bg-[#219150]',
      border: 'border-[#1e8449]'
    },
    danger: {
      base: 'bg-[#e74c3c] text-white hover:bg-[#c0392b]',
      border: 'border-[#a93226]'
    },
    success: {
      base: 'bg-[#2980b9] text-white hover:bg-[#2471a3]',
      border: 'border-[#1a5276]'
    },
    outline: {
      base: 'bg-[#f7faf9] text-[#2d3a35] hover:bg-[#eef5f2]',
      border: 'border-[#e5efeb]'
    },
  };

  const currentVariant = variantStyles[variant];
  
  // Logic viền: Chỉ thêm class border khi isBordered là true
  const borderClass = isBordered ? `border ${currentVariant.border}` : 'border-transparent';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`
        flex items-center justify-center gap-2 px-2 py-2 rounded-xl font-bold transition-all 
        active:scale-95
        cursor-pointer 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${currentVariant.base} 
        ${borderClass}
        ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          <span>{label}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
}