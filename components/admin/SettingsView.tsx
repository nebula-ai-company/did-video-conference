import React from 'react';
import { motion } from 'framer-motion';
import { Lock, WifiHigh, ShieldCheck } from '@phosphor-icons/react';

const itemVariants = {
  hidden: { y: 16, opacity: 0, filter: 'blur(4px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.8 }
  }
};

interface Policies {
  enforceMfa: boolean;
  strictE2EE: boolean;
  ipLogging: boolean;
  autoRecordVip: boolean;
  streamQuality: string;
}

interface SettingsViewProps {
  policies: Policies;
  togglePolicy: (key: keyof Omit<Policies, 'streamQuality'>) => void;
  setQuality: (val: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ policies, togglePolicy, setQuality }) => {
  return (
    <>
      <motion.div variants={itemVariants} className="border-b border-white/5 pb-5">
        <h3 className="text-lg font-black text-gray-100">سیاست‌ها و پروتکل‌های امنیتی همفکری</h3>
        <p className="text-xs text-slate-400">انتقال بسته‌ها در مجراهای چندگانه WebRTC، پیکربندی رمزگذاری و پدافند غیرعامل</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security Setting Box */}
        <motion.div variants={itemVariants} className="bg-[#0c0d15]/60 border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-blue-500" weight="fill" />
            <h4 className="text-sm font-black text-gray-250">خط‌مشی‌های هویتی و دسترسی کاربران</h4>
          </div>

          <div className="space-y-4">
            {/* Policy Toggle 1 */}
            <div className="flex items-center justify-between p-4 bg-white/[0.015] border border-white/5 rounded-2xl">
              <div className="space-y-1 pl-4">
                <span className="text-xs font-black text-gray-200 block">احراز هویت دو مرحله‌ای اجباری پرسنل</span>
                <p className="text-[10px] text-slate-455 leading-relaxed">ورود کلیه پرسنل سازمان‌ها پس از تایید OTP کد رسمی به سرور</p>
              </div>
              <button 
                onClick={() => togglePolicy('enforceMfa')}
                className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${policies.enforceMfa ? 'bg-blue-600 flex justify-end' : 'bg-slate-800 flex justify-start'}`}
              >
                <span className="w-4 h-4 rounded-full bg-white block shadow-md" />
              </button>
            </div>

            {/* Policy Toggle 2 */}
            <div className="flex items-center justify-between p-4 bg-white/[0.015] border border-white/5 rounded-2xl">
              <div className="space-y-1 pl-4">
                <span className="text-xs font-black text-gray-200 block">رمزنگاری سرتاسری پیشرفته ۲۵۶ بیتی</span>
                <p className="text-[10px] text-slate-455 leading-relaxed">کدگذاری چندمجزایی مکالمات روی کلاینت‌ها همگام با فناوری WebRTC</p>
              </div>
              <button 
                onClick={() => togglePolicy('strictE2EE')}
                className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${policies.strictE2EE ? 'bg-blue-600 flex justify-end' : 'bg-slate-800 flex justify-start'}`}
              >
                <span className="w-4 h-4 rounded-full bg-white block shadow-md" />
              </button>
            </div>

            {/* Policy Toggle 3 */}
            <div className="flex items-center justify-between p-4 bg-white/[0.015] border border-white/5 rounded-2xl">
              <div className="space-y-1 pl-4">
                <span className="text-xs font-black text-gray-200 block">ثبت لاگ‌های آدرس آی‌پی اتصالات</span>
                <p className="text-[10px] text-slate-455 leading-relaxed">ثبت لوکیشن و نشانی IP اتصالات در پرونده بررسی وقایع امنیتی</p>
              </div>
              <button 
                onClick={() => togglePolicy('ipLogging')}
                className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${policies.ipLogging ? 'bg-blue-600 flex justify-end' : 'bg-slate-800 flex justify-start'}`}
              >
                <span className="w-4 h-4 rounded-full bg-white block shadow-md" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sub-system and Bandwidth Parameters */}
        <motion.div variants={itemVariants} className="bg-[#0c0d15]/60 border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <WifiHigh className="w-5 h-5 text-emerald-400" weight="fill" />
            <h4 className="text-sm font-black text-gray-250">تنظیمات ترافیک شبکه و کدک همایش‌ها</h4>
          </div>

          <div className="space-y-4">
            {/* Option Selection Panel */}
            <div className="space-y-2 p-1 pt-0">
              <span className="text-xs font-black text-slate-400 block mb-2">کیفیت پیش‌فرض ارسال داده‌های استریم ویدئویی</span>
              
              <div className="grid grid-cols-3 gap-3">
                {['720p', '1080p', '4k'].map((q) => (
                  <button 
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`py-3.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      policies.streamQuality === q 
                        ? 'bg-blue-600/15 border-blue-500 text-blue-400 shadow-md' 
                        : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {q === '720p' && '۷۲۰p (کاهش پهنا)'}
                    {q === '1080p' && '۱۰۸۰p (کیفیت استاندارد)'}
                    {q === '4k' && '۴K (کیفیت فوق ویژه)'}
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-slate-500 leading-relaxed mt-2.5">
                رزولوشن انتخابی متناسب با شتاب‌دهنده گرافیکی کارت شبکه و پهنای باند گمرک ابری هر ستاد اعمال می‌شود.
              </p>
            </div>

            {/* Policy Toggle 4 */}
            <div className="flex items-center justify-between p-4 bg-white/[0.015] border border-white/5 rounded-2xl">
              <div className="space-y-1 pl-4">
                <span className="text-xs font-black text-gray-200 block">ضبط تصاویر اتوماتیک کدهای VIP</span>
                <p className="text-[10px] text-slate-455 leading-relaxed">دخیره‌سازی فایل مکالمه همایش‌های کلیدی دولتی در سرور ذخیره‌ای ایزوله</p>
              </div>
              <button 
                onClick={() => togglePolicy('autoRecordVip')}
                className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${policies.autoRecordVip ? 'bg-blue-600 flex justify-end' : 'bg-slate-800 flex justify-start'}`}
              >
                <span className="w-4 h-4 rounded-full bg-white block shadow-md" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="p-5.5 rounded-2.5xl bg-zinc-900/40 border border-white/5 space-y-3">
        <span className="text-xs font-black text-emerald-400 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" weight="fill" />
          وضعیت تطبیق با استانداردهای پدافند غیرعامل (سطح ب)
        </span>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          تنظیمات فوق بر تمامی دامنه‌ها و سیستم جلسات ستادی طرف قرارداد سامانه رمزگذاری مکالمه دید حاکم بوده و تحت نظارت مرجع امنیت بستر داده‌های ملی پایش می‌شود.
        </p>
      </motion.div>
    </>
  );
};
