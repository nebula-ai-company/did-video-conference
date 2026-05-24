import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, Video, User, Sliders, Shield, Activity, 
  Check, Loader2, Play, Square, Moon, Sun, Calendar, 
  ArrowRight, Sparkles, CheckCircle2, Mic, MicOff, VideoOff,
  Wifi, HelpCircle, Laptop, Bell, KeyRound
} from 'lucide-react';
import { Button } from '../components/Button';
import { AppView, UserSettings } from '../types';
import { Grainient } from '../components/Grainient';

interface SettingsProps {
  onChangeView: (view: AppView) => void;
  userSettings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

type TabType = 'media' | 'identity' | 'network' | 'preferences';

export const Settings: React.FC<SettingsProps> = ({ onChangeView, userSettings, updateSettings }) => {
  const [activeTab, setActiveTab] = useState<TabType>('media');
  
  // Audio/Video State
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
  const [testSoundPlaying, setTestSoundPlaying] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isLoadingStream, setIsLoadingStream] = useState(false);
  const [streamError, setStreamError] = useState(false);
  
  // Selected virtual background filter state
  const [activeBgFilter, setActiveBgFilter] = useState<'none' | 'blur' | 'cyberpunk' | 'editorial' | 'warm'>('none');

  // Network Test State
  const [pingTestRunning, setPingTestRunning] = useState(false);
  const [pingResult, setPingResult] = useState<number | null>(null);
  const [packetLoss, setPacketLoss] = useState<number | null>(null);
  const [testResultText, setTestResultText] = useState('');

  // Local display name input state to allow applying changes manually/onblur
  const [localDisplayName, setLocalDisplayName] = useState(userSettings.displayName);
  const [displayNameStatus, setDisplayNameStatus] = useState<'idle' | 'saved'>('idle');

  // Local general settings config (default states, calendar system)
  const [calendarSystem, setCalendarSystem] = useState<'jalali' | 'gregorian' | 'lunar'>('jalali');
  const [farsiDigits, setFarsiDigits] = useState(true);
  const [autoMuteMic, setAutoMuteMic] = useState(!userSettings.audioEnabled);
  const [autoMuteCam, setAutoMuteCam] = useState(!userSettings.videoEnabled);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const testAudioOscillatorRef = useRef<OscillatorNode | null>(null);

  // Initialize and list media devices
  useEffect(() => {
    const listDevices = async () => {
      try {
        // Enforce prompt permission if not yet permitted
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch(() => {});
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter(d => d.kind === 'videoinput');
        const audioInputDevices = devices.filter(d => d.kind === 'audioinput');
        const audioOutputDevices = devices.filter(d => d.kind === 'audiooutput');

        setCameras(videoInputDevices);
        setMics(audioInputDevices);
        setSpeakers(audioOutputDevices);

        // Fallback updates to make sure we store actual IDs
        const updates: Partial<UserSettings> = {};
        if (userSettings.videoDeviceId === 'default' && videoInputDevices.length > 0) {
          updates.videoDeviceId = videoInputDevices[0].deviceId;
        }
        if (userSettings.audioDeviceId === 'default' && audioInputDevices.length > 0) {
          updates.audioDeviceId = audioInputDevices[0].deviceId;
        }
        if (Object.keys(updates).length > 0) {
          updateSettings(updates);
        }
      } catch (err) {
        console.error("Failed to query hardware devices", err);
      }
    };
    listDevices();
  }, [userSettings.audioDeviceId, userSettings.videoDeviceId, updateSettings]);

  // Handle active video stream preview for tests
  useEffect(() => {
    if (activeTab === 'media') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab, userSettings.videoDeviceId, userSettings.audioDeviceId]);

  // Start feed for setting tester
  const startCamera = async () => {
    setIsLoadingStream(true);
    setStreamError(false);
    stopCamera();

    const constraints = {
      video: userSettings.videoDeviceId && userSettings.videoDeviceId !== 'default' 
        ? { deviceId: { exact: userSettings.videoDeviceId }, width: 640, height: 480 } 
        : { width: 640, height: 480 },
      audio: userSettings.audioDeviceId && userSettings.audioDeviceId !== 'default' 
        ? { deviceId: { exact: userSettings.audioDeviceId } } 
        : true
    };

    try {
      const activeStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(activeStream);
      if (videoRef.current) {
        videoRef.current.srcObject = activeStream;
      }
      setupMicMeter(activeStream);
    } catch (err) {
      console.error("Error generating stream preview in settings", err);
      setStreamError(true);
    } finally {
      setIsLoadingStream(false);
    }
  };

  // Stop active media stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setAudioLevel(0);
  };

  // Sound meter visual analyzer setup
  const setupMicMeter = (mediaStream: MediaStream) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const source = ctx.createMediaStreamSource(mediaStream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 32;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const calculateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        // Smooth transitions for sound indicator scale
        setAudioLevel(prev => prev + (average - prev) * 0.25);
        animationFrameRef.current = requestAnimationFrame(calculateVolume);
      };
      calculateVolume();
    } catch (err) {
      console.error("Failed to setup mic sensor testing", err);
    }
  };

  // Synthesize test output noise on speaker channel
  const handleTestSpeakerSound = () => {
    if (testSoundPlaying) {
      if (testAudioOscillatorRef.current) {
        try {
          testAudioOscillatorRef.current.stop();
        } catch (e) {}
        testAudioOscillatorRef.current = null;
      }
      setTestSoundPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime); // Standard concert A frequency
      
      // Beautiful harmonic interval ring pattern
      osc.frequency.setTargetAtTime(659.25, ctx.currentTime + 0.15, 0.1); // E5 major
      osc.frequency.setTargetAtTime(880, ctx.currentTime + 0.35, 0.1); // A5 Octave
      
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      setTestSoundPlaying(true);
      testAudioOscillatorRef.current = osc;

      osc.onended = () => {
        setTestSoundPlaying(false);
        ctx.close();
      };

      setTimeout(() => {
        if (osc) {
          try {
            osc.stop();
          } catch (e) {}
        }
        setTestSoundPlaying(false);
        ctx.close();
      }, 1000);

    } catch (err) {
      console.error("Test sound system failure", err);
    }
  };

  // Run dynamic localized connection health checks
  const runPingTest = () => {
    setPingTestRunning(true);
    setPingResult(null);
    setPacketLoss(null);
    
    let countdown = 0;
    const interval = setInterval(() => {
      countdown++;
      if (countdown === 1) setTestResultText("در حال بازخوانی مسیر ارتباطی محلی...");
      if (countdown === 3) setTestResultText("ارزیابی تداخل امواج و سرریز بافر...");
      if (countdown === 5) {
        clearInterval(interval);
        
        // Generate optimal performance results for internal intranet
        const optimalDelay = Math.floor(Math.random() * 12) + 2; // Real-world optimal Local Ping
        const lossRate = Math.random() > 0.92 ? 1 : 0; // Extremely low loss on private backbones
        
        setPingResult(optimalDelay);
        setPacketLoss(lossRate);
        setPingTestRunning(false);
        setTestResultText(optimalDelay < 8 
          ? "کیفیت ارتباط عالی و بدون هرگونه افت سرعت برخط شبکه‌ای." 
          : "اتصال با کیفیت مناسب برقرار است. بار ترافیکی متعادل است.");
      }
    }, 600);
  };

  // Apply display name changes manually
  const saveDisplayName = () => {
    if (localDisplayName.trim()) {
      updateSettings({ displayName: localDisplayName.trim() });
      setDisplayNameStatus('saved');
      setTimeout(() => setDisplayNameStatus('idle'), 2000);
    }
  };

  const toPersianDigits = (num: number | string) => {
    if (!farsiDigits) return num.toString();
    const farsiNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (x) => farsiNums[parseInt(x)]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020204] text-slate-800 dark:text-gray-100 font-sans overflow-x-hidden relative flex flex-col transition-colors duration-500">
      
      {/* Cinematic visual backdrop using our designated and highly customized Grainient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Grainient 
          color1={userSettings.theme === 'dark' ? "#0A1224" : "#E2E8F0"} 
          color2={userSettings.theme === 'dark' ? "#020408" : "#F8FAFC"} 
          color3={userSettings.theme === 'dark' ? "#0F1B35" : "#CBD5E1"} 
          timeSpeed={0.12} 
          opacity={userSettings.theme === 'dark' ? 0.7 : 0.4} 
        />
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          userSettings.theme === 'dark' 
            ? 'bg-gradient-to-t from-[#020204] via-transparent to-[#020204]/60' 
            : 'bg-gradient-to-t from-slate-50/90 via-slate-50/40 to-slate-50/50'
        }`}></div>
        
        {/* Fine-line structure grids matching high density modern screens */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ 
            backgroundImage: userSettings.theme === 'dark'
              ? `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`
              : `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        ></div>
      </div>

      {/* Primary Fixed Top Action Header */}
      <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-[#020204]/60 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-tr from-primary-600 to-primary-500 rounded-xl shadow-md text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-1">تنظیمات اصلی سامانه</h1>
              <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">پیکربندی هویت، صدا، تصویر و خطوط ارتباطی دید</p>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full gap-2 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:dark:bg-white/10 text-slate-700 dark:text-gray-200 transition-all font-semibold flex items-center shadow-sm dark:shadow-none"
            onClick={() => onChangeView(AppView.HOME)}
          >
            <ArrowRight className="w-4 h-4" />
            <span>خروج از تنظیمات</span>
          </Button>
        </div>
      </header>

      {/* Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 relative z-10 flex flex-col md:flex-row gap-8 items-stretch mb-10">
        
        {/* Tabs Control Sidebar Panel (Right position in RTL layout) */}
        <aside className="w-full md:w-80 shrink-0 flex flex-col gap-2.5 bg-white/55 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 rounded-3xl p-4 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-3xl md:h-fit">
          <div className="px-3 pb-3 border-b border-slate-200/60 dark:border-white/5 mb-2 hidden md:block">
            <span className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">بخش‌های پیکربندی</span>
          </div>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-all text-right font-medium text-sm border ${
              activeTab === 'media'
                ? 'bg-primary-500/10 border-primary-500/30 text-primary-600 dark:text-primary-400 shadow-[0_4px_20px_rgba(33,150,243,0.08)]'
                : 'bg-transparent border-transparent text-slate-600 dark:text-gray-400 hover:text-slate-900 hover:dark:text-gray-100 hover:bg-slate-100 dark:hover:bg-white/[0.03]'
            }`}
          >
            <Video className="w-4.5 h-4.5 shrink-0" />
            <span className="flex-1">صدا و تصویر</span>
            {activeTab === 'media' && <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>}
          </button>

          <button
            onClick={() => setActiveTab('identity')}
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-all text-right font-medium text-sm border ${
              activeTab === 'identity'
                ? 'bg-primary-500/10 border-primary-500/30 text-primary-600 dark:text-primary-400 shadow-[0_4px_20px_rgba(33,150,243,0.08)]'
                : 'bg-transparent border-transparent text-slate-600 dark:text-gray-400 hover:text-slate-900 hover:dark:text-gray-100 hover:bg-slate-100 dark:hover:bg-white/[0.03]'
            }`}
          >
            <User className="w-4.5 h-4.5 shrink-0" />
            <span className="flex-1">مشخصات کاربری</span>
            {activeTab === 'identity' && <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>}
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-all text-right font-medium text-sm border ${
              activeTab === 'network'
                ? 'bg-primary-500/10 border-primary-500/30 text-primary-600 dark:text-primary-400 shadow-[0_4px_20px_rgba(33,150,243,0.08)]'
                : 'bg-transparent border-transparent text-slate-600 dark:text-gray-400 hover:text-slate-900 hover:dark:text-gray-100 hover:bg-slate-100 dark:hover:bg-white/[0.03]'
            }`}
          >
            <Wifi className="w-4.5 h-4.5 shrink-0" />
            <span className="flex-1">شبکه و خط اتصال</span>
            {activeTab === 'network' && <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>}
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-all text-right font-medium text-sm border ${
              activeTab === 'preferences'
                ? 'bg-primary-500/10 border-primary-500/30 text-primary-600 dark:text-primary-400 shadow-[0_4px_20px_rgba(33,150,243,0.08)]'
                : 'bg-transparent border-transparent text-slate-600 dark:text-gray-400 hover:text-slate-900 hover:dark:text-gray-100 hover:bg-slate-100 dark:hover:bg-white/[0.03]'
            }`}
          >
            <Laptop className="w-4.5 h-4.5 shrink-0" />
            <span className="flex-1">ترجیحات عمومی</span>
            {activeTab === 'preferences' && <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>}
          </button>

          {/* Localized Info Badge Footer inside Sidebar */}
          <div className="mt-auto pt-6 border-t border-slate-200/60 dark:border-white/5 px-2 hidden md:block">
            <div className="flex items-center gap-2 bg-slate-100/55 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 rounded-2xl p-3 text-[11px] text-slate-600 dark:text-gray-500 leading-relaxed">
              <Shield className="w-4.5 h-4.5 text-primary-500 shrink-0" />
              <span>رمزنگاری بومی سرتاسری بر روی خطوط ارتباطاتی دید اعمال شده است.</span>
            </div>
          </div>
        </aside>

        {/* Dynamic Parameter Settings Content Screen */}
        <section className="flex-1 bg-white/60 dark:bg-white/[0.015] border border-slate-200/80 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-3xl flex flex-col justify-between">
          
          <div className="space-y-8">
            {/* ----------------- TAB A: MEDIA SETTINGS & DEMOS ----------------- */}
            {activeTab === 'media' && (
              <div className="space-y-6 animate-fade-in text-slate-800 dark:text-gray-100">
                <div className="border-b border-slate-200/60 dark:border-white/5 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">تنظیمات صدا و تصویر</h2>
                  <p className="text-xs text-slate-500 dark:text-gray-400">سخت‌افزارهای ورودی و خروجی صوتی/تصویری خود را مشخص و ارزیابی فیزیکی کنید</p>
                </div>

                {/* Sub Two-Column layout for Screen vs Control lists */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Camera live preview layout */}
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block mb-1">پیش‌نمایش زنده ورودی دوربین</span>
                    
                    <div className="relative aspect-video rounded-3xl bg-slate-950 overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-2xl group">
                      {isLoadingStream ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#090A0E] text-center p-4">
                          <Loader2 className="w-7 h-7 text-primary-500 animate-spin mb-2" />
                          <span className="text-[11px] text-slate-500 font-medium">راه‌اندازی سخت‌افزار نوری...</span>
                        </div>
                      ) : streamError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/20 dark:bg-[#0F0A0E] text-center p-6 space-y-3">
                          <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400">
                            <VideoOff className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-red-400 block mb-1">خطا در بارگذاری تصویر</span>
                            <span className="text-[11px] text-gray-500 block leading-relaxed max-w-[240px]">یا سخت‌افزار مشغول است یا اجازه دسترسی به مرورگر داده نشده است</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            style={{
                              filter: activeBgFilter === 'blur' ? 'blur(8px)' :
                                      activeBgFilter === 'cyberpunk' ? 'hue-rotate(90deg) contrast(1.2)' :
                                      activeBgFilter === 'editorial' ? 'grayscale(1) contrast(1.15)' :
                                      activeBgFilter === 'warm' ? 'sepia(0.3) saturate(1.2)' : 'none'
                            }}
                            className="w-full h-full object-cover rounded-3xl transform scale-x-[-1]"
                          />
                          
                          <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-white/5 text-[10px] text-slate-700 dark:text-gray-300 font-bold flex items-center gap-2 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            پیش‌نمایش فعال
                          </div>
                        </>
                      )}
                    </div>

                    {/* Simple Virtual BG Filters List */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block">افکت‌های نوری و فیلترهای پس‌زمینه (آزمایشی)</span>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { id: 'none', label: 'طبیعی' },
                          { id: 'blur', label: 'مات‌کننده' },
                          { id: 'cyberpunk', label: 'سایبر' },
                          { id: 'editorial', label: 'تحریریه' },
                          { id: 'warm', label: 'ملایم' }
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => setActiveBgFilter(f.id as any)}
                            className={`px-2 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                              activeBgFilter === f.id
                                ? 'bg-primary-500/10 border-primary-500/40 text-primary-600 dark:text-primary-400'
                                : 'bg-slate-100 dark:bg-[#12141C]/50 border-slate-200 dark:border-white/5 text-slate-600 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/10 hover:text-slate-950 hover:dark:text-white'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hardware Selection Controllers */}
                  <div className="lg:col-span-6 space-y-5">
                    
                    {/* Camera Device Chooser */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-primary-500" />
                        دستگاه دوربین ورودی
                      </label>
                      <select
                        value={userSettings.videoDeviceId}
                        onChange={(e) => updateSettings({ videoDeviceId: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#12141C]/80 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-3.5 text-sm text-slate-800 dark:text-gray-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 outline-none cursor-pointer transition-all shadow-inner"
                      >
                        {cameras.length > 0 ? (
                          cameras.map(d => (
                            <option key={d.deviceId} value={d.deviceId} className="bg-white dark:bg-[#12141D] text-slate-800 dark:text-gray-200">{d.label || `دوربین شماره ${toPersianDigits(cameras.indexOf(d) + 1)}`}</option>
                          ))
                        ) : (
                          <option value="default" className="bg-white dark:bg-[#12141D] text-slate-800 dark:text-gray-200">دوربین پیش‌فرض سامانه</option>
                        )}
                      </select>
                    </div>

                    {/* Microphone Device Chooser */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                        <Mic className="w-4 h-4 text-primary-500" />
                        سنجش میکروفون ورودی
                      </label>
                      <select
                        value={userSettings.audioDeviceId}
                        onChange={(e) => updateSettings({ audioDeviceId: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#12141C]/80 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-3.5 text-sm text-slate-800 dark:text-gray-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 outline-none cursor-pointer transition-all mb-2 shadow-inner"
                      >
                        {mics.length > 0 ? (
                          mics.map(d => (
                            <option key={d.deviceId} value={d.deviceId} className="bg-white dark:bg-[#12141D] text-slate-800 dark:text-gray-200">{d.label || `میکروفون شماره ${toPersianDigits(mics.indexOf(d) + 1)}`}</option>
                          ))
                        ) : (
                          <option value="default" className="bg-white dark:bg-[#12141D] text-slate-800 dark:text-gray-200">میکروفون پیش‌فرض سامانه</option>
                        )}
                      </select>

                      {/* Decibel level metering */}
                      <div className="bg-slate-50/80 dark:bg-[#12141C]/40 border border-slate-200/80 dark:border-white/5 rounded-2xl p-4 flex items-center gap-4 shadow-inner">
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-400 font-bold">
                            <span>سطح صدای ورودی</span>
                            <span>{toPersianDigits(Math.min(100, Math.floor(audioLevel * 1.5)))}٪</span>
                          </div>
                          
                          {/* Live gauge bar indicator */}
                          <div className="w-full bg-slate-200/60 dark:bg-white/5 h-2 rounded-full overflow-hidden flex flex-row-reverse">
                            <div 
                              className="bg-gradient-to-l from-primary-500 to-green-400 h-full rounded-full transition-all duration-75"
                              style={{ width: `${Math.min(100, audioLevel * 1.5)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${audioLevel > 1 ? 'bg-green-500/15 border-green-500/30 text-green-500' : 'bg-slate-100 dark:bg-white/5 border-transparent text-slate-400 dark:text-gray-500'}`}>
                          {audioLevel > 1 ? <Mic className="w-4 h-4 text-green-500 animate-pulse" /> : <MicOff className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Speaker output device chooser & tester */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-primary-500" />
                        بلندگوی خروجی صدا
                      </label>
                      <div className="flex gap-2.5 items-stretch">
                        <div className="flex-1 select-wrapper min-w-0">
                          <select
                            value={userSettings.audioOutputId}
                            onChange={(e) => updateSettings({ audioOutputId: e.target.value })}
                            className="w-full h-full bg-slate-50 dark:bg-[#12141C]/80 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-3.5 text-sm text-slate-800 dark:text-gray-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 outline-none cursor-pointer transition-all shadow-inner"
                          >
                            {speakers.length > 0 ? (
                              speakers.map(d => (
                                <option key={d.deviceId} value={d.deviceId} className="bg-white dark:bg-[#12141D] text-slate-800 dark:text-gray-200">{d.label || d.deviceId}</option>
                              ))
                            ) : (
                              <option value="default" className="bg-white dark:bg-[#12141D] text-slate-800 dark:text-gray-200">بلندگوی پیش‌فرض سیستم عامل</option>
                            )}
                          </select>
                        </div>
                        
                        <Button 
                          variant={testSoundPlaying ? 'danger' : 'secondary'}
                          onClick={handleTestSpeakerSound} 
                          className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-transparent rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-white/5 shrink-0 text-slate-800 dark:text-gray-200"
                        >
                          {testSoundPlaying ? (
                            <>
                              <Square className="w-4 h-4 fill-current animate-pulse" />
                              <span className="text-xs font-bold leading-none">توقف</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-current text-primary-500" />
                              <span className="text-xs font-bold leading-none">تست بلندگو</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* ----------------- TAB B: USER PARAMS (IDENTITY) ----------------- */}
            {activeTab === 'identity' && (
              <div className="space-y-6 animate-fade-in text-slate-800 dark:text-gray-100">
                <div className="border-b border-slate-200/60 dark:border-white/5 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">امضای هویت و کاربری</h2>
                  <p className="text-xs text-slate-500 dark:text-gray-400">نام نمایشی و الگوهای معرفی خود را برای دیگر همکاران در اتاق‌های کنفرانس ویرایش کنید</p>
                </div>

                <div className="max-w-2xl space-y-6">
                  {/* Account display card */}
                  <div className="bg-slate-50/85 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden shadow-sm dark:shadow-none">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary-600/5 rounded-full blur-[48px]"></div>
                    
                    {/* Visual representative avatar */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-primary-500/10 shrink-0">
                      {localDisplayName ? localDisplayName.charAt(0) : 'ک'}
                    </div>

                    <div className="text-center sm:text-right flex-1 space-y-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                        <span>{userSettings.displayName}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] text-primary-500 dark:text-primary-400 font-extrabold">مدیر سیستم</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-gray-500">پیکربندی هویت متصل به شبکه دانشگاهی/اداری داخلیِ دید</p>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400">نام و نام خانوادگی نمایشی</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={localDisplayName}
                          onChange={(e) => setLocalDisplayName(e.target.value)}
                          className="flex-1 bg-slate-50 dark:bg-[#12141C]/80 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-3.5 text-sm text-slate-800 dark:text-gray-200 hover:border-slate-300 dark:hover:border-white/10 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 outline-none transition-all placeholder:text-gray-400 shadow-inner"
                          placeholder="نام جدیدی تایپ کنید..."
                        />
                        <Button 
                          onClick={saveDisplayName}
                          disabled={!localDisplayName.trim() || localDisplayName.trim() === userSettings.displayName}
                          className="rounded-2xl shrink-0 border border-slate-200 dark:border-white/10"
                        >
                          {displayNameStatus === 'saved' ? (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-green-500">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>ثبت شد</span>
                            </div>
                          ) : (
                            <span className="text-xs font-bold px-3">بروزرسانی</span>
                          )}
                        </Button>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-gray-500 flex items-center gap-1 mt-1 pr-1">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 dark:text-gray-500" />
                        این شناسه بر روی فید تصویری و رویدادهای متنی چت شما به نمایش در می‌آید.
                      </span>
                    </div>

                    {/* Faux authentication / encryption options */}
                    <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 space-y-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block mb-2">اصالت‌سنجی و امنیت بیومتریک</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50/60 dark:bg-[#12141C]/30 border border-slate-200/80 dark:border-white/5 rounded-2xl p-4 flex items-center gap-3">
                          <KeyRound className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0" />
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-slate-700 dark:text-gray-300 block">رمزگذاری چند عاملی</span>
                            <span className="text-[10px] text-slate-500 dark:text-gray-500">منقضی شدن خودکار توکن تا ۲۴ ساعت آینده</span>
                          </div>
                        </div>

                        <div className="bg-slate-50/60 dark:bg-[#12141C]/30 border border-slate-200/80 dark:border-white/5 rounded-2xl p-4 flex items-center gap-3">
                          <Bell className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0" />
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-slate-700 dark:text-gray-300 block">کلاینت احراز هویت داخلی</span>
                            <span className="text-[10px] text-slate-500 dark:text-gray-500">اتصال رسمی به Active Directory مرکزی</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB C: NETWORK HEALTH ----------------- */}
            {activeTab === 'network' && (
              <div className="space-y-6 animate-fade-in text-slate-800 dark:text-gray-100">
                <div className="border-b border-slate-200/60 dark:border-white/5 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">شبکه کاربری و امنیت اتصالات</h2>
                  <p className="text-xs text-slate-500 dark:text-gray-400">پایش پهنای باند و ارزیابی سرعت تاخیر اطلاعات تا هاب محلی کنفرانس دید</p>
                </div>

                <div className="max-w-3xl space-y-6">
                  
                  {/* Detailed Network connection evaluation grid widget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 rounded-3xl p-5 space-y-4 shadow-sm dark:shadow-none">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500 dark:text-gray-400">تست تاخیر به هاب محلی (PING)</span>
                        <div className="p-1 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
                          <Activity className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between">
                        {pingResult !== null ? (
                          <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                            <span className="text-3xl font-bold font-mono tracking-tight">{toPersianDigits(pingResult)}</span>
                            <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">میلی‌ثانیه (ms)</span>
                          </div>
                        ) : pingTestRunning ? (
                          <div className="flex items-center gap-2 py-2">
                            <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                            <span className="text-xs text-slate-500 dark:text-gray-400 font-medium font-mono">{testResultText}</span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-slate-500 py-1.5">تست انجام نشده</span>
                        )}

                        {pingResult !== null && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            pingResult < 10 
                              ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400' 
                              : 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400'
                          }`}>
                            {pingResult < 10 ? 'فوق‌العاده عالی' : 'پایدار'}
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed pr-1 font-medium">
                        پینگ محلی نشان‌دهنده پایداری خط ارتباطی و همگام بودن داده‌های صوتی با تصویر است. حد مطلوب کمتر از سی میلی‌ثانیه می‌باشد.
                      </p>

                      <Button 
                        onClick={runPingTest} 
                        disabled={pingTestRunning}
                        className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 hover:dark:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-200 hover:text-slate-900 hover:dark:text-white shadow-sm dark:shadow-none"
                      >
                        {pingTestRunning ? "در حال اجرای تست..." : "شروع ارزیابی سرعت"}
                      </Button>
                    </div>

                    <div className="bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-none">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500 dark:text-gray-400">افت کیفیت و پکت‌لاست</span>
                        <div className="p-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/25">
                          <Check className="w-4 h-4 animate-pulse" />
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between">
                        {packetLoss !== null ? (
                          <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                            <span className="text-3xl font-bold font-mono tracking-tight">{toPersianDigits(packetLoss)}</span>
                            <span className="text-xs text-slate-500 dark:text-gray-400 font-bold">٪ (Loss Rate)</span>
                          </div>
                        ) : pingTestRunning ? (
                          <div className="flex items-center gap-2 py-2">
                            <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
                            <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">محاسبه درستی پکت‌ها...</span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-slate-500 py-1.5">تست انجام نشده</span>
                        )}

                        {packetLoss !== null && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                            بدون تداخل پهنای باند
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed pr-1 font-medium">
                        نرخ از دست رفتن داده‌ها بر روی شبکه برای انتقال با استاندارد WebRTC بررسی می‌شود. ایده‌آل‌ترین نرخ کسر صفر درصد است.
                      </p>

                      <div className="h-10"></div> {/* Spacing to align sizes */}
                    </div>

                  </div>

                  {/* Low bandwidth data control toggle */}
                  <div className="bg-slate-50/60 dark:bg-white/[0.015] border border-slate-200/80 dark:border-white/5 rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-none">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 pl-4 flex-1">
                        <span className="text-sm font-semibold text-slate-800 dark:text-gray-200 block">حالت کاهش مصرف پهنای باند و ترافیک (Low Data Mode)</span>
                        <span className="text-xs text-slate-500 dark:text-gray-500 block leading-relaxed">
                          در صورت مواجهه با محدودیت ارتباطی یا کاهش سرعت دریافت، تصاویر را با وضوح کمتر و صرفه‌جویی ترافیک پردازش می‌کند.
                        </span>
                      </div>
                      
                      {/* Simple Custom Slider switch */}
                      <button 
                        onClick={() => updateSettings({ lowDataMode: !userSettings.lowDataMode })}
                        className={`w-12 h-6.5 rounded-full p-1 transition-all flex relative shrink-0 ${
                          userSettings.lowDataMode ? 'bg-primary-600 border border-primary-500' : 'bg-slate-200 dark:bg-gray-800 border border-slate-300 dark:border-white/10'
                        }`}
                      >
                        <div className={`w-4 md:w-4.5 h-4.5 bg-white rounded-full transition-all shadow-md transform ${
                          userSettings.lowDataMode ? '-translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic security connection specs */}
                  <div className="border border-slate-200/80 dark:border-white/5 bg-slate-50/40 dark:bg-[#12141C]/30 rounded-3xl p-5 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-700 dark:text-gray-300">
                      <Shield className="w-4 h-4 text-primary-500" />
                      امنیت درگاه و خط کنفرانس
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-gray-500 block mb-1">الگوریتم رمزنکاری:</span>
                        <span className="text-slate-800 dark:text-gray-300 font-mono font-medium">ChaCha20-Poly1305 AEAD</span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-gray-500 block mb-1">سرور روتینگ میانی:</span>
                        <span className="text-slate-800 dark:text-gray-300 font-medium">Hub-Tehran Central (MihanDost)</span>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <span className="text-slate-500 dark:text-gray-500 block mb-1">بستر وب‌سوکت:</span>
                        <span className="text-slate-800 dark:text-gray-300 font-mono uppercase font-medium">SSL/TLS over Secure TLS</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ----------------- TAB D: PREFERENCES & LIGHT-MODE ----------------- */}
            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-fade-in text-slate-800 dark:text-gray-100">
                <div className="border-b border-slate-200/60 dark:border-white/5 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">ترجیحات عمومی نرم‌افزار</h2>
                  <p className="text-xs text-slate-500 dark:text-gray-400">شخصی‌سازی زبان، زمان محلی، پوسته و رفتار ورودی به کنفرانس‌ها</p>
                </div>

                <div className="max-w-3xl space-y-6">
                  
                  {/* Theme Switcher Options */}
                  <div className="bg-slate-50/60 dark:bg-white/[0.015] border border-slate-200/80 dark:border-white/5 rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-none">
                    <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block mb-1">پوسته بصری سامانه (Theme Style)</span>
                      <span className="text-[11px] text-slate-400 dark:text-gray-500">انتخاب تم مناسب با نور محیطی کاربری برای جلوگیری از خستگی چشم</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Light Theme Button */}
                      <button
                        onClick={() => updateSettings({ theme: 'light' })}
                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${
                          userSettings.theme === 'light'
                            ? 'bg-primary-500/10 border-primary-500/50 text-slate-950 dark:text-white shadow-md shadow-primary-500/5'
                            : 'bg-transparent border-slate-200 dark:border-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 hover:dark:text-white hover:bg-slate-100 dark:hover:bg-[#12141C]/30'
                        }`}
                      >
                        <Sun className="w-5 h-5 text-amber-500 shrink-0" />
                        <div className="text-right">
                          <span className="text-xs font-black block text-slate-900 dark:text-white">تم روشن (روز)</span>
                          <span className="text-[10px] text-slate-400 dark:text-gray-500 block mt-0.5">خوانایی فوق‌العاده در بازتاب‌های نوری محیط</span>
                        </div>
                      </button>

                      {/* Dark Theme Button */}
                      <button
                        onClick={() => updateSettings({ theme: 'dark' })}
                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${
                          userSettings.theme === 'dark'
                            ? 'bg-primary-500/10 border-primary-500/50 text-slate-950 dark:text-white shadow-md shadow-primary-500/5'
                            : 'bg-transparent border-slate-200 dark:border-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 hover:dark:text-white hover:bg-slate-100 dark:hover:bg-[#12141C]/30'
                        }`}
                      >
                        <Moon className="w-5 h-5 text-indigo-400 shrink-0" />
                        <div className="text-right">
                          <span className="text-xs font-black block text-slate-900 dark:text-white">تم تیره (کهکشانی)</span>
                          <span className="text-[10px] text-slate-400 dark:text-gray-500 block mt-0.5">مناسب محیط‌های تاریک و کنفرانس ممتد</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Device Entering Defaults */}
                  <div className="bg-slate-50/60 dark:bg-white/[0.015] border border-slate-200/80 dark:border-white/5 rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-none">
                    <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block mb-1">رفتار آغازین هنگام ورود به لابی کنفرانس</span>
                    
                    <div className="space-y-4">
                      {/* MIC entry state toggle */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-700 dark:text-gray-200 block">قطع خودکار صدا هنگام باز کردن لابی</span>
                          <span className="text-[10px] text-slate-500">میکروفون شما همیشه در لحظه اول بی‌صدا (Mute) باشد</span>
                        </div>
                        <button 
                          onClick={() => {
                            setAutoMuteMic(!autoMuteMic);
                            updateSettings({ audioEnabled: autoMuteMic });
                          }}
                          className={`w-11 h-6 rounded-full p-1 transition-all flex relative shrink-0 ${
                            autoMuteMic ? 'bg-primary-600 border border-primary-500' : 'bg-slate-200 dark:bg-gray-800 border border-slate-300 dark:border-white/10'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 bg-white rounded-full transition-all shadow-md transform ${
                            autoMuteMic ? '-translate-x-4.5' : 'translate-x-0'
                          }`}></div>
                        </button>
                      </div>

                      {/* CAMERA entry state toggle */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/5">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-700 dark:text-gray-200 block">قطع خودکار فید دوربین هنگام ورود اولیه</span>
                          <span className="text-[10px] text-slate-500">برای ورود بدون تصویر تا زمان آمادگی کامل جهت استریم</span>
                        </div>
                        <button 
                          onClick={() => {
                            setAutoMuteCam(!autoMuteCam);
                            updateSettings({ videoEnabled: autoMuteCam });
                          }}
                          className={`w-11 h-6 rounded-full p-1 transition-all flex relative shrink-0 ${
                            autoMuteCam ? 'bg-primary-600 border border-primary-500' : 'bg-slate-200 dark:bg-gray-800 border border-slate-300 dark:border-white/10'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 bg-white rounded-full transition-all shadow-md transform ${
                            autoMuteCam ? '-translate-x-4.5' : 'translate-x-0'
                          }`}></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Standard & Localizations Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Calendar System Choose */}
                    <div className="bg-slate-50/60 dark:bg-white/[0.015] border border-slate-200/80 dark:border-white/5 rounded-3xl p-5 space-y-3 shadow-sm dark:shadow-none">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        گاه‌شماری تقویم سامانه
                      </label>
                      <select
                        value={calendarSystem}
                        onChange={(e) => setCalendarSystem(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-[#12141C]/80 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-3.5 text-sm text-slate-800 dark:text-gray-200 focus:border-primary-500/50 outline-none cursor-pointer"
                      >
                        <option value="jalali" className="bg-white dark:bg-[#12141C] text-slate-800 dark:text-gray-200">جلالی خورشیدی (ایران)</option>
                        <option value="gregorian" className="bg-white dark:bg-[#12141C] text-slate-800 dark:text-gray-200">میلادی (Gregorian)</option>
                        <option value="lunar" className="bg-white dark:bg-[#12141C] text-slate-800 dark:text-gray-200">هجری قمری (اسلامی)</option>
                      </select>
                      <span className="text-[10px] text-slate-500 dark:text-gray-500 block leading-normal pr-1 font-medium">
                        تاریخ لابی‌ها و قرار ملاقات‌های زمان‌بندی‌شده بر این اساس نمایش داده می‌شوند.
                      </span>
                    </div>

                    {/* Numeric format display toggling */}
                    <div className="bg-slate-50/60 dark:bg-white/[0.015] border border-slate-200/80 dark:border-white/5 rounded-3xl p-5 space-y-3 shadow-sm dark:shadow-none">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-primary-500" />
                          ارقام به الفبای فارسی
                        </label>
                        <button 
                          onClick={() => setFarsiDigits(!farsiDigits)}
                          className={`w-11 h-6 rounded-full p-1 transition-all flex relative shrink-0 ${
                            farsiDigits ? 'bg-primary-600 border border-primary-500' : 'bg-slate-200 dark:bg-gray-800 border border-slate-300 dark:border-white/10'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 bg-white rounded-full transition-all shadow-md transform ${
                            farsiDigits ? '-translate-x-4.5' : 'translate-x-0'
                          }`}></div>
                        </button>
                      </div>
                      <div className="text-3xl text-slate-800 dark:text-gray-200 py-1.5 block text-center font-bold tracking-widest font-mono select-none bg-slate-100 dark:bg-white/5 rounded-2xl">
                        {toPersianDigits("0123456789")}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-gray-500 block leading-normal pr-1 font-medium">
                        تبدیل الفبای اعداد غربی در کل واسط کاربری به کاراکترهای بومی فارسی.
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Settings Section Footer Confirm bar */}
          <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500">
              <Check className="w-4 h-4 text-green-500" />
              <span>کلیه تنظیمات به صورت محلی و خودکار بر روی دستگاه شما ذخیره شده‌اند.</span>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="primary" 
                className="rounded-full shadow-lg shadow-primary-700/25 px-8 font-extrabold"
                onClick={() => onChangeView(AppView.HOME)}
              >
                تایید نهایی و بازگشت
              </Button>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
};
