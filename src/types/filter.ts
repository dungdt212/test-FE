// types/filter.ts
export type FilterType = 'text' | 'select' | 'date';

export interface FilterItem {
  key: string;        // Khớp với field backend yêu cầu (vd: 'status', 'zone')
  label: string;      // Nhãn hiển thị
  type: FilterType;   // Kiểu input
  placeholder?: string;
  options?: { label: string; value: string }[]; // Dành cho kiểu 'select'
}