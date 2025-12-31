'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useHeader } from '@/context/HeaderContext';
import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';
import { Save, ChevronLeft, Info, DollarSign, MapPin, Layers } from 'lucide-react';

// Import Mock Data
import { MOCK_ZONES } from '@/mocks/zones';

const MASTER_ADDONS = [
  { id: 'a1', name: 'Bón phân hữu cơ', price: '150.000' },
  { id: 'a2', name: 'Dọn dẹp sau cắt', price: '50.000' },
  { id: 'a3', name: 'Kiểm soát sâu bệnh', price: '200.000' },
];

export default function CreateServicePage() {
  const { setHeader } = useHeader();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State - Đã loại bỏ trường 'code'
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerUnit: '',
    unit: 'm²',
    isSeasonal: false,
    status: 'active',
    selectedAddons: [] as string[],
    // zonePricing giờ lưu thêm kiểu phí (type: '%' hoặc 'VNĐ')
    zonePricing: MOCK_ZONES.map(z => ({ 
      zoneId: z.id, 
      zoneName: z.name,
      value: '0', 
      type: '%' 
    })),
  });

  useEffect(() => {
    setHeader({
      title: 'Quản lý dịch vụ',
    //   button: (
    //     <Link href="/protected/dashboard/services">
    //       <Button label="Quay lại danh sách" icon={ChevronLeft} variant="secondary" />
    //     </Link>
    //   ),
    });
  }, [setHeader]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Logic xử lý dữ liệu trước khi gửi API
    console.log("Dữ liệu lưu:", formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/protected/dashboard/services');
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-24">
      
      {/* PHẦN 1: THÔNG TIN CƠ BẢN - Đã bỏ trường mã */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
          <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-sm">1</div>
          <h2 className="font-bold text-[#2d3a35]">Thông tin cơ bản</h2>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-[#93ada3] uppercase tracking-wider">Tên dịch vụ *</label>
          <input 
            required
            type="text" 
            placeholder="Ví dụ: Cắt cỏ định kỳ, Tỉa hàng rào..." 
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 text-sm transition-all"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-[#93ada3] uppercase tracking-wider">Mô tả chi tiết</label>
          <textarea 
            rows={3}
            placeholder="Mô tả quy trình, lợi ích và các thông tin cần thiết khác..." 
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 text-sm transition-all resize-none"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
      </section>

      {/* PHẦN 2: ĐỊNH GIÁ & KHU VỰC */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
          <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-sm">2</div>
          <h2 className="font-bold text-[#2d3a35]">Định giá & Khu vực</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-[#93ada3] uppercase flex items-center gap-2 tracking-wider">
              <DollarSign className="w-3 h-3" /> Giá theo diện tích (VNĐ)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="0" 
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 text-sm font-bold"
                value={formData.pricePerUnit}
                onChange={(e) => setFormData({...formData, pricePerUnit: e.target.value})}
              />
              <select 
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold outline-none"
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
              >
                <option value="m²">/ m²</option>
                <option value="cây">/ cây</option>
              </select>
            </div>
            <p className="text-[10px] text-[#93ada3] italic flex items-center gap-1">
              <Info className="w-3 h-3" /> Giá cơ bản áp dụng cho điều kiện tiêu chuẩn.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold text-[#93ada3] uppercase flex items-center gap-2 tracking-wider">
              <MapPin className="w-3 h-3" /> Phụ phí theo Zone
            </label>
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {formData.zonePricing.map((zp, index) => (
                <div key={zp.zoneId} className="flex items-center justify-between p-3 rounded-xl bg-[#fcfdfd] border border-gray-50 hover:border-green-100 transition-all">
                  <span className="text-xs font-bold text-[#2d3a35]">{zp.zoneName}</span>
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 focus-within:border-green-500">
                    <span className="text-[10px] font-bold text-green-600">+</span>
                    <input 
                      type="text" 
                      className="w-16 bg-transparent outline-none text-xs text-center font-bold"
                      value={zp.value}
                      onChange={(e) => {
                        const newPricing = [...formData.zonePricing];
                        newPricing[index].value = e.target.value;
                        setFormData({...formData, zonePricing: newPricing});
                      }}
                    />
                    <select 
                      className="text-[10px] font-bold text-[#93ada3] bg-transparent outline-none border-l pl-1 ml-1 cursor-pointer"
                      value={zp.type}
                      onChange={(e) => {
                        const newPricing = [...formData.zonePricing];
                        newPricing[index].type = e.target.value;
                        setFormData({...formData, zonePricing: newPricing});
                      }}
                    >
                      <option value="%">%</option>
                      <option value="VNĐ">VNĐ</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHẦN 3: CẤU HÌNH THÊM */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
          <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
          <h2 className="font-bold text-[#2d3a35]">Cấu hình thêm</h2>
        </div>

        <div className="space-y-4">
          <label className="text-[11px] font-bold text-[#93ada3] uppercase flex items-center gap-2 tracking-wider">
            <Layers className="w-3 h-3" /> Dịch vụ đi kèm (Add-ons)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MASTER_ADDONS.map((addon) => (
              <label 
                key={addon.id} 
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.selectedAddons.includes(addon.id) 
                  ? 'border-green-500 bg-green-50/30' 
                  : 'border-gray-100 hover:border-green-100'
                }`}
              >
                <input 
                  type="checkbox" 
                  className="mt-1 accent-green-600 w-4 h-4"
                  checked={formData.selectedAddons.includes(addon.id)}
                  onChange={(e) => {
                    const next = e.target.checked 
                      ? [...formData.selectedAddons, addon.id]
                      : formData.selectedAddons.filter(id => id !== addon.id);
                    setFormData({...formData, selectedAddons: next});
                  }}
                />
                <div>
                  <p className="text-sm font-bold text-[#2d3a35]">{addon.name}</p>
                  <p className="text-xs text-green-600 font-bold">+{addon.price}đ</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-gray-50">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-[#2d3a35]">Dịch vụ theo mùa</span>
            <ToggleSwitch 
              checked={formData.isSeasonal} 
              onChange={(val: boolean) => setFormData({...formData, isSeasonal: val})} 
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-[#2d3a35]">Trạng thái hoạt động</span>
            <ToggleSwitch 
              checked={formData.status === 'active'} 
              onChange={(val: boolean) => setFormData({...formData, status: val ? 'active' : 'inactive'})} 
            />
          </div>
        </div>
      </section>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 left-[58%] -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-gray-100 shadow-2xl z-50">
        <Button 
          type="submit"
          label={isSubmitting ? "Đang xử lý..." : "Lưu dịch vụ"} 
          icon={Save} 
          variant="primary" 
        //   disabled={isSubmitting}
        />
        <Button 
          label="Hủy" 
          variant="danger" 
          onClick={() => router.push('/protected/dashboard/services')} 
        />
      </div>

    </form>
  );
}