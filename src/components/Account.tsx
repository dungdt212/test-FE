"use client";

import { useAuthStore } from "@/store/authSlice";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Settings, User, LogOut } from "lucide-react";

interface AccountProps {
  isCollapsed?: boolean;
}

export default function Account({ isCollapsed = false }: AccountProps) {
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (!mounted || !user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar + Name Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 w-full ${
          isCollapsed ? "justify-center" : ""
        }`}
        title={isCollapsed ? user.name : ""}
      >
        <div className="relative flex-shrink-0">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.name || "User"}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          {/* Trạng thái online (tùy chọn) */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {!isCollapsed && (
          <div className="text-left overflow-hidden">
            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate capitalize">{user.role}</p>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div 
          className={`absolute bottom-full mb-3 w-48 bg-white text-gray-700 rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-bottom-2 ${
            isCollapsed ? "left-0" : "left-0 right-0"
          }`}
        >
          <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tài khoản</p>
          </div>
          
          <button
            onClick={() => { router.push("/admin/profile"); setOpen(false); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors"
          >
            <User size={18} className="text-gray-400" /> Hồ sơ cá nhân
          </button>

          <button
            onClick={() => { router.push("/admin/settings"); setOpen(false); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors"
          >
            <Settings size={18} className="text-gray-400" /> Cài đặt nâng cao
          </button>

          <div className="border-t border-gray-50 my-1"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-left text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}