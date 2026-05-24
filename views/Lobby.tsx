import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Sparkles, 
  ArrowRight, Calendar as CalendarIcon, Clock, Copy, Check, 
  ChevronDown, Link as LinkIcon, AlertCircle, 
  Loader2, Zap, ShieldCheck, CheckCircle2, MoreHorizontal,
  Plus, X, AlignLeft, ChevronLeft, ChevronRight,
  Search
} from 'lucide-react';
import { Button } from '../components/Button';
import { AppView, UserSettings } from '../types';
import { Grainient } from '../components/Grainient';
import { TimePickerModal } from '../components/TimePickerModal';

// --- Mock Data ---
const MOCK_CONTACTS = [
  { id: '1', name: 'سارا احمدی', email: 'sara.ahmadi@did.ir', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'علی رضایی', email: 'ali.rezaei@did.ir', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'مریم کمالی', email: 'maryam.k@did.ir', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'حسین محمدی', email: 'hossein.m@did.ir', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'نازنین ایزدی', email: 'nazanin@did.ir', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'رضا تهرانی', email: 'reza.t@did.ir', avatar: 'https://i.pravatar.cc/150?u=6' },
];

// --- Custom Components ---

// Helper to convert English digits to Persian
const toPersianDigits = (num: number | string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

// Helper to convert Persian digits to English
const toEnglishDigits = (str: string) => {
  return str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}

interface DeviceSelectorProps {
  icon: React.ElementType;
  value: string;
  options: MediaDeviceInfo[];
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  isDark?: boolean;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ 
  icon: Icon, 
  value, 
  options, 
  onChange, 
  placeholder,
  disabled,
  isDark = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.deviceId === value);
  const label = selectedOption ? (selectedOption.label || `Device ${value.slice(0, 5)}...`) : placeholder;

  return (
    <div className="relative w-full" ref={containerRef}>
      <button 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-200 outline-none group
          ${isOpen 
            ? (isDark ? 'bg-[#1F1F1F] border-primary-500 ring-1 ring-primary-500/50 text-white' : 'bg-white border-primary-500 ring-1 ring-primary-500/50 text-slate-800') 
            : (isDark ? 'bg-[#121212]/80 border-white/5 text-gray-300 hover:bg-[#1A1A1A] hover:border-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-350 shadow-sm')}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`p-2 rounded-xl shrink-0 transition-colors ${isOpen ? 'bg-primary-500/20 text-primary-400' : (isDark ? 'bg-white/5 text-gray-500 group-hover:text-gray-300' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600')}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="truncate text-sm font-medium text-right" dir="auto">{label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-500' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute top-full mt-2 left-0 right-0 z-[100] border rounded-2xl transition-all duration-300 overflow-hidden ${isDark ? 'bg-[#1A1A1A] border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/55'}`}>
          <div className="max-h-[240px] overflow-y-auto p-2 custom-scrollbar flex flex-col gap-1">
            {options.length > 0 ? (
              options.map((opt) => (
                <button
                  key={opt.deviceId}
                  onClick={() => {
                    onChange(opt.deviceId);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-all group
                    ${value === opt.deviceId 
                      ? (isDark ? 'bg-primary-600/10 text-primary-400 font-bold' : 'bg-primary-50 text-primary-600 font-bold') 
                      : (isDark ? 'text-gray-300 hover:bg-white/5 hover:text-white' : 'text-slate-705 hover:bg-slate-50 hover:text-slate-900')}
                  `}
                >
                  <span className="truncate text-right w-full" dir="auto">{opt.label || `Device ${opt.deviceId.slice(0, 5)}...`}</span>
                  {value === opt.deviceId && <CheckCircle2 className="w-4 h-4 ml-2 shrink-0 text-primary-500" />}
                </button>
              ))
            ) : (
              <div className={`px-3 py-4 text-center text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>هیچ دستگاهی یافت نشد</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Mini Calendar Component ---

interface DatePickerProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  isDark?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onSelect, isDark = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewDate, setViewDate] = useState(new Date());

  // Dynamic Persian Date Calculation
  const { monthLabel, daysInMonth, startDayOfWeek, currentYearName, currentMonthName } = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long', year: 'numeric' });
    const parts = formatter.formatToParts(viewDate);
    const getPart = (type: string) => parts.find(p => p.type === type)?.value || '';
    
    // Parse Persian digits to integer
    const parsePersianInt = (str: string) => parseInt(str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()));
    
    const pDay = parsePersianInt(getPart('day'));
    const pMonth = getPart('month');
    const pYear = parsePersianInt(getPart('year'));

    // Find the Gregorian date of the 1st of this Persian month
    const firstOfMonth = new Date(viewDate);
    firstOfMonth.setDate(viewDate.getDate() - (pDay - 1));

    // Calculate start day of week (Persian: Sat=0 ... Fri=6)
    // Gregorian: Sun=0 ... Sat=6
    // Mapping: Greg(6)->0, Greg(0)->1, ... Formula: (GregorianDay + 1) % 7
    const startDayOfWeek = (firstOfMonth.getDay() + 1) % 7;

    // Calculate days in month by iterating until month changes
    let d = new Date(firstOfMonth);
    let count = 0;
    while (count < 32) {
      const m = new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(d);
      if (m !== pMonth) break;
      count++;
      d.setDate(d.getDate() + 1);
    }
    const days = count > 0 ? count : 30; // Fallback

    return {
      monthLabel: `${pMonth} ${toPersianDigits(pYear)}`,
      currentMonthName: pMonth,
      currentYearName: toPersianDigits(pYear),
      daysInMonth: days,
      startDayOfWeek
    };
  }, [viewDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFirstOfPersianMonth = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('fa-IR', { day: 'numeric' });
    const pDay = parseInt(formatter.format(date).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()));
    const d = new Date(date);
    d.setDate(d.getDate() - (pDay - 1));
    return d;
  };

  const handlePrevMonth = () => {
    const first = getFirstOfPersianMonth(viewDate);
    const prev = new Date(first);
    prev.setDate(prev.getDate() - 5); // Go back safely into previous month
    setViewDate(prev);
  };

  const handleNextMonth = () => {
    const first = getFirstOfPersianMonth(viewDate);
    const next = new Date(first);
    next.setDate(next.getDate() + 35); // Go forward safely into next month
    setViewDate(next);
  };

  const handleSelectDay = (day: number) => {
    const fullDateStr = `${toPersianDigits(day)} ${currentMonthName} ${currentYearName}`;
    onSelect(fullDateStr);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className={`w-full border rounded-xl px-4 py-3.5 flex items-center gap-3 transition-colors text-right
            ${isDark ? 'bg-[#121212] text-white' : 'bg-white text-slate-850'}
            ${isOpen ? 'border-primary-500/50 ring-1 ring-primary-500/50' : (isDark ? 'border-white/10 hover:border-white/20' : 'border-slate-200 hover:border-slate-300 shadow-sm')}
         `}
       >
          <CalendarIcon className="w-4 h-4 text-gray-405 shrink-0" />
          <span className="text-sm flex-1 font-medium">{selectedDate || 'انتخاب تاریخ'}</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
       </button>

       {isOpen && (
         <div className={`absolute top-full mt-2 left-0 right-0 border rounded-2xl p-4 z-[100] animate-enter ${isDark ? 'bg-[#1A1A1A] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-250/40'}`}>
            <div className="flex items-center justify-between mb-4">
               <button onClick={handleNextMonth} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-slate-100 text-slate-500'}`}><ChevronRight className="w-4 h-4" /></button>
               <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{monthLabel}</span>
               <button onClick={handlePrevMonth} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-slate-100 text-slate-500'}`}><ChevronLeft className="w-4 h-4" /></button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
               {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(d => (
                 <div key={d} className="text-center text-xs text-gray-550 py-1 font-bold">{d}</div>
               ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
               {[...Array(startDayOfWeek)].map((_, i) => <div key={`empty-${i}`} />)}
               {[...Array(daysInMonth)].map((_, i) => {
                 const day = i + 1;
                 const fullDateStr = `${toPersianDigits(day)} ${currentMonthName} ${currentYearName}`;
                 const isSelected = selectedDate === fullDateStr;
                 
                 return (
                   <button 
                      key={day}
                      onClick={() => handleSelectDay(day)}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-sm transition-all font-medium
                        ${isSelected ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20 font-bold' : (isDark ? 'text-gray-300 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100')}
                      `}
                   >
                     {toPersianDigits(day)}
                   </button>
                 );
               })}
            </div>
         </div>
       )}
    </div>
  );
};

// --- Contact Picker Component ---

interface ContactPickerProps {
    participants: string[];
    onAdd: (contact: any) => void;
    onRemove: (id: string) => void;
    isDark?: boolean;
}

const ContactPicker: React.FC<ContactPickerProps> = ({ participants, onAdd, onRemove, isDark = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredContacts = MOCK_CONTACTS.filter(c => 
        !participants.includes(c.id) && 
        (c.name.includes(search) || c.email.includes(search))
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (contact: any) => {
        onAdd(contact);
        setSearch('');
        setIsOpen(false);
    };

    const addedContacts = MOCK_CONTACTS.filter(c => participants.includes(c.id));

    return (
        <div className="space-y-3" ref={containerRef}>
            <div className="relative">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="جستجوی نام یا ایمیل..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className={`w-full border rounded-xl pr-10 pl-4 py-3.5 text-sm outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all
                        ${isDark 
                          ? 'bg-[#121212] border-white/10 text-white placeholder:text-gray-600' 
                          : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 shadow-sm hover:border-slate-300'}`}
                />
                
                {isOpen && (
                    <div className={`absolute top-full mt-2 left-0 right-0 border rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto custom-scrollbar animate-enter
                        ${isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-slate-200'}`}>
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map(contact => (
                                <button 
                                    key={contact.id}
                                    onClick={() => handleSelect(contact)}
                                    className={`w-full flex items-center gap-3 p-3 transition-colors text-right
                                        ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
                                >
                                    <img src={contact.avatar} alt={contact.name} className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-750' : 'bg-slate-100'}`} />
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-850'}`}>{contact.name}</span>
                                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{contact.email}</span>
                                    </div>
                                    <Plus className="w-4 h-4 text-gray-500 mr-auto" />
                                </button>
                            ))
                        ) : (
                            <div className={`p-4 text-center text-sm ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>مخاطبی یافت نشد</div>
                        )}
                    </div>
                )}
            </div>

            {/* Selected Chips */}
            {addedContacts.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {addedContacts.map(contact => (
                        <div key={contact.id} className={`flex items-center gap-2 border rounded-lg pl-1.5 pr-2 py-1 text-xs
                            ${isDark 
                              ? 'bg-primary-500/10 border-primary-500/20 text-primary-200' 
                              : 'bg-primary-50 border-primary-100 text-primary-700'}`}>
                            <img src={contact.avatar} alt="" className="w-5 h-5 rounded-full" />
                            <span>{contact.name}</span>
                            <button onClick={() => onRemove(contact.id)} className={`transition-colors p-0.5 rounded-md ${isDark ? 'hover:text-white hover:bg-white/10' : 'hover:text-primary-800 hover:bg-primary-100'}`}>
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Component ---

interface LobbyProps {
  onChangeView: (view: AppView) => void;
  userSettings: UserSettings;
  updateSettings: (s: Partial<UserSettings>) => void;
  meetingId: string;
}

export const Lobby: React.FC<LobbyProps> = ({ onChangeView, userSettings, updateSettings, meetingId }) => {
  const isDark = userSettings.theme === 'dark';
  const [activeTab, setActiveTab] = useState<'instant' | 'schedule'>('instant');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const [loadingStream, setLoadingStream] = useState(true);
  const [permissionError, setPermissionError] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Instant Form
  const [instantTitle, setInstantTitle] = useState('جلسه فوری');

  // Schedule Form State
  const [scheduleDate, setScheduleDate] = useState(() => {
     return new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  });
  const [scheduleTime, setScheduleTime] = useState('۱۰:۰۰');
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const [scheduleTitle, setScheduleTitle] = useState('');
  const [scheduleDesc, setScheduleDesc] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number>();

  // Mouse effect state for Right Panel
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // Hardware Access
  useEffect(() => {
    getDevices();
    startStream();
    return () => {
      stopStream();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!loadingStream) startStream();
  }, [userSettings.videoDeviceId, userSettings.audioDeviceId]);

  useEffect(() => {
    if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = userSettings.videoEnabled);
      stream.getAudioTracks().forEach(track => track.enabled = userSettings.audioEnabled);
    }
  }, [userSettings.videoEnabled, userSettings.audioEnabled, stream]);

  const getDevices = async () => {
    try {
      const devs = await navigator.mediaDevices.enumerateDevices();
      setDevices(devs);
      setCameras(devs.filter(d => d.kind === 'videoinput'));
      setMics(devs.filter(d => d.kind === 'audioinput'));
    } catch (err) {
      console.error("Error listing devices", err);
    }
  };

  const startStream = async () => {
    setLoadingStream(true);
    setPermissionError(false);
    stopStream();

    const constraints = {
      video: userSettings.videoDeviceId && userSettings.videoDeviceId !== 'default' 
        ? { deviceId: { exact: userSettings.videoDeviceId } } 
        : true,
      audio: userSettings.audioDeviceId && userSettings.audioDeviceId !== 'default' 
        ? { deviceId: { exact: userSettings.audioDeviceId } } 
        : true
    };

    try {
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      if (videoRef.current) videoRef.current.srcObject = newStream;
      
      newStream.getVideoTracks().forEach(track => track.enabled = userSettings.videoEnabled);
      newStream.getAudioTracks().forEach(track => track.enabled = userSettings.audioEnabled);

      // --- FIX: Update 'default' to actual device ID to show correct label in dropdown ---
      const videoTrack = newStream.getVideoTracks()[0];
      const audioTrack = newStream.getAudioTracks()[0];
      const updates: Partial<UserSettings> = {};
      
      if (userSettings.videoDeviceId === 'default' && videoTrack) {
          const settings = videoTrack.getSettings();
          if (settings.deviceId) updates.videoDeviceId = settings.deviceId;
      }
      
      if (userSettings.audioDeviceId === 'default' && audioTrack) {
          const settings = audioTrack.getSettings();
          if (settings.deviceId) updates.audioDeviceId = settings.deviceId;
      }

      if (Object.keys(updates).length > 0) {
         updateSettings(updates);
      }
      // ---------------------------------------------------------------------------------

      setupAudioVisualizer(newStream);
      setLoadingStream(false);
      
      // Refresh devices to ensure labels are populated after permission grant
      getDevices();
    } catch (err) {
      console.error("Error starting stream", err);
      setLoadingStream(false);
      setPermissionError(true);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const setupAudioVisualizer = (stream: MediaStream) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
    }

    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateLevel = () => {
      if (!userSettings.audioEnabled) {
          setAudioLevel(0);
          requestRef.current = requestAnimationFrame(updateLevel);
          return;
      }
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length / 2; i++) sum += dataArray[i];
      const average = sum / (dataArray.length / 2);
      setAudioLevel(prev => prev + (Math.min(100, average * 1.5) - prev) * 0.2);
      requestRef.current = requestAnimationFrame(updateLevel);
    };
    updateLevel();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://did.ir/meet/${meetingId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative flex items-center justify-center p-4 lg:p-6 ${isDark ? 'bg-[#020202] text-gray-100' : 'bg-slate-50 text-slate-850'}`}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'}; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'}; border-radius: 2px; }
        .animate-enter-up { animation: enter-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes enter-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Grainient 
          color1={isDark ? "#0A0F1C" : "#E2E8F0"} 
          color2={isDark ? "#000000" : "#F8FAFC"} 
          color3={isDark ? "#111827" : "#F1F5F9"} 
          timeSpeed={0.15} 
          opacity={isDark ? 0.6 : 0.8} 
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black via-transparent to-black/50' : 'bg-gradient-to-t from-slate-100/50 via-transparent to-slate-50/20'}`}></div>
      </div>

      {/* Time Picker Modal */}
      <TimePickerModal 
         isOpen={isTimePickerOpen} 
         onClose={() => setIsTimePickerOpen(false)} 
         onConfirm={setScheduleTime}
         initialTime={scheduleTime}
         isDark={isDark}
      />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 relative z-10 items-start">
        
        {/* --- Header & Back Button (Mobile only) --- */}
        <div className="lg:col-span-12 flex justify-between items-center mb-2 animate-enter-up lg:hidden">
           <Button variant="ghost" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-850'} gap-2 pl-0 hover:bg-transparent`} onClick={() => onChangeView(AppView.HOME)}>
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">بازگشت</span>
           </Button>
        </div>

        {/* --- LEFT: Preview & Configuration --- */}
        <div className="lg:col-span-7 flex flex-col gap-6 animate-enter-up h-full" style={{ animationDelay: '100ms' }}>
            
            <div className="hidden lg:flex justify-between items-center mb-1">
                <Button variant="ghost" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'} gap-2 pl-0 hover:bg-transparent group`} onClick={() => onChangeView(AppView.HOME)}>
                    <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-white/5 group-hover:bg-white/10' : 'bg-slate-200/50 group-hover:bg-slate-220/80'}`}>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-lg">بازگشت به خانه</span>
                </Button>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border ${isDark ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-white border-slate-200/80 text-slate-500 shadow-sm'}`}>
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>اتصال ایمن برقرار است</span>
                </div>
            </div>

            {/* Video Card */}
            <div className={`relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border transition-all duration-300 group ${isDark ? 'bg-[#0A0A0A] border-white/10' : 'bg-slate-100 border-slate-200 shadow-slate-100/40'}`}>
                
                {permissionError ? (
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-4 ${isDark ? 'bg-[#0A0A0A]' : 'bg-slate-55'}`}>
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/10">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <div className="space-y-1">
                            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>دسترسی مسدود شد</h3>
                            <p className={`${isDark ? 'text-gray-500' : 'text-slate-500'} text-sm`}>لطفاً دسترسی به دوربین و میکروفون را فعال کنید.</p>
                        </div>
                        <Button onClick={getDevices} variant="secondary" size="sm" className={isDark ? "bg-white/5 hover:bg-white/10 border-white/5 text-white" : "bg-slate-200/50 hover:bg-slate-200 border-slate-250 text-slate-705"}>
                            تلاش مجدد
                        </Button>
                    </div>
                ) : (
                    <>
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            muted 
                            playsInline 
                            className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-700 ${userSettings.videoEnabled && !loadingStream ? 'opacity-100' : 'opacity-0'}`}
                        />
                        
                        {(!userSettings.videoEnabled || loadingStream) && (
                             <div className={`absolute inset-0 flex flex-col items-center justify-center transition-colors ${isDark ? 'bg-[#0F0F11]' : 'bg-slate-100'}`}>
                                {loadingStream ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                                        <span className={`text-xs font-medium tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Initializing</span>
                                    </div>
                                ) : (
                                    <div className="relative group/avatar">
                                        <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl ring-4 ${isDark ? 'bg-gradient-to-b from-gray-800 to-gray-900 ring-[#1A1A1A]' : 'bg-gradient-to-b from-slate-200 to-slate-250 ring-white'}`}>
                                            <span className={`text-5xl font-bold select-none ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                                                {userSettings.displayName.charAt(0)}
                                            </span>
                                        </div>
                                        {/* Audio Rings */}
                                        {userSettings.audioEnabled && (
                                            <>
                                              <div className="absolute inset-0 rounded-full border border-primary-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                                              <div className="absolute inset-0 rounded-full border border-primary-500/10 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                                            </>
                                        )}
                                    </div>
                                )}
                             </div>
                        )}

                        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                             <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-white/90 flex items-center gap-3 shadow-lg">
                                    <div className={`w-2 h-2 rounded-full ${userSettings.audioEnabled ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></div>
                                    {userSettings.displayName} (شما)
                                </div>
                                <div className="bg-black/60 backdrop-blur-xl p-2 rounded-xl border border-white/10 text-white/80 shadow-lg pointer-events-auto cursor-pointer hover:bg-black/80 transition-colors">
                                     <MoreHorizontal className="w-5 h-5" />
                                </div>
                             </div>

                             <div className="flex items-center justify-center gap-4 pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                  <button 
                                      onClick={() => updateSettings({ audioEnabled: !userSettings.audioEnabled })}
                                      className={`
                                        h-14 rounded-2xl flex items-center gap-4 px-6 transition-all duration-200 border shadow-xl backdrop-blur-xl
                                        ${userSettings.audioEnabled 
                                            ? 'bg-black/60 border-white/10 hover:bg-white/10 text-white' 
                                            : 'bg-red-500/20 border-red-500/30 hover:bg-red-500/30 text-red-500'}
                                      `}
                                  >
                                      {userSettings.audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                                      {userSettings.audioEnabled && (
                                        <div className="flex items-end gap-1 h-4">
                                            {[...Array(4)].map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className="w-1 bg-white rounded-full transition-all duration-75"
                                                    style={{ height: `${Math.max(20, audioLevel * (0.8 + Math.random()))}%` }}
                                                ></div>
                                            ))}
                                        </div>
                                      )}
                                  </button>

                                  <button 
                                      onClick={() => updateSettings({ videoEnabled: !userSettings.videoEnabled })}
                                      className={`
                                        h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-200 border shadow-xl backdrop-blur-xl
                                        ${userSettings.videoEnabled 
                                            ? 'bg-black/60 border-white/10 hover:bg-white/10 text-white' 
                                            : 'bg-red-500/20 border-red-500/30 hover:bg-red-500/30 text-red-500'}
                                      `}
                                  >
                                      {userSettings.videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                                  </button>
                             </div>
                        </div>
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DeviceSelector 
                    icon={Video}
                    value={userSettings.videoDeviceId}
                    options={cameras}
                    onChange={(val) => updateSettings({ videoDeviceId: val })}
                    placeholder="انتخاب دوربین..."
                    disabled={cameras.length === 0}
                    isDark={isDark}
                />
                <DeviceSelector 
                    icon={Mic}
                    value={userSettings.audioDeviceId}
                    options={mics}
                    onChange={(val) => updateSettings({ audioDeviceId: val })}
                    placeholder="انتخاب میکروفون..."
                    disabled={mics.length === 0}
                    isDark={isDark}
                />
            </div>
        </div>

        {/* --- RIGHT: Join Actions --- */}
        <div className="lg:col-span-5 flex flex-col animate-enter-up" style={{ animationDelay: '200ms' }}>
            <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative backdrop-blur-2xl rounded-[2rem] flex flex-col overflow-visible group h-full transition-all duration-305 ${isDark ? 'bg-[#121212]/90 border border-white/10 shadow-2xl' : 'bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/50'}`}
            >
                {/* 1. Static Border (Dark Mode Only) */}
                {isDark && <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none"></div>}

                {/* 2. Dynamic Border Glow */}
                <div 
                    className="absolute inset-0 rounded-[2rem] pointer-events-none transition-opacity duration-200"
                    style={{
                        opacity: isDark ? opacity : opacity * 0.4,
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, #2563eb, transparent 40%)`,
                        maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                        maskClip: 'content-box, border-box',
                        maskComposite: 'exclude',
                        WebkitMaskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                        WebkitMaskClip: 'content-box, border-box',
                        WebkitMaskComposite: 'xor',
                        padding: '1.5px' 
                    }}
                ></div>
                
                {/* 3. Inner Spotlight */}
                <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[2rem]"
                    style={{
                        opacity: isDark ? opacity : opacity * 0.3,
                        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.1), transparent 40%)`
                    }}
                ></div>
                
                <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${isDark ? 'bg-primary-500/10' : 'bg-primary-500/5'}`}></div>

                <div className="relative z-10 p-8 flex flex-col h-full">
                    <div className="mb-6 text-center lg:text-right">
                        <h1 className={`text-3xl font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>آماده ورود هستید؟</h1>
                        <p className={`${isDark ? 'text-gray-400' : 'text-slate-500'} text-sm`}>تنظیمات نهایی را انجام دهید و به جلسه بپیوندید.</p>
                    </div>

                    <div className={`p-1.5 rounded-2xl mb-6 border flex relative shrink-0 transition-colors ${isDark ? 'bg-[#0A0A0A] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        <div 
                            className={`absolute top-1.5 bottom-1.5 rounded-xl shadow-sm transition-all duration-300 ease-out border ${isDark ? 'bg-[#262626] border-white/10' : 'bg-white border-slate-250 hover:shadow-xs'}`}
                            style={{ 
                                left: activeTab === 'instant' ? '50%' : '6px', 
                                right: activeTab === 'instant' ? '6px' : '50%' 
                            }}
                        ></div>

                        <button 
                            onClick={() => setActiveTab('instant')}
                            className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'instant' ? (isDark ? 'text-white' : 'text-primary-700') : (isDark ? 'text-gray-500 hover:text-gray-300' : 'text-slate-400 hover:text-slate-600')}`}
                        >
                            <Zap className="w-4 h-4" />
                            جلسه فوری
                        </button>
                        <button 
                            onClick={() => setActiveTab('schedule')}
                            className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'schedule' ? (isDark ? 'text-white' : 'text-primary-700') : (isDark ? 'text-gray-500 hover:text-gray-300' : 'text-slate-400 hover:text-slate-600')}`}
                        >
                            <CalendarIcon className="w-4 h-4" />
                            برنامه‌ریزی
                        </button>
                    </div>

                    {/* Content Container */}
                    <div className="flex-1">
                        {activeTab === 'instant' ? (
                            <div className="space-y-6 animate-enter-up pt-2">
                                
                                <div className="space-y-1.5">
                                    <label className={`text-xs font-bold block text-right ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>عنوان جلسه (اختیاری)</label>
                                    <input 
                                        type="text" 
                                        value={instantTitle}
                                        onChange={(e) => setInstantTitle(e.target.value)}
                                        className={`w-full border rounded-xl px-4 py-3.5 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all outline-none font-medium
                                            ${isDark 
                                              ? 'bg-[#121212] border-white/10 text-white placeholder:text-gray-700' 
                                              : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 shadow-sm hover:border-slate-300'}`}
                                        placeholder="نامی برای جلسه بنویسید..."
                                    />
                                </div>

                                <div className={`rounded-2xl p-6 border transition-colors group ${isDark ? 'bg-[#1A1A1A] border-white/5 hover:border-white/10' : 'bg-slate-50 border-slate-200 shadow-xs hover:bg-slate-50/50'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>کد جلسه</span>
                                        <button 
                                            onClick={handleCopyLink}
                                            className={`transition-colors p-1.5 rounded-lg ${isDark ? 'text-gray-550 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                                            title="کپی لینک"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
                                            <LinkIcon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-3xl font-mono font-bold tracking-widest ${isDark ? 'text-white' : 'text-slate-800'}`}>{meetingId}</span>
                                    </div>
                                </div>
                                
                                <div className={`p-4 rounded-2xl flex gap-3 items-start border ${isDark ? 'bg-primary-500/5 border-primary-500/10 text-primary-200/80' : 'bg-primary-50 border-primary-100 text-primary-800'}`}>
                                    <Sparkles className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                                    <p className={`text-sm leading-relaxed ${isDark ? 'text-primary-200/85' : 'text-primary-800'}`}>
                                        شما در حال ایجاد یک جلسه فوری هستید. پس از ورود می‌توانید لینک را با دیگران به اشتراک بگذارید.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-enter-up pt-1 pb-2">
                                <div className="space-y-1.5">
                                    <label className={`text-xs font-bold block text-right ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>عنوان جلسه</label>
                                    <input 
                                        type="text" 
                                        value={scheduleTitle}
                                        onChange={(e) => setScheduleTitle(e.target.value)}
                                        className={`w-full border rounded-xl px-4 py-3.5 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all outline-none font-medium
                                            ${isDark 
                                              ? 'bg-[#121212] border-white/10 text-white placeholder:text-gray-700 hover:border-white/20' 
                                              : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 hover:border-slate-350 shadow-sm'}`}
                                        placeholder="مثلاً: جلسه هفتگی تیم فنی"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className={`text-xs font-bold block text-right ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>توضیحات</label>
                                    <div className="relative">
                                        <AlignLeft className="absolute top-3.5 right-3.5 w-4 h-4 text-gray-500" />
                                        <textarea
                                            value={scheduleDesc}
                                            onChange={(e) => setScheduleDesc(e.target.value)}
                                            className={`w-full border rounded-xl pr-10 pl-4 py-3.5 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all outline-none placeholder:text-gray-700 resize-none h-20 text-sm
                                                ${isDark 
                                                  ? 'bg-[#121212] border-white/10 text-white placeholder:text-gray-700 hover:border-white/20' 
                                                  : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 hover:border-slate-350 shadow-sm'}`}
                                            placeholder="دستور جلسه را بنویسید..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className={`text-xs font-bold block text-right ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>تاریخ</label>
                                        <DatePicker selectedDate={scheduleDate} onSelect={setScheduleDate} isDark={isDark} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={`text-xs font-bold block text-right ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>ساعت</label>
                                        <button 
                                            onClick={() => setIsTimePickerOpen(true)}
                                            className={`w-full border rounded-xl px-4 py-3.5 flex items-center gap-3 transition-colors text-right
                                                ${isDark 
                                                  ? 'bg-[#121212] border-white/10 text-white hover:border-white/20' 
                                                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm'}`}
                                        >
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm flex-1 font-medium truncate">{scheduleTime || 'انتخاب ساعت'}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className={`text-xs font-bold block text-right ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>دعوت از شرکت‌کنندگان</label>
                                    <ContactPicker 
                                        participants={participants}
                                        onAdd={(c) => setParticipants([...participants, c.id])}
                                        onRemove={(id) => setParticipants(participants.filter(p => p !== id))}
                                        isDark={isDark}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`mt-8 pt-6 border-t space-y-3 shrink-0 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                        <Button 
                            size="lg" 
                            className="w-full h-14 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/20 text-lg font-bold border border-primary-500/50" 
                            onClick={() => onChangeView(AppView.MEETING)}
                        >
                            {activeTab === 'instant' ? (
                                <>
                                    پیوستن به جلسه
                                    <ArrowRight className="w-5 h-5 mr-2" />
                                </>
                            ) : (
                                'ثبت و ارسال دعوت‌نامه'
                            )}
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="lg" 
                            className={`w-full h-12 rounded-2xl flex items-center justify-center transition-all ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`} 
                            onClick={() => onChangeView(AppView.HOME)}
                        >
                            انصراف
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};