import React, { useState } from 'react';
import { Video, LogIn, Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '../Button';
import { AppView } from '../../types';

interface LandingLayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({
  children,
  currentView,
  onChangeView,
  theme,
  onToggleTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'خانه', view: AppView.LANDING },
    { label: 'امکانات', view: AppView.LANDING_FEATURES },
    { label: 'امنیت', view: AppView.LANDING_SECURITY },
    { label: 'تماس با ما', view: AppView.LANDING_CONTACT },
  ];

  const handleNavClick = (view: AppView) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#050508] text-gray-100' : 'bg-slate-50 text-slate-900'} font-sans transition-colors duration-300 select-none`} dir="rtl">
      {/* HEADER */}
      <header className={`sticky top-0 z-50 w-full ${theme === 'dark' ? 'bg-[#050508]/80 border-b border-white/[0.04]' : 'bg-white/80 border-b border-slate-200/50'} backdrop-blur-3xl transition-all duration-300`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo and Wordmark */}
          <div 
            className="flex items-center gap-4 group cursor-pointer" 
            onClick={() => handleNavClick(AppView.LANDING)}
            id="landing-logo"
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-primary-600 to-primary-500 rounded-xl shadow-lg shadow-primary-500/20 text-white transform group-hover:scale-105 transition-transform duration-300">
              <Video className="w-5 h-5" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>دید</span>
              <span className="text-[10px] font-bold text-primary-400 tracking-widest uppercase opacity-85">Video Conference</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`transition-colors duration-200 cursor-pointer ${
                  currentView === link.view
                    ? 'text-primary-400 font-bold'
                    : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-gray-300 hover:text-white'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              aria-label="تغییر پوسته"
              id="theme-toggle-desktop"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-primary-600" />}
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick(AppView.LOGIN)}
              className="rounded-full px-6 py-2 text-sm font-bold shadow-md shadow-primary-700/20 cursor-pointer"
              id="login-button"
            >
              ورود به دید
            </Button>
          </div>

          {/* Mobile controls (hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-gray-300 hover:text-white'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              aria-label="تغییر پوسته"
              id="theme-toggle-mobile"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-primary-600" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none cursor-pointer ${
                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="منو"
              id="hamburger-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full ${theme === 'dark' ? 'bg-[#050508]/95 border-b border-white/5' : 'bg-white/95 border-b border-slate-200'} backdrop-blur-3xl p-6 flex flex-col gap-5 z-40 transition-all animate-enter`}>
            <div className="flex flex-col gap-4 text-right">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`text-base py-2 border-b text-right font-medium transition-colors cursor-pointer ${
                    theme === 'dark' ? 'border-white/5' : 'border-slate-100'
                  } ${
                    currentView === link.view
                      ? 'text-primary-600 dark:text-primary-500 font-bold'
                      : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => handleNavClick(AppView.LOGIN)}
                className="w-full text-center py-2.5 rounded-full font-bold shadow-md shadow-primary-700/20 cursor-pointer"
              >
                ورود به دید
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT STAGE */}
      <main className="flex-1 w-full flex flex-col relative z-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer className={`w-full ${theme === 'dark' ? 'bg-[#030305] border-white/[0.04] text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-600'} border-t py-12 px-6 lg:px-12 backdrop-blur-md transition-all duration-300`}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo, tagline, and host note */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-primary-600 to-primary-500 rounded-lg text-white">
                <Video className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>دید</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'} max-w-sm`}>
              پلتفرم ویدئوکنفرانس سازمانی، میزبانی‌شده روی زیرساخت ایران
            </p>
            <div className={`inline-flex items-center gap-2 mt-2 text-xs font-semibold px-3 py-1.5 rounded-full ${
              theme === 'dark' 
                ? 'bg-primary-900/30 text-primary-100 border border-primary-800/30' 
                : 'bg-primary-50 text-primary-600 border border-primary-200/50'
            } w-fit`}>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span>میزبانی روی زیرساخت ایران</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>دسترسی سریع</span>
            <div className={`grid grid-cols-2 gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors text-right cursor-pointer font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className={`flex flex-col justify-between items-start md:items-end text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-800'}`}>«دید» پلتفرم بومی کنفرانس تصویری</span>
              <span>امن، پرسرعت، بدون قطعی</span>
            </div>
            <span className="text-xs mt-6 md:mt-0 font-mono tracking-wide" dir="ltr">
              &copy; {new Date().getFullYear()} DidMeet. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
