import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Video, 
  Shield, 
  Sparkles, 
  Monitor, 
  Bell, 
  Gauge, 
  MessageSquare, 
  CheckCircle2, 
  Mic, 
  MicOff, 
  VideoOff, 
  Globe, 
  Lock, 
  FileText,
  UserCheck,
  PlayCircle,
  Activity,
  ArrowRight,
  Tv,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { LandingLayout } from '../components/landing/LandingLayout';
import { LaptopScrollDemo } from '../components/landing/LaptopScrollDemo';
import { AppView, UserSettings } from '../types';

interface LandingProps {
  onChangeView: (view: AppView) => void;
  userSettings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

const entranceContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    }
  }
};

const entranceItemVariants = {
  hidden: { y: 24, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    }
  }
};

export const Landing: React.FC<LandingProps> = ({ onChangeView, userSettings, updateSettings }) => {
  const onToggleTheme = () => {
    updateSettings({ theme: userSettings.theme === 'dark' ? 'light' : 'dark' });
  };

  // Interactive Mock Studio States
  const [activeSpeaker, setActiveSpeaker] = useState<number>(1); // 1 = Arash, 2 = Mina, 3 = Sohrab, 4 = Screen Share
  const [micStates, setMicStates] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: false });
  const [camStates, setCamStates] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: true });
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [latency, setLatency] = useState<number>(12);
  const [packetLoss, setPacketLoss] = useState<string>("0.00");
  const [audioWaves, setAudioWaves] = useState<number[]>([12, 6, 18, 14, 8]);

  // Fluctuating network telemetry & live audio waves
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real live audio stream heights
      setAudioWaves(Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 4));
      
      // Simulate micro latency fluctuations
      setLatency(prev => {
        const delta = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(9, Math.min(15, prev + delta));
      });

      // Simulate micro packet loss fluctuations (rarely)
      if (Math.random() > 0.95) {
        setPacketLoss(Math.random() > 0.5 ? "0.01" : "0.00");
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Handler to toggle self microphone
  const toggleMic = () => {
    setMicStates(prev => {
      const updated = { ...prev, 1: !prev[1] };
      // If muting self and self was active speaker, cycle to another speaker
      if (!updated[1] && activeSpeaker === 1) {
        setActiveSpeaker(2);
      } else if (updated[1]) {
        setActiveSpeaker(1);
      }
      return updated;
    });
  };

  // Handler to toggle self camera
  const toggleCam = () => {
    setCamStates(prev => ({ ...prev, 1: !prev[1] }));
  };

  // Handler to toggle screen sharing
  const toggleScreenShare = () => {
    setIsScreenSharing(prev => {
      const next = !prev;
      if (next) {
        setActiveSpeaker(4); // Screen share becomes focal speaker
      } else if (activeSpeaker === 4) {
        setActiveSpeaker(1);
      }
      return next;
    });
  };

  return (
    <LandingLayout
      currentView={AppView.LANDING}
      onChangeView={onChangeView}
      theme={userSettings.theme}
      onToggleTheme={onToggleTheme}
    >
      <div className="flex-1 flex flex-col justify-center w-full relative overflow-hidden" dir="rtl">
        
        {/* Cinematic Premium Backdrop Mesh Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-primary-500/10 dark:bg-primary-500/8 blur-[140px] pointer-events-none z-0 animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 dark:bg-blue-600/6 blur-[140px] pointer-events-none z-0 animate-pulse duration-[10000ms]" />
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[100px] pointer-events-none z-0" />

        {/* Tactical Telemetry and Premium Grid Overlay Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          {/* 1. Dotted Matrix Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.6] dark:opacity-[0.75]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', 
              backgroundSize: '24px 24px',
              color: 'rgba(99, 102, 241, 0.35)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)'
            }} 
          />

          {/* 2. Horizontal and Vertical Hairline Tactical Rules with custom labels */}
          <div className="absolute top-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200/50 dark:via-white/5 to-transparent flex items-center justify-between px-12 text-[9px] font-mono tracking-widest text-gray-400/60 dark:text-gray-500/40">
            <span>SYS.LIVE.RTC</span>
            <span>NODE // TEH.WEST.01</span>
          </div>

          <div className="absolute top-[55%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200/50 dark:via-white/5 to-transparent flex items-center justify-between px-12 text-[9px] font-mono tracking-widest text-gray-400/60 dark:text-gray-500/40">
            <span>SIGNAL_STRENGTH_99.8%</span>
            <span>BITRATE // 1080P_DYNAMIC</span>
          </div>

          {/* Vertical Guides */}
          <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-gradient-to-b from-gray-200/30 dark:from-white/[0.02] via-gray-200/20 dark:via-white/[0.01] to-transparent hidden md:block" />
          <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-gradient-to-b from-gray-200/30 dark:from-white/[0.02] via-gray-200/20 dark:via-white/[0.01] to-transparent hidden md:block" />

          {/* 3. Mathematical Crosshairs "+" at layout intersections */}
          <div className="absolute top-[15%] left-[8%] transform -translate-x-1/2 -translate-y-1/2 text-gray-300 dark:text-white/10 font-mono text-xs hidden md:block">+</div>
          <div className="absolute top-[15%] right-[8%] transform translate-x-1/2 -translate-y-1/2 text-gray-300 dark:text-white/10 font-mono text-xs hidden md:block">+</div>
          <div className="absolute top-[55%] left-[8%] transform -translate-x-1/2 -translate-y-1/2 text-gray-300 dark:text-white/10 font-mono text-xs hidden md:block">+</div>
          <div className="absolute top-[55%] right-[8%] transform translate-x-1/2 -translate-y-1/2 text-gray-300 dark:text-white/10 font-mono text-xs hidden md:block">+</div>

          {/* 4. Elegant Glowing Floating Radar Circles (Cinematic Motion) */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-[25%] left-[-15%] w-[600px] h-[600px] rounded-full border border-primary-500/5 dark:border-primary-400/5 flex items-center justify-center opacity-70"
          >
            {/* Inner Ring */}
            <div className="w-[450px] h-[450px] rounded-full border border-dashed border-blue-500/5 dark:border-blue-400/5 flex items-center justify-center">
              <div className="w-[300px] h-[300px] rounded-full border border-indigo-500/5 dark:border-indigo-400/5" />
            </div>
          </motion.div>

          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 55, repeat: Infinity, ease: "linear" },
              scale: { duration: 18, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full border border-dashed border-emerald-500/5 dark:border-emerald-400/5 flex items-center justify-center opacity-60"
          >
            <div className="w-[350px] h-[350px] rounded-full border border-primary-500/5 dark:border-primary-400/5" />
          </motion.div>

          {/* 5. Glowing signal nodes / radar indicators */}
          <div className="absolute top-[22%] left-[18%] hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100/30 dark:border-white/[0.05] shadow-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-wider">TEH_HUB_ACTIVE</span>
          </div>

          <div className="absolute bottom-[35%] right-[15%] hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100/30 dark:border-white/[0.05] shadow-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-400"></span>
            </span>
            <span className="text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-wider">PORT_3000_INGRESS</span>
          </div>
        </div>

        {/* 1. HERO SECTION WITH SPACOUS & ENHANCED DESIGN */}
        <section className="relative max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-20 pb-32 md:pt-32 md:pb-48">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center"
            variants={entranceContainerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Right Column: Hero copywriting */}
            <motion.div 
              className="lg:col-span-6 flex flex-col items-start text-right space-y-10"
              variants={entranceContainerVariants}
            >
              {/* Tagline kicker */}
              <motion.div 
                variants={entranceItemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/60 dark:bg-white/[0.02] backdrop-blur-md border border-primary-200/50 dark:border-white/10 text-primary-700 dark:text-primary-100 text-xs font-bold shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span>پلتفرم ویدئوکنفرانس سازمانی</span>
              </motion.div>

              {/* Large Editorial Headline */}
              <motion.div className="space-y-4" variants={entranceItemVariants}>
                <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] md:leading-[1.1] max-w-2xl">
                  جلسات ویدئویی سازمان شما،{' '}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-blue-500">
                    روی زیرساخت امن ایران.
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p 
                className="text-base md:text-lg lg:text-xl text-slate-650 dark:text-gray-300 max-w-xl leading-relaxed font-medium"
                variants={entranceItemVariants}
              >
                ویدئوکنفرانس امن، بومی و کاملاً فارسی با تاخیر فوق‌العاده پایین، مدیریت کامل جلسات، امنیت انتها به انتها و مالکیت صددرصدی داده‌ها.
              </motion.p>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg pt-2 text-sm"
                variants={entranceContainerVariants}
              >
                <motion.div className="flex items-center gap-2.5 text-slate-600 dark:text-gray-300" variants={entranceItemVariants}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">میزبانی ابری اختصاصی و امن</span>
                </motion.div>
                <motion.div className="flex items-center gap-2.5 text-slate-600 dark:text-gray-300" variants={entranceItemVariants}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">پروتکل پرسرعت WebRTC</span>
                </motion.div>
                <motion.div className="flex items-center gap-2.5 text-slate-600 dark:text-gray-300" variants={entranceItemVariants}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">رابط کاربری کامپوزیت کاملاً فارسی</span>
                </motion.div>
                <motion.div className="flex items-center gap-2.5 text-slate-600 dark:text-gray-300" variants={entranceItemVariants}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">بدون نیاز به نصب نرم‌افزار</span>
                </motion.div>
              </motion.div>

              {/* Action CTA Buttons */}
              <motion.div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4" variants={entranceItemVariants}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onChangeView(AppView.LOGIN)}
                  className="group rounded-full shadow-xl shadow-primary-900/15 font-bold cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  id="hero-cta-login"
                >
                  ورود به دید
                  <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Left Column: Premium Interactive Mockup Studio representing "Playable Playground" */}
            <motion.div 
              className="lg:col-span-6 flex flex-col items-center justify-center relative"
              variants={entranceItemVariants}
            >
              
              {/* Floating Ambient Badge 1 - Top Left */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -left-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-lg text-xs font-bold text-slate-850 dark:text-gray-200"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                <span>کدگذاری E2EE فعال</span>
              </motion.div>

              {/* Floating Ambient Badge 2 - Bottom Right */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-2 z-20 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-lg text-xs font-bold text-slate-855 dark:text-gray-200"
              >
                <Activity className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                <span>پینگ بومی: {latency} میلی‌ثانیه</span>
              </motion.div>

              {/* Glass App Studio Container */}
              <div className="w-full max-w-[550px] bg-slate-950/95 backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] rounded-[2.5rem] border border-white/10 p-5 md:p-6 flex flex-col gap-5 transform hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
                
                {/* Header of mock application */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/90" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/90" />
                    <span className="w-3 h-3 rounded-full bg-green-500/90" />
                  </div>
                  
                  {/* Title of conference */}
                  <div className="text-xs md:text-sm font-extrabold text-gray-200 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/5">
                    اتاق همایش فنی دید
                  </div>

                  {/* Connected Live status */}
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>زنده</span>
                  </div>
                </div>

                {/* Sub-header with real fluctuating analytics */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 px-1 font-mono">
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-primary-400" />
                    <span>کیفیت: 1080p Ultra</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      تاخیر: {latency}ms
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      پکت لاس: {packetLoss}%
                    </span>
                  </div>
                </div>

                {/* Interactive Participant 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3.5 relative">
                  
                  {/* Tile 1: Arash Rad (Muted or Speaking based on state) */}
                  <div 
                    onClick={() => {
                      if (micStates[1]) setActiveSpeaker(1);
                    }}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-950 transition-all duration-300 cursor-pointer ${
                      activeSpeaker === 1 
                        ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/25 scale-[1.02] z-10' 
                        : 'border border-white/10 hover:border-white/30 hover:scale-[1.01]'
                    }`}
                  >
                    {camStates[1] ? (
                      <img 
                        src="https://picsum.photos/seed/speaker1/400/300" 
                        alt="آرش راد" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80 grayscale contrast-125 mix-blend-luminosity transition-all duration-300" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950">
                        <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 font-black text-sm">
                          آر
                        </div>
                        <span className="text-[10px] text-gray-500 mt-2">دوربین خاموش</span>
                      </div>
                    )}

                    {/* Active Speaker Badge & Waveform overlay */}
                    {activeSpeaker === 1 && micStates[1] && (
                      <div className="absolute top-2 right-2 bg-primary-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        <span>سخنران فعال</span>

                        {/* Simulated audio bars */}
                        <div className="flex items-end gap-[1.5px] h-2 ml-1">
                          {audioWaves.map((height, i) => (
                            <div 
                              key={i} 
                              className="w-[1.5px] bg-white rounded-full transition-all duration-100" 
                              style={{ height: `${height * 0.4}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/5">
                      {micStates[1] ? (
                        <Mic className="w-3 h-3 text-primary-400" />
                      ) : (
                        <MicOff className="w-3 h-3 text-red-400" />
                      )}
                      <span>شما (آرش راد)</span>
                    </div>
                  </div>

                  {/* Tile 2: Mina Alavi */}
                  <div 
                    onClick={() => {
                      if (micStates[2]) setActiveSpeaker(2);
                    }}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-950 transition-all duration-300 cursor-pointer ${
                      activeSpeaker === 2 
                        ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/25 scale-[1.02] z-10' 
                        : 'border border-white/10 hover:border-white/30 hover:scale-[1.01]'
                    }`}
                  >
                    <img 
                      src="https://picsum.photos/seed/user2/400/300" 
                      alt="مینا علوی" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-70 grayscale contrast-125 mix-blend-luminosity" 
                    />

                    {/* Active Speaker Badge & Waveform overlay */}
                    {activeSpeaker === 2 && micStates[2] && (
                      <div className="absolute top-2 right-2 bg-primary-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        <span>سخنران فعال</span>

                        {/* Simulated audio bars */}
                        <div className="flex items-end gap-[1.5px] h-2 ml-1">
                          {audioWaves.map((height, i) => (
                            <div 
                              key={i} 
                              className="w-[1.5px] bg-white rounded-full transition-all duration-100" 
                              style={{ height: `${height * 0.4}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/5">
                      {micStates[2] ? (
                        <Mic className="w-3 h-3 text-primary-400" />
                      ) : (
                        <MicOff className="w-3 h-3 text-red-400" />
                      )}
                      <span>مینا علوی</span>
                    </div>
                  </div>

                  {/* Tile 3: Sohrab Sepehri */}
                  <div 
                    onClick={() => {
                      if (micStates[3]) setActiveSpeaker(3);
                    }}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-950 transition-all duration-300 cursor-pointer ${
                      activeSpeaker === 3 
                        ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/25 scale-[1.02] z-10' 
                        : 'border border-white/10 hover:border-white/30 hover:scale-[1.01]'
                    }`}
                  >
                    <img 
                      src="https://picsum.photos/seed/user3/400/300" 
                      alt="سهراب سپهری" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-60 grayscale contrast-125 mix-blend-luminosity" 
                    />

                    {/* Active Speaker Badge & Waveform overlay */}
                    {activeSpeaker === 3 && micStates[3] && (
                      <div className="absolute top-2 right-2 bg-primary-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        <span>سخنران فعال</span>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/5">
                      {micStates[3] ? (
                        <Mic className="w-3 h-3 text-primary-400" />
                      ) : (
                        <MicOff className="w-3 h-3 text-red-400" />
                      )}
                      <span>سهراب سپهری</span>
                    </div>
                  </div>

                  {/* Tile 4: Sara Hosseini OR Active Screen Share stream */}
                  <div 
                    onClick={() => {
                      if (isScreenSharing) setActiveSpeaker(4);
                    }}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-950 transition-all duration-300 cursor-pointer ${
                      activeSpeaker === 4 
                        ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/25 scale-[1.02] z-10' 
                        : 'border border-white/10 hover:border-white/30 hover:scale-[1.01]'
                    }`}
                  >
                    {isScreenSharing ? (
                      // Gorgeous animated mock presentation / code desktop view
                      <div className="absolute inset-0 bg-slate-900 flex flex-col p-2 select-none overflow-hidden font-mono text-[8px] text-gray-300 border border-primary-500/30">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1 text-[7px] text-gray-400">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                            در حال اشتراک صفحه آرش...
                          </span>
                          <span>did-dashboard.ts</span>
                        </div>
                        <div className="flex-1 space-y-1 py-1 leading-[1.3] text-primary-300">
                          <p className="text-emerald-400 font-semibold">import {'{ createMeeting }'} from 'did-sdk';</p>
                          <p>const meeting = createMeeting('did-room-991');</p>
                          <p className="text-blue-400">meeting.connect({'{'}</p>
                          <p className="pl-3">secure: true,</p>
                          <p className="pl-3">host: "tehran.did.ir",</p>
                          <p className="pl-3">bitrate: "4mbps"</p>
                          <p className="text-blue-400">{"});"}</p>
                        </div>
                        <div className="text-[7px] bg-primary-600/20 text-primary-300 py-0.5 text-center font-bold rounded mt-1 border border-primary-500/20 animate-pulse">
                          اشتراک زنده صفحه دسکتاپ
                        </div>
                      </div>
                    ) : (
                      // Default User 4 Tile with Camera Muted
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/90">
                        <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-500 text-[11px] font-bold border border-white/5">
                          سح
                        </div>
                        <VideoOff className="w-4 h-4 text-gray-600 mt-2" />
                        <span className="text-[8px] text-gray-500 mt-1">دوربین خاموش</span>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/5">
                      <MicOff className="w-3 h-3 text-red-400" />
                      <span>سارا حسینی</span>
                    </div>
                  </div>
                </div>

                {/* Highly polished Interactive Controller Panel at the bottom */}
                <div className="flex flex-col gap-3.5 border-t border-white/5 pt-4 mt-2">
                  <div className="flex items-center justify-between text-xs px-1 text-gray-400 font-bold">
                    <span>ابزارهای تعاملی (تست کنید):</span>
                    <span className="text-[10px] text-primary-400 font-medium">کلیک کنید تا کارکرد واقعی را ببینید</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    {/* Toggle Camera Button */}
                    <button 
                      type="button"
                      onClick={toggleCam}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                        camStates[1] 
                          ? 'bg-primary-700 hover:bg-primary-800 text-white shadow-primary-700/20' 
                          : 'bg-red-500/15 hover:bg-red-500/25 text-red-500'
                      }`}
                      title={camStates[1] ? "قطع دوربین" : "اتصال دوربین"}
                    >
                      {camStates[1] ? <Video className="w-4.5 h-4.5" /> : <VideoOff className="w-4.5 h-4.5" />}
                    </button>

                    {/* Toggle Microphone Button */}
                    <button 
                      type="button"
                      onClick={toggleMic}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                        micStates[1] 
                          ? 'bg-primary-700 hover:bg-primary-800 text-white shadow-primary-700/20' 
                          : 'bg-red-500/15 hover:bg-red-500/25 text-red-500'
                      }`}
                      title={micStates[1] ? "قطع میکروفون" : "اتصال میکروفون"}
                    >
                      {micStates[1] ? <Mic className="w-4.5 h-4.5" /> : <MicOff className="w-4.5 h-4.5" />}
                    </button>

                    {/* Toggle Screen Sharing Button */}
                    <button 
                      type="button"
                      onClick={toggleScreenShare}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                        isScreenSharing 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20' 
                          : 'bg-white/10 hover:bg-white/20 text-gray-200'
                      }`}
                      title="اشتراک دسکتاپ"
                    >
                      <Monitor className="w-4.5 h-4.5" />
                    </button>

                    {/* End Call Button */}
                    <button 
                      type="button"
                      onClick={() => onChangeView(AppView.LOGIN)}
                      className="px-5 h-11 rounded-full bg-red-650 hover:bg-red-700 text-white font-black text-xs flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-red-650/20 cursor-pointer"
                    >
                      پایان جلسه
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* INTERACTIVE 3D LAPTOP SCROLL STORYBOARD DEMO */}
        <LaptopScrollDemo theme={userSettings.theme} />

        {/* 2. TRUST STRIP */}
        <section className="w-full py-8 bg-slate-100/60 dark:bg-slate-950/50 border-y border-slate-200/50 dark:border-white/[0.04] backdrop-blur-sm">
          <motion.div 
            className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-center gap-4 lg:gap-8"
            variants={entranceContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            
            {/* Pill 1 */}
            <motion.div 
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/60 dark:border-white/10 text-sm font-semibold text-slate-755 dark:text-gray-300 shadow-sm"
              variants={entranceItemVariants}
            >
              <Globe className="w-4 h-4 text-primary-600 dark:text-primary-500" />
              <span>میزبانی در ایران</span>
            </motion.div>
 
            {/* Pill 2 */}
            <motion.div 
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/60 dark:border-white/10 text-sm font-semibold text-slate-755 dark:text-gray-300 shadow-sm"
              variants={entranceItemVariants}
            >
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
              <span>بدون وابستگی به سرویس خارجی</span>
            </motion.div>
 
            {/* Pill 3 */}
            <motion.div 
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/60 dark:border-white/10 text-sm font-semibold text-slate-755 dark:text-gray-300 shadow-sm"
              variants={entranceItemVariants}
            >
              <Lock className="w-4 h-4 text-blue-600 dark:text-blue-500" />
              <span>رمزگذاری WebRTC</span>
            </motion.div>
 
            {/* Pill 4 */}
            <motion.div 
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/60 dark:border-white/10 text-sm font-semibold text-slate-755 dark:text-gray-300 shadow-sm"
              variants={entranceItemVariants}
            >
              <FileText className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              <span>طراحی‌شده برای فارسی (RTL)</span>
            </motion.div>
 
          </motion.div>
        </section>

        {/* 3. FEATURE HIGHLIGHTS */}
        <section className="relative max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-24">
          <motion.div 
            className="text-center space-y-4 max-w-2xl mx-auto mb-16"
            variants={entranceContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100/70 dark:bg-primary-900/30 text-primary-800 dark:text-primary-100 border border-primary-200/50 dark:border-primary-800/25 text-xs font-bold" variants={entranceItemVariants}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>امکانات بی رقیب پلتفرم</span>
            </motion.div>
            <motion.h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight" variants={entranceItemVariants}>
              ویژگی‌های کلیدی کنفرانس تصویری دید
            </motion.h2>
            <motion.p className="text-sm md:text-base text-slate-600 dark:text-gray-400" variants={entranceItemVariants}>
              قابلیت‌هایی که برای برآورده کردن تمامی نیازهای ارتباطی تیم‌ها و سازمان‌های بزرگ طراحی شده است.
            </motion.p>
          </motion.div>
 
          {/* 6 Grid cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={entranceContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            {/* Card 1: ScreenShare */}
            <motion.div 
              className="p-8 rounded-[2rem] bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:bg-white/80 dark:hover:bg-slate-900/65 hover:border-slate-300/60 dark:hover:border-white/15 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-right transform group cursor-pointer transition-all duration-300"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-100/70 dark:bg-primary-900/40 text-primary-700 dark:text-primary-100 border border-primary-200/50 dark:border-primary-800/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">اشتراک صفحه</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                اشتراک‌گذاری صفحه با بزرگنمایی تمام‌صفحه.
              </p>
            </motion.div>

            {/* Card 2: Shield */}
            <motion.div 
              className="p-8 rounded-[2rem] bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:bg-white/80 dark:hover:bg-slate-900/65 hover:border-slate-300/60 dark:hover:border-white/15 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-right transform group cursor-pointer transition-all duration-300"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">مدیریت و نظارت ادمین</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                کنترل کامل میزبان روی جلسه و شرکت‌کنندگان.
              </p>
            </motion.div>

            {/* Card 3: Bell */}
            <motion.div 
              className="p-8 rounded-[2rem] bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:bg-white/80 dark:hover:bg-slate-900/65 hover:border-slate-300/60 dark:hover:border-white/15 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-right transform group cursor-pointer transition-all duration-300"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100/70 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/30 flex items-center justify-center text-blue-700 dark:text-blue-400 group-hover:scale-105 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">اعلان پوش</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                دعوت‌ها حتی وقتی برنامه بسته است به دست کاربر می‌رسد.
              </p>
            </motion.div>

            {/* Card 4: Gauge */}
            <motion.div 
              className="p-8 rounded-[2rem] bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:bg-white/80 dark:hover:bg-slate-900/65 hover:border-slate-300/60 dark:hover:border-white/15 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-right transform group cursor-pointer transition-all duration-300"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100/70 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/30 flex items-center justify-center text-amber-700 dark:text-amber-400 group-hover:scale-105 transition-transform">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">کیفیت تطبیقی</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                کیفیت تصویر به‌صورت خودکار با شبکه تنظیم می‌شود.
              </p>
            </motion.div>

            {/* Card 5: MessageSquare */}
            <motion.div 
              className="p-8 rounded-[2rem] bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:bg-white/80 dark:hover:bg-slate-900/65 hover:border-slate-300/60 dark:hover:border-white/15 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-right transform group cursor-pointer transition-all duration-300"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100/70 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/30 flex items-center justify-center text-purple-700 dark:text-purple-400 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">چت و واکنش‌ها</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                گفت‌وگوی متنی، ارسال فایل و واکنش‌های زنده.
              </p>
            </motion.div>
 
            {/* Card 6: Sparkles */}
            <motion.div 
              className="p-8 rounded-[2rem] bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:bg-white/80 dark:hover:bg-slate-900/65 hover:border-slate-300/60 dark:hover:border-white/15 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-right transform group cursor-pointer transition-all duration-300"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200/50 dark:border-pink-800/30 flex items-center justify-center text-pink-700 dark:text-pink-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">اسپاتلایت</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                تمرکز روی یک سخنران با تایمر قابل‌نمایش برای همه.
              </p>
            </motion.div>
 
          </motion.div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section className="relative max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-16">
          <motion.div 
            className="text-center space-y-4 max-w-2xl mx-auto mb-16"
            variants={entranceContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight" variants={entranceItemVariants}>
              چطور کار می‌کند؟
            </motion.h2>
            <motion.p className="text-sm md:text-base text-slate-600 dark:text-gray-400" variants={entranceItemVariants}>
              شروع و استفاده از پلتفرم دید در سه گام ساده و بسیار سریع صورت می‌پذیرد.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            variants={entranceContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Step 1 */}
            <motion.div 
              className="relative p-8 rounded-[2rem] bg-white/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-2xl flex flex-col gap-4 text-right overflow-hidden group cursor-pointer"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-4 left-4 text-7xl font-black text-slate-900/[0.03] dark:text-white/[0.03] select-none font-mono">
                1
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-100 border border-primary-200/50 dark:border-primary-800/30 flex items-center justify-center font-bold text-lg relative z-10">
                ۱
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white relative z-10">درخواست دسترسی</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed relative z-10">
                با ثبت اطلاعات سازمان خود در بخش تماس، به سرعت پنل اختصاصی با دمو آزمایشی برای شما فعال می‌گردد.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="relative p-8 rounded-[2rem] bg-white/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-2xl flex flex-col gap-4 text-right overflow-hidden group cursor-pointer"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-4 left-4 text-7xl font-black text-slate-900/[0.03] dark:text-white/[0.03] select-none font-mono">
                2
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-100 border border-primary-200/50 dark:border-primary-800/30 flex items-center justify-center font-bold text-lg relative z-10">
                ۲
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white relative z-10">ساخت سازمان و ورود</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed relative z-10">
                کاربران یا زیرمجموعه‌های سازمان تعریف شده و با نام کاربری و رمزعبور اختصاصی وارد سامانه می‌شوید.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="relative p-8 rounded-[2rem] bg-white/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-2xl flex flex-col gap-4 text-right overflow-hidden group cursor-pointer"
              variants={entranceItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-4 left-4 text-7xl font-black text-slate-900/[0.03] dark:text-white/[0.03] select-none font-mono">
                3
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-100 border border-primary-200/50 dark:border-primary-800/30 flex items-center justify-center font-bold text-lg relative z-10">
                ۳
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white relative z-10">شروع جلسه</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed relative z-10">
                اتاق کنفرانس جدید بسازید، کد دعوت را ارسال کنید و در کسری از ثانیه جلسه امن خود را آغاز نمایید.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* 5. CLOSING CTA BAND */}
        <section className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-16 pb-24">
          <motion.div 
            className="bg-gradient-to-br from-primary-100/50 via-slate-50/50 to-white/40 dark:from-primary-900/30 dark:via-slate-950/20 dark:to-black/50 border border-slate-200/60 dark:border-white/10 rounded-[2.5rem] p-8 md:p-14 text-center flex flex-col items-center gap-6 relative overflow-hidden shadow-2xl"
            variants={entranceContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Animated background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent pointer-events-none" />
            
            <motion.div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-700/15 text-primary-700 dark:text-primary-100 border border-primary-200/50 dark:border-primary-500/20 flex items-center justify-center shadow-inner relative z-10" variants={entranceItemVariants}>
              <Video className="w-6 h-6 animate-pulse" />
            </motion.div>

            <motion.h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white relative z-10 max-w-xl leading-snug" variants={entranceItemVariants}>
              امنیت، کیفیت و پایداری جلسات تصویری خود را تضمین کنید
            </motion.h2>
            <motion.p className="text-sm md:text-base text-slate-600 dark:text-gray-400 max-w-2xl relative z-10 leading-relaxed" variants={entranceItemVariants}>
              با سرویس خودمیزبان (Self-Hosted) یا سرورهای پرسرعت ابری دید، بستری مدرن و بدون قطعی برای ارتباطات سازمانی و وبینارهای خود برپا نمایید.
            </motion.p>

            <motion.div className="relative z-10 pt-4" variants={entranceItemVariants}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => onChangeView(AppView.LOGIN)}
                className="group rounded-full shadow-xl shadow-primary-900/15 font-bold cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                id="closing-cta-login"
              >
                ورود به دید
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </LandingLayout>
  );
};
