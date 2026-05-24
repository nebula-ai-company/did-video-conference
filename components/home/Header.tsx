import React, { useState } from 'react';
import { Video, Settings, User, LogIn, Sun, Moon, LogOut, ShieldCheck } from 'lucide-react';
import { Button } from '../Button';
import { AppView, UserSettings } from '../../types';

interface HeaderProps {
  isAuthenticated: boolean;
  userSettings: UserSettings;
  onChangeView: (view: AppView) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated, 
  userSettings, 
  onChangeView, 
  updateSettings,
  onLogout 
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/50 dark:bg-black/50 backdrop-blur-3xl border-b border-gray-200/20 dark:border-white/5 transition-all duration-300">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onChangeView(AppView.HOME)}>
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-primary-600 to-primary-500 rounded-xl shadow-lg shadow-primary-500/20 text-white transform group-hover:scale-105 transition-transform duration-300">
            <Video className="w-5 h-5" strokeWidth={2.5} />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">دید</span>
            <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 tracking-widest uppercase opacity-80">Video Conference</span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-md text-xs font-medium text-gray-500 dark:text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>شبکه داخلی متصل</span>
          </div>

          {/* Theme switcher */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            onClick={() => updateSettings({ theme: userSettings.theme === 'dark' ? 'light' : 'dark' })}
            title={userSettings.theme === 'dark' ? "تم روشن" : "تم تاریک"}
          >
            {userSettings.theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* System settings icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" 
            onClick={() => onChangeView(AppView.SETTINGS)}
            title="تنظیمات سیستم"
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* Profile controls or register/login button */}
          {isAuthenticated ? (
            <div className="relative">
              <div 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`
                  flex items-center gap-3 pl-1 pr-1 py-1 rounded-full border shadow-sm transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98] select-none
                  ${showProfileMenu 
                    ? 'border-primary-500 bg-white dark:bg-zinc-900 ring-2 ring-primary-500/10' 
                    : 'bg-white/30 dark:bg-white/5 border-white/20 dark:border-white/10 hover:border-primary-500/45 hover:bg-white/50 dark:hover:bg-white/10'
                  }
                `}
                title="مشاهده اطلاعات حساب کاربری"
              >
                <div className="hidden sm:flex flex-col items-end px-3">
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {userSettings.displayName}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-inner ring-2 ring-white/50 dark:ring-[#0B0C15]/50 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white transition-all duration-300">
                  <User className="w-4 h-4" />
                </div>
              </div>

              {/* Seamless overlay backdrop click container */}
              {showProfileMenu && (
                <div 
                  className="fixed inset-0 z-40 cursor-default bg-transparent" 
                  onClick={() => setShowProfileMenu(false)}
                />
              )}

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute left-0 mt-3.5 w-80 bg-white/95 dark:bg-[#0c0d14]/95 border border-slate-200/60 dark:border-white/10 backdrop-blur-3xl rounded-2xl shadow-2xl z-50 overflow-hidden transform origin-top-left transition-all duration-300" dir="rtl">
                  {/* Account detail Header */}
                  <div className="p-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-500 flex items-center justify-center text-white ring-2 ring-primary-500/20 shadow-md">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-base font-black text-gray-900 dark:text-white truncate">
                        {userSettings.displayName}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <ShieldCheck className="w-4 h-4 text-primary-500" />
                        <span className="text-[11px] text-primary-600 dark:text-primary-400 font-extrabold tracking-wide">
                          مدیر سیستم (فعال)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Data Rows */}
                  <div className="px-5 py-4 divide-y divide-slate-100 dark:divide-white/5">
                    <div className="py-3 flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">سطح دسترسی:</span>
                      <span className="font-extrabold text-gray-800 dark:text-gray-200">مدیریت کل کنفرانس</span>
                    </div>
                    <div className="py-3 flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">شناسه حساب:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-350 tracking-wider">DID-9844-SYS</span>
                    </div>
                    <div className="py-3 flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">آدرس ایمیل:</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300 tracking-wide select-all">admin@system.local</span>
                    </div>
                    <div className="py-3 flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">وضعیت اتصال:</span>
                      <span className="flex items-center gap-1.5 font-extrabold text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        اتصال امن SSL
                      </span>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="p-3 bg-slate-50/50 dark:bg-white/[0.015] border-t border-slate-100 dark:border-white/5 flex flex-col gap-1">
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        onChangeView(AppView.SETTINGS);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-xs font-bold transition-all cursor-pointer group"
                    >
                      <Settings className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                      <span>پنل تنظیمات و ویرایش مشخصات</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold transition-all cursor-pointer group"
                    >
                      <LogOut className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                      <span>خروج مطمئن از سیستم (Log Out)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              size="sm"
              variant="primary"
              className="gap-2 px-6 rounded-full shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40"
              onClick={() => onChangeView(AppView.LOGIN)}
            >
              <LogIn className="w-4 h-4" />
              ورود
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
