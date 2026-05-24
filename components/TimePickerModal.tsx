import React, { useState, useEffect } from 'react';
import { X, Check, ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { Button } from './Button';

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
  initialTime: string;
  isDark?: boolean;
}

// Helper to convert English digits to Persian
const toPersianDigits = (num: number | string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

// Helper to convert Persian digits to English
const toEnglishDigits = (str: string) => {
  return str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
};

export const TimePickerModal: React.FC<TimePickerModalProps> = ({ isOpen, onClose, onConfirm, initialTime, isDark = true }) => {
  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState(0);

  useEffect(() => {
    if (isOpen && initialTime) {
      const parts = initialTime.split(':');
      if (parts.length === 2) {
        // Convert from potential Persian digits to English for parsing
        const hStr = toEnglishDigits(parts[0]);
        const mStr = toEnglishDigits(parts[1]);
        setSelectedHour(parseInt(hStr) || 0);
        setSelectedMinute(parseInt(mStr) || 0);
      }
    }
  }, [isOpen, initialTime]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const formattedHour = selectedHour.toString().padStart(2, '0');
    const formattedMinute = selectedMinute.toString().padStart(2, '0');
    
    // Return formatted string "HH:MM" using Persian digits for display consistency
    const timeStr = `${toPersianDigits(formattedHour)}:${toPersianDigits(formattedMinute)}`;
    onConfirm(timeStr);
    onClose();
  };

  const adjustHour = (delta: number) => {
    setSelectedHour(prev => {
      const newHour = (prev + delta + 24) % 24;
      return newHour;
    });
  };

  const adjustMinute = (delta: number) => {
    setSelectedMinute(prev => {
      const newMinute = (prev + delta + 60) % 60;
      return newMinute;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-enter">
      <div className={`border rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl transition-all duration-300 ${isDark ? 'bg-[#18181b] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-primary-500/10 text-primary-500' : 'bg-primary-50 text-primary-600'}`}>
               <Clock className="w-5 h-5" />
            </div>
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>انتخاب زمان</span>
          </div>
          <button onClick={onClose} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex items-center justify-center gap-4">
          
          {/* Hour Column */}
          <div className="flex flex-col items-center gap-4">
            <button onClick={() => adjustHour(1)} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-705'}`}>
              <ChevronUp className="w-6 h-6" />
            </button>
            <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-4xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-800'}`}>{toPersianDigits(selectedHour.toString().padStart(2, '0'))}</span>
            </div>
            <span className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>ساعت</span>
            <button onClick={() => adjustHour(-1)} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-705'}`}>
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          <div className={`text-4xl font-bold pb-6 ${isDark ? 'text-gray-650' : 'text-slate-305'}`}>:</div>

          {/* Minute Column */}
          <div className="flex flex-col items-center gap-4">
            <button onClick={() => adjustMinute(1)} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-705'}`}>
              <ChevronUp className="w-6 h-6" />
            </button>
            <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-4xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-800'}`}>{toPersianDigits(selectedMinute.toString().padStart(2, '0'))}</span>
            </div>
             <span className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>دقیقه</span>
            <button onClick={() => adjustMinute(-1)} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-705'}`}>
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className={`p-6 border-t flex gap-3 ${isDark ? 'border-white/5 bg-black/20' : 'border-slate-100 bg-slate-50/50'}`}>
          <Button variant="ghost" className={`flex-1 ${isDark ? '' : 'text-slate-600 hover:text-slate-800'}`} onClick={onClose}>
            انصراف
          </Button>
          <Button className="flex-1 gap-2 border border-primary-500/50" onClick={handleConfirm}>
            <Check className="w-4 h-4" />
            تایید زمان
          </Button>
        </div>

      </div>
    </div>
  );
};