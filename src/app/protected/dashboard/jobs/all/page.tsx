'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useHeader } from '@/context/HeaderContext';
import { ColumnConfig } from '@/types/table';
import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import CustomerCell from '@/components/CustomerCell';
import Badge, { BadgeVariant } from '@/components/Badge';
import FilterBar, { FilterItem } from '@/components/FilterBar';
import { Plus, ChevronRight, EyeIcon } from 'lucide-react';

// Mock data ban đầu
import { MOCK_BOOKINGS } from '@/mocks/bookings';

// Cấu trúc cột giữ nguyên theo yêu cầu của bạn
const columns: ColumnConfig<any>[] = [
  {
    key: 'customer',
    width: '18%',
    label: 'Khách hàng',
    render: (item) => (
      <CustomerCell
        customer={{ name: item.customer.name, phone: item.customer.phone, avatar: item.customer.avatar }}
      />
    ),
  },
  {
    key: 'service',
    width: '13%',
    label: 'Dịch vụ',
    render: (item) => (
      <div>
        <p className="text-sm font-medium text-[#2d3a35]">{item.service.name}</p>
        <p className="text-[11px] text-green-600 font-bold uppercase">{item.service.package}</p>
      </div>
    ),
  },
  {
    key: 'zone',
    label: 'Khu vực',
    align: 'center',
    render: (item) => (
      <span className="px-3 py-1 rounded-full bg-[#f0f7f4] text-[#6b9685] text-[11px] font-bold">
        {item.zone}
      </span>
    ),
  },
  {
    key: 'worker',
    label: 'Nhân viên',
    render: (item) => item.worker ? (
      <div className="flex items-center gap-2">
        <img src={item.worker.avatar} alt="" className="w-6 h-6 rounded-full border border-gray-200" />
        <span className="text-sm text-[#2d3a35]">{item.worker.fullName}</span>
      </div>
    ) : (
      <span className="text-sm text-[#93ada3] italic">Chưa phân công</span>
    ),
  },
  {
    key: 'dateTime',
    label: 'Ngày & Giờ',
    render: (item) => <span className="text-sm text-[#2d3a35] font-medium">{item.dateTime}</span>,
  },
  {
    key: 'status',
    label: 'Trạng thái',
    align: 'center',
    render: (item) => {
      const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
        completed: { label: 'Hoàn thành', variant: 'success' },
        processing: { label: 'Đang làm', variant: 'info' },
        pending: { label: 'Chờ duyệt', variant: 'warning' },
        cancelled: { label: 'Đã hủy', variant: 'error' },
      };
      const { label, variant } = statusConfig[item.status] || { label: 'Không xác định', variant: 'neutral' };
      return <Badge label={label} variant={variant} />;
    },
  },
  {
    key: 'actions',
    label: 'Hành động',
    align: 'center',
    render: (item) => (
      <button 
        onClick={(e) => { e.stopPropagation(); console.log("Detail ID:", item.id); }}
        className="p-2 hover:bg-white rounded-lg text-[#93ada3] hover:text-green-600 transition-all"
      >
        <EyeIcon className="w-5 h-5" />
      </button>
    ),
  },
];

// Cấu hình Filter riêng cho bảng Jobs
const jobFilterConfig: FilterItem[] = [
  { key: 'search', label: 'Tìm kiếm', type: 'text', placeholder: 'Mã CV, khách hàng...' },
  { key: 'date', label: 'Ngày thực hiện', type: 'select', options: [{label: 'Hôm nay', value: 'today'}] },
  { key: 'zone', label: 'Khu vực', type: 'select', options: [{label: 'Zone A', value: 'Zone A'}, {label: 'Zone B', value: 'Zone B'}] },
  { key: 'worker', label: 'Nhân viên', type: 'select', options: [{label: 'Nguyễn Văn A', value: '1'}] },
  { key: 'status', label: 'Trạng thái', type: 'select', options: [{label: 'Hoàn thành', value: 'completed'}, {label: 'Đang xử lý', value: 'processing'}] },
];

export default function AllJobsPage() {
  const { setHeader } = useHeader();
  
  // States quản lý dữ liệu và phân trang
  const [data, setData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // States cho Filters và Phân trang (Sẽ gửi lên Backend)
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // HÀM GỌI API (SERVER-SIDE FETCHING)
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    
    // Log để bạn kiểm tra query chuẩn bị gửi đi
    console.log("Fetching API với params:", { ...filters, page: currentPage, limit: pageSize });

    /** * CHỜ API THỰC TẾ:
     * const queryString = new URLSearchParams({...filters, page: currentPage, limit: pageSize}).toString();
     * const response = await fetch(`/api/jobs?${queryString}`);
     * const result = await response.json();
     * setData(result.data);
     * setTotalItems(result.total);
     */

    // GIẢ LẬP: Xử lý tạm thời tại frontend cho đến khi có API
    setTimeout(() => {
      setData(MOCK_BOOKINGS.slice((currentPage - 1) * pageSize, currentPage * pageSize));
      setTotalItems(MOCK_BOOKINGS.length);
      setIsLoading(false);
    }, 600);
  }, [filters, currentPage, pageSize]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    setHeader({
      title: 'Tất cả công việc',
      button: (
        <Link href="/protected/dashboard/jobs/create">
          <Button label="Tạo công việc mới" icon={Plus} variant="primary" />
        </Link>
      ),
    });
  }, [setHeader]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset trang khi lọc
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="space-y-4">
      {/* Sử dụng Component Filter dùng chung */}
      <FilterBar config={jobFilterConfig} onChange={handleFilterChange} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/40 z-10 flex items-center justify-center backdrop-blur-[1px]">
             <div className="flex items-center gap-2 text-green-600 font-medium">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                Đang tải dữ liệu...
             </div>
          </div>
        )}

        <DataTable columns={columns} data={data} isLoading={false} />

        {/* PAGINATION SECTION */}
        <div className="p-4 bg-[#fcfdfd] border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <p className="text-xs text-[#93ada3]">
              Hiển thị <span className="font-bold text-[#2d3a35]">{(currentPage - 1) * pageSize + 1}</span> đến{' '}
              <span className="font-bold text-[#2d3a35]">{Math.min(currentPage * pageSize, totalItems)}</span> của{' '}
              <span className="font-bold text-[#2d3a35]">{totalItems}</span> công việc
            </p>
            
            <select 
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="text-xs font-bold text-[#2d3a35] bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-green-500"
            >
              <option value={5}>5 / trang</option>
              <option value={10}>10 / trang</option>
              <option value={20}>20 / trang</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-1.5 text-xs font-medium text-[#93ada3] disabled:opacity-30"
            >
              Trước
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 text-xs rounded-lg font-bold transition-all ${
                  currentPage === i + 1 
                  ? 'bg-green-500 text-white shadow-sm' 
                  : 'text-[#93ada3] hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-1.5 text-xs font-medium text-[#93ada3] disabled:opacity-30"
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}