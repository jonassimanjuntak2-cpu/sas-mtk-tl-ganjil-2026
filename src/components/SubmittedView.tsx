import React from 'react';
import { CheckCircle2, Lock, LayoutDashboard } from 'lucide-react';
import { Question, StudentProgressState } from '../types/assessment';
import { computeProgressSummary, formatDuration } from '../utils/scoring';

interface SubmittedViewProps {
  state: StudentProgressState;
  questions: Question[];
  onGoDashboard: () => void;
  onOpenTeacherModal: () => void;
}

export const SubmittedView: React.FC<SubmittedViewProps> = ({
  state,
  questions,
  onGoDashboard,
  onOpenTeacherModal,
}) => {
  const summary = computeProgressSummary(questions, state);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-5">
      <section className="rounded-2xl border border-[#BFDBFE] bg-white p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#EFF6FF] text-[#2563EB] shrink-0">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h1 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              Jawaban Berhasil Dikumpulkan
            </h1>
            <p className="text-sm text-[#475569]">
              Terima kasih, <strong className="text-[#0F172A]">{state.studentName}</strong> ({state.studentClass}). Seluruh jawaban latihan Anda telah disimpan dan dikunci pada perangkat ini.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
            <div className="text-xs text-[#64748B]">Pilihan Ganda Diisi</div>
            <div className="text-lg font-bold font-mono-tabular text-[#1E3A8A] mt-0.5">
              {summary.pgAnswered} / {summary.pgTotal}
            </div>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
            <div className="text-xs text-[#64748B]">Esai Matematis Diisi</div>
            <div className="text-lg font-bold font-mono-tabular text-[#2563EB] mt-0.5">
              {summary.essayAnswered} / {summary.essayTotal}
            </div>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 col-span-2 sm:col-span-1">
            <div className="text-xs text-[#64748B]">Durasi Pengerjaan</div>
            <div className="text-lg font-bold font-mono-tabular text-[#0F172A] mt-0.5">
              {formatDuration(state.elapsedSeconds)}
            </div>
          </div>
        </div>

        {/* Locked Notice */}
        <div className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] p-4 flex items-start gap-3">
          <Lock className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1 text-xs sm:text-sm text-[#1E3A8A]">
            <p className="font-bold">Kunci Jawaban &amp; Pembahasan Terkunci</p>
            <p className="text-[#334155] leading-relaxed">
              Sesuai aturan asesmen, nilai akhir, kunci jawaban PG, rubrik esai, serta pembahasan langkah demi langkah dari MR JO hanya dapat dibuka oleh guru melalui menu <strong>Mode Guru</strong> di bagian atas.
            </p>
          </div>
        </div>

        {/* Top-of-card action links */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onGoDashboard}
            className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Dashboard</span>
          </button>
        </div>
      </section>
    </main>
  );
};
