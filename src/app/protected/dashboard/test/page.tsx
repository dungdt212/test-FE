'use client';

import React, { useState } from 'react'; // Thêm useState
import TableHeading from '@/components/DataTable/TableHeading';
import { ColumnConfig, SortConfig } from '@/types/table';
import Button from '@/components/Button'; 
import { UserPlus, Trash2, Edit, Save, Loader2, Crown, Zap, AlertTriangle, Timer, 
        CheckCircle, Edit3, MoreVertical, Phone, ArrowLeft } from 'lucide-react';
import ToggleSwitch from '@/components/ToggleSwitch';
import Toast from '@/components/Toast';
import SuccessPopup from '@/components/SuccessPopup';
import SearchBar from '@/components/SearchBar';
import PlanModal from '@/components/PlanModal';
import LoadingOverlay from '@/components/LoadingOverlay';
import Header from '@/components/Header';
import EmployeeForm from '@/components/EmployeeForm';
import ConfirmModal from '@/components/ConfirmModal';
import ClientsTable from '@/components/ClientsTable';
import Account from '@/components/Account';
import Badge from '@/components/Badge';
import CustomerCell from '@/components/CustomerCell';
import DataRow from '@/components/DataTable/DataRow';
import { useHeader } from '@/context/HeaderContext';
import { useEffect } from 'react';


export default function TestComponents() {
    // Thêm header cho trang này  
    const { setHeader } = useHeader();
    useEffect(() => {
      setHeader({
        title: 'Test Component',
      });
    }, [setHeader]);



  // 1. Quản lý trạng thái Sort cho bảng Công việc
  const [jobSort, setJobSort] = useState<SortConfig>({ key: 'date', direction: 'desc' });

  // 2. Định nghĩa cột cho Bảng Công việc (Sát với hình ảnh thực tế của bạn)
  const jobColumns = [
  { key: 'customer', label: 'Khách hàng', width: '25%' }, 
  { key: 'service', label: 'Dịch vụ', width: 'auto' },  
  { key: 'date', label: 'Ngày', width: '160px' },      
  { key: 'status', label: 'Trạng thái', width: '140px', align: 'center' },
  { key: 'actions', label: '', width: '80px' },       
];

  // 3. Định nghĩa cột cho Bảng Nhân viên (Test bảng có nhiều cột hơn)
  const employeeColumns: ColumnConfig<any>[] = [
    { key: 'id', label: 'Mã NV', sortable: true },
    { key: 'name', label: 'Họ và tên', sortable: true },
    { key: 'role', label: 'Vị trí', sortable: false },
    { key: 'salary', label: 'Lương', align: 'right', sortable: true },
  ];

  // Hàm handle sort mẫu
  const handleSort = (key: string) => {
    setJobSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    console.log(`Sorting by ${key}`);
  };


  const testCustomers = [
    {
      id: 1,
      name: "Hùng",
      address: "Quận 7, TP.HCM",
      avatar: "" // Không có ảnh -> Phải hiện "PH"
    },
    {
      id: 2,
      name: "Nguyễn An",
      address: "Bình Thạnh, TP.HCM",
      avatar: "https://i.pravatar.cc/150?u=2" // Có ảnh thực tế
    },
    {
      id: 3,
      name: "Công ty TNHH Giải pháp Công nghệ Toàn Cầu Xanh", // Tên siêu dài
      address: "Khu công nghệ cao, Quận 9, TP. Thủ Đức",
      avatar: "" // Phải hiện "CT" và bị truncate
    },
    {
      id: 4,
      name: "Trần Lê",
      address: "", // Thiếu địa chỉ
      avatar: ""
    }
  ];



  // 1. Định nghĩa kiểu dữ liệu cho bảng Test
interface JobTest {
  id: string;
  customerName: string;
  address: string;
  avatar: string;
  service: string;
  status: 'green' | 'red' | 'yellow' | 'blue' | 'black';
  statusLabel: string;
  price: number;
}


  // 2. Dữ liệu mẫu (Mock Data)
  const mockJobs: JobTest[] = [
    {
      id: 'JOB-001',
      customerName: 'Phạm Hùng',
      address: 'Quận 7, TP.HCM',
      avatar: '',
      service: 'Vệ sinh máy lạnh nội bộ',
      status: 'green',
      statusLabel: 'Hoàn thành',
      price: 550000,
    },
    {
      id: 'JOB-002',
      customerName: 'Nguyễn An',
      address: 'Bình Thạnh, TP.HCM',
      avatar: 'https://i.pravatar.cc/150?u=a',
      service: 'Sửa chữa điện nước',
      status: 'red',
      statusLabel: 'Quá hạn',
      price: 1200000,
    }
  ];

  // 3. Cấu hình Columns để test DataRow
  const testColumns: ColumnConfig<JobTest>[] = [
    // {
    //   key: 'customer',
    //   label: 'Khách hàng',
    //   width: '280px',
    //   render: (item) => (
    //     <CustomerCell 
    //       customer={{ name: item.customerName, phone: item.phone, avatar: item.avatar }} 
    //     />
    //   )
    // },
    {
      key: 'service',
      label: 'Dịch vụ',
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-[#2d3a35]">{item.service}</span>
          <span className="text-xs text-gray-400">#{item.id}</span>
        </div>
      )
    },
    {
      key: 'price',
      label: 'Thanh toán',
      align: 'right',
      render: (item) => (
        <span className="font-bold text-[#2d3a35]">
          {item.price.toLocaleString('vi-VN')}đ
        </span>
      )
    },

    {
      key: 'actions',
      label: '',
      align: 'right',
      width: '100px',
      render: (item) => (
        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <Edit3 size={16} />
          </button>
          <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];


  return (
    <div className="p-10 space-y-8 bg-gray-50 min-h-screen">
      
      {/* Nhóm 1: Các hành động chính (Variants) */}
      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700">1. Các biến thể màu sắc (Variants)</h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            label="Thêm nhân viên" 
            icon={UserPlus} 
            variant="primary"
            onClick={() => console.log('Primary clicked')} 
            className='px-6'
          />
          <Button 
            label="Lưu thay đổi" 
            icon={Save} 
            variant="success"
            onClick={() => console.log('Success clicked')} 
          />
          <Button 
            label="Sửa thông tin" 
            icon={Edit} 
            variant="outline"
            onClick={() => console.log('Outline clicked')} 
          />
          <Button 
            label="Xóa bản ghi" 
            icon={Trash2} 
            variant="danger" 
            onClick={() => console.log('Danger clicked')} 
          />
          <Button 
      label="Quay lại" 
      icon={ArrowLeft} 
      iconPosition="right" 
      variant="outline"
      isBordered={true}
    />
        </div>
      </section>

      {/* Nhóm 2: Trạng thái Loading và Disabled */}
      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700">2. Trạng thái Loading & Khác</h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            label="Đang lưu..." 
            variant="primary"
            isLoading={true} 
            onClick={() => {}} 
          />
          <Button 
            label="Xóa" 
            variant="danger"
            icon={Trash2}
            isLoading={true} 
            onClick={() => {}} 
          />
          <Button 
            label="Không có Icon" 
            variant="outline"
            onClick={() => console.log('No icon clicked')} 
          />
        </div>
      </section>

      {/* <Toast 
        message='Đăng nhập thành công'
        type="success"

      /> */}

      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700">4. Toogle</h2>
        <ToggleSwitch checked={true} loading={true} onChange={() => {}}/>
        <ToggleSwitch checked={false} loading={true} onChange={() => {}} />
        <ToggleSwitch checked={true} loading={false} onChange={() => {}}/>
          <ToggleSwitch checked={false} loading={false} onChange={() => {}} />
      </section>


      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700">8. Kiểm thử DataRow (TableRow động)</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full table-fixed border-collapse">
            <TableHeading columns={testColumns} />
            <tbody>
              {mockJobs.map((job) => (
                <DataRow 
                  key={job.id} 
                  item={job} 
                  columns={testColumns} 
                  onClick={(item) => console.log('Bấm vào dòng:', item.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}