import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  VideoCamera, 
  VideoCameraSlash, 
  Microphone, 
  MicrophoneSlash, 
  Users, 
  ShieldCheck, 
  Lock, 
  Pulse, 
  Plus, 
  ArrowLeft, 
  Globe, 
  Shield, 
  Compass, 
  Sparkle, 
  Cpu, 
  Radio, 
  Terminal,
  Circle
} from '@phosphor-icons/react';

type ScreenState = 'dashboard' | 'connecting' | 'meeting';

interface TabItem {
  id: ScreenState;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
}

export const LaptopScrollDemo: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [screenState, setScreenState] = useState<ScreenState>('dashboard');
  const [audioWaves, setAudioWaves] = useState<number[]>([12, 18, 6, 24, 15, 9, 20, 14]);
  const [latency, setLatency] = useState<number>(11);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cycle through states automatically
  useEffect(() => {
    if (!autoPlay) {
      setProgress(0);
      return;
    }

    const duration = 6000; // 6 seconds per slide
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Trigger slide advance
          setScreenState((current) => {
            if (current === 'dashboard') return 'connecting';
            if (current === 'connecting') return 'meeting';
            return 'dashboard';
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [autoPlay, screenState]);

  // Fluctuating telemetry and voice levels
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioWaves(Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 4));
      setLatency(prev => {
        const delta = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(9, Math.min(13, prev + delta));
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (state: ScreenState) => {
    setAutoPlay(false);
    setProgress(0);
    setScreenState(state);
  };

  const tabs: TabItem[] = [
    { 
      id: 'dashboard', 
      title: 'پنل مدیریت سازمان', 
      subtitle: 'مدیریت کاربران، اتاق‌ها و آمار ترافیک', 
      badge: 'گام اول', 
      badgeColor: 'text-primary-100 border-primary-500/20 bg-primary-900/40' 
    },
    { 
      id: 'connecting', 
      title: 'اتصال امن WebRTC', 
      subtitle: 'هندشیک امن و انتقال بدون واسطه', 
      badge: 'گام دوم', 
      badgeColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/40' 
    },
    { 
      id: 'meeting', 
      title: 'اتاق زنده کنفرانس', 
      subtitle: 'مکالمه زنده، اشتراک صفحه و تاخیر ناچیز', 
      badge: 'گام سوم', 
      badgeColor: 'text-blue-400 border-blue-500/20 bg-blue-950/40' 
    }
  ];

  return (
    <div 
      className={`relative w-full py-20 px-4 md:px-12 select-none overflow-hidden transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-[#050508] border-y border-white/[0.04]' 
          : 'bg-white border-y border-slate-200/60'
      }`} 
      id="interactive-platform-showcase"
    >
      {/* Background Cinematic Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[130px] transition-all duration-300 ${
          theme === 'dark' ? 'bg-primary-600/10' : 'bg-primary-500/5'
        }`} />
        <div className={`absolute bottom-[10%] left-1/3 -translate-x-1/2 w-[450px] h-[350px] rounded-full blur-[120px] transition-all duration-300 ${
          theme === 'dark' ? 'bg-blue-600/5' : 'bg-blue-500/3'
        }`} />
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-[0.08]' : 'opacity-[0.04]'}`}
          style={{ 
            backgroundImage: theme === 'dark' 
              ? 'radial-gradient(circle, rgba(99,102,241,0.1) 1px, transparent 1px)' 
              : 'radial-gradient(circle, rgba(99,102,241,0.3) 1px, transparent 1px)', 
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)'
          }}
        />
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header Unit */}
        <div className="text-center space-y-4 mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-mono transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-primary-900/40 border border-primary-500/15 text-primary-100' 
              : 'bg-primary-50 border border-primary-200 text-primary-700'
          }`}>
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>شبیه‌ساز زنده زیرساخت دید</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight leading-none transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`} dir="rtl">
            داستان یک اتصال؛ از پنل مدیریتی تا اتاق زنده
          </h2>
          <p className={`text-sm max-w-2xl mx-auto font-medium transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
          }`} dir="rtl">
            چرخه کامل مدیریت، برقراری ارتباط فوق‌سریع بومی دید را به صورت تعاملی تجربه کنید. 
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Display / Right Controls */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: THE HIGH-FIDELITY DASHBOARD SIMULATOR */}
          <div className="lg:col-span-7 w-full flex justify-center">
            
            {/* The Doppelrand / Hardware Double-Bezel Display Case */}
            <div className={`w-full max-w-[760px] p-2 rounded-[24px] transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/[0.02] border border-white/[0.05] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]' 
                : 'bg-slate-100/80 border border-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)]'
            }`}>
              
              {/* Inner bezel frame representing a masterclass hardware screen */}
              <div className={`relative w-full aspect-[16/10] rounded-[18px] flex flex-col overflow-hidden transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#08080c] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                  : 'bg-white border border-slate-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.02)]'
              }`}>
                
                {/* Screen Bezel Glass Glaze Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.03] pointer-events-none z-30" />

                {/* macOS Style Window Chrome Header */}
                <div className={`flex items-center justify-between px-4 py-3 select-none transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-[#0a0a0f] border-b border-white/[0.06]' : 'bg-slate-50 border-b border-slate-200'
                }`}>
                  {/* Left: Window Dots */}
                  <div className="flex items-center gap-1.5">
                    <Circle weight="fill" className="w-2.5 h-2.5 text-rose-500/80" />
                    <Circle weight="fill" className="w-2.5 h-2.5 text-amber-500/80" />
                    <Circle weight="fill" className="w-2.5 h-2.5 text-emerald-500/80" />
                  </div>
                  {/* Middle: Mock Browser Address */}
                  <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md text-[9px] font-mono w-1/2 justify-center transition-all ${
                    theme === 'dark' 
                      ? 'bg-[#13131b] border border-white/[0.04] text-gray-400' 
                      : 'bg-white border border-slate-200 text-slate-600 shadow-sm'
                  }`}>
                    <Lock weight="bold" className="w-2.5 h-2.5 text-emerald-500" />
                    <span>did.ir/console/room/tech-991</span>
                  </div>
                  {/* Right: Small Info Badge */}
                  <div className={`flex items-center gap-1.5 text-[9px] font-mono transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-slate-400'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>SECURE NODE</span>
                  </div>
                </div>

                {/* VIEWPORT CONTENT */}
                <div className={`flex-1 w-full overflow-hidden relative transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-[#040407] text-white' : 'bg-slate-50 text-slate-800'
                }`}>
                  
                  <AnimatePresence mode="wait">
                    
                    {/* STATE A: DASHBOARD VIEW */}
                    {screenState === 'dashboard' && (
                      <motion.div
                        key="screen-dashboard"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute inset-0 flex flex-col p-4 transition-colors duration-300 ${
                          theme === 'dark' ? 'bg-[#050508]' : 'bg-white'
                        }`}
                        dir="rtl"
                      >
                        {/* Top Summary Banner */}
                        <div className={`flex items-center justify-between mb-3 pb-3 border-b transition-colors duration-300 ${
                          theme === 'dark' ? 'border-white/[0.05]' : 'border-slate-100'
                        }`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                              theme === 'dark' 
                                ? 'bg-primary-600/10 border-primary-500/20 text-primary-400' 
                                : 'bg-primary-50 border-primary-200 text-primary-600'
                            }`}>
                              <Monitor weight="bold" className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className={`text-xs font-bold transition-colors duration-300 ${
                                theme === 'dark' ? 'text-gray-150' : 'text-slate-800'
                              }`}>وبینارهای زنده سازمان</h3>
                              <p className="text-[9px] text-gray-500">مدیریت متمرکز جلسات و پهنای باند دید</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-left font-mono text-[9px]">
                            <span className={`px-2 py-0.5 rounded-md transition-all ${
                              theme === 'dark' 
                                ? 'text-gray-400 bg-white/5 border border-white/10' 
                                : 'text-slate-600 bg-slate-50 border border-slate-200'
                            }`}>
                              ترافیک فعال: ۳۴۰ Mbps
                            </span>
                          </div>
                        </div>

                        {/* Split Dashboard Content */}
                        <div className="flex-1 grid grid-cols-12 gap-3">
                          
                          {/* Sidebar navigation representation */}
                          <div className={`col-span-3 p-2 rounded-xl flex flex-col gap-1.5 border transition-all ${
                            theme === 'dark' 
                              ? 'bg-white/[0.01] border-white/[0.04]' 
                              : 'bg-slate-50/50 border-slate-100'
                          }`}>
                            <div className={`text-[10px] font-bold p-1.5 rounded-lg flex items-center gap-2 transition-all ${
                              theme === 'dark' 
                                ? 'bg-primary-600/15 text-primary-400' 
                                : 'bg-primary-50 text-primary-600'
                            }`}>
                              <Monitor className="w-3.5 h-3.5" />
                              <span>اتاق‌های فعال</span>
                            </div>
                            <div className={`text-[10px] font-medium p-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                              theme === 'dark' 
                                ? 'hover:bg-white/[0.02] text-gray-400' 
                                : 'hover:bg-slate-100 text-slate-500'
                            }`}>
                              <Users className="w-3.5 h-3.5 text-gray-500" />
                              <span>کاربران مجاز</span>
                            </div>
                            <div className={`text-[10px] font-medium p-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                              theme === 'dark' 
                                ? 'hover:bg-white/[0.02] text-gray-400' 
                                : 'hover:bg-slate-100 text-slate-500'
                            }`}>
                              <Pulse className="w-3.5 h-3.5 text-gray-500" />
                              <span>زیرساخت پینگ</span>
                            </div>
                          </div>

                          {/* Dashboard Central Section */}
                          <div className="col-span-9 flex flex-col gap-3">
                            
                            {/* Stats row inside display */}
                            <div className="grid grid-cols-2 gap-3">
                              {/* New Room Quick Launcher */}
                              <div className={`p-3 rounded-xl flex flex-col gap-1 border transition-all ${
                                theme === 'dark' 
                                  ? 'bg-white/[0.01] border-white/[0.04]' 
                                  : 'bg-slate-50/50 border-slate-100'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <span className={`text-[10px] font-bold transition-colors ${
                                    theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
                                  }`}>ساخت وبینار جدید</span>
                                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                                    theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                  }`}>
                                    <Plus weight="bold" className="w-3 h-3" />
                                  </div>
                                </div>
                                <p className="text-[8px] text-gray-500 leading-normal">ایجاد فوری لینک جلسه با رمزگذاری انتها به انتها روی سرور بومی.</p>
                              </div>

                              {/* Cloud server distributed cluster stats */}
                              <div className={`p-3 rounded-xl flex flex-col gap-1 border transition-all ${
                                theme === 'dark' 
                                  ? 'bg-white/[0.01] border-white/[0.04]' 
                                  : 'bg-slate-50/50 border-slate-100'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <span className={`text-[10px] font-bold transition-colors ${
                                    theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
                                  }`}>کلاستر ابری ایران</span>
                                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                                    theme === 'dark' ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-600 border border-primary-100'
                                  }`}>
                                    <Pulse weight="bold" className="w-3 h-3" />
                                  </div>
                                </div>
                                <p className="text-[8px] text-gray-500 leading-normal">۳ لوکیشن فعال در تهران و اصفهان با پایداری بیست‌وچهار ساعته.</p>
                              </div>
                            </div>

                            {/* Feature Highlight Meeting invitation Card */}
                            <div className={`flex-1 border rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden transition-all ${
                              theme === 'dark' 
                                ? 'bg-gradient-to-r from-primary-900/25 to-indigo-950/10 border-primary-500/15' 
                                : 'bg-gradient-to-r from-primary-50 to-indigo-50/30 border-primary-200/60'
                            }`}>
                              <div className="absolute -top-[30%] -right-[20%] w-40 h-40 rounded-full bg-primary-500/5 blur-3xl pointer-events-none" />
                              
                              <div className="flex items-start justify-between relative z-10">
                                <div className="space-y-0.5">
                                  <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold border transition-colors ${
                                    theme === 'dark' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/10' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  }`}>جلسه آماده شروع</span>
                                  <h4 className={`text-[12px] font-extrabold mt-1 transition-colors ${
                                    theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
                                  }`}>وبینار دپارتمان فنی سازمان</h4>
                                  <p className={`text-[9px] font-medium transition-colors ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                                  }`}>میزبان: آرش راد (سرپرست کل فنی)</p>
                                </div>
                                
                                <div className={`flex items-center gap-1 font-mono text-[9px] transition-colors ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                                }`}>
                                  <Users className="w-3.5 h-3.5 text-primary-500" />
                                  <span>۴ نفر منتظر</span>
                                </div>
                              </div>

                              <div className={`flex items-center justify-between pt-2 border-t relative z-10 mt-2 transition-colors ${
                                theme === 'dark' ? 'border-white/[0.05]' : 'border-slate-150'
                              }`}>
                                <span className={`text-[9px] font-mono transition-colors ${
                                  theme === 'dark' ? 'text-gray-500' : 'text-slate-400'
                                }`}>ROOM: did-room-tech-991</span>
                                
                                {/* Inner Action Trigger (simulates click transition) */}
                                <button
                                  onClick={() => handleTabClick('connecting')}
                                  className="flex items-center gap-1 bg-primary-600 hover:bg-primary-700 text-white text-[9px] font-black px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                                >
                                  <span>ورود به جلسه زنده</span>
                                  <ArrowLeft weight="bold" className="w-2.5 h-2.5 mr-0.5" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STATE B: CONNECTING / WEBRTC HANDSHAKE */}
                    {screenState === 'connecting' && (
                      <motion.div
                        key="screen-connecting"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none transition-colors duration-300 ${
                          theme === 'dark' ? 'bg-[#050509]' : 'bg-white'
                        }`}
                        dir="rtl"
                      >
                        {/* Security Matrix Backdrop */}
                        <div className={`absolute inset-0 opacity-[0.02] [background-size:12px_12px] pointer-events-none transition-opacity ${
                          theme === 'dark' ? 'bg-[radial-gradient(#6366f1_1px,transparent_1px)]' : 'bg-[radial-gradient(#3b82f6_1px,transparent_1px)]'
                        }`} />

                        {/* Ripple pulses around key lock */}
                        <div className="relative flex items-center justify-center mb-5">
                          <motion.div 
                            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-12 h-12 rounded-full border border-emerald-500/40"
                          />
                          <motion.div 
                            animate={{ scale: [1.2, 2.2, 1.2], opacity: [0.2, 0, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute w-12 h-12 rounded-full border border-emerald-500/20"
                          />
                          <div className={`w-14 h-14 rounded-full border flex items-center justify-center relative z-10 shadow-lg transition-all ${
                            theme === 'dark' 
                              ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 shadow-emerald-950/50' 
                              : 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-emerald-100'
                          }`}>
                            <Radio className="w-6 h-6 animate-pulse" />
                          </div>
                        </div>

                        {/* Connections telemetry readouts */}
                        <div className="space-y-2 max-w-xs relative z-10">
                          <span className={`text-[8px] uppercase tracking-wider font-mono border px-3 py-1 rounded-full font-extrabold transition-colors ${
                            theme === 'dark' 
                              ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/20' 
                              : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                          }`}>
                            رمزگذاری کلید متقارن WebRTC صادر شد
                          </span>
                          <h3 className={`text-sm font-extrabold transition-colors ${
                            theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
                          }`}>برقراری ارتباط انتها به انتها با سرور...</h3>
                          <p className={`text-[10px] font-mono transition-colors ${
                            theme === 'dark' ? 'text-gray-500' : 'text-slate-400'
                          }`}>
                            IP: 185.190.224.12 · PORT: 3000 · LATENCY: {latency}ms
                          </p>
                        </div>

                        {/* Quality checklists */}
                        <div className={`mt-5 flex items-center gap-3 text-[9px] font-bold border-t pt-4 w-full max-w-xs justify-center transition-colors ${
                          theme === 'dark' ? 'border-white/[0.04] text-gray-500' : 'border-slate-155 text-slate-400'
                        }`}>
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck weight="bold" className="w-3.5 h-3.5" />
                            میزبانی امن داخل ایران
                          </span>
                          <span className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-300'}`} />
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <Lock weight="bold" className="w-3.5 h-3.5" />
                            E2EE فعال
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* STATE C: MEETING VIEW */}
                    {screenState === 'meeting' && (
                      <motion.div
                        key="screen-meeting"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute inset-0 flex flex-col p-3 select-none transition-colors duration-300 ${
                          theme === 'dark' ? 'bg-[#050508]' : 'bg-white'
                        }`}
                      >
                        {/* Conference Room Top Bar */}
                        <div className={`flex items-center justify-between border-b pb-2 mb-2 text-[9px] font-bold transition-colors duration-300 ${
                          theme === 'dark' ? 'border-white/[0.05] text-gray-400' : 'border-slate-100 text-slate-550'
                        }`} dir="rtl">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <span className={theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}>وبینار دپارتمان فنی سازمان</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono">
                            <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[8px] border transition-all ${
                              theme === 'dark' 
                                ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/40' 
                                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                            }`}>
                              <Radio className="w-2.5 h-2.5" />
                              زنده / 1080p Ultra
                            </span>
                            <span>تاخیر: {latency}ms</span>
                          </div>
                        </div>

                        {/* Immersive Video Conference Grid */}
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          
                          {/* Participant 1: Arash Rad */}
                          <div className={`relative rounded-lg overflow-hidden bg-gray-900 border ${
                            theme === 'dark' ? 'border-white/[0.04]' : 'border-slate-200/60'
                          }`}>
                            <img 
                              src="https://picsum.photos/seed/speaker1/400/250" 
                              alt="آرش راد" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-80 grayscale contrast-125 mix-blend-luminosity" 
                            />
                            <div className="absolute top-1.5 right-1.5 bg-primary-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                              <span>مدیریت جلسه</span>
                              {/* Waveform indicator */}
                              <div className="flex items-end gap-[1px] h-2">
                                {audioWaves.slice(0, 4).map((h, i) => (
                                  <div key={i} className="w-[1.5px] bg-white rounded-full transition-all duration-100" style={{ height: `${h * 0.35}px` }} />
                                ))}
                              </div>
                            </div>
                            <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded-md" dir="rtl">
                              آرش راد (شما)
                            </div>
                          </div>

                          {/* Participant 2: Mina Alavi */}
                          <div className={`relative rounded-lg overflow-hidden bg-gray-900 border ${
                            theme === 'dark' ? 'border-white/[0.04]' : 'border-slate-200/60'
                          }`}>
                            <img 
                              src="https://picsum.photos/seed/user2/400/250" 
                              alt="مینا علوی" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-75 grayscale contrast-125 mix-blend-luminosity" 
                            />
                            <div className="absolute top-1.5 right-1.5 bg-black/50 text-white text-[8px] px-1.5 py-0.5 rounded-md flex items-center gap-1" dir="rtl">
                              <Microphone className="w-2.5 h-2.5 text-primary-400" />
                              <span>سخنران</span>
                            </div>
                            <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded-md" dir="rtl">
                              مینا علوی
                            </div>
                          </div>

                          {/* Participant 3: Sohrab Sepehri */}
                          <div className={`relative rounded-lg overflow-hidden bg-gray-900 border ${
                            theme === 'dark' ? 'border-white/[0.04]' : 'border-slate-200/60'
                          }`}>
                            <img 
                              src="https://picsum.photos/seed/user3/400/250" 
                              alt="سهراب سپهری" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-65 grayscale contrast-125 mix-blend-luminosity" 
                            />
                            <div className="absolute top-1.5 right-1.5 bg-red-500/20 border border-red-500/30 text-red-400 text-[7px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5" dir="rtl">
                              <MicrophoneSlash className="w-2.5 h-2.5" />
                              <span>بی‌صدا</span>
                            </div>
                            <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded-md" dir="rtl">
                              سهراب سپهری
                            </div>
                          </div>

                          {/* Participant 4: Presentation Code Block */}
                          <div className={`relative rounded-lg overflow-hidden flex flex-col p-2 font-mono text-[7px] transition-all ${
                            theme === 'dark' 
                              ? 'bg-slate-950 border border-primary-500/20 text-gray-300' 
                              : 'bg-slate-900 border border-slate-200 text-gray-100 shadow-sm'
                          }`}>
                            <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1.5 text-[6px] text-gray-500" dir="rtl">
                              <span>اشتراک دسکتاپ آرش</span>
                              <span>did-stream.tsx</span>
                            </div>
                            <div className="flex-1 space-y-1 text-primary-400 leading-tight">
                              <p className="text-emerald-400">import {"{ LiveRTC }"} from 'did-core';</p>
                              <p>const Webinar = () =&gt; {"{"}</p>
                              <p className="pl-2">return &lt;LiveRTC.Viewport</p>
                              <p className="pl-4">encryption="e2ee"</p>
                              <p className="pl-4">server="tehran-node-1"</p>
                              <p className="pl-2">/&gt;</p>
                              <p>{"};"}</p>
                            </div>
                            <div className="bg-primary-500/10 text-primary-400 text-[6px] font-bold py-1 text-center rounded border border-primary-500/20 animate-pulse mt-1">
                              SCREEN SHARE LIVE STREAM
                            </div>
                          </div>

                        </div>

                        {/* Meeting Control Buttons inside mockup */}
                        <div className={`flex items-center justify-center gap-3 mt-2.5 pt-2 border-t ${
                          theme === 'dark' ? 'border-white/[0.04]' : 'border-slate-100'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                            theme === 'dark' ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-600'
                          }`}>
                            <VideoCamera className="w-3.5 h-3.5" />
                          </div>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                            theme === 'dark' ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-600'
                          }`}>
                            <Microphone className="w-3.5 h-3.5" />
                          </div>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                            theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <Monitor className="w-3.5 h-3.5" />
                          </div>
                          <button 
                            onClick={() => handleTabClick('dashboard')}
                            className="px-3 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-[8px] flex items-center justify-center cursor-pointer transition-colors"
                          >
                            پایان جلسه
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: RE-DESIGNED INTERACTIVE TABS & STORIES */}
          <div className="lg:col-span-5 w-full space-y-4 flex flex-col justify-center">
            
            <div className="space-y-1 text-right mb-4" dir="rtl">
              <span className="text-[10px] text-primary-500 uppercase tracking-widest font-mono font-bold block">مراحل استقرار وبینار</span>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>زیرساخت دید چگونه کار می‌کند؟</h3>
              <p className={`text-xs transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
              }`}>
                بر روی هر یک از گام‌های زیر کلیک کنید تا بلافاصله پیش‌نمایش آن مرحله را بر روی مانیتور شبیه‌ساز زنده مشاهده کنید.
              </p>
            </div>

            {/* Vertical Tab Capsules */}
            <div className="space-y-3" dir="rtl">
              {tabs.map((tab) => {
                const isActive = screenState === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full text-right p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                      isActive 
                        ? theme === 'dark'
                          ? 'bg-white/[0.03] border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.4)]' 
                          : 'bg-white border-slate-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.04)]'
                        : theme === 'dark'
                          ? 'bg-transparent border-white/[0.02] hover:bg-white/[0.01] hover:border-white/[0.04]'
                          : 'bg-transparent border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    {/* Active sliding border or glow */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabGlow"
                        className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-primary-500 to-indigo-500 rounded-r-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Step indicator badge */}
                    <div className={`mt-0.5 px-2.5 py-1 rounded-full border text-[9px] font-extrabold uppercase font-mono tracking-wider shrink-0 ${
                      theme === 'dark' 
                        ? tab.badgeColor 
                        : tab.id === 'dashboard' 
                          ? 'text-primary-600 border-primary-200 bg-primary-50' 
                          : tab.id === 'connecting' 
                            ? 'text-emerald-600 border-emerald-200 bg-emerald-50' 
                            : 'text-blue-600 border-blue-200 bg-blue-50'
                    }`}>
                      {tab.badge}
                    </div>

                    {/* Tab texts */}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-black transition-colors ${
                          isActive 
                            ? theme === 'dark' ? 'text-white' : 'text-slate-800' 
                            : theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                        }`}>
                          {tab.title}
                        </span>
                        
                        {/* Custom Phosphor icon per step */}
                        {tab.id === 'dashboard' && <Monitor weight={isActive ? "fill" : "regular"} className={`w-4 h-4 ${isActive ? 'text-primary-500' : theme === 'dark' ? 'text-gray-650' : 'text-slate-450'}`} />}
                        {tab.id === 'connecting' && <Radio weight={isActive ? "fill" : "regular"} className={`w-4 h-4 ${isActive ? 'text-emerald-500 font-bold' : theme === 'dark' ? 'text-gray-650' : 'text-slate-450'}`} />}
                        {tab.id === 'meeting' && <Monitor weight={isActive ? "fill" : "regular"} className={`w-4 h-4 ${isActive ? 'text-blue-500' : theme === 'dark' ? 'text-gray-650' : 'text-slate-450'}`} />}
                      </div>
                      
                      <p className={`text-xs transition-colors leading-relaxed ${
                        isActive 
                          ? theme === 'dark' ? 'text-gray-300 font-medium' : 'text-slate-650 font-medium' 
                          : theme === 'dark' ? 'text-gray-500' : 'text-slate-400'
                      }`}>
                        {tab.subtitle}
                      </p>

                      {/* Auto play progress bar inside active tab */}
                      {isActive && autoPlay && (
                        <div className={`w-full h-[2px] rounded-full overflow-hidden mt-3 ${
                          theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'
                        }`}>
                          <motion.div 
                            className="h-full bg-gradient-to-l from-primary-500 to-indigo-500"
                            style={{ width: `${progress}%` }}
                            transition={{ ease: 'linear' }}
                          />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Play/Pause control for autoplay */}
            <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-[10px] border transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/[0.01] border-white/[0.03] text-gray-500' 
                : 'bg-slate-50 border-slate-100 text-slate-500'
            }`} dir="rtl">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${autoPlay ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>شبیه‌ساز هوشمند چرخه پلتفرم: {autoPlay ? 'روشن' : 'غیرفعال'}</span>
              </div>
              <button 
                onClick={() => setAutoPlay(!autoPlay)}
                className={`px-2.5 py-1 rounded border text-[9px] font-bold transition-all cursor-pointer active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10 border-white/5 text-gray-300'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                }`}
              >
                {autoPlay ? 'توقف پخش خودکار' : 'فعال‌سازی چرخه خودکار'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
