'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useHeader } from '@/context/HeaderContext';

export default function Header() {
  const { state } = useHeader();
  const pathname = usePathname();
  
  // 1. Lấy các segment và lọc bỏ 'protected', 'dashboard'
  const pathSegments = pathname.split('/').filter(item => 
    item !== '' && item !== 'protected' && item !== 'dashboard'
  );

  const getLabel = (href: string, segment: string) => {
    const PATH_MAP: Record<string, string> = {

      '/protected/dashboard/jobs': 'Công việc',
      '/protected/dashboard/jobs/calendar': 'Lịch công việc',
      '/protected/dashboard/jobs/all': 'Danh sách',
      '/protected/dashboard/jobs/create': 'Tạo mới',
      '/protected/dashboard/jobs/report': 'Báo cáo',

      '/protected/dashboard/services': 'Dịch vụ',
      '/protected/dashboard/services/create': 'Tạo mới',

    };
    // return PATH_MAP[href] || segment.charAt(0).toUpperCase() + segment.slice(1);
    if (PATH_MAP[href]) return PATH_MAP[href];

    // Kiểm tra an toàn: Nếu segment không tồn tại, trả về chuỗi rỗng
    if (!segment) return '';

    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const isSubPage = pathSegments.length > 1;

  return (
    <header className="sticky top-0 z-5 w-full bg-white backdrop-blur-md border-b border-gray-200 px-8 py-5 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          
          {/* 1. TITLE & DESCRIPTION */}
          <div className='mb-2'>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#2d3a35] tracking-tight">
              {state.title || getLabel(pathname, pathSegments[pathSegments.length - 1])}
            </h1>
            
            {state.description && (
              <p className="text-sm text-[#93ada3] max-w-2xl leading-relaxed mt-1 font-medium italic">
                {state.description}
              </p>
            )}
          </div>

          {/* 2. BREADCRUMBS - Chỉ hiển thị nếu là trang con */}
          {isSubPage && (
            <nav className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">
              {pathSegments.map((segment, index) => {
                const originalSegments = pathname.split('/').filter(i => i !== '');
                const currentIndexInOriginal = originalSegments.indexOf(segment);
                const href = `/${originalSegments.slice(0, currentIndexInOriginal + 1).join('/')}`;
                
                const isLast = index === pathSegments.length - 1;

                return (
                  <React.Fragment key={href}>
                    {isLast ? (
                      <span className="text-gray-600 font-black">{getLabel(href, segment)}</span>
                    ) : (
                      <>
                        <Link 
                          href={href} 
                          className="hover:text-gray-600 transition-colors cursor-pointer"
                        >
                          {getLabel(href, segment)}
                        </Link>
                        <ChevronRight className="w-3 h-3 opacity-40 text-gray-400" />
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}
        </div>

        {/* 3. ACTION BUTTON */}
        {state.button && (
          <div className="flex-shrink-0 animate-in fade-in slide-in-from-right-4 duration-500">
            {state.button}
          </div>
        )}
      </div>
    </header>
  );
}