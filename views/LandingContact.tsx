import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  Users, 
  MessageSquare, 
  Check, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { LandingLayout } from '../components/landing/LandingLayout';
import { AppView, UserSettings } from '../types';

interface LandingContactProps {
  onChangeView: (view: AppView) => void;
  userSettings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

const entranceContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    }
  }
};

const entranceItemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 95,
      damping: 16,
    }
  }
};

export const LandingContact: React.FC<LandingContactProps> = ({ onChangeView, userSettings, updateSettings }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    orgName: '',
    userCount: '۱-۱۰',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onToggleTheme = () => {
    updateSettings({ theme: userSettings.theme === 'dark' ? 'light' : 'dark' });
  };

  // Isolated submit handler that can be wired to a real API endpoint later
  const sendContactRequest = async (data: typeof formData) => {
    // Simulating API network call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Here we could perform fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
        resolve();
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.fullName.trim()) {
      setError('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }
    if (!formData.workEmail.trim()) {
      setError('لطفاً ایمیل سازمانی خود را وارد کنید.');
      return;
    }
    // Email pattern check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.workEmail.trim())) {
      setError('فرمت ایمیل وارد شده معتبر نیست. لطفاً یک ایمیل سازمانی معتبر وارد کنید.');
      return;
    }
    if (!formData.orgName.trim()) {
      setError('لطفاً نام سازمان یا شرکت خود را وارد کنید.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendContactRequest(formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('بروز خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LandingLayout
      currentView={AppView.LANDING_CONTACT}
      onChangeView={onChangeView}
      theme={userSettings.theme}
      onToggleTheme={onToggleTheme}
    >
      <div className="flex-1 flex flex-col py-16 px-6 lg:px-12 max-w-[1400px] mx-auto w-full relative" dir="rtl">
        {/* Cinematic Backdrop Glows */}
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-primary-500/5 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto w-full space-y-12">
          
          {/* Main Glass Panel Card */}
          <motion.div 
            className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
            variants={entranceContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-gray-200/20 dark:divide-white/5">
              
              {/* RIGHT COLUMN: Copywriting & Benefits (RTL Start) */}
              <motion.div 
                className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8 text-right"
                variants={entranceContainerVariants}
              >
                <div className="space-y-6">
                  <motion.div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100/60 dark:bg-primary-900/40 text-primary-700 dark:text-primary-100 border border-primary-100 dark:border-primary-900/30 text-xs font-bold w-max"
                    variants={entranceItemVariants}
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>شروع استقرار سازمانی</span>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tight leading-tight"
                    variants={entranceItemVariants}
                  >
                    درخواست دسترسی برای سازمان شما
                  </motion.h1>
                  
                  <motion.p 
                    className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed"
                    variants={entranceItemVariants}
                  >
                    با پر کردن فرم مقابل، بستر ابری اختصاصی، امن و کاملاً بومی پلتفرم ویدئوکنفرانس دید را برای اعضا و شعب تابعه مجموعه خود دریافت کنید.
                  </motion.p>

                  {/* Bullet points with check icons */}
                  <motion.ul 
                    className="space-y-4 pt-4"
                    variants={entranceContainerVariants}
                  >
                    {[
                      'فضای کاری اختصاصی سازمان',
                      'کنترل کامل ادمین',
                      'میزبانی روی زیرساخت ایران',
                      'پشتیبانی هنگام راه‌اندازی'
                    ].map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center gap-3 text-right"
                        variants={entranceItemVariants}
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Micro info footer for trust */}
                <motion.div 
                  className="pt-8 border-t border-gray-200/30 dark:border-white/5 space-y-2"
                  variants={entranceItemVariants}
                >
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Phone className="w-3.5 h-3.5" />
                    <span>تلفن تماس مستقیم جهت هماهنگی فوری:</span>
                  </div>
                  <div className="text-sm font-black text-gray-800 dark:text-gray-200 font-mono tracking-wider" dir="ltr">
                    ۰۲۱ - ۸۸۸۸ ۹۹۹۹
                  </div>
                </motion.div>
              </motion.div>

              {/* LEFT COLUMN: Request Form (RTL End) */}
              <motion.div 
                className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center"
                variants={entranceContainerVariants}
              >
                {isSubmitted ? (
                  /* Success Glass Card inside form column */
                  <div className="text-center py-10 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white">درخواست شما ثبت شد</h3>
                      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                        به‌زودی با شما تماس می‌گیریم. سپاس از شکیبایی و انتخاب پلتفرم ویدئوکنفرانس سازمانی دید.
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="rounded-full bg-white/20 dark:bg-white/[0.03] hover:bg-white/40 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white px-8 py-2.5 font-bold text-sm cursor-pointer mx-auto"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          workEmail: '',
                          orgName: '',
                          userCount: '۱-۱۰',
                          message: ''
                        });
                      }}
                    >
                      ثبت درخواست جدید
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div className="space-y-1.5 text-right" variants={entranceItemVariants}>
                      <h2 className="text-xl font-extrabold text-gray-950 dark:text-white">فرم ثبت درخواست</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-450">لطفاً مشخصات زیر را با دقت تکمیل نمایید.</p>
                    </motion.div>

                    {error && (
                      <div className="p-4 rounded-2xl bg-red-500/10 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-500/20 dark:border-red-900/20 text-xs font-bold text-right">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Full Name */}
                      <motion.div className="space-y-1" variants={entranceItemVariants}>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 block text-right">نام و نام خانوادگی <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="نام و نام خانوادگی"
                            className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-black/30 border border-gray-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-gray-900 dark:text-white text-right font-medium text-sm"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Work Email */}
                      <motion.div className="space-y-1" variants={entranceItemVariants}>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 block text-right">ایمیل سازمانی <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                          <input
                            type="email"
                            placeholder="email@company.ir"
                            className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-black/30 border border-gray-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-gray-900 dark:text-white text-left font-medium text-sm tracking-wide"
                            dir="ltr"
                            value={formData.workEmail}
                            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Organization Name */}
                      <motion.div className="space-y-1" variants={entranceItemVariants}>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 block text-right">نام سازمان <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Building2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="نام کامل سازمان یا شرکت شما"
                            className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-black/30 border border-gray-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-gray-900 dark:text-white text-right font-medium text-sm"
                            value={formData.orgName}
                            onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Approximate Users (Select) */}
                      <motion.div className="space-y-1" variants={entranceItemVariants}>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 block text-right">تعداد تقریبی کاربران <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Users className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
                          <select
                            className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-black/30 border border-gray-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-gray-900 dark:text-white text-right font-medium text-sm appearance-none cursor-pointer"
                            value={formData.userCount}
                            onChange={(e) => setFormData({ ...formData, userCount: e.target.value })}
                          >
                            <option value="۱-۱۰">۱ تا ۱۰ کاربر</option>
                            <option value="۱۱-۵۰">۱۱ تا ۵۰ کاربر</option>
                            <option value="۵۱-۲۰۰">۵۱ تا ۲۰۰ کاربر</option>
                            <option value="بیش از ۲۰۰">بیش از ۲۰۰ کاربر</option>
                          </select>
                        </div>
                      </motion.div>

                      {/* Message/Description */}
                      <motion.div className="space-y-1" variants={entranceItemVariants}>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 block text-right">پیام / توضیحات (اختیاری)</label>
                        <div className="relative">
                          <MessageSquare className="absolute right-3.5 top-4 w-4.5 h-4.5 text-gray-400" />
                          <textarea
                            placeholder="توضیحات بیشتر یا نیازمندی‌های خاص سازمان خود را بنویسید..."
                            className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-black/30 border border-gray-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-gray-900 dark:text-white text-right font-medium text-sm min-h-[110px] resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          />
                        </div>
                      </motion.div>
                    </div>

                    <motion.div variants={entranceItemVariants}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full rounded-xl font-bold py-3.5 text-base shadow-lg shadow-primary-700/20 group cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'در حال ثبت درخواست...' : 'ارسال درخواست'}
                        {!isSubmitting && <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </motion.div>

            </div>
          </motion.div>

          {/* Alternate Contact Line & Link to Login */}
          <motion.div 
            className="text-center space-y-4 pt-4"
            variants={entranceItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              اگر قبلاً ثبت‌نام کرده‌اید یا حساب کاربری سازمانی دارید:
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="md"
                onClick={() => onChangeView(AppView.LOGIN)}
                className="rounded-full bg-white/30 dark:bg-white/[0.03] hover:bg-white/50 dark:hover:bg-white/[0.07] border border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white px-6 py-2.5 font-bold text-sm cursor-pointer"
                id="contact-goto-login"
              >
                ورود به پنل دید
              </Button>
            </div>
          </motion.div>

        </div>

      </div>
    </LandingLayout>
  );
};
