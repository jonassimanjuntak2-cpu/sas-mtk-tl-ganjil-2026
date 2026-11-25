import React, { useState } from 'react';
import {
  PlayCircle,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Clock,
} from 'lucide-react';
import { Question, QuestionType, StudentProgressState } from '../types/assessment';
import {
  computeProgressSummary,
  formatDuration,
  isQuestionAnswered,
} from '../utils/scoring';

interface DashboardViewProps {
  state: StudentProgressState;
  questions: Question[];
  onStartOrContinue: (questionId?: number) => void;
  onResetProgress: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  questions,
  onStartOrContinue,
  onResetProgress,
}) => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const summary = computeProgressSummary(questions, state);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 space-y-6">
      {/* Top Action & Identity Header */}
      <section className="rounded-2xl border border-[#DBEAFE] bg-white p-5 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#0284C7]">
              <span>Dashboard Latihan Murid</span>
              <span aria-hidden="true">·</span>
              <span>{state.studentClass}</span>
              <span aria-hidden="true">·</span>
              <span>{state.isSubmitted ? 'Sudah Dikumpulkan' : 'Sedang Berlangsung'}</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              LATIHAN SUMATIF AKHIR SEMESTER MATEMATIKA TINGKAT LANJUT PRO
            </h1>
            <p className="text-sm text-[#475569]">
              Murid: <strong className="text-[#0F172A]">{state.studentName}</strong> · Kelas{' '}
              <strong className="text-[#0F172A]">{state.studentClass}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onStartOrContinue(state.currentQuestionId)}
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer whitespace-nowrap"
            >
              <PlayCircle className="w-4 h-4" aria-hidden="true" />
              <span>
                {summary.answeredCount > 0 ? 'Lanjutkan Latihan' : 'Mulai Latihan'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-semibold text-[#DC2626] hover:bg-[#FEF2F2] transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>RESET PROGRESS</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1E3A8A]">
            <span>Progres Pengerjaan Keseluruhan</span>
            <span className="font-mono-tabular">
              {summary.answeredCount}/{summary.totalQuestions} Soal ({summary.progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] overflow-hidden">
            <div
              className="h-full bg-[#2563EB] transition-all duration-300"
              style={{ width: `${summary.progressPercent}%` }}
            />
          </div>
        </div>

        {/* 4 Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
            <div className="text-xs text-[#64748B]">Total Soal</div>
            <div className="text-xl font-bold font-mono-tabular text-[#0F172A] mt-0.5">
              30 Soal
            </div>
            <div className="text-[11px] text-[#475569] mt-0.5">25 PG · 5 Esai</div>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
            <div className="text-xs text-[#64748B]">Sudah Dijawab</div>
            <div className="text-xl font-bold font-mono-tabular text-[#2563EB] mt-0.5">
              {summary.answeredCount}
            </div>
            <div className="text-[11px] text-[#475569] mt-0.5">
              PG {summary.pgAnswered}/25 · Esai {summary.essayAnswered}/5
            </div>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
            <div className="text-xs text-[#64748B]">Belum Dijawab</div>
            <div className="text-xl font-bold font-mono-tabular text-[#0F172A] mt-0.5">
              {summary.unansweredCount}
            </div>
            <div className="text-[11px] text-[#475569] mt-0.5">Tersimpan lokal</div>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
            <div className="text-xs text-[#64748B] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Waktu Pengerjaan</span>
            </div>
            <div className="text-xl font-bold font-mono-tabular text-[#1E3A8A] mt-0.5">
              {formatDuration(state.elapsedSeconds)}
            </div>
            <div className="text-[11px] text-[#475569] mt-0.5">Otomatis terekam</div>
          </div>
        </div>
      </section>

      {/* Distribution & Question Navigator */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Peta Kisi-Kisi &amp; Navigasi 30 Soal
            </h2>
            <p className="text-xs text-[#64748B]">
              Nomor 1–12 Polinomial (PG) · Nomor 13–25 Trigonometri (PG) · Nomor 26–30 Esai Matematis (Indikator 23–26)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {questions.map((q) => {
            const answered = isQuestionAnswered(q, state);
            const isEssay = q.type === QuestionType.ESSAY;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onStartOrContinue(q.id)}
                className={`text-left rounded-xl border p-3 transition-colors cursor-pointer flex items-start gap-3 ${
                  answered
                    ? 'border-[#93C5FD] bg-[#EFF6FF]/60 hover:bg-[#EFF6FF]'
                    : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  {answered ? (
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#94A3B8]" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono-tabular font-bold text-[#1E3A8A]">
                      Soal {q.id} · Indikator {q.indicatorNumber}
                    </span>
                    <span className="text-[11px] font-medium text-[#64748B]">
                      {isEssay ? 'Esai' : 'PG'}
                    </span>
                  </div>
                  <p className="text-xs text-[#334155] mt-1 line-clamp-1">
                    {q.indicatorNumber === 23 && state.indicator23Override.isConfigured
                      ? state.indicator23Override.customTitle
                      : q.indicatorTitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-[#64748B] pt-2">
          Catatan: Progres tersimpan secara lokal pada browser dan perangkat yang Anda gunakan saat ini (tidak tersinkronisasi antargawai). Pembahasan dan kunci jawaban hanya dibuka melalui Mode Guru.
        </p>
      </section>

      {/* Top-Anchored Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-start justify-center pt-10 sm:pt-16 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-confirm-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E2E8F0] shadow-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#FEF2F2] text-[#DC2626] shrink-0">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 id="reset-confirm-title" className="text-base font-bold text-[#0F172A]">
                  Konfirmasi Reset Progres
                </h3>
                <p className="text-sm text-[#475569] mt-1 leading-relaxed">
                  Tindakan ini akan menghapus seluruh jawaban PG, jawaban esai, dan catatan progres Anda di perangkat ini. Apakah Anda yakin?
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="min-h-[40px] px-4 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsResetModalOpen(false);
                  onResetProgress();
                }}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#DC2626] text-white text-xs font-semibold hover:bg-[#B91C1C] cursor-pointer"
              >
                Ya, Hapus Progres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
