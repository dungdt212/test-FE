import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BadgeVariant = 'success' | 'info' | 'warning' | 'error' | 'neutral' | 'primary';

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
  icon?: LucideIcon; 
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant, label, icon: Icon, className }) => {
  /** * THAY ĐỔI: Cập nhật mapping màu sắc theo dải 01-10
   * - Sử dụng '01' cho nền (nhẹ nhất)
   * - Sử dụng '02' cho viền (đậm hơn nền một chút)
   * - Sử dụng '06' hoặc '07' cho chữ (đủ độ tương phản để đọc)
   */
  const variants: Record<BadgeVariant, string> = {
    primary: "bg-primary-50 text-primary-700 border-primary-100",
    success: "bg-green-50 text-green-700 border-green-100", 
    info: "bg-blue-50 text-blue-700 border-blue-100",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-100",
    error: "bg-red-50 text-red-700 border-red-100",
    neutral: "bg-gray-50 text-gray-700 border-gray-100",
  };

  return (
    <span className={cn(
      /** * THAY ĐỔI: Cập nhật Typography
       * - Thay 'text-[10px]' bằng 'text-body3' (token 12px đã định nghĩa)
       * - Thêm 'font-bold' hoặc giữ nguyên 'font-semibold' tùy figma
       */
      "inline-flex items-center px-2 py-0.5 rounded-full border tracking-wider text-xs",
      variants[variant],
      className
    )}>
      {/* Hiện Icon hoặc dấu chấm tròn */}
      {Icon ? (
        <Icon className="w-3 h-3 mr-1 stroke-[2.5px]" />
      ) : (
        <span className="w-1 h-1 rounded-full mr-1.5 bg-current" />
      )}
      
      {label}
    </span>
  );
};

export default Badge;