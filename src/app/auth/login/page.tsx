'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/api/auth';
import { useAuthStore } from '@/store/authSlice';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Gọi API với 2 trường email và password
      const { token, user } = await loginAdmin({ email, password });

      // Lưu vào Zustand
      login(token, user);
      
      setShowSuccess(true);

      // Chuyển hướng sau 2s
      setTimeout(() => {
        router.push('/protected/dashboard?loginSuccess=true');
      }, 100);
    } catch (err: any) {
      // console.error('Login error:', err.message);
      // setError(err.message || 'Email hoặc mật khẩu không đúng' );
      
      if (err.message === "Invalid credentials") {
        setError("Email hoặc mật khẩu không chính xác.");
      } else {
        setError(err.message); // Hiển thị nguyên văn lỗi từ server
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1a14] flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <span className="text-2xl">🌿</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
        <p className="text-gray-400 text-sm">Welcome back to Lawn Lovers</p>
      </div>

      <div className="w-full max-w-md bg-[#12242E] rounded-3xl p-8 border border-white/10 shadow-2xl">
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs py-2 px-4 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lawnLovers.com"
                className="w-full bg-[#0a1a14] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-green-500/50 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#0a1a14] border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white text-sm focus:outline-none focus:border-green-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00fe85] hover:bg-[#00e677] disabled:opacity-50 text-[#0a1a14] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,133,0.2)]"
          >
            {isLoading ? 'Processing...' : 'Login'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* {showSuccess && <SuccessPopup open={true} message="Đăng nhập thành công!" />} */}
    </div>
  );
}