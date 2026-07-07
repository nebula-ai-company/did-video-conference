import React from 'react';
import { 
  Sparkles, Video, Shield, Monitor, MessageSquare, Mic, Users, Bell, Gauge, 
  Smartphone, Lock, UserPlus, Building2, Smile, Hand, Volume2, ShieldCheck, 
  MicOff, UserMinus, Timer, Eye, Wifi, Zap, Palette, User, Settings, Layers, 
  Volume1, VolumeX, ArrowLeft, Heart, ThumbsUp, Star, Play, Pause, RefreshCw,
  Fingerprint, FileText, Check, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { LandingLayout } from '../components/landing/LandingLayout';
import { AppView, UserSettings } from '../types';

interface LandingFeaturesProps {
  onChangeView: (view: AppView) => void;
  userSettings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

// 1. Hero Looping Motion Graphics Component
const HeroMotionGraphics: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  // We'll generate a highly sophisticated multi-layered 3D space
  // containing floating panels, dynamic network nodes, and pulsing signals.
  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center select-none overflow-visible" style={{ perspective: '1600px' }}>
      
      {/* 3D Space Ring Guides (Space-grade tech feel) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="absolute w-[360px] h-[360px] rounded-full border border-primary-500/10 dark:border-primary-500/20"
          style={{ rotateX: '65deg', rotateY: '-15deg' }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-blue-500/10 dark:border-blue-500/15"
          style={{ rotateX: '65deg', rotateY: '-15deg' }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[200px] h-[200px] rounded-full border border-indigo-500/10 dark:border-indigo-500/20"
          style={{ rotateX: '65deg', rotateY: '-15deg' }}
          animate={{ rotateZ: 180 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Pulsing Core Hub (WebRTC Concentrator) */}
      <motion.div 
        className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-primary-600 via-indigo-600 to-blue-500 flex items-center justify-center z-20 shadow-[0_0_80px_rgba(99,102,241,0.4)]"
        animate={{ 
          scale: [1, 1.08, 0.98, 1.08, 1],
          boxShadow: [
            "0 0 40px rgba(99,102,241,0.3)",
            "0 0 80px rgba(99,102,241,0.55)",
            "0 0 40px rgba(99,102,241,0.3)",
            "0 0 80px rgba(99,102,241,0.55)",
            "0 0 40px rgba(99,102,241,0.3)"
          ]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Core Inside Glow */}
        <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border transition-all duration-300 relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-slate-950 border-white/20 shadow-[inset_0_2px_12px_rgba(255,255,255,0.15)]' 
            : 'bg-white border-slate-200/80 shadow-[inset_0_2px_12px_rgba(99,102,241,0.06),0_4px_12px_rgba(0,0,0,0.05)]'
        }`}>
          {/* Scanning radar sweep */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent w-full h-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <Video className={`w-8 h-8 relative z-10 animate-pulse ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
          <span className={`text-[7px] font-mono font-black tracking-wider mt-1 relative z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CORE_LIVE</span>
        </div>
      </motion.div>

      {/* Floating 3D Angled Speaker Feed: Arash Rad (Speaker) */}
      <motion.div 
        className={`absolute top-0 right-[-10px] w-48 p-3 rounded-2.5xl backdrop-blur-xl border transition-all duration-300 flex flex-col gap-2 z-30 text-right ${
          theme === 'dark' 
            ? 'bg-slate-950/90 border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]' 
            : 'bg-white/95 border-slate-200/80 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08)]'
        }`}
        style={{ transform: 'rotateY(-18deg) rotateX(12deg) translateZ(50px)' }}
        animate={{ 
          y: [0, -8, 2, -8, 0],
          rotateY: [-18, -16, -20, -18],
          rotateX: [12, 14, 10, 12]
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <div className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-300 group ${
          theme === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-200/40'
        }`}>
          <img 
            src="https://picsum.photos/seed/arash/260/150" 
            alt="Arash" 
            className={`w-full h-full object-cover scale-105 transition-all duration-300 ${
              theme === 'dark' ? 'filter contrast-125 opacity-70 mix-blend-luminosity' : 'opacity-90'
            }`} 
            referrerPolicy="no-referrer" 
          />
          
          {/* Glass Overlay with audio activity border */}
          <div className="absolute inset-0 ring-2 ring-emerald-500/40 animate-pulse pointer-events-none rounded-xl" />
          
          <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-emerald-500/80 text-[7px] font-extrabold text-white flex items-center gap-1 shadow-xs">
            <span className="w-1 h-1 rounded-full bg-white animate-ping" />
            <span>سخنران فعال</span>
          </div>
          <div className="absolute bottom-1.5 right-2 text-[10px] font-black text-white drop-shadow-md">آرش راد</div>
        </div>

        {/* Live Audio Spectrum Equalizer */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-end gap-0.5 h-4">
            {[1.2, 2.5, 1.8, 0.9, 2.2, 1.5, 2.7, 1.1].map((val, idx) => (
              <motion.div 
                key={idx}
                className="w-1 rounded-full bg-gradient-to-t from-emerald-500 to-green-400"
                animate={{ height: [`${val * 4}px`, `${val * 1.2}px`, `${val * 5}px`, `${val * 4}px`] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.08 }}
              />
            ))}
          </div>
          <span className={`text-[8px] font-mono font-bold tracking-wider transition-colors ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>HD AUDIO</span>
        </div>
      </motion.div>

      {/* Floating 3D Angled Feed: Mina Alavi (Director) */}
      <motion.div 
        className={`absolute bottom-[-15px] left-[-15px] w-44 p-3 rounded-2.5xl backdrop-blur-xl border transition-all duration-300 flex flex-col gap-2 z-30 text-right ${
          theme === 'dark' 
            ? 'bg-slate-950/90 border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]' 
            : 'bg-white/95 border-slate-200/80 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08)]'
        }`}
        style={{ transform: 'rotateY(16deg) rotateX(10deg) translateZ(30px)' }}
        animate={{ 
          y: [0, 8, -2, 8, 0],
          rotateY: [16, 18, 14, 16],
          rotateX: [10, 8, 12, 10]
        }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
      >
        <div className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-300 ${
          theme === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-200/40'
        }`}>
          <img 
            src="https://picsum.photos/seed/mina/240/140" 
            alt="Mina" 
            className={`w-full h-full object-cover transition-all duration-300 ${
              theme === 'dark' ? 'filter contrast-110 opacity-75 mix-blend-luminosity' : 'opacity-90'
            }`} 
            referrerPolicy="no-referrer" 
          />
          
          <div className="absolute bottom-1.5 right-2 text-[9px] font-black text-white drop-shadow-md">مینا علوی</div>
          <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-sm" />
        </div>
        
        <div className="flex justify-between items-center px-0.5">
          <span className={`text-[8px] font-mono transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>پینگ: ۹ میلی‌ثانیه</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 rounded-full bg-primary-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </motion.div>

      {/* Telemetry Dashboard Widget (Real-time network stats) */}
      <motion.div 
        className={`absolute top-28 left-[-10px] p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 flex flex-col gap-1.5 z-40 font-mono text-right w-40 ${
          theme === 'dark' 
            ? 'bg-slate-950/90 border-primary-500/20 shadow-2xl' 
            : 'bg-white/95 border-primary-500/20 shadow-[0_15px_35px_-8px_rgba(99,102,241,0.08)]'
        }`}
        style={{ transform: 'rotateY(15deg) translateZ(80px)' }}
        animate={{ 
          y: [0, -5, 0],
          x: [0, 2, 0],
          rotateZ: [0, 1, -1, 0]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.2 }}
      >
        <div className={`flex justify-between items-center border-b pb-1.5 transition-colors ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className={`text-[8px] font-black tracking-widest transition-colors ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>E2EE WEB-RTC</span>
        </div>
        
        {/* Signal Chart Sparkline */}
        <div className="flex items-end gap-1 h-5 pt-1.5 justify-center">
          {[2, 4, 3, 5, 2, 6, 4, 7, 5, 8, 4, 9, 3].map((val, idx) => (
            <motion.div 
              key={idx}
              className="w-1 rounded-full bg-primary-500/80"
              animate={{ scaleY: [1, val * 0.4, 0.8, val * 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.06 }}
              style={{ height: '100%', transformOrigin: 'bottom' }}
            />
          ))}
        </div>

        <div className={`grid grid-cols-2 gap-1.5 pt-1 text-[7px] font-mono transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
          <div className={`p-1 rounded transition-colors ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div>BITRATE</div>
            <div className={`text-[8px] font-extrabold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>4.2 Mbps</div>
          </div>
          <div className={`p-1 rounded transition-colors ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div>LOSS</div>
            <div className={`text-[8px] font-extrabold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>0.00%</div>
          </div>
        </div>
      </motion.div>

      {/* Animated Glowing Connection Streams (Flowing light particles) */}
      <svg className="absolute w-full h-full pointer-events-none z-10" viewBox="0 0 400 400">
        {/* Path from Arash to Core */}
        <motion.path 
          d="M 320 120 Q 240 180 200 200" 
          fill="none" 
          stroke="url(#blue-gradient)" 
          strokeWidth="2" 
          strokeDasharray="6 200"
          animate={{ strokeDashoffset: [-206, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Path from Mina to Core */}
        <motion.path 
          d="M 90 320 Q 150 250 200 200" 
          fill="none" 
          stroke="url(#green-gradient)" 
          strokeWidth="2" 
          strokeDasharray="6 200"
          animate={{ strokeDashoffset: [206, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.3 }}
        />
        
        {/* SVG Gradients for beautiful glow trails */}
        <defs>
          <linearGradient id="blue-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="green-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Dynamic Floating Nodes */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <motion.div 
          className="absolute w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
          animate={{ x: [100, 110, 95, 100], y: [220, 210, 230, 220] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
          animate={{ x: [300, 285, 310, 300], y: [260, 275, 250, 260] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

    </div>
  );
};

// 2. Double-Bezel Hardened Container
const HardenedContainer: React.FC<{ children: React.ReactNode; theme?: 'light' | 'dark' }> = ({ children, theme = 'dark' }) => (
  <div className={`p-1.5 rounded-[2.2rem] border w-full relative transition-all duration-300 ${
    theme === 'dark' 
      ? 'bg-white/5 border-white/10' 
      : 'bg-slate-950/5 border-black/5'
  }`}>
    <div className={`p-5 rounded-[calc(2.2rem-0.375rem)] shadow-xl relative overflow-hidden flex flex-col gap-4 transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-[#08080C]' 
        : 'bg-white'
    }`}>
      {children}
    </div>
  </div>
);

// Code scrolling terminal for Sohrab's screen share in CollaborationVisualizer
const CodeTerminal: React.FC = () => {
  const codeLines = [
    "import { Connection } from '@did/rtc';",
    "const call = new Connection('room-arshad');",
    "await call.join({ audio: true, video: true });",
    "// Stream connected successfully",
    "const peer = call.getPeer('you');",
    "peer.on('stream', (stream) => {",
    "  attachToDom('video-grid', stream);",
    "});",
    "console.log('Active Bitrate: 4.2 Mbps');",
    "console.log('Packet Loss: 0.00%');",
    "// WebRTC encryption active (AES-256)",
  ];

  const [visibleCount, setVisibleCount] = React.useState(3);

  React.useEffect(() => {
    const int = setInterval(() => {
      setVisibleCount(prev => (prev % codeLines.length) + 1);
    }, 1500);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="w-full h-full bg-[#030307] p-3 flex flex-col justify-between font-mono text-[7px] sm:text-[9px] text-primary-400 select-none overflow-hidden relative border border-primary-500/20">
      <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1 text-[7px]">
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500" />
          <span className="w-1 h-1 rounded-full bg-yellow-500" />
          <span className="w-1 h-1 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-500 font-bold text-[7px] tracking-wide">src/did/webrtc.ts</span>
      </div>
      <div className="flex-1 flex flex-col justify-start space-y-1 overflow-hidden font-mono text-left">
        {codeLines.slice(0, visibleCount).map((line, idx) => {
          const isComment = line.startsWith("//");
          const isConsole = line.includes("console.");
          const colorClass = isComment 
            ? "text-emerald-500/85" 
            : isConsole 
              ? "text-amber-400/90" 
              : "text-blue-400/90";
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`whitespace-pre-wrap leading-tight ${colorClass}`}
            >
              <span className="text-slate-700 select-none mr-2">{(idx + 1).toString().padStart(2, '0')}</span>
              {line}
            </motion.div>
          );
        })}
      </div>
      <div className="absolute bottom-1 right-2 flex items-center gap-1 bg-primary-900/85 border border-primary-500/20 px-1.5 py-0.5 rounded text-[7px]">
        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-white text-[7px] font-bold">STREAMING LIVE</span>
      </div>
    </div>
  );
};

// 3. Category 1 Visualizer: Meetings and Collaboration
const CollaborationVisualizer: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [layout, setLayout] = React.useState<'grid' | 'focus'>('grid');
  const [isArashMuted, setIsArashMuted] = React.useState(false);
  const [isMinaHandRaised, setIsMinaHandRaised] = React.useState(false);
  const [reactions, setReactions] = React.useState<{ id: number; icon: React.ReactNode; color: string; left: number }[]>([]);
  const [isSohrabSharing, setIsSohrabSharing] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [currentPhase, setCurrentPhase] = React.useState(0);

  const spawnReaction = (type: 'heart' | 'thumb' | 'star' | 'smile') => {
    let icon = <Heart className="w-4 h-4 fill-current" />;
    let color = 'text-rose-500 bg-rose-500/10 border-rose-500/20';
    if (type === 'thumb') {
      icon = <ThumbsUp className="w-4 h-4 fill-current" />;
      color = 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    } else if (type === 'star') {
      icon = <Star className="w-4 h-4 fill-current" />;
      color = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    } else if (type === 'smile') {
      icon = <Smile className="w-4 h-4" />;
      color = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    }

    const newReaction = { id: Date.now(), icon, color, left: 15 + Math.random() * 70 };
    setReactions(prev => [...prev, newReaction]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 1800);
  };

  // Autoplay loop cycle
  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentPhase(prev => {
        const next = (prev + 1) % 4;
        
        if (next === 0) {
          // Phase 0: Reset, Arash active speaking
          setLayout('grid');
          setIsArashMuted(false);
          setIsMinaHandRaised(false);
          setIsSohrabSharing(false);
        } else if (next === 1) {
          // Phase 1: Mina raises hand, Arash muted
          setIsMinaHandRaised(true);
          setIsArashMuted(true);
        } else if (next === 2) {
          // Phase 2: Sohrab sharing screen, layout changes to focus mode
          setLayout('focus');
          setIsSohrabSharing(true);
          setIsMinaHandRaised(false);
        } else if (next === 3) {
          // Phase 3: Reactions burst, return to grid mode
          setLayout('grid');
          setIsSohrabSharing(false);
          setTimeout(() => spawnReaction('heart'), 100);
          setTimeout(() => spawnReaction('star'), 450);
          setTimeout(() => spawnReaction('thumb'), 800);
          setTimeout(() => spawnReaction('smile'), 1150);
        }
        
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleManualAction = (actionFn: () => void) => {
    setAutoPlay(false);
    actionFn();
  };

  return (
    <HardenedContainer theme={theme}>
      {/* Floating Reactions */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {reactions.map(r => (
            <motion.div
              key={r.id}
              className={`absolute bottom-16 p-2 rounded-full border flex items-center justify-center shadow-lg ${r.color}`}
              style={{ left: `${r.left}%` }}
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{ y: -180, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              {r.icon}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden p-2 border border-white/5">
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 text-[9px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-mono">00:14 · SECURE</span>
            {autoPlay && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary-500/20 border border-primary-500/30 text-primary-400 font-mono text-[7px] animate-pulse">
                <span className="w-1 h-1 rounded-full bg-primary-400 animate-ping" />
                DEMO LOOP
              </span>
            )}
          </div>
          <span className="text-white font-bold">اتاق همایش دید</span>
        </div>

        <motion.div className={`grid gap-1.5 w-full h-full pt-8 pb-1 transition-all duration-500 ${layout === 'grid' ? 'grid-cols-2 grid-rows-2' : 'grid-cols-4 grid-rows-4'}`} layout>
          {/* Me */}
          <motion.div className={`relative bg-slate-900 rounded-xl overflow-hidden border border-white/5 ${layout === 'grid' ? 'col-span-1 row-span-1' : 'col-span-3 row-span-3'}`} layout>
            <img src="https://picsum.photos/seed/you/400/250" alt="You" className="w-full h-full object-cover opacity-70 filter grayscale mix-blend-luminosity" referrerPolicy="no-referrer" />
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] sm:text-[10px] text-white">شما</div>
            {/* Tracking coordinates and live visualizers */}
            <div className="absolute top-2 right-2 text-white/30 font-mono text-[7px] select-none pointer-events-none tracking-widest">[ REC ]</div>
            {/* Laser scanning lines */}
            <motion.div 
              className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-50 z-10"
              animate={{ y: ['-10%', '110%', '-10%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded text-[7px] text-gray-300 font-mono select-none">
              <span>60 FPS</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
            </div>
          </motion.div>

          {/* Arash */}
          <motion.div className={`relative bg-slate-900 rounded-xl overflow-hidden border ${isArashMuted ? 'border-white/5' : 'border-primary-500/50 shadow-[0_0_20px_rgba(59,130,246,0.25)]'}`} layout>
            <img src="https://picsum.photos/seed/arash/200/150" alt="Arash" className="w-full h-full object-cover opacity-60 filter grayscale mix-blend-luminosity" referrerPolicy="no-referrer" />
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] sm:text-[10px] text-white flex items-center gap-1">
              {isArashMuted ? <MicOff className="w-2.5 h-2.5 text-red-500" /> : <Mic className="w-2.5 h-2.5 text-primary-400" />}
              <span>آرش راد</span>
            </div>
            {!isArashMuted && (
              <>
                {/* Glowing audio waveform */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 200 150" preserveAspectRatio="none">
                  <motion.path 
                    d="M 10,75 Q 30,40 50,75 T 90,105 T 130,45 T 170,95 T 190,75" 
                    fill="none" 
                    stroke="url(#voiceGrad)" 
                    strokeWidth="1.5"
                    animate={{
                      d: [
                        "M 10,75 Q 30,30 50,75 T 90,120 T 130,30 T 170,110 T 190,75",
                        "M 10,75 Q 30,120 50,75 T 90,30 T 130,120 T 170,40 T 190,75",
                        "M 10,75 Q 30,30 50,75 T 90,120 T 130,30 T 170,110 T 190,75"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="voiceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute bottom-1.5 left-1.5 flex gap-0.5 h-2.5 items-end">
                  {[...Array(3)].map((_, i) => (
                    <motion.div key={i} className="w-0.5 bg-primary-500 rounded-full" animate={{ height: [3, 9, 3] }} transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: "easeInOut" }} />
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Mina */}
          <motion.div className={`relative bg-slate-900 rounded-xl overflow-hidden border ${isMinaHandRaised ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]' : 'border-white/5'}`} layout>
            <img src="https://picsum.photos/seed/mina/200/150" alt="Mina" className="w-full h-full object-cover opacity-65 filter grayscale mix-blend-luminosity" referrerPolicy="no-referrer" />
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] sm:text-[10px] text-white">مینا علوی</div>
            <AnimatePresence>
              {isMinaHandRaised && (
                <motion.div 
                  className="absolute inset-0 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center backdrop-blur-xs" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                >
                  {/* Pulsing ring animation */}
                  <motion.div 
                    className="absolute w-12 h-12 rounded-full border-2 border-amber-500/40 pointer-events-none"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  />
                  <div className="p-1.5 rounded-full bg-amber-500 text-slate-950 shadow-lg relative z-10">
                    <Hand className="w-4 h-4 fill-current animate-bounce" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sohrab */}
          <motion.div className="relative bg-slate-900 rounded-xl overflow-hidden border border-white/5" layout>
            {isSohrabSharing ? (
              <CodeTerminal />
            ) : (
              <>
                <img src="https://picsum.photos/seed/sohrab/200/150" alt="Sohrab" className="w-full h-full object-cover opacity-60 filter grayscale mix-blend-luminosity" referrerPolicy="no-referrer" />
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] sm:text-[10px] text-white">سهراب سپهری</div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Simulator Triggers */}
      <div className="flex flex-wrap gap-1.5 justify-center pt-1 border-t border-slate-100 dark:border-white/5 text-[10px] sm:text-xs">
        <button 
          onClick={() => handleManualAction(() => setLayout(l => l === 'grid' ? 'focus' : 'grid'))} 
          className={`px-2.5 py-1 rounded-full border cursor-pointer font-bold transition-all duration-200 ${layout === 'focus' ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20' : 'bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-gray-300 border-slate-200 dark:border-white/5'}`}
        >
          {layout === 'grid' ? 'چیدمان تمرکز سخنران' : 'چیدمان گرید'}
        </button>
        <button 
          onClick={() => handleManualAction(() => setIsArashMuted(!isArashMuted))} 
          className={`px-2.5 py-1 rounded-full border cursor-pointer font-bold transition-all duration-200 ${isArashMuted ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' : 'bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-gray-300 border-slate-200 dark:border-white/5'}`}
        >
          {isArashMuted ? 'روشن کردن صدای آرش' : 'قطع صدای آرش'}
        </button>
        <button 
          onClick={() => handleManualAction(() => setIsMinaHandRaised(!isMinaHandRaised))} 
          className={`px-2.5 py-1 rounded-full border cursor-pointer font-bold transition-all duration-200 ${isMinaHandRaised ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' : 'bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-gray-300 border-slate-200 dark:border-white/5'}`}
        >
          دست مینا
        </button>
        <button 
          onClick={() => handleManualAction(() => setIsSohrabSharing(!isSohrabSharing))} 
          className={`px-2.5 py-1 rounded-full border cursor-pointer font-bold transition-all duration-200 ${isSohrabSharing ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20' : 'bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-gray-300 border-slate-200 dark:border-white/5'}`}
        >
          {isSohrabSharing ? 'قطع اشتراک صفحه' : 'اشتراک صفحه سهراب'}
        </button>
        {!autoPlay && (
          <button 
            onClick={() => {
              setAutoPlay(true);
              setCurrentPhase(0);
              setLayout('grid');
              setIsArashMuted(false);
              setIsMinaHandRaised(false);
              setIsSohrabSharing(false);
            }} 
            className="px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/20 cursor-pointer font-bold flex items-center gap-1 select-none"
          >
            <span>▶ فعال‌سازی اجرای خودکار</span>
          </button>
        )}
      </div>

      <div className="flex gap-2 justify-center mt-0.5 border-t border-slate-100 dark:border-white/5 pt-2">
        <button onClick={() => spawnReaction('heart')} className="p-1.5 rounded-full border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-500/20 cursor-pointer hover:scale-105 active:scale-95 transition-all"><Heart className="w-3.5 h-3.5 fill-current" /></button>
        <button onClick={() => spawnReaction('thumb')} className="p-1.5 rounded-full border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 cursor-pointer hover:scale-105 active:scale-95 transition-all"><ThumbsUp className="w-3.5 h-3.5 fill-current" /></button>
        <button onClick={() => spawnReaction('star')} className="p-1.5 rounded-full border border-amber-200 dark:border-amber-500/20 text-amber-650 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20 cursor-pointer hover:scale-105 active:scale-95 transition-all"><Star className="w-3.5 h-3.5 fill-current" /></button>
        <button onClick={() => spawnReaction('smile')} className="p-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 cursor-pointer hover:scale-105 active:scale-95 transition-all"><Smile className="w-3.5 h-3.5" /></button>
      </div>
    </HardenedContainer>
  );
};

// 4. Category 2 Visualizer: Admin and Controls
const AdminVisualizer: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [currentPhase, setCurrentPhase] = React.useState(0);
  const [isLocked, setIsLocked] = React.useState(false);
  const [isMutedAll, setIsMutedAll] = React.useState(false);
  const [isArashSpotlight, setIsArashSpotlight] = React.useState(false);
  const [sohrabKicked, setSohrabKicked] = React.useState(false);
  
  const [logs, setLogs] = React.useState<string[]>([
    "سیستم: اتصال پایدار برقرار شد. ۲ کاربر متصل هستند.",
    "سیستم: رمزگذاری دوطرفه (AES-256) فعال شد."
  ]);

  // Handle phase changes automatically
  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentPhase(prev => {
        const next = (prev + 1) % 5;
        if (next === 0) {
          setIsLocked(false);
          setIsMutedAll(false);
          setIsArashSpotlight(false);
          setSohrabKicked(false);
          setLogs([
            "سیستم: اتصال پایدار برقرار شد. ۲ کاربر متصل هستند.",
            "سیستم: رمزگذاری دوطرفه (AES-256) فعال شد."
          ]);
        } else if (next === 1) {
          setIsLocked(true);
          setLogs(prevLogs => [
            "ادمین ارشد: جلسه قفل شد. ورود کاربران جدید متوقف شد.",
            ...prevLogs
          ]);
        } else if (next === 2) {
          setIsArashSpotlight(true);
          setLogs(prevLogs => [
            "ادمین ارشد: حالت تمرکز (Spotlight) روی آرش راد فعال شد.",
            ...prevLogs
          ]);
        } else if (next === 3) {
          setIsMutedAll(true);
          setLogs(prevLogs => [
            "ادمین ارشد: قطع صدای امن (Safe Mute) حضار اعمال شد.",
            ...prevLogs
          ]);
        } else if (next === 4) {
          setSohrabKicked(true);
          setLogs(prevLogs => [
            "ادمین ارشد: کاربر «سهراب سپهری» به بیرون هدایت شد.",
            ...prevLogs
          ]);
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleManualAction = (actionFn: () => void) => {
    setAutoPlay(false);
    actionFn();
  };

  return (
    <HardenedContainer theme={theme}>
      <div className="border border-slate-100 dark:border-white/5 rounded-2xl p-4 bg-slate-50 dark:bg-[#06060c] text-right space-y-3 shadow-xl relative overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10 pointer-events-none -z-10" />

        {/* Panel Header */}
        <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-wider">PANEL CONTROL · OWNER</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-slate-800 dark:text-white">پنل مدیریت ارشد دید</span>
            <ShieldCheck className="w-3.5 h-3.5 text-primary-500" />
          </div>
        </div>

        {/* Global Security Controls */}
        <div className="grid grid-cols-2 gap-2">
          {/* Lock Button */}
          <button 
            onClick={() => handleManualAction(() => {
              setIsLocked(!isLocked);
              setLogs(prev => [`ادمین ارشد: دکمه قفل کلیک شد (${!isLocked ? "قفل شد" : "باز شد"})`, ...prev]);
            })} 
            className={`flex items-center justify-between p-2.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-all duration-300 ${isLocked ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:border-slate-300 dark:hover:border-white/20'}`}
          >
            <div className="flex items-center gap-1">
              {isLocked ? (
                <span className="text-[8px] bg-red-500 text-white px-1 py-0.5 rounded animate-pulse">LOCKED</span>
              ) : (
                <span className="text-[8px] bg-slate-150 dark:bg-white/10 px-1 py-0.5 rounded">OPEN</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span>{isLocked ? 'باز کردن قفل جلسه' : 'قفل امنیتی جلسه'}</span>
              <Lock className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Mute All Button */}
          <button 
            onClick={() => handleManualAction(() => {
              setIsMutedAll(!isMutedAll);
              setLogs(prev => [`ادمین ارشد: حالت سکوت همگانی (${!isMutedAll ? "فعال" : "غیرفعال"})`, ...prev]);
            })} 
            className={`flex items-center justify-between p-2.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-all duration-300 ${isMutedAll ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:border-slate-300 dark:hover:border-white/20'}`}
          >
            <div className="flex items-center gap-1">
              {isMutedAll ? (
                <span className="text-[8px] bg-amber-500 text-slate-950 px-1 py-0.5 rounded animate-pulse">MUTED</span>
              ) : (
                <span className="text-[8px] bg-slate-150 dark:bg-white/10 px-1 py-0.5 rounded">AUTO</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span>{isMutedAll ? 'آزاد کردن صدای همه' : 'بی‌صدا کردن همه'}</span>
              <MicOff className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Participants Control List */}
        <div className="space-y-2">
          {/* User 1: Arash Rad (Active Speaker + Spotlight Control) */}
          <div className={`flex items-center justify-between bg-white dark:bg-[#0b0b14] p-2.5 rounded-xl border transition-all duration-300 ${isArashSpotlight ? 'border-primary-500/40 dark:border-primary-500/30 shadow-[0_0_15px_rgba(59,130,246,0.12)]' : 'border-slate-200/50 dark:border-white/5'}`}>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleManualAction(() => {
                  setIsArashSpotlight(!isArashSpotlight);
                  setLogs(prev => [`ادمین ارشد: تغییر وضعیت اسپاتلایت آرش راد`, ...prev]);
                })}
                className={`px-2 py-0.5 rounded text-[8px] font-bold cursor-pointer transition-colors ${isArashSpotlight ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10'}`}
              >
                {isArashSpotlight ? 'اسپاتلایت فعال' : 'اسپاتلایت'}
              </button>
              {isArashSpotlight && (
                <div className="flex items-center gap-1 text-[8px] font-mono text-primary-500 dark:text-primary-400">
                  <Timer className="w-2.5 h-2.5 animate-spin" />
                  <span>۰۴:۵۹</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col text-right">
                <span className="font-extrabold text-xs text-slate-800 dark:text-white flex items-center gap-1">
                  آرش راد
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <span className="text-[8px] text-gray-400">سخنران جلسه</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-100 border border-primary-100/80 dark:border-primary-900/30 flex items-center justify-center font-bold text-[10px]">آر</div>
            </div>
          </div>

          {/* User 2: Sohrab Sepehri (Kicked/Restored State) */}
          <AnimatePresence mode="wait">
            {!sohrabKicked ? (
              <motion.div 
                key="sohrab-connected"
                className="flex items-center justify-between bg-white dark:bg-[#0b0b14] p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => handleManualAction(() => {
                      setSohrabKicked(true);
                      setLogs(prev => ["ادمین ارشد: اخراج سهراب سپهری از جلسه تصویری", ...prev]);
                    })} 
                    className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/25 text-[8px] font-bold transition-all cursor-pointer"
                  >
                    اخراج شرکت‌کننده
                  </button>
                  {isMutedAll && (
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold text-[7px] bg-amber-500/10 px-1 py-0.5 rounded">
                      <MicOff className="w-2.5 h-2.5" />
                      بسته
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col text-right">
                    <span className="font-extrabold text-xs text-slate-800 dark:text-white">سهراب سپهری</span>
                    <span className="text-[8px] text-gray-400">شرکت‌کننده</span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-200 border border-blue-200/50 dark:border-blue-800/30 flex items-center justify-center font-bold text-[10px]">سه</div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="sohrab-kicked-notification"
                className="flex items-center justify-between bg-red-500/5 p-2 rounded-xl border border-red-500/20 text-red-500 text-[10px] justify-center gap-2 shadow-inner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <span>سهراب سپهری از جلسه هدایت شد.</span>
                <button 
                  onClick={() => handleManualAction(() => {
                    setSohrabKicked(false);
                    setLogs(prev => ["ادمین ارشد: بازگرداندن سهراب سپهری به جلسه", ...prev]);
                  })} 
                  className="bg-red-500 text-white px-2 py-0.5 rounded text-[8px] font-bold hover:bg-red-600 cursor-pointer transition-colors shadow"
                >
                  بازگرداندن فوری
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tactical Log Console */}
        <div className={`p-2.5 rounded-xl font-mono text-[8.5px] text-left space-y-1 relative max-h-[90px] overflow-y-auto transition-all duration-300 border ${
          theme === 'dark'
            ? 'bg-[#030307] border-white/5 text-slate-400'
            : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <div className={`flex items-center justify-between border-b pb-1 mb-1 font-bold text-[7.5px] tracking-wider select-none transition-all duration-300 ${
            theme === 'dark' ? 'border-white/5 text-slate-500' : 'border-slate-250 text-slate-500'
          }`}>
            <span>RTC_EVENT_RECORDER</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500 font-bold">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
              LIVE STREAM
            </span>
          </div>
          <div className="space-y-1 font-mono">
            {logs.slice(0, 3).map((log, index) => (
              <div key={index} className="whitespace-nowrap overflow-hidden text-ellipsis flex gap-1.5 items-start justify-end text-right">
                <span className={theme === 'dark' ? 'text-primary-400/90' : 'text-primary-700 font-extrabold'}>{log}</span>
                <span className={`select-none ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>❯</span>
              </div>
            ))}
          </div>
        </div>

        {/* Autoplay & Demo Controllers */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-200/40 dark:border-white/5 text-[9px] text-gray-500">
          <div className="flex items-center gap-1.5">
            {autoPlay ? (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 font-bold animate-pulse text-[8px]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-ping" />
                چرخه خودکار ادمین فعال است
              </span>
            ) : (
              <button 
                onClick={() => {
                  setAutoPlay(true);
                  setCurrentPhase(0);
                  setIsLocked(false);
                  setIsMutedAll(false);
                  setIsArashSpotlight(false);
                  setSohrabKicked(false);
                }} 
                className="px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold cursor-pointer transition-colors flex items-center gap-1"
              >
                <Play className="w-2.5 h-2.5" />
                فعال‌سازی مجدد چرخه دمو
              </button>
            )}
          </div>
          <div className="flex gap-1.5">
            {autoPlay && (
              <button 
                onClick={() => setAutoPlay(false)}
                className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                title="توقف چرخه"
              >
                <Pause className="w-2.5 h-2.5" />
              </button>
            )}
            <button 
              onClick={() => {
                setIsLocked(false);
                setIsMutedAll(false);
                setIsArashSpotlight(false);
                setSohrabKicked(false);
                setLogs([
                  "سیستم: اتصال پایدار برقرار شد. ۲ کاربر متصل هستند.",
                  "سیستم: رمزگذاری دوطرفه (AES-256) فعال شد."
                ]);
                setCurrentPhase(0);
              }}
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
              title="بارگذاری مجدد"
            >
              <RefreshCw className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </HardenedContainer>
  );
};

// 5. Category 3 Visualizer: Notifications
const NotificationsVisualizer: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [currentPhase, setCurrentPhase] = React.useState(0);
  const [customNotification, setCustomNotification] = React.useState(false);
  const [isShaking, setIsShaking] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState("09:41");

  // Keep a blinking clock colon
  React.useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      const hrs = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Autoplay cycle for notification timeline
  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 5);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleManualTrigger = () => {
    setAutoPlay(false);
    setCustomNotification(true);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  const handleResetLoop = () => {
    setCustomNotification(false);
    setAutoPlay(true);
    setCurrentPhase(0);
  };

  // Notification items
  const activeNotifications = [
    {
      id: "invite",
      title: "آرش راد • تماس تصویری",
      desc: "شما را به جلسه «برنامه‌ریزی استراتژیک» دعوت کرد.",
      app: "دید (DID)",
      time: "اکنون",
      icon: <Video className="w-3 h-3 text-white" />,
      color: "from-primary-600 to-blue-500",
      actions: ["پیوستن فوری", "رد کردن"]
    },
    {
      id: "file",
      title: "مینا علوی • چت گروهی",
      desc: "فایل گزارش نهایی دپارتمان را ارسال کرد (financial_report.pdf)",
      app: "دید (DID)",
      time: "۱ دقیقه قبل",
      icon: <FileText className="w-3 h-3 text-white" />,
      color: "from-emerald-500 to-teal-600",
      actions: ["دانلود فایل"]
    },
    {
      id: "security",
      title: "سامانه مدیریت امنیت دید",
      desc: "اتاق همایش قفل شد. الگوریتم رمزنگاری فعال است (E2EE)",
      app: "پلتفرم دید",
      time: "۳ دقیقه قبل",
      icon: <ShieldCheck className="w-3 h-3 text-white" />,
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const phoneVariants = {
    idle: { y: 0, x: 0, rotate: 0 },
    shake: {
      x: [0, -6, 6, -6, 6, -3, 3, 0],
      rotate: [0, -1.5, 1.5, -1.5, 1.5, -0.5, 0.5, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <HardenedContainer theme={theme}>
      <div className="flex flex-col gap-4 items-center w-full">
        {/* Smartphone Simulator */}
        <motion.div 
          variants={phoneVariants}
          animate={isShaking ? "shake" : "idle"}
          className={`relative w-full max-w-[215px] aspect-[9/18] rounded-[2.5rem] border-[5px] p-2.5 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-slate-950 border-slate-900 shadow-black/80' 
              : 'bg-white border-slate-250 shadow-slate-300/40'
          }`}
        >
          {/* Status Bar / Notch */}
          <div className={`flex justify-between items-center text-[7px] font-mono px-2 z-30 select-none relative transition-all duration-300 ${
            theme === 'dark' ? 'text-white/80' : 'text-slate-600'
          }`}>
            <span>{currentTime}</span>
            {/* Dynamic Island / Bezel notch */}
            <div className={`w-14 h-3.5 rounded-full absolute top-[-1px] left-1/2 -translate-x-1/2 flex items-center justify-center border transition-all duration-300 ${
              theme === 'dark' ? 'bg-black border-white/5' : 'bg-slate-900 border-slate-950/5'
            }`}>
              <span className="w-1 h-1 rounded-full bg-blue-500/80 absolute right-3 animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <Wifi className={`w-2 h-2 ${theme === 'dark' ? 'text-white/80' : 'text-slate-600'}`} />
              <span>4G</span>
            </div>
          </div>

          {/* Screen Content - Lock Screen vs Dashboard */}
          <div className="absolute inset-0 flex flex-col justify-between p-3.5 pt-7 pb-4">
            {/* Ambient Background Gradient (locksreen wallpaper) */}
            <div className={`absolute inset-0 -z-20 transition-all duration-500 ${
              theme === 'dark' 
                ? 'bg-gradient-to-tr from-[#050510] via-indigo-950/40 to-slate-950' 
                : 'bg-gradient-to-tr from-indigo-50/60 via-blue-50/35 to-slate-50'
            }`} />
            <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-xl -z-10 animate-pulse duration-5000 transition-all ${
              theme === 'dark' ? 'bg-primary-500/10' : 'bg-primary-400/20'
            }`} />

            {currentPhase < 4 && !customNotification ? (
              // LOCK SCREEN VIEW
              <>
                {/* Time & Date Display */}
                <div className={`text-center mt-1 relative z-20 transition-all duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <div className={`text-[7px] font-medium tracking-wide ${theme === 'dark' ? 'opacity-80' : 'text-slate-500'}`}>سه‌شنبه، ۹ تیر</div>
                  <div className="text-2xl font-black font-mono leading-none mt-1 tracking-tight">{currentTime}</div>
                  <div className={`text-[6px] font-bold tracking-widest mt-0.5 flex items-center justify-center gap-0.5 ${
                    theme === 'dark' ? 'text-primary-400' : 'text-primary-650'
                  }`} dir="ltr">
                    <Lock className="w-2 h-2" />
                    SECURE PROTOCOL
                  </div>
                </div>

                {/* Staggered Notifications Area */}
                <div className="flex-1 flex flex-col justify-start py-4 space-y-1.5 overflow-y-auto max-h-[160px] no-scrollbar relative z-20" dir="rtl">
                  <AnimatePresence>
                    {/* Notification 1 (Invite) */}
                    {currentPhase >= 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: -15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`w-full p-2 rounded-xl border shadow-lg text-right space-y-1.5 transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-slate-900/90 backdrop-blur-md border-white/10' 
                            : 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[6px]">
                          <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-405'}`}>{activeNotifications[0].time}</span>
                          <div className="flex items-center gap-1">
                            <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{activeNotifications[0].app}</span>
                            <div className={`w-3.5 h-3.5 rounded bg-gradient-to-tr ${activeNotifications[0].color} flex items-center justify-center shadow-xs`}>
                              {activeNotifications[0].icon}
                            </div>
                          </div>
                        </div>
                        <div className={`text-[8px] font-black leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{activeNotifications[0].title}</div>
                        <div className={`text-[6px] leading-normal font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{activeNotifications[0].desc}</div>
                        
                        <div className="flex gap-1 pt-1 justify-start">
                          <button className="px-1.5 py-0.5 rounded bg-primary-500 text-white text-[5.5px] font-black shadow-xs cursor-pointer hover:bg-primary-650 transition-colors">
                            {activeNotifications[0].actions?.[0]}
                          </button>
                          <button className={`px-1.5 py-0.5 rounded text-[5.5px] font-bold cursor-pointer transition-colors ${
                            theme === 'dark' ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}>
                            {activeNotifications[0].actions?.[1]}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Notification 2 (File Upload) */}
                    {currentPhase >= 2 && (
                      <motion.div 
                        initial={{ opacity: 0, y: -15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                        className={`w-full p-2 rounded-xl border shadow-lg text-right space-y-1 transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-slate-900/90 backdrop-blur-md border-white/10' 
                            : 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[6px]">
                          <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-405'}`}>{activeNotifications[1].time}</span>
                          <div className="flex items-center gap-1">
                            <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{activeNotifications[1].app}</span>
                            <div className={`w-3.5 h-3.5 rounded bg-gradient-to-tr ${activeNotifications[1].color} flex items-center justify-center shadow-xs`}>
                              {activeNotifications[1].icon}
                            </div>
                          </div>
                        </div>
                        <div className={`text-[8px] font-black leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{activeNotifications[1].title}</div>
                        <div className={`text-[6px] leading-normal font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{activeNotifications[1].desc}</div>
                      </motion.div>
                    )}

                    {/* Notification 3 (Security Alert) */}
                    {currentPhase >= 3 && (
                      <motion.div 
                        initial={{ opacity: 0, y: -15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.25 }}
                        className={`w-full p-2 rounded-xl border shadow-lg text-right space-y-1 transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-slate-900/90 backdrop-blur-md border-white/10' 
                            : 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[6px]">
                          <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-405'}`}>{activeNotifications[2].time}</span>
                          <div className="flex items-center gap-1">
                            <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{activeNotifications[2].app}</span>
                            <div className={`w-3.5 h-3.5 rounded bg-gradient-to-tr ${activeNotifications[2].color} flex items-center justify-center shadow-xs`}>
                              {activeNotifications[2].icon}
                            </div>
                          </div>
                        </div>
                        <div className={`text-[8px] font-black leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{activeNotifications[2].title}</div>
                        <div className={`text-[6px] leading-normal font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{activeNotifications[2].desc}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Lockscreen Footer (Fingerprint unlock simulation) */}
                <div className="text-center flex flex-col items-center gap-1 relative z-20">
                  <motion.div 
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                        : 'bg-slate-100 border-slate-250 hover:bg-slate-200'
                    }`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Fingerprint className={`w-4 h-4 animate-pulse transition-colors ${theme === 'dark' ? 'text-primary-400' : 'text-primary-650'}`} />
                  </motion.div>
                  <span className={`text-[6px] tracking-wider transition-colors ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>برای باز کردن لمس کنید</span>
                </div>
              </>
            ) : customNotification ? (
              // MANUAL TEST NOTIFICATION VIEW
              <>
                <div className="text-center mt-1 relative z-20">
                  <div className={`text-[7px] font-medium tracking-wide ${theme === 'dark' ? 'text-white/80' : 'text-slate-500'}`}>سه‌شنبه، ۹ تیر</div>
                  <div className={`text-2xl font-black font-mono leading-none mt-1 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{currentTime}</div>
                </div>

                <div className="flex-1 flex items-center justify-center py-4 relative z-20" dir="rtl">
                  <motion.div 
                    initial={{ scale: 0.3, opacity: 0, rotate: -5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`w-full p-2.5 rounded-xl border-2 text-right space-y-1.5 transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border-primary-500/50 shadow-[0_0_20px_rgba(59,130,246,0.25)] text-white' 
                        : 'bg-white border-primary-500 shadow-[0_4px_12px_rgba(59,130,246,0.12)] text-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[6px]">
                      <span className="text-primary-605 font-extrabold animate-pulse">تست زنده</span>
                      <div className="flex items-center gap-1">
                        <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>دید (DID)</span>
                        <div className="w-3.5 h-3.5 rounded bg-primary-500 flex items-center justify-center">
                          <Bell className="w-2.5 h-2.5 text-white fill-current animate-bounce" />
                        </div>
                      </div>
                    </div>
                    <div className={`text-[8px] font-black ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>اعلان پوش (Push) با موفقیت ارسال شد!</div>
                    <div className={`text-[6px] leading-normal font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-550'}`}>سرویس وب‌سوکت پلتفرم دید بلافاصله پیام‌ها را به دستگاه هدف تحویل می‌دهد.</div>
                    
                    <button 
                      onClick={handleResetLoop}
                      className="w-full py-1 rounded bg-primary-500 hover:bg-primary-600 text-white font-extrabold text-[7px] transition-colors cursor-pointer text-center"
                    >
                      بستن و بازگشت به چرخه دمو
                    </button>
                  </motion.div>
                </div>

                <div className={`text-center text-[5.5px] tracking-wider transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>سرویس Push با پایداری کامل کشور فعال است</div>
              </>
            ) : (
              // UNLOCKED STATE (DASHBOARD SCREEN VIEW)
              <motion.div 
                key="unlocked-dashboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 p-3 pt-7 pb-4 flex flex-col justify-between"
              >
                {/* Dashboard mock inside phone */}
                <div className="space-y-2">
                  <div className={`flex justify-between items-center border-b pb-1 text-right transition-colors ${
                    theme === 'dark' ? 'border-white/5' : 'border-slate-250/60'
                  }`}>
                    <span className="text-[6px] text-primary-505 font-bold">اتاق‌های فعال</span>
                    <span className={`text-[8px] font-black ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>پلتفرم کنفرانس دید</span>
                  </div>

                  {/* Room 1 */}
                  <div className={`p-1.5 rounded-lg text-right space-y-1 transition-all duration-300 border ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-slate-50 border-slate-200/60 shadow-xs'
                  }`}>
                    <div className="flex justify-between items-center text-[5.5px]">
                      <span className="text-emerald-500 font-bold">۰۲:۱۴</span>
                      <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>کلاس هوش مصنوعی</span>
                    </div>
                    <div className={`text-[5px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>آرش راد، مینا علوی و ۱۲ نفر دیگر</div>
                    <button className="w-full py-0.5 rounded bg-primary-500 text-white text-[5px] font-bold text-center cursor-pointer hover:bg-primary-600 transition-colors">ورود به همایش</button>
                  </div>

                  {/* Room 2 */}
                  <div className={`p-1.5 rounded-lg text-right space-y-1 opacity-70 transition-all duration-300 border ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/5' 
                      : 'bg-slate-50/50 border-slate-100'
                  }`}>
                    <div className="flex justify-between items-center text-[5.5px]">
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`}>امروز ۱۲:۰۰</span>
                      <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-750'}`}>جلسه هیئت مدیره</span>
                    </div>
                    <div className={`text-[5px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>میزبان: دکتر سپهری</div>
                  </div>
                </div>

                {/* Fingerprint unlocked success banner */}
                <div className="flex flex-col items-center gap-1">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                  <span className={`text-[6px] font-bold tracking-wide transition-colors ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>شناسه تایید شد - قفل باز است</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Action button */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          <button 
            onClick={handleManualTrigger} 
            className="px-3.5 py-2 rounded-full text-[10px] font-black bg-primary-700 text-white hover:bg-primary-800 cursor-pointer shadow transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5" />
            ارسال اعلان تست (موبایل)
          </button>
          
          {!autoPlay && (
            <button 
              onClick={handleResetLoop}
              className="px-3 py-2 rounded-full text-[10px] font-black bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-800 dark:text-gray-300 border border-slate-200 dark:border-white/5 cursor-pointer transition-colors"
            >
              بازگشت به چرخه خودکار
            </button>
          )}
        </div>
      </div>
    </HardenedContainer>
  );
};

// 6. Category 4 Visualizer: Organizational Chart
const OrgVisualizer: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [selectedDept, setSelectedDept] = React.useState<'tech' | 'marketing'>('tech');

  const members = {
    tech: [
      { name: 'آرش راد', role: 'مدیر فنی', status: 'در حال جلسه', init: 'آر' },
      { name: 'مینا علوی', role: 'توسعه‌دهنده', status: 'آنلاین', init: 'می' }
    ],
    marketing: [
      { name: 'سهراب سپهری', role: 'مدیر مارکتینگ', status: 'آنلاین', init: 'سه' }
    ]
  };

  return (
    <HardenedContainer theme={theme}>
      <div className={`flex gap-1 p-1 rounded-xl border select-none transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-white/[0.03] border-white/5' 
          : 'bg-slate-100 border-slate-200'
      }`} dir="rtl">
        {(['tech', 'marketing'] as const).map(dept => (
          <button 
            key={dept} 
            onClick={() => setSelectedDept(dept)} 
            className={`flex-1 text-center py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
              selectedDept === dept 
                ? 'bg-primary-700 text-white' 
                : theme === 'dark'
                  ? 'text-gray-450 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {dept === 'tech' ? 'بخش فناوری' : 'بخش بازاریابی'}
          </button>
        ))}
      </div>

      <div className="space-y-1.5 text-right">
        <AnimatePresence mode="wait">
          <motion.div key={selectedDept} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
            {members[selectedDept].map((member, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-2 rounded-xl border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'border-white/5 bg-[#0b0b12]' 
                    : 'border-slate-200/60 bg-slate-50/50 shadow-xs'
                } text-[11px]`}
              >
                <button className="px-2 py-0.5 rounded bg-primary-500 hover:bg-primary-600 transition-colors text-white text-[8px] font-bold cursor-pointer">تماس فوری</button>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col text-right">
                    <span className={`font-extrabold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{member.name}</span>
                    <span className={`text-[8px] transition-colors duration-300 ${theme === 'dark' ? 'text-gray-450' : 'text-slate-505'}`}>{member.role}</span>
                  </div>
                  <div className="relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-white/5 text-gray-350' 
                        : 'bg-slate-200 text-slate-800'
                    }`}>{member.init}</div>
                    <span className={`absolute bottom-0 left-0 w-2 h-2 rounded-full ring-1 transition-colors duration-300 ${
                      theme === 'dark' ? 'ring-[#0b0b12]' : 'ring-white'
                    } ${member.status === 'آنلاین' ? 'bg-emerald-500' : 'bg-primary-700'}`} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </HardenedContainer>
  );
};

// 7. Category 5 Visualizer: Quality and Bandwidth Simulation
const QualityVisualizer: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [speed, setSpeed] = React.useState<'ultra' | 'weak'>('ultra');

  return (
    <HardenedContainer theme={theme}>
      <div className={`relative aspect-video w-full rounded-xl overflow-hidden border transition-all duration-300 ${
        theme === 'dark' ? 'bg-slate-950 border-white/5' : 'bg-slate-900 border-slate-250/80 shadow-md'
      }`}>
        <img 
          src="https://picsum.photos/seed/view/400/250" 
          alt="Quality" 
          className={`w-full h-full object-cover transition-all duration-750 ${speed === 'ultra' ? 'blur-0 opacity-80' : 'blur-[3.5px] contrast-75 saturate-50 opacity-60'}`} 
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[8px] sm:text-[10px] text-white font-bold font-mono">
          {speed === 'ultra' ? '1080p Ultra · 60fps' : '360p Adaptive Low-Data'}
        </div>
      </div>

      <div className={`p-2.5 rounded-xl border flex justify-between items-center text-[10px] font-mono select-none transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-[#0a0a0f] border-white/5' 
          : 'bg-slate-50 border-slate-200/80 shadow-xs'
      }`} dir="rtl">
        <div className="flex flex-col text-right">
          <span className={`text-[7px] font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>LATENCY PING</span>
          <span className={`font-bold transition-colors ${speed === 'weak' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-500'}`}>{speed === 'ultra' ? '8ms' : '110ms'}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className={`text-[7px] font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>PACKET LOSS</span>
          <span className={`font-bold transition-colors ${speed === 'weak' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-500'}`}>{speed === 'ultra' ? '0.00%' : '5.40%'}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className={`text-[7px] font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>BANDWIDTH VALUE</span>
          <span className={`font-bold transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{speed === 'ultra' ? '4.5 Mbps' : '340 Kbps'}</span>
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-1.5 p-1 rounded-xl border select-none transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-white/[0.03] border-white/5' 
          : 'bg-slate-100 border-slate-200'
      }`} dir="rtl">
        <button 
          onClick={() => setSpeed('ultra')} 
          className={`text-center py-1 rounded-lg text-[9px] font-bold cursor-pointer transition-all ${
            speed === 'ultra' 
              ? (theme === 'dark' ? 'bg-white text-slate-950' : 'bg-slate-900 text-white') 
              : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
          }`}
        >
          فیبر نوری (۱۰۸۰p)
        </button>
        <button 
          onClick={() => setSpeed('weak')} 
          className={`text-center py-1 rounded-lg text-[9px] font-bold cursor-pointer transition-all ${
            speed === 'weak' 
              ? (theme === 'dark' ? 'bg-white text-slate-950' : 'bg-slate-900 text-white') 
              : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
          }`}
        >
          اتصال ضعیف (۳۶۰p)
        </button>
      </div>
    </HardenedContainer>
  );
};

// 8. Category 6 Visualizer: Personalization
const PersonalizationVisualizer: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [blurBg, setBlurBg] = React.useState(false);
  const [useAvatar, setUseAvatar] = React.useState(false);

  return (
    <HardenedContainer theme={theme}>
      <div className={`relative aspect-video w-full rounded-xl overflow-hidden border flex items-center justify-center transition-all duration-300 ${
        theme === 'dark' ? 'bg-slate-950 border-white/5' : 'bg-slate-900 border-slate-200 shadow-md'
      }`}>
        <AnimatePresence mode="wait">
          {useAvatar ? (
            <motion.div 
              key="avatar" 
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white text-xl font-black relative z-10" 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }}
            >
              ش
              <span className="absolute inset-0 rounded-full bg-primary-400/20 animate-ping pointer-events-none" />
            </motion.div>
          ) : (
            <motion.div key="view" className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://picsum.photos/seed/warm/400/250" 
                alt="Virtual BG" 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${blurBg ? 'blur-md scale-105' : 'blur-0'}`} 
                referrerPolicy="no-referrer" 
              />
              <div className="relative w-16 h-16 rounded-full border-2 border-white/20 bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-white text-xs font-black z-10">کاربر</div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] sm:text-[10px] text-white select-none">دوربین شما</div>
      </div>

      <div className="flex gap-2 justify-center text-[10px] sm:text-xs select-none">
        <button 
          onClick={() => setBlurBg(!blurBg)} 
          disabled={useAvatar} 
          className={`px-3 py-1 rounded-full border font-bold cursor-pointer transition-all duration-300 ${
            useAvatar 
              ? 'opacity-40 cursor-not-allowed' 
              : blurBg 
                ? (theme === 'dark' ? 'bg-primary-500/10 text-primary-200 border-primary-550' : 'bg-primary-50 text-primary-750 border-primary-200/80')
                : (theme === 'dark' ? 'bg-white/[0.04] text-gray-300 border-white/5 hover:bg-white/[0.08]' : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200')
          }`}
        >
          محو پس‌زمینه
        </button>
        <button 
          onClick={() => setUseAvatar(!useAvatar)} 
          className={`px-3 py-1 rounded-full border font-bold cursor-pointer transition-all duration-300 ${
            useAvatar 
              ? (theme === 'dark' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200')
              : (theme === 'dark' ? 'bg-white/[0.04] text-gray-300 border-white/5 hover:bg-white/[0.08]' : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200')
          }`}
        >
          سوئیچ به آواتار
        </button>
      </div>
    </HardenedContainer>
  );
};

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

export const LandingFeatures: React.FC<LandingFeaturesProps> = ({ onChangeView, userSettings, updateSettings }) => {
  const onToggleTheme = () => {
    updateSettings({ theme: userSettings.theme === 'dark' ? 'light' : 'dark' });
  };

  const sections = [
    {
      id: 'collab',
      title: 'جلسات و همکاری کلاسی',
      subtitle: 'ارتباط پویا و کارآمد همگام با استانداردهای مدرن کار تیمی',
      features: [
        { icon: <Video className="w-4 h-4" />, title: 'ویدئو و صدای باکیفیت', desc: 'انتقال جریان تصویری و صوتی هم‌زمان با وضوح خیره‌کننده و کمترین تأخیر ممکن.' },
        { icon: <Monitor className="w-4 h-4" />, title: 'اشتراک صفحه پیشرفته', desc: 'اشتراک‌گذاری راحت صفحه با بزرگنمایی تمام‌صفحه و قابلیت خروج فوری.' },
        { icon: <Volume2 className="w-4 h-4" />, title: 'اشتراک صدای سیستم', desc: 'امکان پخش صدای باکیفیت سیستم یا مالتی‌مدیا هم‌زمان با ارائه بدون ایجاد اکو.' },
        { icon: <MessageSquare className="w-4 h-4" />, title: 'چت گروهی و ارسال فایل', desc: 'بخش چت درون‌جلسه‌ای زنده برای ارسال پیام‌های متنی، تصاویر و انواع فایل‌ها.' }
      ]
    },
    {
      id: 'admin',
      title: 'مدیریت و نظارت ادمین ارشد',
      subtitle: 'امکانات مدیریتی ارشد جهت حفظ نظم و هدایت جلسات رسمی',
      features: [
        { icon: <ShieldCheck className="w-4 h-4" />, title: 'نقش مالک و ادمین', desc: 'تعریف دقیق سطوح دسترسی گوناگون برای مدیریت و نظارت کارآمد در جلسات.' },
        { icon: <MicOff className="w-4 h-4" />, title: 'بی‌صدا کردن ایمن', desc: 'ادمین فقط می‌تواند میکروفون شرکت‌کننده را قطع کند و قادر به فعال‌سازی نیست.' }
      ]
    },
    {
      id: 'notifications',
      title: 'سیستم اعلان‌های هوشمند بلادرنگ',
      subtitle: 'ارسال و دریافت سریع دعوت‌نامه‌ها در هر زمان و مکان',
      features: [
        { icon: <Bell className="w-4 h-4" />, title: 'اعلان درون‌برنامه‌ای', desc: 'دریافت دعوت‌ها و پیام‌های اداری مهم در حین حضور در محیط پلتفرم به صورت پاپ‌آپ.' },
        { icon: <Smartphone className="w-4 h-4" />, title: 'اعلان پوش (Push)', desc: 'ارسال بلادرنگ دعوت به جلسه روی دسکتاپ و موبایل حتی در زمان بسته بودن مرورگر.' }
      ]
    },
    {
      id: 'org',
      title: 'سازمان و مدیریت یکپارچه تیم',
      subtitle: 'یکپارچه‌سازی کامل ساختار تشکیلات اداری با پلتفرم کنفرانس',
      features: [
        { icon: <Building2 className="w-4 h-4" />, title: 'ساختار سازمانی چارت', desc: 'امکان تعریف چارت، معاونت‌ها و دپارتمان‌های گوناگون سازمان برای ارتباط راحت‌تر.' },
        { icon: <Lock className="w-4 h-4" />, title: 'محدودسازی دسترسی', desc: 'امکان قفل جلسات اداری حساس منحصراً برای همکاران احرازهویت‌شده سازمان.' }
      ]
    },
    {
      id: 'quality',
      title: 'کیفیت هوشمند و پایداری شبکه داخلی',
      subtitle: 'بهینه‌سازی مداوم کیفیت بر اساس پارامترهای ارتباطی ایران',
      features: [
        { icon: <Gauge className="w-4 h-4" />, title: 'کیفیت تطبیقی (Simulcast)', desc: 'تغییر پویای رزولوشن ویدئو متناسب با کیفیت اینترنت و پهنای باند لحظه‌ای.' },
        { icon: <Wifi className="w-4 h-4" />, title: 'تست پینگ و پایش ارتباط', desc: 'نمایش گرافیکی لحظه‌ای پینگ، اتلاف بسته و تأخیر برای عیب‌یابی سریع ارتباط.' }
      ]
    },
    {
      id: 'personalization',
      title: 'شخصی‌سازی و ابزارهای وب‌کم',
      subtitle: 'تطبیق کامل محیط و سخت‌افزار با سلیقه و نیازهای اختصاصی شما',
      features: [
        { icon: <Palette className="w-4 h-4" />, title: 'تم تیره و روشن', desc: 'طراحی بصری چشم‌نواز با قابلیت سوئیچ خودکار یا دستی بین پوسته‌ها.' },
        { icon: <Layers className="w-4 h-4" />, title: 'بلور پس‌زمینه (Blur)', desc: 'محوسازی حرفه‌ای پس‌زمینه اتاق یا استفاده از افکت‌های زیبای وب‌کم.' }
      ]
    }
  ];

  return (
    <LandingLayout
      currentView={AppView.LANDING_FEATURES}
      onChangeView={onChangeView}
      theme={userSettings.theme}
      onToggleTheme={onToggleTheme}
    >
      <div className="flex-1 flex flex-col justify-center w-full relative overflow-hidden" dir="rtl">
        {/* Cinematic Premium Backdrop Mesh Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-primary-500/20 dark:bg-primary-500/15 blur-[140px] pointer-events-none z-0 animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/20 dark:bg-blue-600/12 blur-[140px] pointer-events-none z-0 animate-pulse duration-[10000ms]" />
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-indigo-500/15 dark:bg-indigo-500/10 blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[30%] w-[400px] h-[400px] rounded-full bg-purple-500/15 dark:bg-purple-600/10 blur-[120px] pointer-events-none z-0 animate-pulse duration-[12000ms]" />

        {/* Tactical Telemetry and Premium Grid Overlay Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          {/* 1. Dotted Matrix Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.75] dark:opacity-[0.85]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, currentColor 1.2px, transparent 1.2px)', 
              backgroundSize: '24px 24px',
              color: 'rgba(99, 102, 241, 0.45)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)'
            }} 
          />

          {/* 2. Horizontal and Vertical Hairline Tactical Rules with custom labels */}
          <div className="absolute top-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200/50 dark:via-white/5 to-transparent flex items-center justify-between px-12 text-[9px] font-mono tracking-widest text-gray-400/60 dark:text-gray-500/40">
            <span>SYS.LIVE.RTC</span>
            <span>NODE // TEH.EAST.01</span>
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
            <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500">RTC_LINK_ACTIVE</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col py-12 px-6 lg:px-12 max-w-[1400px] mx-auto w-full relative z-10" dir="rtl">
          
          {/* Ambient mesh glows */}
          <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-primary-500/5 blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-1/3 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none -z-10" />

        {/* 9. Cinematic Split Hero Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 text-right"
          variants={entranceContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:col-span-6 space-y-6">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/5 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/10 dark:border-primary-500/20 text-[11px] font-extrabold tracking-wide shadow-xs select-none backdrop-blur-sm" variants={entranceItemVariants}>
              <Sparkles className="w-3.5 h-3.5 text-primary-500 animate-pulse" />
              <span>ویژگی‌ها و قابلیت‌های جامع پلتفرم</span>
            </motion.div>
            <motion.h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight" variants={entranceItemVariants}>
              امکانات پیشرفته کنفرانس تصویری دید
            </motion.h1>
            <motion.p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl" variants={entranceItemVariants}>
              هر آنچه یک سازمان بزرگ، دانشگاه یا استارتاپ برای برقراری جلسات تصویری، همایش‌های چندهزار نفره و وبینارهای کاری خودمیزبان نیاز دارد. بهینه‌سازی شده روی بستر شبکه ایران.
            </motion.p>
            <motion.div className="pt-2" variants={entranceItemVariants}>
              <Button
                variant="primary"
                size="sm"
                className="rounded-full px-6 py-2 text-sm font-bold shadow-md shadow-primary-700/20 cursor-pointer inline-flex items-center gap-1.5"
                onClick={() => onChangeView(AppView.LOGIN)}
              >
                شروع کنفرانس رایگان
                <ArrowLeft className="w-4 h-4 mr-1.5" />
              </Button>
            </motion.div>
          </div>
          <motion.div className="lg:col-span-6 flex items-center justify-center" variants={entranceItemVariants}>
            <HeroMotionGraphics theme={userSettings.theme} />
          </motion.div>
        </motion.div>

        {/* 10. Asymmetrical Alternating Features Loop */}
        <div className="space-y-28 relative z-10">
          {sections.map((section, sIdx) => (
            <motion.div 
              key={section.id} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              variants={entranceContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
            >
              
              {/* Text Module */}
              <div className={`lg:col-span-5 space-y-6 ${sIdx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <motion.div className="flex flex-col items-start pr-4 border-r-4 border-primary-700 dark:border-primary-500 space-y-1" variants={entranceItemVariants}>
                  <h2 className="text-2xl font-black text-gray-950 dark:text-white leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {section.subtitle}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {section.features.map((feat, fIdx) => (
                    <motion.div 
                      key={fIdx} 
                      className="p-4 rounded-[1.8rem] bg-white/40 dark:bg-black/30 backdrop-blur-3xl border border-slate-200/50 dark:border-white/5 hover:border-primary-500/10 shadow-xs transition-all duration-300 flex gap-3 text-right group"
                      variants={entranceItemVariants}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary-100/60 dark:bg-primary-900/40 text-primary-700 dark:text-primary-100 border border-primary-100/80 dark:border-primary-900/30 flex items-center justify-center shrink-0 group-hover:bg-primary-100/90 dark:group-hover:bg-primary-900/60 group-hover:scale-105 transition-all">
                        {feat.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-500 transition-colors">
                          {feat.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-medium">
                          {feat.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Interactive Simulation Widget Module */}
              <motion.div className={`lg:col-span-7 flex justify-center w-full ${sIdx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`} variants={entranceItemVariants}>
                {section.id === 'collab' && <CollaborationVisualizer theme={userSettings.theme} />}
                {section.id === 'admin' && <AdminVisualizer theme={userSettings.theme} />}
                {section.id === 'notifications' && <NotificationsVisualizer theme={userSettings.theme} />}
                {section.id === 'org' && <OrgVisualizer theme={userSettings.theme} />}
                {section.id === 'quality' && <QualityVisualizer theme={userSettings.theme} />}
                {section.id === 'personalization' && <PersonalizationVisualizer theme={userSettings.theme} />}
              </motion.div>

            </motion.div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <motion.div 
          className="mt-28 bg-white/45 dark:bg-black/45 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8 md:p-14 text-center flex flex-col items-center gap-5 relative overflow-hidden shadow-2xl"
          variants={entranceContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent pointer-events-none" />
          <motion.div className="w-12 h-12 rounded-2xl bg-primary-700/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-100 border border-primary-500/20 dark:border-primary-500/30 flex items-center justify-center shadow-inner relative z-10" variants={entranceItemVariants}>
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.div>
          <motion.h2 className="text-2xl md:text-3xl font-black text-gray-950 dark:text-white relative z-10 leading-snug" variants={entranceItemVariants}>
            می‌خواهید برای سازمان خود فعال کنید؟
          </motion.h2>
          <motion.p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl relative z-10 leading-relaxed" variants={entranceItemVariants}>
            جهت تست زنده پلتفرم دید یا مشاوره تخصصی در زمینه فرآیند استقرار خودمیزبان (On-Premise) در سرورهای ابری، هم‌اکنون با ما در ارتباط باشید.
          </motion.p>
          <motion.div className="flex gap-4 relative z-10 pt-2" variants={entranceItemVariants}>
            <Button
              variant="primary"
              size="lg"
              className="rounded-full px-8 py-3.5 font-bold shadow-lg shadow-primary-500/15 group cursor-pointer"
              onClick={() => onChangeView(AppView.LOGIN)}
            >
              ورود به دید
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

      </div>
      </div>
    </LandingLayout>
  );
};
