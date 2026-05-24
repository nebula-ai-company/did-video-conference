
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageSquare, Paperclip, Smile, CheckCheck, Image as ImageIcon } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatSidebarProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
  className?: string;
  isDark?: boolean;
}

// Helper to detect if message is just emojis (up to 3)
const isEmojiOnly = (text: string) => {
  if (!text) return false;
  const trimmed = text.trim();
  try {
     // Unicode property escapes for emojis. 
     // Matches emoji characters, presentation selectors, joiners, and whitespace.
     // Also checks length to ensure we don't treat long strings of emojis as stickers.
     return /^[\p{Extended_Pictographic}\u200D\uFE0F\s]+$/u.test(trimmed) && Array.from(trimmed).length <= 3;
  } catch (e) {
     return false; 
  }
};

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  messages, 
  onSendMessage, 
  onClose,
  className = '',
  isDark = true
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEmojiPicker && !(event.target as Element).closest('.emoji-container')) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  return (
    <div className={`flex flex-col h-full w-full ${className}`}>
      {/* Hidden Inputs */}
      <input type="file" ref={fileInputRef} className="hidden" onChange={() => alert('قابلیت ارسال فایل در نسخه دمو فعال نیست.')} />
      <input type="file" ref={imageInputRef} accept="image/*" className="hidden" onChange={() => alert('قابلیت ارسال تصویر در نسخه دمو فعال نیست.')} />
      
      {/* --- HEADER --- */}
      <div className={`shrink-0 h-[72px] px-6 flex items-center justify-between border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-10 h-10 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 ring-1 ring-inset ring-primary-500/20">
               <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
             </div>
             <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${isDark ? 'bg-[#09090b]' : 'bg-white'}`}>
                <span className={`w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ${isDark ? 'ring-[#09090b]' : 'ring-white'}`}></span>
             </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>گفتگوی متنی</h3>
            <span className={`text-[11px] font-medium ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>همه اعضا (۵ نفر)</span>
          </div>
        </div>
        
        <button 
            onClick={onClose} 
            className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 ${isDark ? 'hover:bg-white/5 text-gray-500 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'}`}
        >
            <X className="w-5 h-5" />
        </button>
      </div>

      {/* --- MESSAGES --- */}
      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar space-y-6">
        
        {/* Date Divider */}
        <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}></div>
            </div>
            <div className={`relative border rounded-full px-4 py-0.5 text-[10px] font-medium uppercase tracking-widest shadow-sm ${isDark ? 'bg-[#09090b] border-white/5 text-gray-500' : 'bg-white border-slate-200 text-slate-500'}`}>
                امروز
            </div>
        </div>

        {messages.map((msg, index) => {
          const isMe = msg.senderId === 'me';
          const isSequence = index > 0 && messages[index - 1].senderId === msg.senderId;
          const isEmoji = isEmojiOnly(msg.text);

          // In RTL layout: items-start aligns to Right, items-end aligns to Left.
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col ${isMe ? 'items-start' : 'items-end'} ${isSequence ? 'mt-1' : 'mt-5'} animate-enter group`}
              style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
            >
              {!isMe && !isSequence && (
                 <div className="flex items-end gap-2 mb-1.5 px-1 flex-row-reverse">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/5 text-[9px] font-bold text-white flex items-center justify-center shadow-inner">
                        {msg.senderName.charAt(0)}
                    </div>
                    <span className={`text-[11px] font-bold ${isDark ? 'text-gray-400' : 'text-slate-650'}`}>{msg.senderName}</span>
                 </div>
              )}
              
              <div className={`
                relative max-w-[85%] transition-all duration-200
                ${isEmoji 
                    ? 'px-2 py-1 text-6xl bg-transparent leading-none' 
                    : `px-4 py-3 text-sm leading-relaxed shadow-sm ${isMe 
                        ? 'bg-primary-600 text-white rounded-[1.2rem] rounded-tr-sm' 
                        : `${isDark ? 'bg-[#18181b] border border-white/5 text-gray-200' : 'bg-slate-100 border border-slate-200/50 text-slate-800'} rounded-[1.2rem] rounded-tl-sm hover:opacity-95`}`
                }
              `}>
                {msg.text}
                
                <div className={`
                    text-[9px] font-medium mt-1.5 flex items-center gap-1 opacity-60
                    ${isMe ? 'justify-end' : 'justify-start'}
                    ${isEmoji ? 'text-gray-500' : (isMe ? 'text-white' : 'text-gray-500')}
                `}>
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* --- INPUT --- */}
      <div className="shrink-0 p-5 pt-2 relative z-20">
        {/* Emoji Picker */}
        {showEmojiPicker && (
            <div className={`emoji-container absolute bottom-24 right-6 border p-3 rounded-2xl shadow-2xl z-50 animate-enter-up grid grid-cols-6 gap-2 w-64 ${isDark ? 'bg-[#18181b] border-white/10' : 'bg-white border-slate-200 shadow-slate-200/40'}`}>
                {['😊','😂','❤️','👍','🎉','😭','😮','👏','🔥','🙏','🤔','😎','👋','✨','💪','🤝','👀','💯'].map(emoji => (
                    <button 
                        key={emoji} 
                        onClick={() => handleEmojiSelect(emoji)} 
                        className={`p-2 rounded-xl text-xl transition-colors flex items-center justify-center ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-slate-800'}`}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        )}

        <div className={`border focus-within:border-primary-500/50 rounded-[1.5rem] p-2 flex flex-col shadow-lg transition-colors ${isDark ? 'bg-[#121212] border-white/10' : 'bg-slate-100/80 border-slate-200 focus-within:bg-white'}`}>
            <textarea 
                className={`w-full bg-transparent border-none outline-none text-sm px-3 py-2 placeholder:text-gray-500 min-h-[44px] max-h-[120px] resize-none custom-scrollbar ${isDark ? 'text-white' : 'text-slate-800'}`}
                placeholder="پیامی بنویسید..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                dir="auto"
            />
            <div className="flex items-center justify-between px-1">
                 <div className="flex items-center gap-0.5 emoji-container">
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-2 text-gray-500 rounded-xl transition-colors ${isDark ? 'hover:text-white hover:bg-white/5' : 'hover:text-slate-800 hover:bg-slate-200/50'}`}
                        title="ارسال فایل"
                    >
                        <Paperclip className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => imageInputRef.current?.click()}
                        className={`p-2 text-gray-500 rounded-xl transition-colors ${isDark ? 'hover:text-white hover:bg-white/5' : 'hover:text-slate-800 hover:bg-slate-200/50'}`}
                        title="ارسال تصویر"
                    >
                        <ImageIcon className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`p-2 rounded-xl transition-colors ${showEmojiPicker ? 'text-primary-500 bg-primary-500/10' : `text-gray-500 ${isDark ? 'hover:text-white hover:bg-white/5' : 'hover:text-slate-800 hover:bg-slate-200/50'}`}`}
                        title="ایموجی"
                    >
                        <Smile className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <button 
                    onClick={() => handleSend()}
                    disabled={!newMessage.trim()}
                    className={`
                        p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center
                        ${newMessage.trim() 
                            ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-600/20 scale-100' 
                            : `${isDark ? 'bg-white/5 text-gray-600' : 'bg-slate-200/50 text-slate-400'} cursor-not-allowed scale-90`}
                    `}
                 >
                    <Send className="w-4 h-4 transform scale-x-[-1]" strokeWidth={2.5} />
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};
