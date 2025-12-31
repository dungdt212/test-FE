'use client';

import Link from 'next/link';
import { ColumnConfig } from '@/types/table';
import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import CustomerCell from '@/components/CustomerCell';
import Badge, { BadgeVariant } from '@/components/Badge';
import { Plus, Calendar, List, PlusCircle, BarChart3, ChevronRight, EyeIcon } from 'lucide-react';

import { useHeader } from '@/context/HeaderContext';
import { useEffect } from 'react';

// Mock data cho bảng công việc
import { MOCK_BOOKINGS } from '@/mocks/bookings';

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
        onClick={(e) => { e.stopPropagation(); console.log("Detail:", item.id); }}
        className="p-2 hover:bg-white rounded-lg text-[#93ada3] hover:text-green-600 transition-all"
      >
        <EyeIcon className="w-5 h-5" />
      </button>
    ),
  },
];

export default function JobsPage() {
  const { setHeader } = useHeader();
  useEffect(() => {
    setHeader({
      title: 'Công việc',
      button: (
        <Link href="/protected/dashboard/jobs/create">
          <Button label="Tạo công việc mới" icon={Plus} variant="primary" />
        </Link>
      ),
    });
  }, [setHeader]);

  // Lấy 5 công việc đầu tiên
  const recentJobs = MOCK_BOOKINGS.slice(0, 5);

  // Tính toán số liệu thống kê thực tế từ 15 data
  const stats = [
    { label: 'Tổng công việc', count: MOCK_BOOKINGS.length.toString().padStart(2, '0'), color: 'text-gray-900' },
    { label: 'Đang thực hiện', count: MOCK_BOOKINGS.filter(b => b.status === 'processing').length.toString().padStart(2, '0'), color: 'text-green-500' },
    { label: 'Chưa phân công', count: MOCK_BOOKINGS.filter(b => !b.worker).length.toString().padStart(2, '0'), color: 'text-gray-900' },
    { label: 'Đã hủy', count: MOCK_BOOKINGS.filter(b => b.status === 'cancelled').length.toString().padStart(2, '0'), color: 'text-red-500', sub: 'Cần kiểm tra' },
  ];

  return (
    <div className="pb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 bg-white rounded-2xl border ${stat.sub ? 'border-red-100 bg-red-50/10' : 'border-gray-100 shadow-sm'}`}>
            <p className="text-xs font-medium text-gray-500 flex items-center gap-2">
              {stat.sub && <span className="text-red-500 text-lg">⚠️</span>} {stat.label}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-4xl font-bold ${stat.color}`}>{stat.count}</span>
              {stat.sub && <span className="text-xs text-red-400 font-medium">{stat.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className='mb-12'>
        <h3 className="text-sm font-bold text-gray-800 mb-4">Hành động nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Lịch công việc', sub: 'Xem lịch biểu', icon: Calendar, href: '/protected/dashboard/jobs/calendar' },
            { label: 'Danh sách', sub: 'Tất cả công việc', icon: List, href: '/protected/dashboard/jobs/all' },
            { label: 'Tạo mới', sub: 'Thêm việc mới', icon: PlusCircle, href: '/protected/dashboard/jobs/create' },
            { label: 'Báo cáo', sub: 'Sắp ra mắt', icon: BarChart3, href: '/protected/dashboard/jobs/report' },
          ].map((act, i) => (
            <Link 
              key={i} 
              href={act.href}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-green-50 transition-colors">
                <act.icon className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{act.label}</p>
                <p className="text-[11px] text-gray-400">{act.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Danh sách công việc gần nhất</h3>
          <Link href="/protected/dashboard/jobs/all">
            <Button 
              label="Xem tất cả" 
              icon={ChevronRight} 
              variant="outline" 
              iconPosition='right'
              isBordered={false}
              className="text-xs text-green-600 font-bold" 
            />
          </Link>
        </div>

        <DataTable 
          columns={columns} 
          data={recentJobs} // Sử dụng mảng 5 phần tử đã slice
          isLoading={false}
          onRowClick={(item) => console.log("Xem chi tiết:", item.id)}
        />
        
        <div className="flex justify-center mt-4">
           <p className="text-xs text-gray-400 italic">Hiển thị 5 trên tổng số {MOCK_BOOKINGS.length} công việc</p>
        </div>
      </div>
    </div>
  );
}