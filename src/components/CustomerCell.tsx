import React from 'react';
import { CustomerSummary } from '@/types/table';

interface CustomerCellProps {
  customer: CustomerSummary;
  className?: string;
}

const CustomerCell: React.FC<CustomerCellProps> = ({ customer, className = '' }) => {
  // Lấy 2 chữ cái đầu của tên để làm avatar mặc định (ví dụ: Phạm Hùng -> PH)
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Avatar Group */}
      <div className="flex-shrink-0">
        {customer.avatar ? (
          <img 
            src={customer.avatar} 
            alt={customer.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#eafaf1] flex items-center justify-center">
            <span className="text-[#27ae60] font-bold text-sm">
              {getInitials(customer.name)}
            </span>
          </div>
        )}
      </div>

      {/* Info Group */}
      <div className="flex flex-col min-w-0">
        <span className="text-[#1a1a1a] font-bold text-[14px] truncate">
          {customer.name}
        </span>
        {customer.phone && (
          <span className="text-[#93ada3] text-[12px] truncate">
            {customer.phone}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomerCell;