'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHeader } from '@/context/HeaderContext';


export default function TestUserPage() {

  // Thêm header cho trang này  
  const { setHeader } = useHeader();
  useEffect(() => {
    setHeader({
      title: 'Test API',
    });
  }, [setHeader]);



  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Lấy dữ liệu từ Local Storage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // 2. Kiểm tra nếu không có token thì bắt đăng nhập lại
    if (!token || !storedUser) {
      router.push('/auth/login');
      return;
    }

    try {
      // 3. Parse chuỗi JSON thành Object
      setUserData(JSON.parse(storedUser));
    } catch (error) {
      console.error("Lỗi parse dữ liệu user:", error);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear(); // Xóa sạch dữ liệu để test log out
    router.push('/auth/login');
  };

  if (!userData) return <div className="p-8 text-white">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-400">✅ Đăng nhập thành công</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Đăng xuất
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-slate-700 pb-2 text-slate-400">
            Thông tin Admin
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-slate-500">Họ và tên:</div>
            <div className="col-span-2 font-medium">{userData.fullName}</div>

            <div className="text-slate-500">Email:</div>
            <div className="col-span-2">{userData.email}</div>

            <div className="text-slate-500">Quyền hạn:</div>
            <div className="col-span-2">
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs uppercase">
                {userData.role}
              </span>
            </div>

            <div className="text-slate-500">Trạng thái:</div>
            <div className="col-span-2">
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                {userData.status}
              </span>
            </div>

            <div className="text-slate-500">ID:</div>
            <div className="col-span-2 text-xs font-mono text-slate-400">{userData.id}</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-4 text-slate-400">
            Dữ liệu JSON thô (Raw Data)
          </h2>
          <pre className="bg-black/50 p-4 rounded-lg overflow-auto text-xs text-green-300 font-mono">
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}