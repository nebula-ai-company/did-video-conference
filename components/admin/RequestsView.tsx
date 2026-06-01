import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Buildings, 
  EnvelopeSimple, 
  Phone,
  CaretRight,
  CaretLeft,
  Clock
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

// Consistent spring variants for item list animation
const itemVariants = {
  hidden: { y: 12, opacity: 0, filter: 'blur(3px)' },
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

interface SignupRequest {
  id: string;
  name: string;
  email: string;
  requestedOrg: string;
  role: string;
  phone: string;
  timestamp: string;
}

interface RequestsViewProps {
  signupRequests: SignupRequest[];
  handleApproveRequest: (req: SignupRequest) => void;
  handleRejectRequest: (reqId: string, name: string) => void;
}

export const RequestsView: React.FC<RequestsViewProps> = ({
  signupRequests,
  handleApproveRequest,
  handleRejectRequest
}) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 2; // Set to 2 so pagination remains perfectly active & testable with 3 default items

  if (signupRequests.length === 0) {
    return (
      <motion.div 
        variants={itemVariants} 
        className="py-24 text-center space-y-4 bg-[#0a0b12]/40 border border-white/5 rounded-3xl"
      >
        <div className="p-4.5 bg-emerald-500/10 text-emerald-400 w-fit rounded-full mx-auto border border-emerald-500/20 shadow-sm shadow-emerald-500/10">
          <CheckCircle className="w-8 h-8" weight="fill" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-black text-gray-200">صف پرونده‌ها کاملا خالی است!</h4>
          <p className="text-xs text-slate-400">تمامی درخواست‌های عضویت اخیر تایید صلاحیت یا به کلی آرشیو شده‌اند.</p>
        </div>
      </motion.div>
    );
  }

  // Double-check page constraints
  const totalPages = Math.ceil(signupRequests.length / itemsPerPage);
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = signupRequests.slice(startIndex, startIndex + itemsPerPage);

  const initialsOf = (fullName: string) => {
    return fullName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('‌');
  };

  return (
    <div className="space-y-8 text-right rtl">
      {/* Table-style horizontal row-cards container - uses complete page width */}
      <div className="flex flex-col gap-6 w-full">
        {paginatedRequests.map((req) => (
          <motion.div
            key={req.id}
            variants={itemVariants}
            className="group relative bg-gradient-to-br from-[#0c0d16]/95 to-[#07080e]/95 border border-white/10 hover:border-blue-500/30 rounded-[2rem] p-6 md:p-8 transition-all duration-300 shadow-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Soft decorative background highlight */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/[0.02] blur-3xl rounded-full group-hover:bg-blue-500/[0.04] transition-all duration-300 pointer-events-none" />

            <div className="relative flex flex-col space-y-6">
              
              {/* Row 1: Profile Info (Right) & Actions Triggers (Left) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-white/5 pb-5">
                
                {/* Applicant Profile metadata */}
                <div className="flex items-center gap-4 pr-1">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#1b1c2e] to-[#0d0e1b] border border-white/10 flex items-center justify-center text-sm font-black text-blue-400 group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-inner shrink-0 leading-none">
                    {initialsOf(req.name)}
                  </div>
                  <div className="space-y-1.5 text-right">
                    <h4 className="text-base font-black text-slate-100 group-hover:text-white transition-colors">
                      {req.name}
                    </h4>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[10px] text-blue-400 font-extrabold px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/15 rounded-md">
                        {req.role}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-600" />
                        <span>{req.timestamp}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audit triggers / call actions */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    onClick={() => handleRejectRequest(req.id, req.name)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/20 hover:bg-rose-500/10 text-rose-450 hover:text-rose-400 text-xs font-bold cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <XCircle className="w-4 h-4 shrink-0 text-rose-550" />
                    <span>رد درخواست</span>
                  </button>

                  <button
                    onClick={() => handleApproveRequest(req)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-xs font-black transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0 text-white" />
                    <span>تایید صلاحیت و ایجاد امضا</span>
                  </button>
                </div>

              </div>

              {/* Row 2: Grid of registration details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Organization requested */}
                <div className="flex items-center gap-4 bg-[#12131e]/20 p-4.5 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-[#12131e]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#090a10]/60 border border-white/5 flex items-center justify-center shrink-0">
                    <Buildings className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="space-y-0.5 min-w-0 pr-1 text-right">
                    <span className="text-[10px] text-slate-500 block font-medium">نهاد مورد تقاضا</span>
                    <strong className="font-extrabold text-slate-200 text-xs truncate block">{req.requestedOrg}</strong>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-4 bg-[#12131e]/20 p-4.5 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-[#12131e]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#090a10]/60 border border-white/5 flex items-center justify-center shrink-0">
                    <EnvelopeSimple className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="space-y-0.5 min-w-0 pr-1 text-right select-all" title="برای کلیک و کپی کردن">
                    <span className="text-[10px] text-slate-500 block font-medium">نشانی پست الکترونیکی</span>
                    <span className="text-slate-300 text-xs truncate block font-mono font-bold text-left md:text-right">{req.email}</span>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-4 bg-[#12131e]/20 p-4.5 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-[#12131e]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#090a10]/60 border border-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="space-y-0.5 min-w-0 pr-1 text-right select-all" title="برای کلیک و کپی کردن">
                    <span className="text-[10px] text-slate-500 block font-medium">شماره تماس پرونده</span>
                    <span className="text-slate-300 text-xs truncate block font-mono font-bold text-left md:text-right">{req.phone}</span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination component with clean styling and active indicator */}
      {totalPages > 1 && (
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between bg-[#08090f]/60 border border-white/5 px-6 py-4.5 rounded-2xl shadow-xl w-full"
        >
          {/* Back button */}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              page === totalPages
                ? 'opacity-25 cursor-not-allowed text-slate-500'
                : 'text-blue-450 hover:text-white hover:bg-white/5 active:scale-95'
            }`}
          >
            <span>صفحه بعدی ←</span>
          </button>

          {/* Individual Page Number buttons */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`w-9 h-9 rounded-xl text-xs font-black font-mono transition-all cursor-pointer active:scale-95 ${
                  page === pg
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border border-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                }`}
              >
                {pg}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              page === 1
                ? 'opacity-25 cursor-not-allowed text-slate-500'
                : 'text-blue-450 hover:text-white hover:bg-white/5 active:scale-95'
            }`}
          >
            <span>→ صفحه قبلی</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
