'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authSlice';
import { getToken } from '@/config/token';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { HeaderProvider } from '@/context/HeaderContext';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, logout } = useAuthStore();
  
  // Quản lý trạng thái đóng/mở sidebar tại đây
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const storedToken = token || getToken();
    if (!storedToken) {
      logout();
      router.replace('/auth/login');
    }
  }, [token, logout, router]);

  return (
    <HeaderProvider>
      <div className='flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
        
        {/* Sidebar: Truyền state và hàm set vào */}
        <Sidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          className='h-screen z-50' 
        />

        {/* Nội dung chính: Cập nhật margin-left động dựa trên state */}
        <main 
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? 'ml-20' : 'ml-64'
          }`}
        >
          <Header />

          <div className="px-8 pb-10">
            {children}
          </div>
        </main>
      </div>
    </HeaderProvider>
  );
}