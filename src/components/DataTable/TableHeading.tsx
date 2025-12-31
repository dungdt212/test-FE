'use client';

import React from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { ColumnConfig, SortConfig } from '@/types/table';

interface TableHeadingProps<T> {
  /** Danh sách cấu hình các cột */
  columns: ColumnConfig<T>[];
  
  /** Hàm xử lý khi người dùng nhấn vào tiêu đề để sắp xếp */
  onSort?: (key: string) => void;
  
  /** Trạng thái sắp xếp hiện tại (để hiển thị icon mũi tên) */
  sortConfig?: SortConfig | null;
  
  /** Thêm class tùy biến cho thẻ thead nếu cần */
  className?: string;
}

/**
 * Component TableHeading dùng chung cho tất cả các bảng trong hệ thống.
 * Hỗ trợ hiển thị tiêu đề, căn lề và trạng thái sắp xếp.
 */
export default function TableHeading<T>({
  columns,
  onSort,
  sortConfig,
  className = '',
}: TableHeadingProps<T>) {
  return (
    <thead className={`bg-[#f7faf9] border-b border-[#e5efeb] ${className}`}>
      <tr>
        {columns.map((col) => {
          const isSorted = sortConfig?.key === col.key;
          
          return (
            <th
              key={col.key}
              style={{ width: col.width }}
              className={`
                px-6 py-4 text-[11px] font-bold text-[#93ada3] uppercase tracking-wider
                ${col.sortable ? 'cursor-pointer hover:text-[#6b9685] select-none transition-colors' : ''}
                ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
              `}
              onClick={() => {
                if (col.sortable && onSort) {
                  onSort(col.key);
                }
              }}
            >
              <div
                className={`flex items-center gap-1.5 ${
                  col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Tiêu đề cột */}
                <span>{col.label}</span>

                {/* Khu vực hiển thị icon Sort */}
                {col.sortable && (
                  <div className="flex flex-col -space-y-1 opacity-60 group-hover:opacity-100">
                    <HiChevronUp
                      className={`h-2.5 w-2.5 ${
                        isSorted && sortConfig.direction === 'asc'
                          ? 'text-[#6b9685] scale-125'
                          : 'text-gray-300'
                      }`}
                    />
                    <HiChevronDown
                      className={`h-2.5 w-2.5 ${
                        isSorted && sortConfig.direction === 'desc'
                          ? 'text-[#6b9685] scale-125'
                          : 'text-gray-300'
                      }`}
                    />
                  </div>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}