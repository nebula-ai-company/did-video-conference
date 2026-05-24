
import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, 
  MessageSquare, Users, LayoutGrid,
  Info, Hand, Smile, X, Music, Calendar, Clock, Copy, Check,
  Zap, Sparkles, Activity
} from 'lucide-react';
import { AppView, Participant, ChatMessage, UserSettings } from '../types';
import { Button } from '../components/Button';
import { VideoTile } from '../components/VideoTile';
import { ChatSidebar } from '../components/ChatSidebar';
import { MusicPlayer } from '../components/MusicPlayer';
import { MOCK_PARTICIPANTS, INITIAL_CHAT_MESSAGES } from '../constants';

interface MeetingProps {
  onChangeView: (view: AppView) => void;
  meetingId: string;
  userSettings?: UserSettings;
}

export const Meeting: React.FC<MeetingProps> = ({ onChangeView, meetingId, userSettings }) => {
  const [participants, setParticipants] = useState<Participant[]>(() => {
    return MOCK_PARTICIPANTS.map(p => 
      p.isMe && userSettings?.displayName 
        ? { ...p, name: userSettings.displayName } 
        : p
    );
  });
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  
  // Sidebar State
  const [sidebarMode, setSidebarMode] = useState<'none' | 'chat' | 'participants'>('none');
  const [activeSidebarContent, setActiveSidebarContent] = useState<'chat' | 'participants' | null>(null);
  
  // Modal State
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSidebar = (mode: 'chat' | 'participants') => {
    if (sidebarMode === mode) {
      setSidebarMode('none');
    } else {
      setActiveSidebarContent(mode);
      setSidebarMode(mode);
    }
  };
  
  // Controls
  const [micOn, setMicOn] = useState(userSettings?.audioEnabled ?? true);
  const [cameraOn, setCameraOn] = useState(userSettings?.videoEnabled ?? true);
  const [screenShare, setScreenShare] = useState(false);
  const [musicShare, setMusicShare] = useState(false);
  
  const [time, setTime] = useState(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [musicStream, setMusicStream] = useState<MediaStream | null>(null);
  
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioAnimationRef = useRef<number>();

  // Reactions
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<{id: number, emoji: string, left: number, animationDuration: string}[]>([]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Media Stream Logic
  useEffect(() => {
    const startStream = async () => {
        try {
            const constraints: MediaStreamConstraints = {
                video: userSettings?.videoDeviceId && userSettings.videoDeviceId !== 'default' 
                    ? { deviceId: { exact: userSettings.videoDeviceId } } 
                    : true,
                audio: userSettings?.audioDeviceId && userSettings.audioDeviceId !== 'default' 
                    ? { deviceId: { exact: userSettings.audioDeviceId } } 
                    : true
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setLocalStream(stream);
        } catch (err) {
            console.error("Meeting Media Error:", err);
        }
    };
    startStream();
    return () => {
        if (localStream) localStream.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Sync Controls
  useEffect(() => {
    if (localStream) {
        localStream.getVideoTracks().forEach(t => t.enabled = cameraOn);
        localStream.getAudioTracks().forEach(t => t.enabled = micOn);
    }
  }, [micOn, cameraOn, localStream]);

  // Voice Activity Detection for "Me"
  useEffect(() => {
    const cleanup = () => {
      if (audioAnimationRef.current) cancelAnimationFrame(audioAnimationRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };

    if (!localStream || !micOn) {
      setParticipants(prev => prev.map(p => p.isMe ? { ...p, isSpeaking: false } : p));
      return cleanup;
    }

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const source = ctx.createMediaStreamSource(localStream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let speakingFrames = 0;

    const checkVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      
      // Threshold for speaking
      if (average > 10) {
        speakingFrames = 30; // Hold for ~0.5 seconds
      } else if (speakingFrames > 0) {
        speakingFrames--;
      }

      const isSpeaking = speakingFrames > 0;

      setParticipants(prev => {
        const me = prev.find(p => p.isMe);
        if (me && me.isSpeaking !== isSpeaking) {
           return prev.map(p => p.isMe ? { ...p, isSpeaking } : p);
        }
        return prev;
      });

      audioAnimationRef.current = requestAnimationFrame(checkVolume);
    };

    checkVolume();

    return cleanup;
  }, [localStream, micOn]);

  // Handle Screen Share Stream
  useEffect(() => {
    if (screenVideoRef.current && screenStream) {
      screenVideoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  const handleScreenShare = async () => {
    if (screenShare) {
        if (screenStream) {
            screenStream.getTracks().forEach(t => t.stop());
            setScreenStream(null);
        }
        setScreenShare(false);
    } else {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
            setScreenStream(stream);
            setScreenShare(true);
            stream.getVideoTracks()[0].onended = () => {
                setScreenShare(false);
                setScreenStream(null);
            };
        } catch (err: any) {
            console.log("Screen share cancelled");
        }
    }
  };

  const handleMusicShare = async () => {
    if (musicShare) {
        // Start exit animation
        setMusicShare(false);
        // Wait for animation to finish before cleaning up stream
        setTimeout(() => {
            if (musicStream) {
                musicStream.getTracks().forEach(t => t.stop());
                setMusicStream(null);
            }
        }, 500);
    } else {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ 
                video: true, 
                audio: true,
                // @ts-ignore
                preferCurrentTab: false 
            });
            if (stream.getAudioTracks().length === 0) {
                alert("لطفاً گزینه Share Audio را فعال کنید.");
                stream.getTracks().forEach(t => t.stop());
                return;
            }
            setMusicStream(stream);
            setMusicShare(true);
            stream.getVideoTracks()[0].onended = () => {
                setMusicShare(false);
                setTimeout(() => setMusicStream(null), 500);
            };
        } catch (err: any) {
             console.log("Music share cancelled");
        }
    }
  };

  const toggleHandRaise = () => {
      setParticipants(prev => prev.map(p => 
          p.isMe ? { ...p, isHandRaised: !p.isHandRaised } : p
      ));
  };

  const triggerReaction = (emoji: string) => {
      const id = Date.now();
      const left = Math.random() * 80 + 10;
      const animationDuration = (Math.random() * 2 + 3) + 's';
      setFloatingEmojis(prev => [...prev, { id, emoji, left, animationDuration }]);
      setTimeout(() => {
          setFloatingEmojis(prev => prev.filter(e => e.id !== id));
      }, 5000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'شما',
      text: text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, msg]);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://did.ir/meet/${meetingId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Grid Class Logic ---
  const getGridClasses = () => {
    const n = participants.length;
    const isSidebarOpen = sidebarMode !== 'none';

    if (n === 1) return 'grid-cols-1 grid-rows-1 max-w-5xl mx-auto';
    
    if (n === 2) {
       if (isSidebarOpen) return 'grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1';
       return 'grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1';
    }

    if (n <= 4) return 'grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2'; 
    
    if (n <= 6) {
        if (isSidebarOpen) return 'grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2';
        return 'grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2';
    }
    
    if (isSidebarOpen) return 'grid-cols-2 grid-rows-5 lg:grid-cols-4 lg:grid-rows-2';
    return 'grid-cols-2 grid-rows-5 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-3';
  };

  const isMyHandRaised = participants.find(p => p.isMe)?.isHandRaised;
  const host = participants.find(p => p.isHost);
  const isDark = userSettings?.theme === 'dark';

  const renderParticipantsSidebar = () => (
     <div className={`flex flex-col h-full w-full ${isDark ? 'bg-[#09090b] text-white' : 'bg-white text-slate-800'} transition-colors duration-500`}>
        <div className={`shrink-0 h-[72px] px-6 flex items-center justify-between border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 ring-1 ring-inset ring-primary-500/20">
                  <Users className="w-5 h-5" strokeWidth={2.5} />
               </div>
               <div className="flex flex-col gap-0.5">
                   <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>شرکت‌کنندگان</h3>
                   <span className="text-[11px] text-gray-500 font-medium">{participants.length} نفر حاضر</span>
               </div>
            </div>
            <button onClick={() => setSidebarMode('none')} className={`w-8 h-8 flex items-center justify-center rounded-xl ${isDark ? 'hover:bg-white/5 text-gray-500 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'} transition-all`}>
                <X className="w-5 h-5" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-2">
            {participants.map(p => (
                <div key={p.id} className={`flex items-center justify-between p-3 rounded-2xl ${isDark ? 'bg-[#18181b] border-white/5 hover:border-white/10' : 'bg-slate-50 border-slate-200/60 hover:border-slate-300/80'} border transition-colors group`}>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src={p.avatarUrl || `https://ui-avatars.com/api/?name=${p.name}`} className="w-10 h-10 rounded-full bg-gray-700 object-cover ring-2 ring-primary-500/20" />
                            {p.isHandRaised && (
                                <div className="absolute -top-1 -right-1 bg-primary-600 rounded-full p-1 border-2 border-primary-500/30">
                                    <Hand className="w-2 h-2 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-sm font-bold ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-slate-700 group-hover:text-primary-600'} transition-colors`}>{p.name} {p.isMe && '(شما)'}</span>
                            <span className="text-[10px] text-gray-500">{p.isHost ? 'میزبان جلسه' : 'شرکت‌کننده'}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {!p.audioOn && <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500"><MicOff className="w-3.5 h-3.5" /></div>}
                        {!p.videoOn && <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500"><VideoOff className="w-3.5 h-3.5" /></div>}
                    </div>
                </div>
            ))}
        </div>
     </div>
  );

  return (
    <div className={`h-screen w-full ${isDark ? 'bg-[#09090b] text-white' : 'bg-slate-50 text-slate-800'} flex flex-col overflow-hidden selection:bg-primary-500/30 font-sans relative transition-colors duration-500`}>
      
      {/* Floating Emojis Layer */}
      <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
          {floatingEmojis.map(reaction => (
              <div 
                key={reaction.id}
                className="absolute bottom-20 text-4xl animate-[floatUp_4s_ease-out_forwards] opacity-0"
                style={{ left: `${reaction.left}%`, animationDuration: reaction.animationDuration }}
              >
                  {reaction.emoji}
              </div>
          ))}
          <style>{`
            @keyframes floatUp {
                0% { transform: translateY(0) scale(0.5); opacity: 0; }
                10% { opacity: 1; transform: translateY(-50px) scale(1.2); }
                100% { transform: translateY(-80vh) scale(1); opacity: 0; }
            }
          `}</style>
      </div>

      {/* --- Header --- */}
      <header className={`absolute top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-6 bg-gradient-to-b ${isDark ? 'from-black/90 via-black/50' : 'from-slate-900/40 via-slate-900/10'} to-transparent pointer-events-none`}>
         <div className="pointer-events-auto flex items-center gap-4 pt-2">
             <div className={`${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-md'} backdrop-blur-xl border rounded-2xl px-4 py-2 flex items-center gap-3 shadow-lg`}>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]"></div>
                <span className="font-mono text-base font-bold tracking-widest">{formatTime(time)}</span>
                <div className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-slate-300'}`}></div>
                <h1 className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>جلسه هفتگی تیم فنی</h1>
             </div>
         </div>

         <div className="pointer-events-auto flex items-center gap-3 pt-2">
             <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowMeetingInfo(true)}
                className={`${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200 shadow-sm'} border rounded-xl w-10 h-10`}
             >
                <Info className="w-5 h-5" />
             </Button>
         </div>
      </header>

      {/* --- Meeting Info Modal --- */}
      {showMeetingInfo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={() => setShowMeetingInfo(false)}>
            <div 
                className={`relative w-full max-w-sm ${isDark ? 'bg-[#18181b] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'} border rounded-[2.5rem] shadow-2xl overflow-hidden animate-[enter-up_0.3s_ease-out_forwards]`} 
                onClick={e => e.stopPropagation()}
            >
                {/* Subtle Background Gradient */}
                <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-primary-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                {/* Close Button */}
                <button 
                    onClick={() => setShowMeetingInfo(false)}
                    className={`absolute top-6 left-6 p-2 rounded-full ${isDark ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200'} transition-all z-10`}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Section */}
                <div className="flex flex-col items-center pt-10 px-8 pb-6 relative z-10">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-tr ${isDark ? 'from-[#202020] to-[#1a1a1a] border-white/5' : 'from-slate-100 to-slate-200 border-slate-350'} border shadow-2xl flex items-center justify-center mb-6 group`}>
                        <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <Info className="w-8 h-8 text-primary-500" />
                    </div>
                    
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-2 text-center`}>جلسه هفتگی تیم فنی</h2>
                    
                    <div className="flex items-center justify-center gap-2 mt-2">
                        {/* ID Chip */}
                        <button 
                            onClick={handleCopyLink}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'} border transition-all group cursor-pointer`}
                        >
                            <span className={`text-xs font-mono ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-slate-650 group-hover:text-slate-900'} transition-colors tracking-wider`}>{meetingId}</span>
                            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className={`w-3 h-3 ${isDark ? 'text-gray-600 group-hover:text-gray-400' : 'text-slate-500'}`} />}
                        </button>

                        {/* Timer Chip */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-medium text-green-500 font-mono pt-0.5">{formatTime(time)}</span>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="px-6 pb-8 space-y-4 relative z-10">
                    
                    {/* Description Card */}
                    <div className={`${isDark ? 'bg-[#121212] border-white/5' : 'bg-slate-50 border-slate-200/60'} border rounded-3xl p-5 relative overflow-hidden group`}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-2 mb-3 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">توضیحات</span>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'} leading-relaxed font-medium`}>
                            مرور تسک‌های اسپرینت جاری و هماهنگی برای دیپلوی نسخه جدید. لطفاً گزارش‌های خود را آماده کنید.
                        </p>
                    </div>

                    {/* Participants Split Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Host */}
                        <div className={`${isDark ? 'bg-[#121212] border-white/5' : 'bg-slate-50 border-slate-200/60'} border rounded-3xl p-4 flex flex-col justify-center items-center text-center gap-2`}>
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                                {host?.name.charAt(0) || 'M'}
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-500 block font-bold mb-0.5">میزبان</span>
                                <span className={`text-xs ${isDark ? 'text-white' : 'text-slate-800'} font-bold truncate max-w-[100px] block`}>{host?.name}</span>
                            </div>
                        </div>

                        {/* Attendees */}
                        <div className={`${isDark ? 'bg-[#121212] border-white/5' : 'bg-slate-50 border-slate-200/60'} border rounded-3xl p-4 flex flex-col justify-center items-center text-center gap-3`}>
                            <div className="flex -space-x-3 space-x-reverse justify-center pl-3">
                                {participants.slice(0, 3).map((p) => (
                                    <div key={p.id} className={`w-8 h-8 rounded-full border-2 ${isDark ? 'border-[#121212]' : 'border-white'} bg-gray-700 flex items-center justify-center text-[10px] text-white shrink-0 relative`}>
                                        {p.avatarUrl ? <img src={p.avatarUrl} className="w-full h-full rounded-full" /> : p.name.charAt(0)}
                                    </div>
                                ))}
                                 {participants.length > 3 && (
                                    <div className={`w-8 h-8 rounded-full border-2 ${isDark ? 'border-[#121212] bg-[#27272a]' : 'border-white bg-slate-200'} flex items-center justify-center text-[10px] ${isDark ? 'text-gray-450' : 'text-slate-600'} font-bold shrink-0 relative`}>
                                        +{participants.length - 3}
                                    </div>
                                )}
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-500 block font-bold">اعضای حاضر</span>
                                <span className={`text-xs ${isDark ? 'text-white' : 'text-slate-800'} font-bold`}>{participants.length} نفر</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Action Button */}
                    <Button 
                        onClick={() => setShowMeetingInfo(false)} 
                        className="w-full h-14 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-lg shadow-lg shadow-primary-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        متوجه شدم
                    </Button>
                </div>
            </div>
        </div>
      )}

      {/* --- Main Content Layout --- */}
      <main className="flex-1 flex overflow-hidden pt-16 sm:pt-24 px-3 sm:px-6 pb-20 sm:pb-[8.25rem] gap-4 sm:gap-6">
        
        {/* Sidebar Panel (Desktop: Floating Card Animation) */}
        {/* We keep it rendered but animate width/opacity to create the "push" effect */}
        <div className={`
            hidden lg:flex flex-col h-full shrink-0 
            transition-all duration-500 ease-in-out
            ${isDark ? 'bg-[#09090b] border-white/10' : 'bg-white border-slate-200'} border rounded-[2rem] overflow-hidden shadow-2xl relative
            ${sidebarMode !== 'none' ? 'w-[380px] opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-20'}
        `}>
           {/* Inner container to hold width constant during transition to prevent squash */}
           <div className="w-[380px] h-full flex flex-col">
              {activeSidebarContent === 'chat' && (
                <ChatSidebar isDark={isDark}                     messages={messages} 
                    onSendMessage={handleSendMessage} 
                    onClose={() => setSidebarMode('none')} 
                />
              )}
              {activeSidebarContent === 'participants' && renderParticipantsSidebar()}
           </div>
        </div>

        {/* Video Grid Area (Resizes automatically with Flex) */}
        <div className="flex-1 min-w-0 h-full overflow-y-auto custom-scrollbar relative transition-all duration-500 ease-in-out flex flex-col">
             
             {screenShare ? (
                // Screen Share Layout
                <div className="h-full w-full flex gap-4">
                    <div className={`flex-1 ${isDark ? 'bg-[#121212] border-white/10' : 'bg-slate-100 border-slate-200'} border rounded-[2rem] flex items-center justify-center relative overflow-hidden shadow-2xl`}>
                         {screenStream ? (
                            <video 
                                ref={screenVideoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-contain"
                            />
                         ) : (
                             <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>
                         )}
                         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                            <MonitorUp className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-medium text-white">شما در حال ارائه صفحه هستید</span>
                            <button onClick={handleScreenShare} className="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors ml-2 text-white">
                                <X className="w-4 h-4" />
                            </button>
                         </div>
                    </div>
                    {/* Vertical Strip */}
                    <div className="w-48 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-1">
                        {participants.filter(p => !p.isMe).map(p => (
                            <div key={p.id} className="aspect-video w-full shrink-0">
                                <VideoTile participant={p} className="rounded-2xl" />
                            </div>
                        ))}
                         <div className="aspect-video w-full shrink-0">
                             <VideoTile 
                                participant={participants.find(p => p.isMe)!}
                                mediaStream={localStream}
                                className="rounded-2xl"
                             />
                         </div>
                    </div>
                </div>
             ) : (
                // Standard Grid Layout
                <div className={`grid gap-4 w-full min-h-full transition-all duration-500 justify-items-center items-center ${getGridClasses()}`}>
                    {participants.map(p => (
                        <div key={p.id} className="w-full h-full min-h-[150px] sm:min-h-[200px] md:min-h-[245px] min-w-0 transition-all duration-500 flex items-center justify-center">
                            <VideoTile 
                                participant={{
                                    ...p, 
                                    videoOn: p.isMe ? cameraOn : p.videoOn, 
                                    audioOn: p.isMe ? micOn : p.audioOn
                                }} 
                                mediaStream={p.isMe ? localStream : undefined}
                                className="rounded-[2rem] aspect-video max-w-full max-h-full w-auto h-auto"
                            />
                        </div>
                    ))}
                </div>
             )}
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarMode !== 'none' && (
             <div className="lg:hidden absolute inset-0 z-50 p-4 pt-2 pb-24 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
                 <div className={`h-full w-full ${isDark ? 'bg-[#09090b] border-white/10' : 'bg-white border-slate-200'} border rounded-[2rem] overflow-hidden shadow-2xl animate-[slideInUp_0.3s_ease-out_forwards]`}>
                    {sidebarMode === 'chat' && (
                        <ChatSidebar isDark={isDark} 
                            messages={messages} 
                            onSendMessage={handleSendMessage} 
                            onClose={() => setSidebarMode('none')} 
                        />
                    )}
                    {sidebarMode === 'participants' && renderParticipantsSidebar()}
                 </div>
             </div>
        )}
      </main>

      {/* --- Floating Control Dock Area --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-end pointer-events-none w-full px-4">
          
          {/* Reaction Popup (Absolute positioning maintained for stacked effect) */}
          {showEmojiPicker && (
              <div className={`absolute bottom-20 sm:bottom-28 pointer-events-auto ${isDark ? 'bg-[#18181b]/90 border-white/10' : 'bg-white/95 border-slate-200 shadow-2xl text-slate-800'} backdrop-blur-xl border rounded-2xl p-1.5 sm:p-2 flex gap-1.5 sm:gap-2 shadow-2xl animate-[enter-up_0.3s_ease-out_forwards] z-[60]`}>
                  {['👍', '❤️', '👏', '😂', '😮', '🎉'].map(emoji => (
                      <button 
                        key={emoji}
                        onClick={() => triggerReaction(emoji)}
                        className="text-xl sm:text-2xl hover:bg-white/10 p-1.5 sm:p-2 rounded-xl transition-colors hover:scale-125 transform duration-200"
                      >
                          {emoji}
                      </button>
                  ))}
              </div>
          )}

          {/* Unified Dock Container (LTR forced for order control) */}
          <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto" dir="ltr">
              
              {/* LEFT: Cheer Controls Panel */}
              <div className={`
                  flex items-center justify-end overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                  ${musicShare ? 'max-w-[400px] opacity-100 translate-x-0' : 'max-w-0 opacity-0 translate-x-12'}
              `}>
                  <div className={`${isDark ? 'bg-black/60 border-white/10 ring-white/5 shadow-2xl' : 'bg-white/95 border-slate-200 shadow-xl text-slate-800'} backdrop-blur-2xl border rounded-2xl sm:rounded-[2rem] h-14 sm:h-20 px-2 sm:px-3 flex items-center justify-center gap-0.5 sm:gap-1 ring-1 mx-1 w-[180px] sm:w-[260px]`}>
                      {[
                          { id: 'shake', label: 'لرزش', icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5" /> },
                          { id: 'dance', label: 'رقص', icon: <Music className="w-4 h-4 sm:w-5 sm:h-5" /> },
                          { id: 'flash', label: 'فلش', icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" /> },
                          { id: 'party', label: 'پارتی', icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" /> },
                      ].map(effect => (
                          <button 
                             key={effect.id}
                             className="flex flex-col items-center justify-center w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl hover:bg-white/10 hover:text-white text-gray-400 transition-all gap-0.5 sm:gap-1 group select-none"
                             title={effect.label}
                             onClick={() => triggerReaction(effect.id === 'party' ? '🎉' : '⚡')} 
                          >
                              <div className="group-hover:scale-110 transition-transform duration-300 group-hover:text-primary-400">{effect.icon}</div>
                              <span className="text-[8px] sm:text-[10px] font-bold">{effect.label}</span>
                          </button>
                      ))}
                  </div>
              </div>

              {/* CENTER: Main Control Bar */}
              <div className={`relative z-20 ${isDark ? 'bg-[#09090b]/80 border-white/10 hover:bg-[#09090b]/90 ring-white/5 shadow-2xl' : 'bg-white/95 border-slate-200 shadow-xl text-slate-800'} backdrop-blur-xl border rounded-2xl sm:rounded-[2rem] h-14 sm:h-20 px-3 sm:px-6 flex items-center gap-1.5 sm:gap-3 transition-all duration-300 hover:scale-[1.02]`}>
                  {/* Media Controls */}
                  <div className="flex items-center gap-1 sm:gap-2">
                      <ControlButton 
                        active={micOn} 
                        onClick={() => setMicOn(!micOn)} 
                        onIcon={<Mic />} 
                        offIcon={<MicOff />} 
                        variant="toggle"
                      />
                      <ControlButton 
                        active={cameraOn} 
                        onClick={() => setCameraOn(!cameraOn)} 
                        onIcon={<Video />} 
                        offIcon={<VideoOff />} 
                        variant="toggle"
                      />
                  </div>

                  <div className={`w-px h-6 sm:h-8 ${isDark ? 'bg-white/10' : 'bg-slate-200'} mx-1 sm:mx-2`}></div>

                  {/* Action Controls */}
                  <div className="flex items-center gap-1 sm:gap-2">
                      <ControlButton 
                        active={screenShare} 
                        onClick={handleScreenShare} 
                        onIcon={<MonitorUp />} 
                        offIcon={<MonitorUp />}
                        variant="action"
                        title="اشتراک‌گذاری صفحه"
                      />
                      <ControlButton 
                        active={musicShare} 
                        onClick={handleMusicShare} 
                        onIcon={<Music />} 
                        offIcon={<Music />}
                        variant="action"
                        title="اشتراک‌گذاری موزیک"
                      />
                      <ControlButton 
                        active={showEmojiPicker}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        onIcon={<Smile />}
                        offIcon={<Smile />}
                        variant="ghost"
                      />
                      <ControlButton 
                        active={!!isMyHandRaised}
                        onClick={toggleHandRaise}
                        onIcon={<Hand />}
                        offIcon={<Hand />}
                        variant="action"
                      />
                      <ControlButton 
                         active={sidebarMode === 'chat'}
                         onClick={() => toggleSidebar('chat')}
                         onIcon={<MessageSquare />}
                         offIcon={<MessageSquare />}
                         variant="action"
                      />
                      <ControlButton 
                         active={sidebarMode === 'participants'}
                         onClick={() => toggleSidebar('participants')}
                         onIcon={<Users />}
                         offIcon={<Users />}
                         variant="action"
                      />
                  </div>

                  <div className={`w-px h-6 sm:h-8 ${isDark ? 'bg-white/10' : 'bg-slate-200'} mx-1 sm:mx-2`}></div>

                  {/* End Call */}
                  <button 
                    onClick={() => {
                        if (localStream) localStream.getTracks().forEach(t => t.stop());
                        if (screenStream) screenStream.getTracks().forEach(t => t.stop());
                        if (musicStream) musicStream.getTracks().forEach(t => t.stop());
                        onChangeView(AppView.SUMMARY);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl sm:rounded-[1.2rem] h-9 sm:h-11 px-3 sm:px-6 flex items-center gap-1.5 sm:gap-2 transition-all font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                  >
                      <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline text-xs sm:text-sm">پایان جلسه</span>
                  </button>
              </div>

              {/* RIGHT: Music Player Panel */}
              <div className={`
                  flex items-center justify-start overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                  ${musicShare ? 'max-w-[600px] opacity-100 translate-x-0' : 'max-w-0 opacity-0 -translate-x-12'}
              `}>
                   <div className="mx-1">
                      {musicStream && <MusicPlayer stream={musicStream} onClose={handleMusicShare} />}
                   </div>
              </div>

          </div>
      </div>

      <style>{`
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInUp {
             from { transform: translateY(100%); opacity: 0; }
             to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>

    </div>
  );
};

// --- Subcomponent for Clean Controls ---
const ControlButton = ({ active, onClick, onIcon, offIcon, variant = 'toggle', className = '', title = '' }: any) => {
    const isDark = typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true;
    let baseClass = "h-9 w-9 sm:h-11 sm:w-11 rounded-lg sm:rounded-[1.2rem] flex items-center justify-center transition-all duration-200 ";
    
    if (variant === 'toggle') {
        baseClass += active 
            ? (isDark ? "bg-[#27272a] text-white hover:bg-[#3f3f46] border border-white/10 hover:border-white/20" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/50") 
            : "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600";
    } else if (variant === 'action') {
        baseClass += active
            ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-500"
            : (isDark ? "bg-[#27272a] text-white hover:bg-[#3f3f46] border border-white/10 hover:border-white/20" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/50");
    } else {
        baseClass += isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100";
    }

    return (
        <button onClick={onClick} className={`${baseClass} ${className}`} title={title}>
            {React.cloneElement(active ? onIcon : offIcon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
        </button>
    )
}
