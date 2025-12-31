// src/components/ui/DataTable/index.tsx
'use client';

import React from 'react';
import TableHeading from './TableHeading';
import DataRow from './DataRow';
import TableSkeleton from './TableSkeleton';
import { ColumnConfig, SortConfig } from '@/types/table';

interface DataTableProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
  isLoading?: boolean;
  sortConfig?: SortConfig | null;
  onSort?: (key: string) => void;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  isLoading,
  sortConfig,
  onSort,
  onRowClick,
  emptyMessage = "Không tìm thấy dữ liệu phù hợp."
}: DataTableProps<T>) {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <TableHeading 
            columns={columns} 
            sortConfig={sortConfig} 
            onSort={onSort} 
          />
          
          <tbody className="relative">
            {isLoading ? (
              // Hiển thị Skeleton khi đang tải
              <TableSkeleton columnCount={columns.length} rowCount={5} />
            ) : data.length === 0 ? (
              // Hiển thị thông báo trống
              <tr>
                <td colSpan={columns.length} className="py-20 text-center text-gray-400 text-sm italic">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              // Hiển thị dữ liệu thật
              data.map((item, index) => (
                <DataRow 
                  key={(item as any).id || index} 
                  item={item} 
                  columns={columns} 
                  onClick={onRowClick}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}