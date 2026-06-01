import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Buildings, 
  UserPlus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MagnifyingGlass, 
  SignOut, 
  Pulse, 
  Gear,  
  Key, 
  Desktop, 
  ShieldCheck, 
  EnvelopeSimple, 
  Phone, 
  Plus, 
  Trash, 
  Calendar, 
  FileText, 
  Globe, 
  Info,
  ArrowSquareOut,
  Sliders,
  WarningCircle,
  CaretDown,
  Lock,
  WifiHigh,
  UserCheck
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { RequestsView } from '../components/admin/RequestsView';
import { SettingsView } from '../components/admin/SettingsView';
import { UsersView } from '../components/admin/UsersView';
import { AppView, UserSettings } from '../types';

// Spring Physics Stagger Animation Configuration for outstanding fluid transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.03
    }
  }
};

const itemVariants = {
  hidden: { y: 16, opacity: 0, filter: 'blur(4px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.8
    }
  }
};

interface AdminPanelProps {
  onChangeView: (view: AppView) => void;
  userSettings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  onLogout: () => void;
}

interface Org {
  id: string;
  name: string;
  code: string;
  domain: string;
  userCount: number;
}

interface UserRecord {
  id: string;
  name: string;
  email: string;
  orgId: string;
  orgName: string;
  role: string;
  meetingsJoined: number;
  totalDurationHours: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

interface SignupRequest {
  id: string;
  name: string;
  email: string;
  requestedOrg: string;
  role: string;
  phone: string;
  timestamp: string;
}

interface ChartPoint {
  time: string;
  hqValue: string;
  voipValue: string;
  x: number;
  hqY: number;
  voipY: number;
}

const chartPoints: ChartPoint[] = [
  { time: "۸ ثانیه پیش", hqValue: "۴.۲ گیگابیت", voipValue: "۵.۰ میلی‌ثانیه", x: 0, hqY: 150, voipY: 100 },
  { time: "۷ ثانیه پیش", hqValue: "۵.۸ گیگابیت", voipValue: "۶.۲ میلی‌ثانیه", x: 100, hqY: 120, voipY: 150 },
  { time: "۶ ثانیه پیش", hqValue: "۷.۱ گیگابیت", voipValue: "۳.۶ میلی‌ثانیه", x: 200, hqY: 120, voipY: 90 },
  { time: "۵ ثانیه پیش", hqValue: "۳.۶ گیگابیت", voipValue: "۷.۹ میلی‌ثانیه", x: 300, hqY: 175, voipY: 50 },
  { time: "۴ ثانیه پیش", hqValue: "۶.۴ گیگابیت", voipValue: "۴.۰ میلی‌ثانیه", x: 400, hqY: 110, voipY: 150 },
  { time: "۳ ثانیه پیش", hqValue: "۸.۲ گیگابیت", voipValue: "۲.۱ میلی‌ثانیه", x: 500, hqY: 80, voipY: 110 },
  { time: "۲ ثانیه پیش", hqValue: "۴.۹ گیگابیت", voipValue: "۶.۵ میلی‌ثانیه", x: 600, hqY: 145, voipY: 75 },
  { time: "۱ ثانیه پیش", hqValue: "۶.۸ گیگابیت", voipValue: "۵.۴ میلی‌ثانیه", x: 700, hqY: 100, voipY: 165 },
  { time: "اکنون", hqValue: "۷.۶ گیگابیت", voipValue: "۳.۸ میلی‌ثانیه", x: 800, hqY: 90, voipY: 100 }
];

interface SecurityEvent {
  id: string;
  time: string;
  type: string;
  pulseColor: 'emerald' | 'blue' | 'amber';
  content: string;
  hasPing?: boolean;
  details: {
    ipAddress?: string;
    nodeId?: string;
    protocol?: string;
    integrityHash?: string;
    severity: string;
    actionTaken: string;
    auditLogId: string;
    longDescription: string;
  };
}

const securityEvents: SecurityEvent[] = [
  {
    id: 'evt-1',
    time: '14:16:12',
    type: 'اعتبارسنجی شبکه',
    pulseColor: 'emerald',
    content: 'تبادل امضا با گره اصلی ستاد (DID-HQ-NODE) برقرار شد. تاخیر مسیر: ۳ میلی‌ثانیه.',
    hasPing: true,
    details: {
      ipAddress: '10.110.0.1',
      nodeId: 'DID-HQ-NODE (ستاد مرکزی تهران)',
      protocol: 'TLS v1.3 (ChaCha20-Poly1305)',
      integrityHash: 'SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      severity: 'امن / ترافیک تایید شده',
      actionTaken: 'تایید امضای الکترونیک و کلید تبادل موقت جلسه به صورت موفقیت‌آمیز',
      auditLogId: 'AUDIT-89240-SEC',
      longDescription: 'فرآیند دست‌دهی متقابل (Mutual Handshake) و سنجش دوره‌ای گواهی برای گره ستاد مرکزی با دریافت کلید امضا با موفقیت سپری شد. شبکه در بالاترین پایداری قرار دارد.'
    }
  },
  {
    id: 'evt-2',
    time: '14:15:31',
    type: 'بخش امنیتی',
    pulseColor: 'blue',
    content: 'بازبینی اعتبار گواهی امنیتی دو مرحله‌ای برای farrokhi@did-voice.ir انجام شد.',
    hasPing: true,
    details: {
      ipAddress: '192.168.42.10',
      nodeId: 'USER-ENDPOINT-FARROKHI',
      protocol: 'احراز هویت دو مرحله ای (WebAuthn / YubiKey)',
      integrityHash: 'SHA-256 a1b2c3d4e5f60718293a4b5c6d7e8f90011223344556677889900aabbccddeef',
      severity: 'تایید هویت موفق',
      actionTaken: 'مجوز ورود به سیستم برای نشست ادمین صادر گردید.',
      auditLogId: 'AUDIT-89239-MFA',
      longDescription: 'کاربر حمیدرضا فرخی با نقش عالی مدیر کل کنفرانس، تاییدیه بیومتریک و امضای توکن فیزیکی را جهت دسترسی به پرتال تنظیمات تکمیلی ارائه داد که با موفقیت در پایگاه مرکزی تایید شد.'
    }
  },
  {
    id: 'evt-3',
    time: '14:14:02',
    type: 'کنترولر ارتباط',
    pulseColor: 'emerald',
    content: 'اتاق مکالمه اختصاصی رمزنگاری شده (اتاق ۱۰۲) فعال گردید.',
    details: {
      ipAddress: '10.140.2.22',
      nodeId: 'DID-MEDIA-SRV-04',
      protocol: 'Secure RTP (SRTP) / AES-GCM-256',
      integrityHash: 'SHA-256 99a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',
      severity: 'امن / رمزگذاری لایه رسانه',
      actionTaken: 'تکمیل ساختار کلید متقارن یکبار مصرف برای هر کلاینت متصل',
      auditLogId: 'AUDIT-89238-MEDIA',
      longDescription: 'اتاق جدید تحت استاندارد رمزنگاری صوتی-تصویری پیشرفته در لایه انتقال سیگنال شروع به کار کرد. هیچ جریان رمزگشایی نشده‌ای از شبکه عبور نمی‌پذیرد.'
    }
  },
  {
    id: 'evt-4',
    time: '14:12:44',
    type: 'نوسازی کلید',
    pulseColor: 'emerald',
    content: 'کلید خوشه‌های رمزنگاری اتمی با موفقیت پس از ۱۸۰ ثانیه بازنویسی شدند.',
    details: {
      nodeId: 'CRYPT-HSM-MODULE-01',
      protocol: 'Quantum-Resistant Kyber Layer 3',
      integrityHash: 'SHA-256 f1e2d3c4b5a697887766554433221100ffeeddccbbaa99887766554433221100',
      severity: 'چرخش دوره‌ای امنیتی',
      actionTaken: 'جایگزینی کلیدهای متقارن لایه انتقال بدون توقف سرویس و افت بیت‌ریت',
      auditLogId: 'AUDIT-89237-KEY',
      longDescription: 'سخت‌افزار اختصاصی مدیریت کلید امن دید (HSM) به صورت کاملاً خودکار و بر اساس الگوریتم توزیع کلید امن، جفت‌کلیدهای تبادلی را نوسازی کرد و بدون کوچکترین اختلال به پایان رساند.'
    }
  },
  {
    id: 'evt-5',
    time: '14:09:51',
    type: 'دیوار حفاظتی',
    pulseColor: 'amber',
    content: 'تلاش اتصال ناشناس از آدرس آی‌پی خارجی ۱۸۵.۱۱۲.۴۲.۱ مسدود گردید.',
    hasPing: true,
    details: {
      ipAddress: '185.112.42.1',
      nodeId: 'WAN-GATEWAY-01',
      protocol: 'TCP Handshake Denied (Port 22 / SSH Probe)',
      integrityHash: 'SIGNATURE_MISMATCH / امضای ناشناخته',
      severity: 'هشدار سطح متوسط / مسدود شده',
      actionTaken: 'آدرس خاطی به طور خودکار به قوانین دیوار آتشین توزیع شده اضافه شد و دسترسی آن مسدود شد.',
      auditLogId: 'AUDIT-89235-FW',
      longDescription: 'دیوار حفاظتی متوجه تلاشهای مکرر و نامعتبر برای برقراری اتصال SSH به سرور اصلی گردید. با توجه به عدم ارائه شناسه الکترونیکی معتبر، آی‌پی مذکور برای مدت ۲۴ ساعت در کل کلاستر فایروال ایزوله شد.'
    }
  }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onChangeView, 
  userSettings, 
  updateSettings,
  onLogout 
}) => {
  // Current active navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'orgs' | 'requests' | 'settings'>('overview');
  const [requestsPage, setRequestsPage] = useState(1);
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock background scrolling when security dialog is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);
  
  // High fidelity realistic default states
  const [organizations, setOrganizations] = useState<Org[]>([
    { id: 'org-1', name: 'ستاد فناوری اطلاعات دید', code: 'DID-HQ', domain: 'did-voice.ir', userCount: 3 },
    { id: 'org-2', name: 'شرکت ارتباطات نوین سحاب', code: 'SAHAB-TECH', domain: 'sahab-tech.ir', userCount: 2 },
    { id: 'org-3', name: 'سازمان برنامه‌ریزی و بودجه کشور', code: 'PBO-GOV', domain: 'mporg.ir', userCount: 1 },
    { id: 'org-4', name: 'ستاد مرکزی شهرداری تهران', code: 'TMSR-HQ', domain: 'tehran.ir', userCount: 0 }
  ]);

  const [users, setUsers] = useState<UserRecord[]>([
    { id: 'user-1', name: 'دکتر حمیدرضا فرخی', email: 'farrokhi@did-voice.ir', orgId: 'org-1', orgName: 'ستاد فناوری اطلاعات دید', role: 'مدیر کل کنفرانس', meetingsJoined: 142, totalDurationHours: 328, lastActive: '۱۰ دقیقه پیش', status: 'active' },
    { id: 'user-2', name: 'مهندس سارا خسروی', email: 's.khosravi@sahab-tech.ir', orgId: 'org-2', orgName: 'شرکت ارتباطات نوین سحاب', role: 'توسعه‌دهنده سیستم', meetingsJoined: 89, totalDurationHours: 194, lastActive: 'امروز، ۱۱:۲۰', status: 'active' },
    { id: 'user-3', name: 'علیرضا موسوی', email: 'mousavi@did-voice.ir', orgId: 'org-1', orgName: 'ستاد فناوری اطلاعات دید', role: 'پشتیبان ارتباطات امن', meetingsJoined: 31, totalDurationHours: 64, lastActive: 'دیروز، ۱۵:۴۰', status: 'active' },
    { id: 'user-4', name: 'زهرا رادکان', email: 'radkan@mporg.ir', orgId: 'org-3', orgName: 'سازمان برنامه‌ریزی و بودجه کشور', role: 'رئیس اداره هوشمندسازی', meetingsJoined: 75, totalDurationHours: 182, lastActive: '۲ ساعت پیش', status: 'active' },
    { id: 'user-5', name: 'مهندس بردیا مهران', email: 'b.mehran@sahab-tech.ir', orgId: 'org-2', orgName: 'شرکت ارتباطات نوین سحاب', role: 'کارشناس شبکه', meetingsJoined: 12, totalDurationHours: 24, lastActive: '۳ روز پیش', status: 'inactive' },
    { id: 'user-6', name: 'نیلوفر رحیمی', email: 'rahimi@did-voice.ir', orgId: 'org-1', orgName: 'ستاد فناوری اطلاعات دید', role: 'طراح تجربه کاربری', meetingsJoined: 46, totalDurationHours: 92, lastActive: 'امروز، ۰۹:۱۵', status: 'active' },
    { id: 'user-7', name: 'احسان محمدی', email: 'mohamadi@did-voice.ir', orgId: 'org-1', orgName: 'ستاد فناوری اطلاعات دید', role: 'راهبر سرویس', meetingsJoined: 55, totalDurationHours: 110, lastActive: '۱ ساعت پیش', status: 'active' },
    { id: 'user-8', name: 'شیرین افشار', email: 'afshar@mporg.ir', orgId: 'org-3', orgName: 'سازمان برنامه‌ریزی و بودجه کشور', role: 'تحلیلگر داده', meetingsJoined: 23, totalDurationHours: 41, lastActive: '۴ روز پیش', status: 'active' },
    { id: 'user-9', name: 'علی سلطانی', email: 'soltani@tehran.ir', orgId: 'org-4', orgName: 'شهرداری تهران', role: 'سرپرست نظارت', meetingsJoined: 98, totalDurationHours: 215, lastActive: '۵۰ دقیقه پیش', status: 'active' },
    { id: 'user-10', name: 'فاطمه رستمی', email: 'rostami@sahab-tech.ir', orgId: 'org-2', orgName: 'شرکت ارتباطات نوین سحاب', role: 'برنامه‌نویس فرانت‌اند', meetingsJoined: 120, totalDurationHours: 250, lastActive: 'امروز، ۱۴:۰۰', status: 'active' },
    { id: 'user-11', name: 'محمدحسین کریمی', email: 'karimi@did-voice.ir', orgId: 'org-1', orgName: 'ستاد فناوری اطلاعات دید', role: 'مهندس توسعه امنیت', meetingsJoined: 15, totalDurationHours: 35, lastActive: '۱ هفته پیش', status: 'inactive' },
    { id: 'user-12', name: 'سمانه عظیمی', email: 'azimi@mporg.ir', orgId: 'org-3', orgName: 'سازمان برنامه‌ریزی و بودجه کشور', role: 'بازرس ارشد', meetingsJoined: 42, totalDurationHours: 96, lastActive: 'دیروز، ۱۰:۱۰', status: 'active' },
    { id: 'user-13', name: 'مجید رضایی', email: 'rezaei@did-voice.ir', orgId: 'org-1', orgName: 'ستاد فناوری اطلاعات دید', role: 'کارشناس توسعه', meetingsJoined: 30, totalDurationHours: 45, lastActive: '۳ ساعت پیش', status: 'active' },
    { id: 'user-14', name: 'پرستو مرادی', email: 'moradi@mporg.ir', orgId: 'org-3', orgName: 'سازمان برنامه‌ریزی و بودجه کشور', role: 'مدیر پروژه', meetingsJoined: 88, totalDurationHours: 160, lastActive: 'امروز، ۰۸:۳۰', status: 'active' },
    { id: 'user-15', name: 'سینا احمدی', email: 'ahmadi@tehran.ir', orgId: 'org-4', orgName: 'شهرداری تهران', role: 'مهندس سیستم', meetingsJoined: 12, totalDurationHours: 18, lastActive: '۲ روز پیش', status: 'inactive' }
  ]);

  const [signupRequests, setSignupRequests] = useState<SignupRequest[]>([
    { id: 'req-1', name: 'فرشاد امینی', email: 'f.amini@sahab-tech.ir', requestedOrg: 'شرکت ارتباطات نوین سحاب', role: 'برنامه‌نویس بک‌اند', phone: '۰۹۱۲۳۴۵۶۷۸۹', timestamp: 'امروز، ساعت ۱۰:۳۰' },
    { id: 'req-2', name: 'دکتر مریم صفدری', email: 'm.safdari@mporg.ir', requestedOrg: 'سازمان برنامه‌ریزی و بودجه کشور', role: 'مدیر برنامه‌ریزی', phone: '۰۹۱۹۸۷۶۵۴۳۲', timestamp: 'دیروز، ساعت ۱۶:۴۵' },
    { id: 'req-3', name: 'مهندس آرش جهانبخش', email: 'a.jahanbakhsh@tehran.ir', requestedOrg: 'ستاد مرکزی شهرداری تهران', role: 'ناظر ارتباطات شهری', phone: '۰۹۳۰۵۵۵۶۶۷۷', timestamp: '۲ روز پیش' }
  ]);

  // Expandable form toggles for cleaner individual views
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddOrgForm, setShowAddOrgForm] = useState(false);

  // Form input states
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgCode, setNewOrgCode] = useState('');
  const [newOrgDomain, setNewOrgDomain] = useState('');
  
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserOrgId, setNewUserOrgId] = useState(organizations[0]?.id || '');
  const [newUserRole, setNewUserRole] = useState('');

  // Security Policy Mock Toggles
  const [policies, setPolicies] = useState({
    enforceMfa: true,
    autoRecordVip: false,
    strictE2EE: true,
    ipLogging: true,
    streamQuality: '1080p'
  });

  // Feedback states
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserRecord | null>(null);
  const [selectedOrgDetail, setSelectedOrgDetail] = useState<Org | null>(null);

  const showFeedback = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Actions
  const handleAddOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName || !newOrgCode || !newOrgDomain) {
      showFeedback('لطفاً تمامی موارد اطلاعات سازمان جدید را وارد نمایید.', 'error');
      return;
    }

    const orgExists = organizations.some(o => o.code.toUpperCase() === newOrgCode.toUpperCase() || o.name === newOrgName);
    if (orgExists) {
      showFeedback('سازمانی با همین نام یا کد شناسه از قبل در سیستم ثبت شده است.', 'error');
      return;
    }

    const newOrg: Org = {
      id: `org-${Date.now()}`,
      name: newOrgName.trim(),
      code: newOrgCode.toUpperCase().trim(),
      domain: newOrgDomain.toLowerCase().trim(),
      userCount: 0
    };

    setOrganizations(prev => [...prev, newOrg]);
    setNewOrgName('');
    setNewOrgCode('');
    setNewOrgDomain('');
    setShowAddOrgForm(false);
    showFeedback(`سازمان "${newOrg.name}" با موفقیت ثبت و مجوزهای پرسنلی آن صادر گردید.`);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserOrgId || !newUserRole) {
      showFeedback('لطفاً کلیه اطلاعات کاربری را جهت ثبت عضویت وارد نمایید.', 'error');
      return;
    }

    const userExists = users.some(u => u.email.toLowerCase() === newUserEmail.toLowerCase());
    if (userExists) {
      showFeedback('این آدرس ایمیل از پیش در سیستم عضویت فعال دارد.', 'error');
      return;
    }

    const matchedOrg = organizations.find(o => o.id === newUserOrgId);
    if (!matchedOrg) return;

    const newUser: UserRecord = {
      id: `user-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.toLowerCase().trim(),
      orgId: newUserOrgId,
      orgName: matchedOrg.name,
      role: newUserRole.trim(),
      meetingsJoined: 0,
      totalDurationHours: 0,
      lastActive: 'تاکنون وارد نشده',
      status: 'active'
    };

    setUsers(prev => [newUser, ...prev]);
    setOrganizations(prev => prev.map(o => o.id === newUserOrgId ? { ...o, userCount: o.userCount + 1 } : o));

    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('');
    setShowAddUserForm(false);
    showFeedback(`عضویت رسمی "${newUser.name}" در ستاد مربوطه تایید و صادر گردید.`);
  };

  const handleApproveRequest = (req: SignupRequest) => {
    let matchedOrg = organizations.find(o => o.name.toLowerCase() === req.requestedOrg.toLowerCase());
    
    if (!matchedOrg) {
      const cleanCode = req.requestedOrg.replace(/\s+/g, '-').toUpperCase().slice(0, 10);
      const cleanDomain = req.email.split('@')[1] || 'system.local';
      
      const newOrg: Org = {
        id: `org-${Date.now()}`,
        name: req.requestedOrg,
        code: cleanCode,
        domain: cleanDomain,
        userCount: 1
      };
      
      setOrganizations(prev => [...prev, newOrg]);
      matchedOrg = newOrg;
    } else {
      setOrganizations(prev => prev.map(o => o.id === matchedOrg!.id ? { ...o, userCount: o.userCount + 1 } : o));
    }

    const newUser: UserRecord = {
      id: `user-${Date.now()}`,
      name: req.name,
      email: req.email,
      orgId: matchedOrg.id,
      orgName: matchedOrg.name,
      role: req.role,
      meetingsJoined: 0,
      totalDurationHours: 0,
      lastActive: 'تاکنون وارد نشده',
      status: 'active'
    };

    setUsers(prev => [newUser, ...prev]);
    setSignupRequests(prev => prev.filter(r => r.id !== req.id));
    showFeedback(`درخواست عضویت "${req.name}" مورد تایید قرار گرفته و مجوزهای امنیتی آن فعال گردید.`);
  };

  const handleRejectRequest = (reqId: string, name: string) => {
    setSignupRequests(prev => prev.filter(r => r.id !== reqId));
    showFeedback(`پرونده درخواست عضویت آقای/خانم "${name}" با موفقیت آرشیو و رد شد.`, 'info');
  };

  const handleDeleteUser = (userId: string, userName: string, orgId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setOrganizations(prev => prev.map(o => o.id === orgId ? { ...o, userCount: Math.max(0, o.userCount - 1) } : o));
    showFeedback(`حساب کاربری "${userName}" با موفقیت به حالت تعلیق دائمی درآمد.`, 'info');
    if (selectedUserDetail?.id === userId) {
      setSelectedUserDetail(null);
    }
  };

  const togglePolicy = (key: keyof typeof policies) => {
    setPolicies(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showFeedback('تنظیمات امنیتی و خط‌مشی همگام با استانداردهای پدافند غیرعامل بازنویسی شد.', 'success');
      return updated;
    });
  };

  const setQuality = (value: string) => {
    setPolicies(prev => {
      const updated = { ...prev, streamQuality: value };
      showFeedback('حداکثر پهنای باند و رزولوشن پیش‌فرض اتاق‌های همفکری به‌روزرسانی شد.', 'success');
      return updated;
    });
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-[#07080e] text-slate-100 font-sans overflow-x-hidden relative flex flex-col md:flex-row transition-all duration-300" dir="rtl">
      
      {/* Absolute Ambient Gradients for Cinematic Depth */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary-500/[0.03] blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-600/[0.02] blur-[160px] rounded-full pointer-events-none z-0" />

      {/* --- RIGHT-SIDEBAR NAVIGATION MENU (Designed from right for admin sections) --- */}
      <aside className="w-full md:w-80 shrink-0 bg-[#07080d]/95 border-l border-white/5 backdrop-blur-3xl p-6 flex flex-col justify-between z-30 transition-all relative">
        <div className="space-y-6">
          
          {/* Main Logo & Title block */}
          <div className="flex items-center gap-3 pb-5 border-b border-white/5 select-none">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 rounded-xl shadow-lg shadow-blue-500/10 text-white shrink-0">
              <ShieldCheck className="w-5.5 h-5.5" weight="fill" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-black tracking-tight text-white leading-none">مدیریت دید کنفرانس</span>
              <span className="text-[9px] font-medium text-slate-400/90 tracking-wider mt-1.5">مرکز سوئیچ‌برد امن سازمانی</span>
            </div>
          </div>

          {/* Connected Administrator Profile Badge - Premium Double-Bezel Hardness */}
          <div className="p-1.5 bg-white/[0.01] border border-white/5 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] select-none">
            <div className="p-3 bg-[#0a0b12] rounded-[calc(1rem-0.125rem)] border border-white/5 flex items-center gap-3 hover:border-white/10 transition-all duration-300">
              <div className="w-9 h-9 min-w-[36px] rounded-xl bg-gradient-to-b from-slate-900 to-[#12131b] border border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-[10.5px] font-black text-blue-400">
                م‌ا
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200">سرپرست ارشد سامانه</span>
                <span className="text-[9px] text-emerald-400/90 font-medium flex items-center gap-1.5 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  نقش: سرپرست کل هماهنگی
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links (Enterprise segmented buttons) */}
          <nav className="space-y-1">
            <div className="flex items-center justify-between uppercase tracking-wider mb-3 px-1 text-slate-500 select-none">
              <span className="text-[9px] font-bold">بخش‌های کنترلی سیستم</span>
              <span className="text-[8px] font-mono opacity-60">[ CTL_PANEL ]</span>
            </div>
            
            <button 
              onClick={() => setActiveTab('overview')}
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative overflow-hidden
                ${activeTab === 'overview' 
                  ? 'bg-gradient-to-l from-blue-500/10 to-transparent border border-blue-500/20 text-blue-400 shadow-[inset_0_1px_1px_rgba(59,130,246,0.1),0_4px_12px_rgba(0,0,0,0.5)]' 
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-100 hover:bg-white/[0.02] hover:border-white-[0.02]'
                }
              `}
            >
              {activeTab === 'overview' && (
                <div className="absolute right-0 top-1.5 bottom-1.5 w-1 rounded-l-md bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-fade-in" />
              )}
              <div className="flex items-center gap-3">
                <Desktop 
                  className={`w-5 h-5 shrink-0 transition-colors duration-200 ${activeTab === 'overview' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-350'}`} 
                  weight={activeTab === 'overview' ? 'fill' : 'regular'} 
                />
                <span className="tracking-tight text-[11.5px]">میز کار کنترلی و ترافیک</span>
              </div>
              <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md transition-all duration-200 ${
                activeTab === 'overview' 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-550/20' 
                  : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200'
              }`}>پیشخوان</span>
            </button>

            <button 
              onClick={() => { setActiveTab('users'); setSelectedUserDetail(null); }}
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative overflow-hidden
                ${activeTab === 'users' 
                  ? 'bg-gradient-to-l from-blue-500/10 to-transparent border border-blue-500/20 text-blue-400 shadow-[inset_0_1px_1px_rgba(59,130,246,0.1),0_4px_12px_rgba(0,0,0,0.5)]' 
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-100 hover:bg-white/[0.02] hover:border-white-[0.02]'
                }
              `}
            >
              {activeTab === 'users' && (
                <div className="absolute right-0 top-1.5 bottom-1.5 w-1 rounded-l-md bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-fade-in" />
              )}
              <div className="flex items-center gap-3">
                <Users 
                  className={`w-5 h-5 shrink-0 transition-colors duration-200 ${activeTab === 'users' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-350'}`} 
                  weight={activeTab === 'users' ? 'fill' : 'regular'} 
                />
                <span className="tracking-tight text-[11.5px]">مدیریت پرسنل و دسترسی‌ها</span>
              </div>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-900/80 border border-white/5 text-slate-400 group-hover:text-slate-200 transition-colors">{users.length}</span>
            </button>

            <button 
              onClick={() => { setActiveTab('orgs'); setSelectedUserDetail(null); }}
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative overflow-hidden
                ${activeTab === 'orgs' 
                  ? 'bg-gradient-to-l from-blue-500/10 to-transparent border border-blue-500/20 text-blue-400 shadow-[inset_0_1px_1px_rgba(59,130,246,0.1),0_4px_12px_rgba(0,0,0,0.5)]' 
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-100 hover:bg-white/[0.02] hover:border-white-[0.02]'
                }
              `}
            >
              {activeTab === 'orgs' && (
                <div className="absolute right-0 top-1.5 bottom-1.5 w-1 rounded-l-md bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-fade-in" />
              )}
              <div className="flex items-center gap-3">
                <Buildings 
                  className={`w-5 h-5 shrink-0 transition-colors duration-200 ${activeTab === 'orgs' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-350'}`} 
                  weight={activeTab === 'orgs' ? 'fill' : 'regular'} 
                />
                <span className="tracking-tight text-[11.5px]">مدیریت سازمان‌ها و دامنه‌ها</span>
              </div>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-900/80 border border-white/5 text-slate-400 group-hover:text-slate-200 transition-colors">{organizations.length}</span>
            </button>

            <button 
              onClick={() => { setActiveTab('requests'); setSelectedUserDetail(null); }}
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative overflow-hidden
                ${activeTab === 'requests' 
                  ? 'bg-gradient-to-l from-blue-500/10 to-transparent border border-blue-500/20 text-blue-400 shadow-[inset_0_1px_1px_rgba(59,130,246,0.1),0_4px_12px_rgba(0,0,0,0.5)]' 
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-100 hover:bg-white/[0.02] hover:border-white-[0.02]'
                }
              `}
            >
              {activeTab === 'requests' && (
                <div className="absolute right-0 top-1.5 bottom-1.5 w-1 rounded-l-md bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-fade-in" />
              )}
              <div className="flex items-center gap-3">
                <UserCheck 
                  className={`w-5 h-5 shrink-0 transition-colors duration-200 ${activeTab === 'requests' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-350'}`} 
                  weight={activeTab === 'requests' ? 'fill' : 'regular'} 
                />
                <span className="tracking-tight text-[11.5px]">صف درخواست‌های عضویت</span>
              </div>
              <div className="flex items-center gap-1.5">
                {signupRequests.length > 0 && <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]" />}
                <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                  signupRequests.length > 0 
                    ? 'bg-rose-500/10 text-rose-450 border border-rose-500/20 font-black' 
                    : 'bg-slate-900/80 border border-white/5 text-slate-400 group-hover:text-slate-200'
                }`}>{signupRequests.length}</span>
              </div>
            </button>

            <button 
              onClick={() => { setActiveTab('settings'); setSelectedUserDetail(null); }}
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative overflow-hidden
                ${activeTab === 'settings' 
                  ? 'bg-gradient-to-l from-blue-500/10 to-transparent border border-blue-500/20 text-blue-400 shadow-[inset_0_1px_1px_rgba(59,130,246,0.1),0_4px_12px_rgba(0,0,0,0.5)]' 
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-100 hover:bg-white/[0.02] hover:border-white-[0.02]'
                }
              `}
            >
              {activeTab === 'settings' && (
                <div className="absolute right-0 top-1.5 bottom-1.5 w-1 rounded-l-md bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-fade-in" />
              )}
              <div className="flex items-center gap-3">
                <Sliders 
                  className={`w-5 h-5 shrink-0 transition-colors duration-200 ${activeTab === 'settings' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-350'}`} 
                  weight={activeTab === 'settings' ? 'fill' : 'regular'} 
                />
                <span className="tracking-tight text-[11.5px]">سیاست‌های امنیت و پروتکل</span>
              </div>
              <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md transition-all duration-200 ${
                activeTab === 'settings' 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-550/20' 
                  : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200'
              }`}>امنیت</span>
            </button>
          </nav>

        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-5 border-t border-white/5 space-y-2.5 mt-8 md:mt-0">
          <button 
            onClick={() => onChangeView(AppView.HOME)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-slate-300 text-[11.5px] font-bold transition-all relative hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:scale-[0.98] cursor-pointer"
          >
            <span>بازگشت به برنامه ویدئو</span>
            <ArrowSquareOut className="w-4 h-4 text-blue-405 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-transparent hover:bg-rose-500/10 text-[#afbac4] hover:text-rose-450 border border-transparent hover:border-rose-500/10 text-[11px] font-bold transition-all cursor-pointer active:scale-[0.98]"
          >
            <SignOut className="w-4 h-4 shrink-0" />
            <span>خروج از محیط مدیریت</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN DASHBOARD CONTENT CONTAINER --- */}
      <main className="flex-1 h-screen flex flex-col z-10 overflow-hidden relative">
        
        {/* TOP STATUS BAR */}
        <header className="h-20 border-b border-white/5 px-6 lg:px-10 flex items-center justify-between bg-[#07080e]/60 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <Pulse className="w-5 h-5 text-blue-500" />
            <h1 className="text-sm font-black text-gray-200">
              {activeTab === 'overview' && 'پیشخوان ترافیکی و لاگ‌های زنده سامانه'}
              {activeTab === 'users' && 'فهرست پرسنل فعال و کلیدهای دسترسی'}
              {activeTab === 'orgs' && 'پیکربندی و تخصیص سهمیه سازمان‌های طرف قرارداد'}
              {activeTab === 'requests' && 'بررسی کتبی صلاحیت و صف درخواست‌های جدید'}
              {activeTab === 'settings' && 'تنظیمات خط‌مشی‌های دفاعی و کدگذاری ابری'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/5 text-xs text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-extrabold text-emerald-400 text-[10px]">اتصال مطلوب پایگاه داده</span>
            </div>

            <span className="text-[10px] text-slate-500 hidden lg:inline">زمان هماهنگ جهانی: ۱۴:۱۶:۴۶</span>
          </div>
        </header>

        {/* FEEDBACK CONTAINER */}
        {feedback && (
          <div className="mx-6 lg:mx-10 mt-6">
            <div className={`p-4 rounded-2xl border flex items-center gap-3.5 shadow-xl animate-enter transition-all duration-300 ${
              feedback.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                : feedback.type === 'error'
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
            }`}>
              {feedback.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" weight="fill" /> : <WarningCircle className="w-5 h-5 text-rose-400 shrink-0" weight="fill" />}
              <span className="text-xs font-black tracking-wide leading-relaxed">{feedback.message}</span>
            </div>
          </div>
        )}

        {/* DYNAMIC SCROLLABLE BODY */}
        <section className="flex-1 p-6 lg:p-10 overflow-y-auto flex flex-col">
          
          {/* ==================== VIEW 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                
                {/* Metric 1 */}
                <motion.div variants={itemVariants} className="bg-[#0f101b] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black tracking-wide text-slate-400">دژهای سازمانی</span>
                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Buildings className="w-5 h-5" weight="fill" />
                    </div>
                  </div>
                  <div className="text-3xl font-black font-mono tracking-tight text-white mb-1">
                    {organizations.length}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block">سازمان مستقل و پورتال اختصاصی</span>
                </motion.div>

                {/* Metric 2 */}
                <motion.div variants={itemVariants} className="bg-[#0f101b] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black tracking-wide text-slate-400">کل پرسنل متصل</span>
                    <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" weight="fill" />
                    </div>
                  </div>
                  <div className="text-3xl font-black font-mono tracking-tight text-white mb-1">
                    {users.length}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block">پروفایل پرسنلی رمزنگاری شده</span>
                </motion.div>

                {/* Metric 3 */}
                <motion.div variants={itemVariants} className="bg-[#0f101b] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black tracking-wide text-slate-400">ساعات مکالمه امن</span>
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5" weight="fill" />
                    </div>
                  </div>
                  <div className="text-3xl font-black tracking-tight text-emerald-400 mb-1" dir="rtl">
                    {users.reduce((acc, curr) => acc + curr.totalDurationHours, 0)} ساعت
                  </div>
                  <span className="text-[10px] text-slate-405 font-bold block">جلسات هماهنگ پلتفرم</span>
                </motion.div>

                {/* Metric 4 */}
                <motion.div variants={itemVariants} className="bg-[#0f101b] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black tracking-wide text-slate-400">صف تایید هویت</span>
                    <div className="p-2.5 bg-rose-500/10 text-rose-455 rounded-xl group-hover:scale-110 transition-transform relative">
                      <UserPlus className="w-5 h-5" weight="fill" />
                    </div>
                  </div>
                  <div className="text-3xl font-black font-mono tracking-tight text-white mb-1">
                    {signupRequests.length}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block">پرونده منتظر استعلام هویت</span>
                </motion.div>

              </div>

              {/* Advanced Realtime Server Graph & Traffic Monitor */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Traffic Graph Card */}
                <motion.div variants={itemVariants} className="bg-[#0c0d15]/60 border border-white/5 p-6 rounded-3xl lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-gray-200">نمودار زنده تبادل داده ویدئویی</h3>
                      <p className="text-[10px] text-slate-400">پهنای باند مصرفی هم‌زمان سرتاسری و تأخیر بسته‌ها در ثانیه</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        اتصال ستاد مرکزی تهران
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        درگاه انتقال صدا (VoIP)
                      </span>
                    </div>
                  </div>

                  {/* Beautiful canvas/SVG chart design */}
                  <div 
                    className="h-56 w-full bg-[#07080d] rounded-2xl relative overflow-hidden flex items-end p-4 border border-white/5 cursor-crosshair group/chart select-none"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const width = rect.width;
                      const relativeX = (x / width) * 800;

                      let closest = chartPoints[0];
                      let minDiff = Math.abs(chartPoints[0].x - relativeX);
                      for (let i = 1; i < chartPoints.length; i++) {
                        const diff = Math.abs(chartPoints[i].x - relativeX);
                        if (diff < minDiff) {
                          minDiff = diff;
                          closest = chartPoints[i];
                        }
                      }
                      setHoveredPoint(closest);
                    }}
                    onMouseLeave={() => setHoveredPoint(null)}
                    onTouchMove={(e) => {
                      if (e.touches[0]) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.touches[0].clientX - rect.left;
                        const width = rect.width;
                        const relativeX = (x / width) * 800;

                        let closest = chartPoints[0];
                        let minDiff = Math.abs(chartPoints[0].x - relativeX);
                        for (let i = 1; i < chartPoints.length; i++) {
                          const diff = Math.abs(chartPoints[i].x - relativeX);
                          if (diff < minDiff) {
                            minDiff = diff;
                            closest = chartPoints[i];
                          }
                        }
                        setHoveredPoint(closest);
                      }
                    }}
                    onTouchEnd={() => setHoveredPoint(null)}
                  >
                    {/* Sine wave visual grid lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 224" preserveAspectRatio="none">
                      <line x1="0" y1="56" x2="800" y2="56" stroke="#fff" strokeWidth="0.5" strokeDasharray="4 4" />
                      <line x1="0" y1="112" x2="800" y2="112" stroke="#fff" strokeWidth="0.5" strokeDasharray="4 4" />
                      <line x1="0" y1="168" x2="800" y2="168" stroke="#fff" strokeWidth="0.5" strokeDasharray="4 4" />
                    </svg>

                    {/* SVG Flowing Path line representing network load */}
                    <svg className="absolute inset-0 w-full h-full text-blue-500/10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 224" preserveAspectRatio="none">
                      <path d="M 0 150 C 100 110, 150 70, 200 120 C 250 170, 300 180, 350 140 C 400 100, 450 40, 500 80 C 550 120, 600 160, 650 130 C 700 100, 750 60, 800 90 L 800 224 L 0 224 Z" fill="currentColor" />
                    </svg>
                    <svg className="absolute inset-0 w-full h-full text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 224" preserveAspectRatio="none">
                      <path d="M 0 150 C 100 110, 150 70, 200 120 C 250 170, 300 180, 350 140 C 400 100, 450 40, 500 80 C 550 120, 600 160, 650 130 C 700 100, 750 60, 800 90" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    </svg>

                    {/* SVG 2 representing secondary jitter */}
                    <svg className="absolute inset-0 w-full h-full text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 224" preserveAspectRatio="none">
                      <path d="M 0 100 C 100 160, 150 150, 200 90 C 250 30, 300 40, 350 100 C 400 160, 450 170, 500 110 C 550 50, 600 60, 650 120 C 700 180, 750 160, 800 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>

                    {/* Dynamic Interactive Overlays inside SVG scale */}
                    {hoveredPoint && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 224" preserveAspectRatio="none">
                        {/* Vertical target vertical bar */}
                        <line x1={hoveredPoint.x} y1="0" x2={hoveredPoint.x} y2="224" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3"/>
                        {/* Blue pulse point */}
                        <circle cx={hoveredPoint.x} cy={hoveredPoint.hqY} r="7" fill="#60a5fa" stroke="#07080d" strokeWidth="2" />
                        <circle cx={hoveredPoint.x} cy={hoveredPoint.hqY} r="12" fill="none" stroke="#60a5fa" strokeWidth="1" className="opacity-40" />
                        {/* Green pulse point */}
                        <circle cx={hoveredPoint.x} cy={hoveredPoint.voipY} r="5" fill="#34d399" stroke="#07080d" strokeWidth="1.5" />
                      </svg>
                    )}

                    <div className="absolute top-3 left-4 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded text-[9px] border border-white/5 text-slate-300">
                      حداکثر سقف پهنای باند مجاز: ۱۰ گیگابیت بر ثانیه
                    </div>

                    {/* Absolute dynamic glassmorphic tooltip */}
                    {hoveredPoint && (
                      <div 
                        className="absolute bg-[#0b0c13]/95 backdrop-blur-md rounded-xl border border-white/10 p-3 space-y-1.5 text-[10px] shadow-2xl pointer-events-none z-20 transition-all duration-75 ltr"
                        style={{
                          left: `${(hoveredPoint.x / 800) * 100}%`,
                          top: '12px',
                          transform: hoveredPoint.x > 500 ? 'translateX(-105%)' : hoveredPoint.x < 300 ? 'translateX(5%)' : 'translateX(-50%)'
                        }}
                      >
                        <div className="font-bold text-gray-300 border-b border-white/5 pb-1 flex items-center justify-between gap-4">
                          <span className="rtl text-[10px] text-slate-400">گزارش زنده:</span>
                          <span className="font-mono text-teal-400 font-bold">{hoveredPoint.time}</span>
                        </div>
                        <div className="space-y-1 min-w-[170px] rtl text-right">
                          <div className="flex items-center justify-between text-slate-300 gap-2">
                            <span className="flex items-center gap-1.5 text-slate-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                              درگاه انتقال صدا (VoIP):
                            </span>
                            <span className="font-bold text-slate-100 font-mono tracking-wide">{hoveredPoint.voipValue}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300 gap-3">
                            <span className="flex items-center gap-1.5 text-slate-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              اتصال ستاد مرکزی تهران:
                            </span>
                            <span className="font-bold text-slate-100 font-mono tracking-wide">{hoveredPoint.hqValue}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Latency distribution bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    <div className="p-3 bg-white/[0.015] rounded-xl border border-white/5 flex flex-col">
                      <span className="text-[10px] text-slate-400">ستاد مرکزی (تهران)</span>
                      <span className="text-xs font-bold text-emerald-400 mt-1">۴.۲ میلی‌ثانیه / ۹۹٪ امن</span>
                    </div>
                    <div className="p-3 bg-white/[0.015] rounded-xl border border-white/5 flex flex-col">
                      <span className="text-[10px] text-slate-400">پورتال تبریز</span>
                      <span className="text-xs font-bold text-emerald-400 mt-1">۷.۹ میلی‌ثانیه / ۹۸٪ تایید</span>
                    </div>
                    <div className="p-3 bg-white/[0.015] rounded-xl border border-white/5 flex flex-col">
                      <span className="text-[10px] text-slate-400">درگاه اصفهان</span>
                      <span className="text-xs font-bold text-emerald-400 mt-1">۶.۵ میلی‌ثانیه / ۹۹٪ تایید</span>
                    </div>
                    <div className="p-3 bg-white/[0.015] rounded-xl border border-white/5 flex flex-col">
                      <span className="text-[10px] text-slate-400">شعبه مشهد</span>
                      <span className="text-xs font-bold text-amber-400 mt-1">۱۱.۲  میلی‌ثانیه / ۹۶٪ هشدار</span>
                    </div>
                  </div>
                </motion.div>

                {/* Audit Security Log Feed */}
                <motion.div variants={itemVariants} className="bg-[#0c0d15]/60 border border-white/5 p-6 rounded-3xl space-y-4 flex flex-col justify-between relative">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-gray-200">وقایع امنیتی زنده سامانه</h3>
                    <p className="text-[10px] text-slate-400">رویدادها و دسترسی‌های اخیر مدیر فرکانس</p>
                  </div>

                  <div className="flex-1 space-y-2 text-[10px] text-slate-400 max-h-72 overflow-y-auto pr-1">
                    {securityEvents.map((event) => {
                      return (
                        <div 
                          key={event.id}
                          className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group"
                          onClick={() => setSelectedEvent(event)}
                          title="کلیک جهت مشاهده گزارش جزئیات امنیتی"
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <span className="relative flex h-2 w-2 shrink-0">
                              {event.pulseColor === 'emerald' && (
                                <>
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </>
                              )}
                              {event.pulseColor === 'blue' && (
                                <>
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </>
                              )}
                              {event.pulseColor === 'amber' && (
                                <>
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </>
                              )}
                            </span>
                            <span className="font-mono text-slate-300 font-bold tracking-tight bg-slate-900/80 px-1.5 py-0.5 rounded border border-white/5 shrink-0">{event.time}</span>
                            
                            <div className="flex-1 text-right text-slate-300 leading-relaxed font-medium truncate">
                              <span className={`${
                                event.pulseColor === 'emerald' ? 'text-emerald-400' : event.pulseColor === 'blue' ? 'text-blue-400' : 'text-amber-400'
                              } font-bold ml-1 shrink-0`}>{event.type}:</span>
                              {event.id === 'evt-2' ? (
                                <span className="text-slate-300">
                                  بازبینی اعتبار گواهی امنیتی دو مرحله‌ای برای <span className="font-mono text-[9.5px] text-blue-400/90 hover:underline">farrokhi@did-voice.ir</span>
                                </span>
                              ) : event.id === 'evt-5' ? (
                                <span className="text-slate-300">
                                  تلاش اتصال ناشناس از آدرس آی‌پی خارجی <span className="font-mono text-amber-300/90">۱۸۵.۱۱۲.۴۲.۱</span> مسدود گردید.
                                </span>
                              ) : (
                                <span className="text-slate-300">{event.content.replace(`${event.type}: `, '').replace(`${event.type}:`, '')}</span>
                              )}
                            </div>
                          </div>
                          
                          <span className="text-[9px] text-blue-400/80 group-hover:text-blue-400 font-bold bg-blue-500/5 group-hover:bg-blue-500/15 px-2.5 py-1 rounded-xl border border-blue-500/10 shrink-0 transition-all">
                            مشاهده گزارش
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[9px] text-slate-500 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 animate-pulse text-blue-500" />
                    <span>آدرس IP ادمین ارشد ثبت و لاگ گردیده است. جهت بررسی جزییات، روی هر گزارش کلیک نمایید.</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}



          {/* ==================== VIEW 2: STAFF & USERS ==================== */}
          {activeTab === 'users' && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col flex-1 space-y-6">
              <UsersView
                users={users}
                organizations={organizations}
                handleAddUser={handleAddUser}
                handleDeleteUser={handleDeleteUser}
                setSelectedUserDetail={setSelectedUserDetail}
                filteredUsers={filteredUsers}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showAddUserForm={showAddUserForm}
                setShowAddUserForm={setShowAddUserForm}
              />
            </motion.div>
          )}

          {/* ==================== VIEW 3: ORGANIZATIONS ==================== */}
          {activeTab === 'orgs' && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div className="space-y-1 self-start">
                  <h3 className="text-lg font-black text-gray-100">نهادها و سازمان‌های یکپارچه</h3>
                  <p className="text-xs text-slate-400">تخصیص دامنه‌های اینترانت، مدیریت ایمیل‌ها و سهمیه‌بندی اتاق‌های VIP</p>
                </div>

                <button 
                  onClick={() => setShowAddOrgForm(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-black transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-emerald-500/10"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت نهاد جدید</span>
                </button>
              </motion.div>



              {/* Grid of registered organizations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {organizations.map((org) => (
                  <motion.div 
                    key={org.id} 
                    variants={itemVariants}
                    onClick={() => setSelectedOrgDetail(org)}
                    className="bg-[#0c0d15]/50 border border-white/5 rounded-3xl p-6 hover:border-blue-500/30 hover:bg-[#111221]/40 transition-all duration-300 relative group cursor-pointer active:scale-[0.99] shadow-lg hover:shadow-blue-500/[0.03]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 to-[#12141F] text-blue-400 border border-white/5 flex items-center justify-center shadow-lg group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                          <Buildings className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-gray-200 group-hover:text-blue-400 transition-colors">{org.name}</h4>
                          <span className="text-[10px] text-blue-410 font-extrabold font-mono mt-0.5 block">کد دسترسی: {org.code}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-slate-300">
                          {org.userCount} کاربر فعال
                        </span>
                        <span className="text-[9px] text-slate-500 group-hover:text-blue-400 transition-colors font-bold uppercase tracking-wider">مشاهده پرونده ↗</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-450">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span>دامنه مجاز ایمیل پرسنل:</span>
                      </div>
                      <span className="font-mono font-black text-gray-200">@{org.domain}</span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="text-slate-450">موقعیت استقرار ترافیک:</span>
                      <span className="font-extrabold text-amber-500">منطقه‌ای (سطح سازمانی ویژه)</span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="text-slate-450">رمزنگاری داده‌ها:</span>
                      <span className="font-extrabold text-blue-400 text-[10px]">تونل مبادله کلید امن (ECDH)</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-300 text-xs font-bold leading-relaxed flex items-center gap-2.5">
                <Info className="w-5 h-5 shrink-0 text-blue-400" />
                <span>سازمان‌های سازگار با پلتفرم دید از طریق مجراهای چندگانه رمزنگاری با سرورهای مرکزی برقرار ارتباط می‌کنند.</span>
              </motion.div>
            </motion.div>
          )}

          {/* ==================== VIEW 4: SIGNUP REQUESTS ==================== */}
          {activeTab === 'requests' && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants} className="border-b border-white/5 pb-5">
                <h3 className="text-lg font-black text-gray-100">بررسی صف فیلترینگ و استعلام صلاحیت</h3>
                <p className="text-xs text-slate-400">تایید یا رد همگام‌سازی کلاینت، بررسی کدهای دسترسی و جلوگیری از نفوذ مخرب</p>
              </motion.div>

              <RequestsView
                signupRequests={signupRequests}
                handleApproveRequest={handleApproveRequest}
                handleRejectRequest={handleRejectRequest}
              />
            </motion.div>
          )}

          {/* ==================== VIEW 5: SECURITY POLICIES ==================== */}
          {activeTab === 'settings' && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <SettingsView 
                policies={policies}
                togglePolicy={togglePolicy}
                setQuality={setQuality}
              />
            </motion.div>
          )}

        </section>

      </main>

      {/* ==================== SECURITY EVENT DETAIL POPUP MODAL ==================== */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" onClick={() => setSelectedEvent(null)}>
          <div 
            className="bg-[#0b0c15] rounded-[2rem] border border-white/10 border-t-2 border-t-blue-550 max-w-xl w-full p-8 shadow-2xl relative select-none rtl text-right flex flex-col space-y-5 overflow-hidden max-h-[92vh] animate-scale-in shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(59,130,246,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Custom local style injection for elegant custom thin scrollbars in all Webkit browsers */}
            <style>{`
              .modal-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .modal-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .modal-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.15);
                border-radius: 9991px;
              }
              .modal-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(33, 150, 243, 0.4);
              }
            `}</style>
            
            {/* Header Block */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    selectedEvent.pulseColor === 'emerald' ? 'bg-emerald-400' : selectedEvent.pulseColor === 'blue' ? 'bg-blue-400' : 'bg-amber-400'
                  }`}></span>
                  <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${
                    selectedEvent.pulseColor === 'emerald' ? 'bg-emerald-500' : selectedEvent.pulseColor === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
                  }`}></span>
                </span>
                <div>
                  <h4 className="text-sm font-black text-slate-100 flex items-center gap-2">
                    <span>جزییات رویداد امنیتی سامانه (رصد فرکانس)</span>
                    <span className="text-[9px] text-blue-400/90 font-mono tracking-wider bg-slate-900 border border-white/5 px-2.5 py-0.5 rounded-full select-all">{selectedEvent.details.auditLogId}</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">زمان ثبت سیستمی: <span className="font-mono text-slate-200">{selectedEvent.time}</span> • طبقه‌بندی: <span className="text-slate-200">{selectedEvent.type}</span></p>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200 active:scale-90 cursor-pointer shrink-0"
                title="بستن"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Event Core Statement */}
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-1.5">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">موضوع اصلی گزارش</div>
              <div className="text-xs font-bold text-slate-200 leading-relaxed font-sans">
                {selectedEvent.content}
              </div>
            </div>

            {/* Detailed Technical Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedEvent.details.ipAddress && (
                <div className="bg-[#12131e]/50 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[8px] text-slate-500 tracking-wider font-mono">IP ADDRESS / آدرس مبدا</span>
                  <span className="text-slate-200 font-bold font-mono text-xs mt-1.5 select-all">{selectedEvent.details.ipAddress}</span>
                </div>
              )}
              {selectedEvent.details.nodeId && (
                <div className="bg-[#12131e]/50 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[8px] text-slate-500 tracking-wider font-mono">NODE IDENTIFIER / شناسه گره</span>
                  <span className="text-slate-200 font-bold font-mono text-xs mt-1.5 truncate" title={selectedEvent.details.nodeId}>{selectedEvent.details.nodeId}</span>
                </div>
              )}
              {selectedEvent.details.protocol && (
                <div className="sm:col-span-2 bg-[#12131e]/50 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[8px] text-slate-500 tracking-wider font-mono">CRYPTOGRAPHIC PROTOCOL / پروتکل تبادل امن</span>
                  <span className="text-teal-400 font-bold font-mono text-xs mt-1.5 select-all">{selectedEvent.details.protocol}</span>
                </div>
              )}
              <div className="sm:col-span-2 bg-[#12131e]/50 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                <span className="text-[8px] text-slate-500 tracking-wider font-mono">SEVERITY / سطح حساسیت سامانه</span>
                <span className={`text-xs font-bold mt-1.5 ${
                  selectedEvent.pulseColor === 'emerald' ? 'text-emerald-400' : selectedEvent.pulseColor === 'blue' ? 'text-blue-400' : 'text-amber-400'
                }`}>{selectedEvent.details.severity}</span>
              </div>
            </div>

            {/* Structured Sections */}
            <div className="space-y-3">
              <div className="bg-emerald-500/5 p-3.5 rounded-xl border border-emerald-500/10">
                <div className="text-emerald-400 font-bold text-[10px] mb-1">اقدام نظارتی و تدافعی سیستم:</div>
                <p className="text-[10px] text-emerald-100/90 leading-relaxed font-sans font-medium text-justify">
                  {selectedEvent.details.actionTaken}
                </p>
              </div>

              <div className="bg-blue-500/5 p-3.5 rounded-xl border border-blue-500/10">
                <div className="text-blue-400 font-bold text-[10px] mb-1">شرح مستندات تکمیلی:</div>
                <p className="text-[10px] text-slate-300 leading-relaxed font-sans font-medium text-justify">
                  {selectedEvent.details.longDescription}
                </p>
              </div>

              {selectedEvent.details.integrityHash && (
                <div className="bg-slate-950 p-3 rounded-xl border border-white/5 font-mono text-left select-all">
                  <div className="text-slate-500 text-[8px] uppercase tracking-wider mb-1 font-bold">INTEGRITY DIGITAL SIGNATURE</div>
                  <div className="text-teal-500/90 text-[9px] break-all tracking-tight leading-relaxed select-all">
                    {selectedEvent.details.integrityHash}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-white/5 pt-4 text-center">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black tracking-wide active:scale-95 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
              >
                تایید و بازگشت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== USER DETAIL POPUP MODAL ==================== */}
      {selectedUserDetail && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-lg animate-fade-in" 
          onClick={() => setSelectedUserDetail(null)}
        >
          <div 
            className="bg-[#0b0c15] rounded-[2.5rem] border border-white/10 border-t-4 border-t-blue-500 max-w-2xl w-full p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.05)] relative select-none rtl text-right flex flex-col space-y-8 overflow-hidden max-h-[92vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Block */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-xl shadow-inner shrink-0">
                  {selectedUserDetail.name.charAt(0)}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-black text-slate-105 flex items-center gap-2.5">
                    <span>{selectedUserDetail.name}</span>
                    <span className="text-[10px] text-blue-450 font-mono tracking-wider bg-slate-900 border border-white/5 px-2.5 py-0.5 rounded-full select-all">
                      {selectedUserDetail.id}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    پست الکترونیک: <span className="font-mono text-slate-205 select-all">{selectedUserDetail.email}</span>
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedUserDetail(null)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200 active:scale-90 cursor-pointer shrink-0"
                title="بستن"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Personnel Specifications / Meta information */}
            <div className="bg-[#12131e]/30 p-6 rounded-[2rem] border border-white/5 space-y-4">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">سازمان تابعه و رول سازمانی</div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 block">عنوان نهاد حاکمیتی</span>
                  <span className="text-sm font-bold text-gray-200 leading-relaxed block">{selectedUserDetail.orgName}</span>
                </div>
                <div className="space-y-1.5 border-r border-white/5 pr-6">
                  <span className="text-[10px] text-slate-400 block">سمت رسمی پرسنل</span>
                  <span className="text-sm font-bold text-blue-400 leading-relaxed block">{selectedUserDetail.role}</span>
                </div>
              </div>
            </div>

            {/* Detailed Analytics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#12131e]/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between font-sans min-h-[96px]">
                <span className="text-[10px] text-slate-500 tracking-wider font-bold">نشست‌های متصل</span>
                <span className="text-slate-100 font-black text-lg mt-2">{selectedUserDetail.meetingsJoined} جلسه</span>
              </div>
              <div className="bg-[#12131e]/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between font-sans min-h-[96px]">
                <span className="text-[10px] text-slate-500 tracking-wider font-bold">مجموع مدت حضور</span>
                <span className="text-slate-100 font-black text-lg mt-2 font-mono">{selectedUserDetail.totalDurationHours} ساعت</span>
              </div>
              <div className="bg-[#12131e]/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between font-sans min-h-[96px]">
                <span className="text-[10px] text-slate-500 tracking-wider font-bold">آخرین فعالیت فعال</span>
                <span className="text-slate-100 font-bold text-xs mt-3 select-all">{selectedUserDetail.lastActive}</span>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="border-t border-white/5 pt-6 flex justify-end gap-3.5">
              <button 
                type="button" 
                onClick={() => setSelectedUserDetail(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-black active:scale-95 transition-all cursor-pointer"
              >
                بستن پنجره جزئیات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ORGANIZATION DETAIL POPUP MODAL ==================== */}
      {selectedOrgDetail && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-lg animate-fade-in" 
          onClick={() => setSelectedOrgDetail(null)}
        >
          <div 
            className="bg-[#0b0c15] rounded-[3rem] border border-white/10 border-t-2 border-t-blue-500 max-w-xl w-full p-8 shadow-2xl relative select-none rtl text-right flex flex-col space-y-6 overflow-hidden max-h-[92vh] animate-scale-in shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(59,130,246,0.15)] modal-scrollbar overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Block */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-xl shadow-inner shrink-0">
                  <Buildings className="w-7 h-7" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-base font-black text-slate-100 flex items-center gap-2.5 flex-wrap">
                    <span>{selectedOrgDetail.name}</span>
                    <span className="text-[10px] text-blue-400 font-mono tracking-wider bg-slate-900 border border-white/5 px-2.5 py-0.5 rounded-full select-all">
                      {selectedOrgDetail.code}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    دامنه مجاز پسوند ایمیل رسمی: <span className="font-mono text-blue-400 select-all font-bold">@{selectedOrgDetail.domain}</span>
                  </p>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={() => setSelectedOrgDetail(null)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200 active:scale-90 cursor-pointer shrink-0"
                title="بستن"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Technical Configuration Overview */}
            <div className="bg-[#12131e]/30 p-6 rounded-[2rem] border border-white/5 space-y-4">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">سیاست‌های دسترسی و تخصیص سهمیه رسانه</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block">مجرا و سرور استقرار</span>
                  <span className="text-xs font-black text-white leading-relaxed block">ابر توزیع‌شده ملی (دید-آی‌تی‌سی)</span>
                </div>
                <div className="space-y-1 border-r border-white/5 pr-4">
                  <span className="text-[10px] text-slate-400 block">سطح امنیت کانال‌های صوتی</span>
                  <span className="text-xs font-black text-blue-400 leading-relaxed block">دفاع فدرال چندلایه (E2EE)</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block">رمزگذاری ضبط جلسات حساس</span>
                  <span className="text-xs font-black text-emerald-400 leading-relaxed block">الگوریتم رمزنگاری AES-256-Bit</span>
                </div>
                <div className="space-y-1 border-r border-white/5 pr-4">
                  <span className="text-[10px] text-slate-400 block">حداکثر ظرفیت همزمان</span>
                  <span className="text-xs font-black text-amber-500 leading-relaxed block">۱,۰۰۰ کلاینت در هر وب‌نشست</span>
                </div>
              </div>
            </div>

            {/* Detailed Analytics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#12131e]/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between font-sans min-h-[96px]">
                <span className="text-[10px] text-slate-500 tracking-wider font-bold">تعداد کاربران فعال</span>
                <span className="text-slate-100 font-black text-lg mt-2">{selectedOrgDetail.userCount} نفر</span>
              </div>
              <div className="bg-[#12131e]/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between font-sans min-h-[96px]">
                <span className="text-[10px] text-slate-500 tracking-wider font-bold">سهمیه ذخیره ابری</span>
                <span className="text-slate-100 font-black text-sm mt-3 font-mono">۱۰ ترابایت ویژه</span>
              </div>
              <div className="bg-[#12131e]/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between font-sans min-h-[96px]">
                <span className="text-[10px] text-slate-500 tracking-wider font-bold">اتصالات یکپارچه</span>
                <span className="text-emerald-400 font-bold text-xs mt-3 select-all">۱۰۰٪ فعال و پایدار</span>
              </div>
            </div>

            {/* Security Audit Trail Notice */}
            <div className="bg-[#0e1017] p-5 rounded-2xl border border-white/5 text-right space-y-2">
              <div className="flex items-center gap-2 text-blue-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-black uppercase">اطلاعیه حفاظتی و استانداردهای ارتباطی پلتفرم دید</span>
              </div>
              <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans font-medium text-justify">
                این پرونده متعلق به <span className="text-slate-200 font-bold">{selectedOrgDetail.name}</span> می‌باشد. تمامی وب‌نشست‌ها، ترافیک صوتی و تصویری ورودی و خروجی از دامنه‌ی مجاز <span className="font-mono text-teal-400 font-bold font-black">@{selectedOrgDetail.domain}</span> تحت بسترهای رمزنگاری‌شده فدرال و مطابق به آیین‌نامه‌های پدافند غیرعامل تبادل می‌گردند.
              </p>
            </div>

            {/* Modal Actions Footer */}
            <div className="border-t border-white/5 pt-6 flex justify-end gap-3.5">
              <button 
                type="button" 
                onClick={() => setSelectedOrgDetail(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-black active:scale-95 transition-all cursor-pointer"
              >
                بستن پنجره جزئیات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== CREATE USER POPUP MODAL ==================== */}
      {showAddUserForm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-lg animate-fade-in"
          onClick={() => {
            setShowAddUserForm(false);
            setNewUserName('');
            setNewUserRole('');
            setNewUserEmail('');
          }}
        >
          <div 
            className="bg-[#0b0c15] rounded-[2.5rem] border border-white/10 border-t-4 border-t-blue-500 max-w-2xl w-full p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.05)] relative select-none rtl text-right flex flex-col space-y-8 overflow-hidden max-h-[92vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Block Description */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-xl shadow-inner shrink-0">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 text-right align-right">
                  <h4 className="text-base font-black text-slate-100">ثبت‌نام مستقیم و تایید هویت پرسنل</h4>
                  <p className="text-xs text-slate-400 font-medium text-right">
                    ورود به پایگاه داده امن دید و تخصیص سطوح دسترسی
                  </p>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={() => {
                  setShowAddUserForm(false);
                  setNewUserName('');
                  setNewUserRole('');
                  setNewUserEmail('');
                }}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200 active:scale-90 cursor-pointer shrink-0"
                title="بستن"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="flex flex-col space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-6">
                <div className="space-y-2.5 text-right align-right">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">نام و نام خانوادگی کارمند</label>
                  <input 
                    type="text" 
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="مهندس علیرضا نیک‌زاد"
                    className="w-full bg-[#07080e]/95 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600 focus:border-blue-500 transition-all font-sans"
                    required
                  />
                </div>

                <div className="space-y-2.5 text-right align-right">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">انتخاب سازمان مبدا</label>
                  <select 
                    value={newUserOrgId}
                    onChange={(e) => setNewUserOrgId(e.target.value)}
                    className="w-full bg-[#07080e]/95 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="" className="bg-slate-900 text-slate-400">لطفا انتخاب کنید...</option>
                    {organizations.map(org => (
                      <option key={org.id} value={org.id} className="bg-slate-900 text-white">
                        {org.name} ({org.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2.5 text-right align-right">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">سمت رسمی و رول سازمانی</label>
                  <input 
                    type="text" 
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    placeholder="سرپرست امنیت اطلاعات"
                    className="w-full bg-[#07080e]/95 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600 focus:border-blue-500 transition-all font-sans"
                    required
                  />
                </div>

                <div className="space-y-2.5 text-right align-right">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">پست الکترونیک رسمی</label>
                  <input 
                    type="email" 
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="alireza@did-voice.ir"
                    className="w-full bg-[#07080e]/95 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600 font-mono text-left focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Notice / Policy guideline */}
              <div className="bg-[#12131e]/50 p-5 rounded-2xl border border-white/5 text-right">
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-medium text-justify">
                  * پس از ثبت مشخصات کاربر جدید در دایرکتوری دید، یک کلید عمومی منحصربه‌فرد با استاندارد رمزنگاری <span className="font-mono text-xs text-teal-400">ECDSA-SHA384</span> به صورت خودکار تخصیص یافته و پروانه امضای دیجیتال کاربر فعال خواهد شد.
                </p>
              </div>

              {/* Actions Footer */}
              <div className="border-t border-white/5 pt-6 flex justify-end gap-3.5">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAddUserForm(false);
                    setNewUserName('');
                    setNewUserRole('');
                    setNewUserEmail('');
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black active:scale-95 transition-all cursor-pointer"
                >
                  انصراف و لغو پرونده
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all cursor-pointer shadow-lg shadow-blue-500/10 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>پیوست و ارتقاء دسترسی</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== CREATE ORGANIZATION POPUP MODAL ==================== */}
      {showAddOrgForm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-lg animate-fade-in"
          onClick={() => {
            setShowAddOrgForm(false);
            setNewOrgName('');
            setNewOrgCode('');
            setNewOrgDomain('');
          }}
        >
          <div 
            className="bg-[#0b0c15] rounded-[2.5rem] border border-white/10 border-t-4 border-t-emerald-500 max-w-2xl w-full p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.05)] relative select-none rtl text-right flex flex-col space-y-8 overflow-hidden max-h-[92vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Block Description */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-xl shadow-inner shrink-0">
                  <Buildings className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 text-right align-right">
                  <h4 className="text-base font-black text-slate-100 font-sans">ایجاد پرونده و شناسه سازمانی مستقل جدید</h4>
                  <p className="text-xs text-slate-400 font-medium text-right font-sans">
                    همگام‌سازی ترافیک انتساب دامنه‌ها، دایرکتوری ایمیل و احراز اصالت WebRTC
                  </p>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={() => {
                  setShowAddOrgForm(false);
                  setNewOrgName('');
                  setNewOrgCode('');
                  setNewOrgDomain('');
                }}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200 active:scale-90 cursor-pointer shrink-0"
                title="بستن"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddOrganization} className="flex flex-col space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-6">
                <div className="space-y-2.5 sm:col-span-2 text-right align-right">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block font-sans">نام کامل سازمان / وزارتخانه</label>
                  <input 
                    type="text" 
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    placeholder="سازمان فضایی ایران یا وزارت ارتباطات"
                    className="w-full bg-[#07080e]/95 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-600 focus:border-emerald-500 transition-all font-sans"
                    required
                  />
                </div>

                <div className="space-y-2.5 text-right align-right">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block font-sans">شناسه اختصاری سازمان (یکتا)</label>
                  <input 
                    type="text" 
                    value={newOrgCode}
                    onChange={(e) => setNewOrgCode(e.target.value)}
                    placeholder="ISA-GOV"
                    className="w-full bg-[#07080e]/95 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-600 font-mono uppercase text-left focus:border-emerald-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2.5 text-right align-right">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block font-sans">دامنه اینترنتی مجاز ایمیل (Domain)</label>
                  <input 
                    type="text" 
                    value={newOrgDomain}
                    onChange={(e) => setNewOrgDomain(e.target.value)}
                    placeholder="isa.ir"
                    className="w-full bg-[#07080e]/95 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-600 font-mono text-left focus:border-emerald-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Notice / Policy guideline */}
              <div className="bg-[#12131e]/50 p-5 rounded-2xl border border-white/5 text-right">
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-medium text-justify">
                  * پس از تایید هویت دامنه فعال‌سازی، پروتکل‌های رمزنگاری لایه انتقال صوتی-تصویری سازمان در گیت‌وی دید ثبت مستمر شده و دامنه‌های فرعی متناظر با اولویت امنیتی تفکیک می‌شوند.
                </p>
              </div>

              {/* Actions Footer */}
              <div className="border-t border-white/5 pt-6 flex justify-end gap-3.5">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAddOrgForm(false);
                    setNewOrgName('');
                    setNewOrgCode('');
                    setNewOrgDomain('');
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black active:scale-95 transition-all cursor-pointer"
                >
                  انصراف و لغو پرونده
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت رسمی لایسنس سازمان</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
