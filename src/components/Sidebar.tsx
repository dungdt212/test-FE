'use client';

import Link from 'next/link';
import Account from '@/components/Account';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Thêm icon đóng mở

import {
  LayoutDashboard,
  Briefcase,
  Wrench,
  FileText,
  Users,
  Receipt,
  Users2,
  Map,
  Image as ImageIcon,
  Bell,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

// Tách danh sách link chính và link hệ thống
export const MAIN_LINKS = [
  { label: 'Tổng quan', href: '/protected/dashboard', icon: LayoutDashboard },
  { label: 'Công việc', href: '/protected/dashboard/jobs', icon: Briefcase },
  { label: 'Dịch vụ', href: '/protected/dashboard/services', icon: Wrench },
  { label: 'Báo giá & Đơn hàng', href: '/protected/quotes', icon: FileText },
  { label: 'Khách hàng', href: '/protected/customers', icon: Users },
  { label: 'Hóa đơn', href: '/protected/invoices', icon: Receipt },
  { label: 'Đội ngũ', href: '/protected/team', icon: Users2 },
  { label: 'Khu vực (Zone)', href: '/protected/zones', icon: Map },
  { label: 'Ảnh Trước/Sau', href: '/protected/gallery', icon: ImageIcon },
  { label: 'Test Component', href: '/protected/dashboard/test', icon: Settings },
];

export const BOTTOM_LINKS = [
  { label: 'Thông báo', href: '/protected/notifications', icon: Bell, badge: 3 },
  { label: 'Cài đặt', href: '/protected/settings', icon: Settings },
];

export default function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const renderLink = (item: any) => {
    const isActive = item.href === '/protected/dashboard' 
    ? pathname === item.href 
    : pathname.startsWith(item.href);

    const Icon = item.icon;

    return (
      <li key={item.href}>
        <Link
          href={item.href}
          className={`
            group flex items-center p-3 rounded-xl text-sm font-medium transition-all duration-200
            ${isActive 
                ? 'bg-green-50 text-green-600 shadow-sm shadow-green-100/50' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }
            ${isCollapsed ? 'justify-center' : 'justify-between'}
          `}
          title={isCollapsed ? item.label : ''}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 flex items-center justify-center transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
              }`}>
              <Icon className="w-5 h-5" />
            </div>
            {!isCollapsed && <span>{item.label}</span>}
          </div>

          {!isCollapsed && item.badge && (
            <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {item.badge}
            </span>
          )}
          
          {/* Badge nhỏ khi collapse (tùy chọn) */}
          {isCollapsed && item.badge && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          )}
        </Link>
      </li>
    );
  };

  return (
    <nav
      className={`fixed flex flex-col h-screen bg-white text-black p-4 border-r border-gray-200 shadow-sm transition-all duration-300 
        ${ isCollapsed ? 'w-20' : 'w-64'}
        ${className}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 z-50 cursor-pointer"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Brand Logo */}
      <div className={`mb-6 flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center' : 'px-2'}`}>
        <div className="min-w-[40px] w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <span className="text-green-600 text-xl">🌿</span>
        </div>
        {!isCollapsed && (
          <div className="whitespace-nowrap">
            <h1 className="text-lg font-semibold">Lawn Lover</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        )}
      </div>

      {/* Main Links */}
      <ul className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
        {MAIN_LINKS.map(renderLink)}
      </ul>

      {/* Bottom Section */}
      <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
        <ul className="space-y-2">
          {BOTTOM_LINKS.map(renderLink)}
        </ul>
        <div className={`pt-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <Account isCollapsed={isCollapsed} />
        </div>
      </div>
    </nav>
  );
}