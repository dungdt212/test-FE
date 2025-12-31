export interface ZoneItem {
  id: string;
  name: string;
  defaultSurcharge: string; // Phụ phí mặc định (%)
  description?: string;
}

export const MOCK_ZONES: ZoneItem[] = [
  { id: 'z1', name: 'Zone A', defaultSurcharge: '' },
  { id: 'z2', name: 'Zone B', defaultSurcharge: '' },
  { id: 'z3', name: 'Zone C', defaultSurcharge: '' },
  { id: 'z4', name: 'Bình Dương', defaultSurcharge: '' },
  { id: 'z5', name: 'Đồng Nai', defaultSurcharge: '' },
];