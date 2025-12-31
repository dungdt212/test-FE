import React from 'react';

interface TableSkeletonProps {
  rowCount?: number;
  columnCount: number;
}

export default function TableSkeleton({ rowCount = 5, columnCount }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse border-b border-gray-50 last:border-none">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-5">
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}