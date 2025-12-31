// loading.tsx giả lập trang loading khi chờ API đổ dữ liệu về, tạo cảm giác thật hơn cho trải nghiệm

'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-80 bg-gray-100 rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Calendar Grid Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        {/* Calendar Header (Tháng/Năm) */}
        <div className="flex justify-between mb-8">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded mx-auto w-10"></div>
          ))}
        </div>

        {/* Calendar Cells */}
        <div className="grid grid-cols-7 gap-4">
          {[...Array(35)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-gray-50 rounded-xl border border-gray-50 flex items-center justify-center"
            >
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar/Info Skeleton (nếu có) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-2xl border border-gray-50"></div>
        ))}
      </div>
    </div>
  );
}