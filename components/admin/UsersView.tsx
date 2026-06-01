import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlass, 
  UserPlus, 
  FileText, 
  XCircle, 
  ShieldCheck, 
  CheckCircle, 
  Lock 
} from '@phosphor-icons/react';

// Interfaces matching those in AdminPanel
export interface Org {
  id: string;
  name: string;
  code: string;
  domain: string;
  userCount: number;
}

export interface UserRecord {
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

const itemVariants = {
  hidden: { y: 16, opacity: 0, filter: 'blur(4px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.8 }
  }
};

interface UsersViewProps {
  users: UserRecord[];
  organizations: Org[];
  handleAddUser: (
    newUserName: string,
    newUserOrgId: string,
    newUserRole: string,
    newUserEmail: string
  ) => void;
  handleDeleteUser: (userId: string, userName: string, orgId: string) => void;
  setSelectedUserDetail: (user: UserRecord | null) => void;
  filteredUsers: UserRecord[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showAddUserForm: boolean;
  setShowAddUserForm: (show: boolean) => void;
}

export const UsersView: React.FC<UsersViewProps> = ({
  users,
  organizations,
  handleAddUser,
  handleDeleteUser,
  setSelectedUserDetail,
  filteredUsers,
  searchQuery,
  setSearchQuery,
  showAddUserForm,
  setShowAddUserForm
}) => {
  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentPage = Math.min(page, Math.max(1, totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-1 h-full space-y-6">
      {/* Header with search and Add employee drawer action */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="space-y-1 self-start">
          <h3 className="text-lg font-black text-gray-100">فهرست پرسنل و دسترسی‌های پرسرعت</h3>
          <p className="text-xs text-slate-400">تعریف کاربران جدید، لغو دسترسی‌های مشکوک، و پایش کارنامه تبادلات ویدئو</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto relative">
          <div className="relative w-full sm:w-64">
            <MagnifyingGlass className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام، دپارتمان یا سازمان..."
              className="w-full bg-[#0c0d15]/80 border border-white/5 rounded-2xl pr-10 pl-4 py-2 text-xs text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button 
            onClick={() => setShowAddUserForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-black transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-blue-500/10"
          >
            <UserPlus className="w-4 h-4" />
            <span>ثبت کاربر جدید</span>
          </button>
        </div>
      </motion.div>

      {/* Main Employees Table */}
      <motion.div variants={itemVariants} className="flex-1 bg-[#0c0d15]/60 border border-white/5 rounded-3xl overflow-hidden flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black text-slate-400 pb-3">
                <th className="p-4 py-4 text-right font-black">عنوان پرسنل</th>
                <th className="p-4 py-4 text-right font-black">سازمان تابعه و سمت</th>
                <th className="p-4 py-4 text-center font-black">تعداد مکالمه</th>
                <th className="p-4 py-4 text-center font-black">مجموع حضور</th>
                <th className="p-4 py-4 text-right font-black">آخرین فعالیت</th>
                <th className="p-4 py-4 text-center font-black">امضای امنیتی</th>
                <th className="p-4 py-4 text-left font-black">عملیات ادمین</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-xs text-slate-500 font-extrabold">
                    موردی متناسب با دسته‌بندی یا جستجوی شما یافت نشد.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.01] transition-all group">
                    <td className="p-4 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-white/5 text-blue-400 border border-white/5 flex items-center justify-center font-black text-xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-200 group-hover:text-white transition-colors">{user.name}</span>
                          <span className="text-[10px] text-slate-550 font-mono text-right mt-0.5">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 py-4 text-xs font-bold text-slate-300">
                      <div className="flex flex-col">
                        <span>{user.orgName}</span>
                        <span className="text-[9px] text-blue-400 font-extrabold mt-0.5">{user.role}</span>
                      </div>
                    </td>

                    <td className="p-4 py-4 text-center text-xs font-mono font-black text-slate-300">
                      {user.meetingsJoined} نشست
                    </td>

                    <td className="p-4 py-4 text-center text-xs font-mono font-black text-emerald-400">
                      {user.totalDurationHours} ساعت
                    </td>

                    <td className="p-4 py-4 text-xs font-bold text-slate-400 font-mono">
                      {user.lastActive}
                    </td>

                    <td className="p-4 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border tracking-wide inline-block ${
                        user.status === 'active' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}>
                        {user.status === 'active' ? 'امضای معتبر' : 'کلاینت معلق'}
                      </span>
                    </td>

                    <td className="p-4 py-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedUserDetail(user)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                          title="بررسی کارنامه حضور و رمزنگاری"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.name, user.orgId)}
                          className="p-1.5 text-slate-500 hover:text-rose-450 hover:bg-rose-500/5 rounded-lg transition-all cursor-pointer"
                          title="تعلیق دسترسی کاربر"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 0 && (
          <div className="flex items-center justify-between border-t border-white/5 px-6 py-4 bg-[#0a0a0f]/40">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                page === 1
                  ? 'opacity-25 cursor-not-allowed text-slate-500'
                  : 'text-blue-400 hover:text-white hover:bg-white/5 active:scale-95'
              }`}
            >
              <span>صفحه بعدی ←</span>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`w-8 h-8 rounded-xl text-xs font-black font-mono transition-all cursor-pointer active:scale-95 ${
                    page === pg
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border border-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                  }`}
                >
                  {pg}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                page === totalPages
                  ? 'opacity-25 cursor-not-allowed text-slate-500'
                  : 'text-blue-400 hover:text-white hover:bg-white/5 active:scale-95'
              }`}
            >
              <span>→ صفحه قبلی</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Telemetry Stats Panel */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0c0d15]/50 border border-white/5 rounded-3xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/15 text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" weight="fill" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">ضریب تطبیق بیومتریک کلاینت‌ها</span>
            <span className="text-xs font-black text-slate-200 mt-1 block">۹۹.۸٪ پایداری فیلترینگ هویت</span>
          </div>
        </div>

        <div className="bg-[#0c0d15]/50 border border-white/5 rounded-3xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" weight="fill" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">وضعیت کدهای امضا</span>
            <span className="text-xs font-black text-slate-200 mt-1 block">تمام کلاینت‌ها کاملا تایید شده</span>
          </div>
        </div>

        <div className="bg-[#0c0d15]/50 border border-white/5 rounded-3xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 text-indigo-400 flex items-center justify-center">
            <Lock className="w-5 h-5" weight="fill" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">پروتکل فعال امضای کلاینت</span>
            <span className="text-xs font-black text-slate-200 mt-1 block font-mono">ECDSA-SHA384 (امن و رسمی)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
