import React from 'react';
import { ColumnConfig } from '@/types/table';

interface DataRowProps<T> {
  item: T;
  columns: ColumnConfig<T>[];
  onClick?: (item: T) => void;
  className?: string;
}

export default function DataRow<T>({ 
  item, 
  columns, 
  onClick, 
  className = '' 
}: DataRowProps<T>) {
  return (
    <tr 
      onClick={() => onClick?.(item)}
      className={`group hover:bg-[#f7faf9]/50 transition-colors border-b border-gray-50 last:border-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {columns.map((col) => (
        <td 
          key={col.key} 
          style={{ width: col.width }}
          className={`
            px-6 py-4 text-sm text-[#2d3a35]
            ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
          `}
        >
          {/* Nếu có hàm render thì dùng render, nếu không thì hiển thị text thuần */}
          {col.render ? col.render(item) : (item as any)[col.key]}
        </td>
      ))}
    </tr>
  );
}