import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { AuthSidePanel } from '../components/AuthSidePanel';
import { AppView } from '../types';

interface AdminLoginProps {
  onChangeView: (view: AppView) => void;
  onAdminLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onChangeView, onAdminLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@system.local');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate robust admin validation
    setTimeout(() => {
      if (email.trim() === 'admin@system.local' && password === 'admin123') {
        setIsLoading(false);
        onAdminLogin();
      } else {
        setIsLoading(false);
        setError('شناسه کاربری یا رمز عبور مدیریت کل سیستم نادرست است.');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#020204] transition-colors duration-200" dir="rtl">
      {/* Left Side (Form) */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative animate-enter">
        <div className="w-full max-w-md space-y-8">
          
          {/* Back button */}
          <button 
            type="button"
            onClick={() => onChangeView(AppView.LOGIN)}
            className="flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400 transition-all cursor-pointer group bg-slate-150/10 dark:bg-white/[0.02] px-3.5 py-2 rounded-full border border-gray-200/50 dark:border-white/5 w-fit"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>بازگشت به صفحه ورود کاربران</span>
          </button>

          <div className="space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-black text-primary-600 dark:text-primary-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>پورتال امنیتی مدیریت کل سامانه (Admin Portal)</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">ورود مدیران سیستم</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              جهت دسترسی به داشبورد مدیریتی، نظارت بر سازمان‌ها، مدیریت کاربران و تایید درخواست‌های عضویت، اطلاعات امنیتی خود را تایید کنید.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-xs font-extrabold mb-4 animate-shake leading-relaxed">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block text-right">پست الکترونیک ارشد (پیش‌فرض)</label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@system.local"
                    className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all dark:text-white text-left font-mono"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">رمز عبور امنیتی</label>
                  <span className="text-[10px] text-gray-400 font-bold">حداقل ۸ کاراکتر به همراه نماد</span>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-11 pl-10 py-3 bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all dark:text-white text-left tracking-widest placeholder:tracking-normal font-mono"
                    dir="ltr"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              disabled={isLoading}
              className="w-full text-sm font-extrabold shadow-xl shadow-primary-700/15 group relative overflow-hidden"
            >
              {isLoading ? 'در حال تایید اطلاعات امنیتی...' : 'احراز هویت و ورود به پنل مدیریت'}
              {!isLoading && <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />}
            </Button>

            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs leading-relaxed font-bold">
              توضیحات تست سامانه: جهت سهولت در بررسی پنل ارشد، مشخصات پیش‌فرض به صورت فیلدهای تایید شده تکمیل گردیده است. کافیست بر روی دکمه ورود کلیک نمایید.
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-primary-500" />
              <span>اتصال کاملاً رمزگذاری شده به پایگاه داده مرکزی</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side (Branding Panel with Carousel) */}
      <AuthSidePanel />
    </div>
  );
};
