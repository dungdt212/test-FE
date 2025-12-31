// ADMIN AUTH API Client
"use client";

import { fetcher } from "@/config/fetcher";
import { setToken } from "@/config/token";

// URL thực tế từ Swagger là https://api.homenest.software/auth/login
const AUTH_PATH = "/auth/login"; 

export async function loginAdmin({ email, password }: { email: string; password: string }) {
  try {
    const res = await fetcher<any>(AUTH_PATH, {
      method: "POST",
      data: { email, password },
    });

    // Dựa trên ảnh Swagger: res = { token: "...", user: { id: "...", ... } }
    if (!res || !res.token) {
      throw new Error("Không nhận được token từ hệ thống");
    }

    // Lưu token vào localStorage
    setToken(res.token);

    // Trả về đúng cấu trúc page.tsx cần
    return { 
      token: res.token, 
      user: res.user 
    };
  } catch (error: any) {
    /// err.response.data chính là nội dung JSON khi test trên Swagger { "error": "..." }
    /// Dùng error này để đồng bộ message lỗi giữa frontend và backend
    const serverMessage = error.response?.data?.error; 
    
    // Nếu có lỗi từ server thì ném message đó đi, nếu không thì dùng lỗi mặc định của Axios
    throw new Error(serverMessage || error.message || "Đã có lỗi xảy ra");
  }
}

export async function registerAdmin(payload: {
  username: string;
  password: string;
  name?: string;
  avatar?: string;
}) {
  const res = await fetcher<{ ok: boolean; token?: string }>(`${AUTH_PATH}/auth/register`, {
    method: "POST",
    data: payload,
  });

  if (res.ok && res.token) {
    setToken(res.token);
  }

  return res;
}
