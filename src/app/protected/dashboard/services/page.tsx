'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useHeader } from '@/context/HeaderContext';
import { ColumnConfig } from '@/types/table';
import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import Badge, { BadgeVariant } from '@/components/Badge';
import FilterBar, { FilterItem } from '@/components/FilterBar';
import ToggleSwitch from '@/components/ToggleSwitch'; // Import component của bạn
import { Plus, Scissors, Trees, Trash2, Bug, Droplets, EyeIcon, Info } from 'lucide-react';

// Mock data
import { MOCK_SERVICES, ServiceItem } from '@/mocks/services';

const ServiceIcon = ({ type }: { type: string }) => {
  const icons = {
    grass: <Scissors className="w-5 h-5 text-green-600" />,
    tree: <Trees className="w-5 h-5 text-blue-600" />,
    broom: <Trash2 className="w-5 h-5 text-orange-600" />,
    bug: <Bug className="w-5 h-5 text-red-600" />,
    water: <Droplets className="w-5 h-5 text-cyan-600" />,
  };
  return (
    <div className={`p-2 rounded-xl bg-opacity-10 ${
      type === 'grass' ? 'bg-green-100' : 
      type === 'tree' ? 'bg-blue-100' : 
      type === 'broom' ? 'bg-orange-100' : 
      type === 'bug' ? 'bg-red-100' : 'bg-cyan-100'
    }`}>
      {icons[type as keyof typeof icons] || <Scissors />}
    </div>
  );
};

const columns: ColumnConfig<ServiceItem>[] = [
  {
    key: 'name',
    label: 'TÊN DỊCH VỤ',
    width: '25%',
    render: (item) => (
      <div className="flex items-center gap-3">
        <ServiceIcon type={item.iconType} />
        <div>
          <p className="text-sm font-bold text-[#2d3a35]">{item.name}</p>
          <p className="text-[11px] text-[#93ada3] font-medium uppercase tracking-wider">Mã: {item.code}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'price',
    label: 'GIÁ / ĐƠN VỊ',
    render: (item) => (
      <p className="text-sm font-bold text-[#2d3a35]">
        {item.pricePerUnit} / <span className="font-medium text-[#93ada3]">{item.unit}</span>
      </p>
    ),
  },
  {
    key: 'zone',
    label: 'GIÁ / ZONE',
    render: (item) => {
      // Kiểm tra nếu không có cấu hình zone cụ thể
      if (!item.zonePricing || item.zonePricing.length === 0) {
        return (
          <div className="bg-[#f0f2f1] px-3 py-1 rounded-lg border border-[#e2e8e5] w-fit">
            <span className="text-[11px] font-bold text-[#5c6e67] tracking-tight">
              All Zones
            </span>
          </div>
        );
      }

      // Nếu có cấu hình, render danh sách các Zone
      return (
        <div className="flex flex-col w-fit gap-1">
          {item.zonePricing.map((zp, i) => (
            <div 
              key={i} 
              className="bg-[#f8faf9] px-2 py-0.5 rounded border border-[#eef2f0] text-[10px] flex items-center gap-1"
            >
              <span className="text-[#93ada3] font-bold uppercase">{zp.zone}:</span>
              <span className="text-green-600 font-extrabold">
                {zp.surcharge && zp.surcharge !== '0%' ? zp.surcharge : 'Gốc'}
              </span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    key: 'addons',
    label: 'ADD-ONS',
    align: 'center',
    render: (item) => (
      <span className={`text-xs font-bold ${item.addons.length > 0 ? 'text-[#2d3a35] bg-gray-100 px-2 py-0.5 rounded-full' : 'text-[#93ada3] italic'}`}>
        {item.addons.length} items
      </span>
    ),
  },
  {
    key: 'seasonal',
    label: 'THEO MÙA',
    align: 'center',
    render: (item) => (
      /* Khóa onClick bằng cách sử dụng pointer-events-none và giảm độ mờ nếu cần */
      <div className="pointer-events-none opacity-90 scale-90">
        <ToggleSwitch 
          checked={item.isSeasonal} 
          onChange={() => {}} // Hàm trống vì đã bị khóa click
        />
      </div>
    ),
  },
  {
    key: 'status',
    label: 'TRẠNG THÁI',
    align: 'center',
    render: (item) => {
      const config: Record<string, { label: string; variant: BadgeVariant }> = {
        active: { label: 'Hoạt động', variant: 'success' },
        inactive: { label: 'Tạm ngưng', variant: 'neutral' },
      };
      const { label, variant } = config[item.status];
      return <Badge label={label} variant={variant} />;
    },
  },
  {
    key: 'actions',
    label: 'HÀNH ĐỘNG',
    align: 'center',
    render: (item) => (
      <div className="flex items-center justify-center">
        <button 
          onClick={() => console.log("Xem chi tiết:", item.id)}
          className="p-2 text-[#93ada3] hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" 
          title="Xem chi tiết"
        >
          <EyeIcon className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

const serviceFilterConfig: FilterItem[] = [
  { key: 'search', label: 'Tìm kiếm', type: 'text', placeholder: 'Tên dịch vụ, mã...' },
  { key: 'status', label: 'Trạng thái', type: 'select', options: [
    { label: 'Hoạt động', value: 'active' },
    { label: 'Tạm ngưng', value: 'inactive' },
  ]},
];

export default function ServicesPage() {
  const { setHeader } = useHeader();
  const [data, setData] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    // GIẢ LẬP API FETCHING
    setTimeout(() => {
      setData(MOCK_SERVICES);
      setIsLoading(false);
    }, 600);
  }, [filters]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    setHeader({
      title: 'Quản lý dịch vụ',
      button: (
        <Link href="/protected/dashboard/services/create">
          <Button label="Thêm dịch vụ" icon={Plus} variant="primary" />
        </Link>
      ),
    });
  }, [setHeader]);

  return (
    <div className="space-y-4">
      <FilterBar config={serviceFilterConfig} onChange={(k, v) => setFilters(p => ({ ...p, [k]: v }))} />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 z-20 flex items-center justify-center backdrop-blur-[1px]">
             <div className="flex items-center gap-2 text-green-600 font-bold">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                Đang tải dữ liệu...
             </div>
          </div>
        )}

        <DataTable columns={columns} data={data} isLoading={false} />

        <div className="p-4 bg-[#fcfdfd] border-t border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <Info className="w-4 h-4 text-[#93ada3]" />
             <p className="text-[11px] text-[#93ada3] font-medium">
               Hiển thị <span className="text-[#2d3a35] font-bold">1 - {data.length}</span> dịch vụ
             </p>
          </div>
          <div className="flex gap-1">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-500 text-white text-xs font-bold shadow-sm">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}