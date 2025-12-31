"use client";
import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Toast from '@/components/Toast';

// 1. Tạo một component con chứa toàn bộ logic hiện tại của bạn
function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (searchParams.get('loginSuccess')) {
      showToast("Login successfully!", "success");

      const params = new URLSearchParams(searchParams.toString());
      params.delete('loginSuccess');
      const q = params.toString();
      router.replace(`${pathname}${q ? `?${q}` : ''}`, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  return (
    <div>
      Tong quan
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </div>
  );
}

// 2. Component chính (export default) sẽ bọc component con trong Suspense
export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}