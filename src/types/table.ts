/**
 * File định nghĩa các kiểu dữ liệu dùng chung cho bảng (tables)
 */




/**
 * Định nghĩa cấu hình cho từng cột của bảng
 */
export interface ColumnConfig<T> {
  /** Key định danh, khớp với tên thuộc tính trong dữ liệu API */
  key: string;
  
  /** Tiêu đề hiển thị trên header của bảng */
  label: string;

  /** Chiều rộng cột */
  width?: string; 

  /** Cho phép cột này có chức năng sắp xếp (sort) hay không */
  sortable?: boolean;
  
  /** Căn lề cho nội dung trong cột */
  align?: 'left' | 'center' | 'right';
  
  /** * (Tùy chọn) Hàm render đặc biệt cho cột nếu không muốn hiển thị text đơn thuần
   * Ví dụ: Hiển thị Badge cho trạng thái, Avatar cho nhân viên
   */
  render?: (item: T) => React.ReactNode;
}

/**
 * Định nghĩa trạng thái sắp xếp hiện tại
 */
export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

/**
 * Cấu trúc dữ liệu trả về từ API hỗ trợ phân trang
 * Sau này khi đổ API, Backend thường trả về theo form này
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;       // Tổng số bản ghi trong database
    page: number;        // Trang hiện tại
    limit: number;       // Số bản ghi trên mỗi trang
    totalPages: number;  // Tổng số trang
  };
}




/**
 * Định nghĩa cấu hình tóm tắt khách hàng (dùng trong các bảng)
 */
export interface CustomerSummary {
  name: string;
  avatar?: string;
  phone?: string;
}




/**
 * Định nghĩa cấu hình 1 Công việc (dùng trong các bảng)
 */
export interface Job {
  id: string;
  customerName: string;
  location: string;
  service: string;
  executionTime: string;
  status: 'Đang thực hiện' | 'Chờ xử lý' | 'Hoàn thành' | 'Quá hạn' | 'Lên lịch';
  employeeName: string;
  employeeAvatar?: string;
}