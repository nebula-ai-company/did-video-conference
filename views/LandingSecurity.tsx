import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Server, 
  MapPin, 
  KeyRound, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { LandingLayout } from '../components/landing/LandingLayout';
import { SecurityLoopVisualizer } from '../components/landing/SecurityLoopVisualizer';
import { AppView, UserSettings } from '../types';

interface LandingSecurityProps {
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

export const LandingSecurity: React.FC<LandingSecurityProps> = ({ onChangeView, userSettings, updateSettings }) => {
  const onToggleTheme = () => {
    updateSettings({ theme: userSettings.theme === 'dark' ? 'light' : 'dark' });
  };

  const securityPoints = [
    {
      icon: <Server className="w-6 h-6 text-emerald-500" />,
      title: 'حاکمیت داده و میزبانی مستقل',
      desc: 'میزبانی self‑hosted روی زیرساخت امن ایران (بر پایه ابر آروان - ArvanCloud). اطلاعات جلسات، جریان صوتی و تصویری هرگز از کشور خارج نشده و هیچ وب‌سرویس یا سرویس ابری شخص‌ثالثی در این مسیر وجود ندارد.',
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-500" />,
      title: 'حریم خصوصی مطلق در نظارت',
      desc: 'قانون مهندسی صریح دید: هیچ مدیر یا ادمینی قادر نیست وب‌کم یا میکروفون شرکت‌کننده‌ای را بدون اجازه فعال کند. بی‌صدا کردن موقت صرفاً دسترسی را مسدود کرده و پس از برداشتن مسدودیت، اجازه فعال‌سازی مجدد بر عهده خود کاربر است.',
    },
    {
      icon: <KeyRound className="w-6 h-6 text-emerald-500" />,
      title: 'احراز هویت پیشرفته و سطوح دسترسی',
      desc: 'اعتبارسنجی همه‌جانبه با توکن‌های رمزنگاری شده JWT، ذخیره‌سازی گذرواژه‌ها به صورت کاملاً هششده (bcrypt)، تعریف دقیق نقش‌های کاربری، اعمال محدودیت‌های ورود دامنه‌ای در سطح سازمان و احراز دقیق مالکیت اتاق جلسات.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'رمزنگاری ارتباطات و لایه انتقال',
      desc: 'برقراری کلیه تبادلات روی بستر فوق‌العاده امن HTTPS و بسترسازی رمزنگاری لایه‌ای ترافیک صوت و تصویر WebRTC (فناوری‌های DTLS-SRTP) برای ممانعت کامل از هرگونه شنود اطلاعات شبکه‌ای.',
    },
    {
      icon: <Database className="w-6 h-6 text-emerald-500" />,
      title: 'مالکیت همیشگی و ماندگاری اختیاری داده',
      desc: 'تمامی فایل‌ها و داده‌های موقت مربوط به جلسات پس از خاتمه بلافاصله از سرورها پاکسازی می‌شوند. معماری توسعه بر پایه هسته متن‌باز LiveKit بنا شده که به شما آزادی کامل داده و خطر قفل شدن به ارائه‌دهنده را از بین می‌گردد.',
    },
  ];

  return (
    <LandingLayout
      currentView={AppView.LANDING_SECURITY}
      onChangeView={onChangeView}
      theme={userSettings.theme}
      onToggleTheme={onToggleTheme}
    >
      <div className="flex-1 flex flex-col py-16 px-6 lg:px-12 max-w-[1400px] mx-auto w-full relative" dir="rtl">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-emerald-550/5 dark:bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-blue-550/5 dark:bg-blue-500/5 blur-[100px] pointer-events-none -z-10" />

        {/* Section Header */}
        <motion.div 
          className="text-center space-y-4 max-w-2xl mx-auto mb-16"
          variants={entranceContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100/30 dark:border-emerald-900/10 text-xs font-bold" variants={entranceItemVariants}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>محرمانگی و امنیت بی‌قیدوشرط</span>
          </motion.div>
          <motion.h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight" variants={entranceItemVariants}>
            امنیت و حریم خصوصی
          </motion.h1>
          <motion.p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto" variants={entranceItemVariants}>
            داده‌های سازمان شما، در کنترل سازمان شما.
          </motion.p>
        </motion.div>

        {/* Optional Row of 3 Pills */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          variants={entranceContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold shadow-xs transition-all duration-300 ${
              userSettings.theme === 'dark'
                ? 'bg-black/40 border-white/5 text-gray-300'
                : 'bg-white border-slate-200/80 text-slate-700'
            }`}
            variants={entranceItemVariants}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span>داده در ایران</span>
          </motion.div>
          <motion.div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold shadow-xs transition-all duration-300 ${
              userSettings.theme === 'dark'
                ? 'bg-black/40 border-white/5 text-gray-300'
                : 'bg-white border-slate-200/80 text-slate-700'
            }`}
            variants={entranceItemVariants}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>بدون شخص‌ثالث</span>
          </motion.div>
          <motion.div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold shadow-xs transition-all duration-300 ${
              userSettings.theme === 'dark'
                ? 'bg-black/40 border-white/5 text-gray-300'
                : 'bg-white border-slate-200/80 text-slate-700'
            }`}
            variants={entranceItemVariants}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>حریم خصوصی پیش‌فرض</span>
          </motion.div>
        </motion.div>

        {/* Motion Graphics Security Loop Animation Visualizer */}
        <motion.div 
          className="mb-20 relative z-10"
          variants={entranceItemVariants}
          initial="hidden"
          animate="visible"
        >
          <SecurityLoopVisualizer theme={userSettings.theme} />
        </motion.div>

        {/* Security Details Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          variants={entranceContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {securityPoints.map((item, idx) => (
            <motion.div
              key={idx}
              variants={entranceItemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`p-8 rounded-[2rem] border transition-all duration-300 flex flex-col gap-4 text-right ${
                idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              } ${
                userSettings.theme === 'dark'
                  ? 'bg-black/40 backdrop-blur-3xl border-white/10 shadow-sm hover:shadow-2xl hover:border-emerald-500/30'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-500/30'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                userSettings.theme === 'dark'
                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}>
                {item.icon}
              </div>
              <h3 className={`text-lg font-black transition-colors duration-300 ${
                userSettings.theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>{item.title}</h3>
              <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                userSettings.theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
              }`}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* bottom CTA band */}
        <motion.div 
          className={`mt-24 rounded-[2.5rem] p-8 md:p-14 text-center flex flex-col items-center gap-6 relative overflow-hidden transition-all duration-300 ${
            userSettings.theme === 'dark'
              ? 'bg-black/45 backdrop-blur-3xl border border-white/10 shadow-2xl'
              : 'bg-white border border-slate-200 shadow-xl'
          }`}
          variants={entranceContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent pointer-events-none" />
          
          <motion.div 
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner relative z-10 transition-colors duration-300 ${
              userSettings.theme === 'dark'
                ? 'bg-primary-500/20 text-primary-100 border border-primary-500/30'
                : 'bg-primary-50 text-primary-700 border border-primary-200/50'
            }`}
            variants={entranceItemVariants}
          >
            <ShieldCheck className="w-6 h-6 animate-pulse text-emerald-500" />
          </motion.div>

          <motion.h2 
            className={`text-2xl md:text-3xl font-black relative z-10 leading-snug transition-colors duration-300 ${
              userSettings.theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
            variants={entranceItemVariants}
          >
            ارتباطاتی امن و مستقل را هم‌اکنون آغاز کنید
          </motion.h2>
          <motion.p 
            className={`text-sm md:text-base max-w-xl relative z-10 leading-relaxed transition-colors duration-300 ${
              userSettings.theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}
            variants={entranceItemVariants}
          >
            کدهای منبع بومی، عدم وابستگی به بستر خارجی و رمزگذاری سرتاسری ترافیک صوتی‌تصویری برای حفظ کامل دارایی‌های اطلاعاتی سازمان شما.
          </motion.p>
          
          <motion.div className="flex gap-4 relative z-10 pt-2" variants={entranceItemVariants}>
            <Button
              variant="primary"
              size="lg"
              className="rounded-full px-8 py-3.5 font-bold shadow-lg shadow-primary-700/20 group cursor-pointer"
              onClick={() => onChangeView(AppView.LOGIN)}
            >
              ورود به دید
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </LandingLayout>
  );
};
