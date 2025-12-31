// components/FilterBar.tsx
import { Search } from 'lucide-react';

export type FilterItem = {
  key: string;
  label: string;
  type: 'text' | 'select';
  placeholder?: string;
  options?: { label: string; value: string }[];
};

interface FilterBarProps {
  config: FilterItem[];
  onChange: (key: string, value: string) => void;
}

export default function FilterBar({ config, onChange }: FilterBarProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {config.map((item) => (
          <div key={item.key}>
            <label className="block text-[10px] font-bold text-[#93ada3] uppercase mb-1.5 ml-1">
              {item.label}
            </label>
            {item.type === 'text' ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93ada3]" />
                <input 
                  type="text"
                  placeholder={item.placeholder}
                  onChange={(e) => onChange(item.key, e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#f9fbfb] border border-gray-100 rounded-xl text-sm focus:border-green-500 outline-none transition-all"
                />
              </div>
            ) : (
              <select 
                onChange={(e) => onChange(item.key, e.target.value)}
                className="w-full px-4 py-2 bg-[#f9fbfb] border border-gray-100 rounded-xl text-sm text-[#2d3a35] outline-none cursor-pointer focus:border-green-500 appearance-none"
              >
                <option value="all">Tất cả</option>
                {item.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}