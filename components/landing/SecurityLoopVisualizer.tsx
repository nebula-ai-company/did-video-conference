import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Shield, 
  Key, 
  Cpu, 
  Radio, 
  Check, 
  Users
} from '@phosphor-icons/react';

interface SecurityLoopVisualizerProps {
  theme?: 'light' | 'dark';
}

export const SecurityLoopVisualizer: React.FC<SecurityLoopVisualizerProps> = ({ theme = 'dark' }) => {
  const [activeStep, setActiveStep] = useState<'handshake' | 'tunnel' | 'sovereignty'>('handshake');
  const [encryptionProgress, setEncryptionProgress] = useState(100);
  const [isRotatingKeys, setIsRotatingKeys] = useState(false);
  const [handshakeState, setHandshakeState] = useState<'idle' | 'authenticating' | 'secured'>('secured');
  const [logs, setLogs] = useState<string[]>([
    'سیستم // سوکت امن راه‌اندازی شد',
    'سرور // تهران.غرب.۰۱ آنلاین',
    'سایفر // ECDHE-RSA-AES255-GCM SHA384'
  ]);

  // key rotation sequence trigger
  const triggerKeyRotation = () => {
    if (isRotatingKeys) return;
    setIsRotatingKeys(true);
    setHandshakeState('authenticating');
    setEncryptionProgress(0);
    
    // Add realistic security logs
    const newLogs = [
      'امنیت // شروع فرآیند چرخش کلید',
      'سایفر // تولید جفت‌کلید جدید ECDHE',
      'امنیت // چرخش موفق کلید. تونل ایمن شد.'
    ];

    setTimeout(() => {
      setEncryptionProgress(45);
    }, 400);

    setTimeout(() => {
      setEncryptionProgress(85);
    }, 800);

    setTimeout(() => {
      setEncryptionProgress(100);
      setIsRotatingKeys(false);
      setHandshakeState('secured');
      setLogs(prev => [newLogs[2], ...prev.slice(0, 4)]);
    }, 1200);

    setLogs(prev => [newLogs[1], newLogs[0], ...prev.slice(0, 3)]);
  };

  // Loop security steps automatically to make it a perfect motion-graphics loop
  useEffect(() => {
    const steps: Array<'handshake' | 'tunnel' | 'sovereignty'> = ['handshake', 'tunnel', 'sovereignty'];
    const timer = setInterval(() => {
      setActiveStep(current => {
        const nextIdx = (steps.indexOf(current) + 1) % steps.length;
        return steps[nextIdx];
      });
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`w-full max-w-5xl mx-auto p-1 rounded-[2.5rem] transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-[#ffffff]/[0.02] border border-white/5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]' 
        : 'bg-slate-100/60 border border-slate-200/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)]'
    }`}>
      {/* Double bezel pattern / Concentric Inner Box */}
      <div className={`relative w-full rounded-[calc(2.5rem-0.25rem)] overflow-hidden p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-[#06060a]/95 border border-white/[0.06]' 
          : 'bg-white border border-slate-200/50'
      }`}>
        
        {/* Decorative glass glare reflection layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.04] pointer-events-none z-20" />

        {/* LEFT COLUMN: THE GORGEOUS VECTOR MOTION GRAPHICS CHOREOGRAPHY CANVAS */}
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center relative min-h-[360px] md:min-h-[420px] rounded-3xl overflow-hidden p-4">
          
          {/* Animated Background Particle Grid */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div 
              className={`absolute inset-0 opacity-[0.06] dark:opacity-[0.15] transition-all`}
              style={{ 
                backgroundImage: theme === 'dark'
                  ? 'radial-gradient(circle, rgba(16,185,129,0.3) 1px, transparent 1px)'
                  : 'radial-gradient(circle, rgba(16,185,129,0.8) 1px, transparent 1px)', 
                backgroundSize: '20px 20px',
              }} 
            />
            {/* Soft glowing mesh color spheres */}
            <div className={`absolute top-1/4 left-1/4 w-[180px] h-[180px] rounded-full blur-[80px] transition-colors duration-500 ${
              theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-500/5'
            }`} />
            <div className={`absolute bottom-1/4 right-1/4 w-[180px] h-[180px] rounded-full blur-[80px] transition-colors duration-500 ${
              theme === 'dark' ? 'bg-primary-500/10' : 'bg-primary-500/5'
            }`} />
          </div>

          <AnimatePresence mode="wait">
            
            {/* VISUAL 1: SECURE HANDSHAKE & CRYPTOGRAPHIC CORE */}
            {activeStep === 'handshake' && (
              <motion.div
                key="visual-handshake"
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center w-full h-full z-10"
              >
                {/* Orbital Rings */}
                <div className="relative w-72 h-72 flex items-center justify-center">
                  
                  {/* Outermost rotating orbital */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className={`absolute w-full h-full rounded-full border border-dashed transition-all ${
                      theme === 'dark' ? 'border-emerald-500/15' : 'border-emerald-500/35'
                    }`}
                  >
                    {/* Floating key orbiting */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg text-white">
                      <Key className="w-4 h-4" weight="bold" />
                    </div>
                  </motion.div>

                  {/* Middle rotating orbital (opposite direction) */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className={`absolute w-5/6 h-5/6 rounded-full border border-dashed transition-all ${
                      theme === 'dark' ? 'border-primary-500/15' : 'border-primary-500/35'
                    }`}
                  >
                    {/* Floating secure shield orb orbiting */}
                    <div className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center shadow-lg text-white">
                      <Lock className="w-3.5 h-3.5" weight="fill" />
                    </div>
                  </motion.div>

                  {/* Central Security Core Core Container */}
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    
                    {/* Pulse expanding waves */}
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-full h-full rounded-full border border-emerald-500/20"
                    />
                    <motion.div 
                      animate={{ scale: [1.1, 1.6, 1.1], opacity: [0.2, 0, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                      className="absolute w-full h-full rounded-full border border-emerald-500/10"
                    />

                    {/* Central Cryptographic Orb */}
                    <motion.div 
                      animate={{ 
                        boxShadow: theme === 'dark' 
                          ? ['0 0 20px rgba(16,185,129,0.2)', '0 0 40px rgba(16,185,129,0.4)', '0 0 20px rgba(16,185,129,0.2)']
                          : ['0 0 15px rgba(16,185,129,0.1)', '0 0 30px rgba(16,185,129,0.2)', '0 0 15px rgba(16,185,129,0.1)']
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className={`w-32 h-32 rounded-full border flex flex-col items-center justify-center relative z-10 transition-all ${
                        theme === 'dark' 
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400' 
                          : 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-md'
                      }`}
                    >
                      {/* Rotating matrix inside core */}
                      <motion.div 
                        animate={{ rotate: isRotatingKeys ? 360 : 45 }}
                        transition={{ duration: isRotatingKeys ? 1.2 : 4, ease: isRotatingKeys ? "easeInOut" : "linear" }}
                        className="relative"
                      >
                        <Shield className="w-12 h-12 text-emerald-500 animate-pulse" weight="fill" />
                      </motion.div>
                      
                      <div className="absolute bottom-4 flex flex-col items-center select-none">
                        <span className="text-[8px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">هسته رمزنگاری E2EE</span>
                        <span className="text-[9px] font-extrabold text-emerald-500">{encryptionProgress}٪ رمزگذاری‌شده</span>
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* Micro interactivity tag */}
                <div className="mt-6 flex flex-col items-center gap-1 text-center">
                  <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border transition-all ${
                    theme === 'dark' 
                      ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}>
                    انتقال مستقیم WebRTC با رمزگذاری لایه‌ای DTLS-SRTP
                  </span>
                </div>
              </motion.div>
            )}

            {/* VISUAL 2: THE SECURE DATA ENCRYPTED TUNNEL */}
            {activeStep === 'tunnel' && (
              <motion.div
                key="visual-tunnel"
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center w-full h-full z-10"
              >
                {/* Beautiful data flow diagram */}
                <div className="relative w-full max-w-md h-64 flex items-center justify-between px-4">
                  
                  {/* Left Node: Sender (User) */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg transition-all ${
                      theme === 'dark' 
                        ? 'bg-white/[0.02] border-white/10 text-gray-300' 
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <Users className="w-7 h-7 text-primary-500" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-500 font-mono">سیستم_کاربر_مبدا</span>
                  </div>

                  {/* The Tunnel Pipeline Container */}
                  <div className="flex-1 relative h-20 mx-4 flex items-center justify-center">
                    
                    {/* Glowing pipeline tube background */}
                    <div className={`absolute inset-x-0 h-8 rounded-full border transition-all ${
                      theme === 'dark' 
                        ? 'bg-emerald-950/10 border-emerald-500/20' 
                        : 'bg-emerald-50/40 border-emerald-200'
                    }`} />

                    {/* Laser scanning beam */}
                    <motion.div 
                      animate={{ x: [-100, 200, -100] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-24 h-8 bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent rounded-full pointer-events-none"
                    />

                    {/* Secure Lock icon on top of the tunnel */}
                    <div className={`absolute w-8 h-8 rounded-full border flex items-center justify-center z-10 shadow transition-all ${
                      theme === 'dark' 
                        ? 'bg-emerald-900/80 border-emerald-500/40 text-emerald-400' 
                        : 'bg-emerald-500 border-emerald-400 text-white'
                    }`}>
                      <Lock className="w-4 h-4 animate-pulse" weight="fill" />
                    </div>

                    {/* Animated moving data packets */}
                    <motion.div 
                      animate={{ x: [-80, 80] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    />
                    <motion.div 
                      animate={{ x: [-80, 80] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 0.8 }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                    />
                    <motion.div 
                      animate={{ x: [-80, 80] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 1.4 }}
                      className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    />

                  </div>

                  {/* Right Node: Receiver (Server Cluster) */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg transition-all ${
                      theme === 'dark' 
                        ? 'bg-white/[0.02] border-white/10 text-gray-300' 
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <Cpu className="w-7 h-7 text-emerald-500" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-500 font-mono">گره_تهران_۰۱</span>
                  </div>

                </div>

                {/* Interactive Status Indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-[#10b981]/5 border-[#10b981]/20 text-[#10b981] text-[10px] font-mono tracking-widest uppercase font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>تونل غیرمتمرکز // برقرار شد</span>
                </div>
              </motion.div>
            )}

            {/* VISUAL 3: INDEPENDENT DATA SOVEREIGNTY / ZERO PERSISTENCE */}
            {activeStep === 'sovereignty' && (
              <motion.div
                key="visual-sovereignty"
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center w-full h-full z-10"
              >
                {/* 3D-feeling Server Tower visual representation */}
                <div className="relative w-64 h-56 flex items-center justify-center">
                  
                  {/* Dynamic glow grid representing memory cells */}
                  <div className={`grid grid-cols-4 gap-2.5 p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-slate-950/30 border-white/10'
                      : 'bg-emerald-50/40 border-emerald-100 shadow-xs'
                  }`}>
                    
                    {/* Matrix cascade */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

                    {Array.from({ length: 12 }).map((_, i) => {
                      const delays = [0.2, 0.5, 0.8, 1.1, 0.4, 0.7, 1.0, 1.3, 0.6, 0.9, 1.2, 1.5];
                      return (
                        <motion.div
                          key={i}
                          animate={{ 
                            backgroundColor: theme === 'dark' 
                              ? ['rgba(16,185,129,0.03)', 'rgba(16,185,129,0.2)', 'rgba(16,185,129,0.03)']
                              : ['rgba(255,255,255,0.7)', 'rgba(16,185,129,0.15)', 'rgba(255,255,255,0.7)'],
                            borderColor: theme === 'dark'
                              ? ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.3)', 'rgba(16,185,129,0.1)']
                              : ['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.4)', 'rgba(16,185,129,0.15)']
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: delays[i] }}
                          className={`w-10 h-10 rounded-lg border flex items-center justify-center text-[10px] font-bold ${
                            theme === 'dark'
                              ? 'text-emerald-400 border-emerald-500/10'
                              : 'text-emerald-700 border-emerald-200/50'
                          }`}
                        >
                          E{i+1}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Shield guard standing proud protecting sovereignty */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className={`absolute -bottom-2 w-14 h-14 rounded-2xl border text-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-emerald-500 border-emerald-400'
                        : 'bg-emerald-600 border-emerald-500 shadow-emerald-200/40'
                    }`}
                  >
                    <ShieldCheck className="w-8 h-8" weight="bold" />
                  </motion.div>
                </div>

                {/* Metadata status code */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] font-mono uppercase tracking-widest font-extrabold mt-4">
                  <span>استراتژی پاکسازی: فعال // داده‌ها غیرقابل تغییرند</span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: HIGH-END SCI-FI CONTROLLERS, TELEMETRY LOGGER & INTERACTIVE STORY */}
        <div className="w-full lg:w-2/5 space-y-6 flex flex-col justify-between">
          
          {/* Header/Title block */}
          <div className="space-y-2 text-right" dir="rtl">
            <span className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-mono font-bold block">سیستم رمزنگاری بومی دید</span>
            <h2 className={`text-xl md:text-2xl font-black transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>امنیت مطلق در هسته پلتفرم</h2>
            <p className={`text-xs transition-colors duration-300 leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              برخلاف دیگر پلتفرم‌ها که داده را در سرور‌های خارجی یا شخص‌ثالث پردازش می‌کنند، در دید تمامی تبادلات در کلاستر ابری اختصاصی و امن سازمان شما پردازش می‌شوند.
            </p>
          </div>

          {/* Core Interactive Stepper Buttons */}
          <div className="space-y-2.5" dir="rtl">
            
            {/* Step 1 Capsule: Handshake */}
            <button 
              onClick={() => setActiveStep('handshake')}
              className={`w-full text-right p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                activeStep === 'handshake' 
                  ? (theme === 'dark' ? 'bg-white/[0.03] border-white/10 shadow-lg' : 'bg-white border-slate-200 shadow-md')
                  : (theme === 'dark' ? 'border-white/[0.02] hover:bg-white/[0.01]' : 'border-slate-100 hover:bg-slate-50')
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                activeStep === 'handshake'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400'
              }`}>
                <Key className="w-5 h-5" weight="fill" />
              </div>
              <div className="space-y-0.5">
                <span className={`text-xs font-bold block transition-colors ${
                  activeStep === 'handshake' ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-700 dark:text-gray-300'
                }`}>گام اول: احراز هویت متقابل و هندشیک</span>
                <span className="text-[10px] text-gray-500 block">تبادل کلیدهای متقارن جلسات با فناوری ECDHE</span>
              </div>
            </button>

            {/* Step 2 Capsule: Secure Tunnel */}
            <button 
              onClick={() => setActiveStep('tunnel')}
              className={`w-full text-right p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                activeStep === 'tunnel' 
                  ? (theme === 'dark' ? 'bg-white/[0.03] border-white/10 shadow-lg' : 'bg-white border-slate-200 shadow-md')
                  : (theme === 'dark' ? 'border-white/[0.02] hover:bg-white/[0.01]' : 'border-slate-100 hover:bg-slate-50')
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                activeStep === 'tunnel'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400'
              }`}>
                <Radio className="w-5 h-5" weight="fill" />
              </div>
              <div className="space-y-0.5">
                <span className={`text-xs font-bold block transition-colors ${
                  activeStep === 'tunnel' ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-700 dark:text-gray-300'
                }`}>گام دوم: تونل دیتای رمزگذاری‌شده WebRTC</span>
                <span className="text-[10px] text-gray-500 block">انتقال هم‌زمان ترافیک صوت و تصویر با کدگذاری SRTP</span>
              </div>
            </button>

            {/* Step 3 Capsule: Sovereignty */}
            <button 
              onClick={() => setActiveStep('sovereignty')}
              className={`w-full text-right p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                activeStep === 'sovereignty' 
                  ? (theme === 'dark' ? 'bg-white/[0.03] border-white/10 shadow-lg' : 'bg-white border-slate-200 shadow-md')
                  : (theme === 'dark' ? 'border-white/[0.02] hover:bg-white/[0.01]' : 'border-slate-100 hover:bg-slate-50')
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                activeStep === 'sovereignty'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400'
              }`}>
                <Cpu className="w-5 h-5" weight="fill" />
              </div>
              <div className="space-y-0.5">
                <span className={`text-xs font-bold block transition-colors ${
                  activeStep === 'sovereignty' ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-700 dark:text-gray-300'
                }`}>گام سوم: حاکمیت کامل و پاکسازی داده‌ها</span>
                <span className="text-[10px] text-gray-500 block">عدم ذخیره هیچ داده صوتی، تصویری یا فایلی در سرورها</span>
              </div>
            </button>

          </div>

          {/* TELEMETRY READOUTS LOGGER CONSOLE PANEL */}
          <div className={`rounded-2xl p-4 border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-[#08080f] border-white/5' 
              : 'bg-slate-50 border-slate-200'
          }`} dir="rtl">
            <div className="flex items-center justify-between border-b border-dashed border-slate-200/50 dark:border-white/5 pb-2 mb-2">
              <span className="text-[9px] font-bold text-gray-400">کنسول پایش امنیت</span>
              
              {/* Trigger Interactive Security Key rotation */}
              <button 
                onClick={triggerKeyRotation}
                disabled={isRotatingKeys}
                className={`px-2.5 py-1 rounded text-[8px] font-mono font-bold cursor-pointer transition-all active:scale-95 ${
                  isRotatingKeys 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : theme === 'dark' 
                      ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400' 
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                }`}
              >
                {isRotatingKeys ? 'در حال چرخش کلید...' : 'چرخش مجدد کلید'}
              </button>
            </div>

            {/* Simulated Live Terminal logs output */}
            <div className="font-mono text-[9px] space-y-1.5 leading-normal select-none">
              <AnimatePresence>
                {logs.map((log, index) => (
                  <motion.div 
                    key={log + index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between text-gray-500 dark:text-gray-400"
                  >
                    <span className="text-right text-emerald-600 dark:text-emerald-400">{log}</span>
                    <span className="text-left text-[8px] font-medium text-gray-400/50">{`0${index+1}:00`}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
