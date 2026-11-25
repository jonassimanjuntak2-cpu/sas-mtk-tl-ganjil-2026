import React from 'react';
import {
  LayoutDashboard,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  GraduationCap,
  X,
  Check,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { AppScreen, Question, QuestionType, StudentProgressState } from '../types/assessment';
import { isQuestionAnswered } from '../utils/scoring';

interface TopNavigationProps {
  screen: AppScreen;
  questions: Question[];
  state: StudentProgressState | null;
  isTeacherUnlocked: boolean;
  isNumberPanelOpen: boolean;
  isSubmitModalOpen: boolean;
  isTeacherModalOpen: boolean;
  teacherPasswordInput: string;
  teacherPasswordError: string;
  saveFeedbackText: string;
  onNavigateDashboard: () => void;
  onToggleNumberPanel: () => void;
  onSelectQuestion: (questionId: number) => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onManualSave: () => void;
  onOpenSubmitModal: () => void;
  onCloseSubmitModal: () => void;
  onConfirmSubmit: () => void;
  onOpenTeacherModal: () => void;
  onCloseTeacherModal: () => void;
  onTeacherPasswordChange: (val: string) => void;
  onSubmitTeacherPassword: (e: React.FormEvent) => void;
  onExitTeacherMode: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  screen,
  questions,
  state,
  isTeacherUnlocked,
  isNumberPanelOpen,
  isSubmitModalOpen,
  isTeacherModalOpen,
  teacherPasswordInput,
  teacherPasswordError,
  saveFeedbackText,
  onNavigateDashboard,
  onToggleNumberPanel,
  onSelectQuestion,
  onPrevQuestion,
  onNextQuestion,
  onManualSave,
  onOpenSubmitModal,
  onCloseSubmitModal,
  onConfirmSubmit,
  onOpenTeacherModal,
  onCloseTeacherModal,
  onTeacherPasswordChange,
  onSubmitTeacherPassword,
  onExitTeacherMode,
}) => {
  const currentId = state?.currentQuestionId ?? 1;
  const isQuiz = screen === 'quiz' && state !== null;
  const isSubmitted = Boolean(state?.isSubmitted);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-5 py-2">
          {/* Top Brand + Primary Actions */}
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-2 xl:gap-3">
            <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0 w-full xl:w-auto xl:shrink-0">
              <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-[#1E3A8A] truncate xl:overflow-visible xl:whitespace-nowrap">
                MATEMATIKA TINGKAT LANJUT PRO
              </span>
              {saveFeedbackText && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F0F9FF] border border-[#BAE6FD] text-[11px] font-medium text-[#0369A1] whitespace-nowrap shrink-0">
                  {saveFeedbackText}
                </span>
              )}
            </div>

            <nav
              aria-label="Navigasi Utama Bagian Atas"
              className="flex flex-wrap items-center gap-1 sm:gap-1.5 w-full xl:w-auto xl:shrink-0 min-w-0 xl:justify-end"
            >
              {state && (
                <button
                  type="button"
                  onClick={onNavigateDashboard}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 min-h-[34px] sm:min-h-[38px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    screen === 'dashboard'
                      ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                      : 'bg-white text-[#334155] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Dashboard</span>
                </button>
              )}

              {isQuiz && (
                <>
                  <button
                    type="button"
                    onClick={onToggleNumberPanel}
                    aria-expanded={isNumberPanelOpen}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 min-h-[34px] sm:min-h-[38px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isNumberPanelOpen
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE] hover:bg-[#DBEAFE]'
                    }`}
                  >
                    <Grid3X3 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Nomor Soal ({currentId}/30)</span>
                  </button>

                  <button
                    type="button"
                    onClick={onPrevQuestion}
                    disabled={currentId <= 1}
                    className="inline-flex items-center gap-1 min-h-[34px] sm:min-h-[38px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[11px] sm:text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Sebelumnya</span>
                  </button>

                  <button
                    type="button"
                    onClick={onNextQuestion}
                    disabled={currentId >= questions.length}
                    className="inline-flex items-center gap-1 min-h-[34px] sm:min-h-[38px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[11px] sm:text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>

                  {!isSubmitted && (
                    <>
                      <button
                        type="button"
                        onClick={onManualSave}
                        className="inline-flex items-center gap-1 min-h-[34px] sm:min-h-[38px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[11px] sm:text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Save className="w-3.5 h-3.5 shrink-0 text-[#0284C7]" aria-hidden="true" />
                        <span>Simpan</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenSubmitModal}
                        className="inline-flex items-center gap-1 sm:gap-1.5 min-h-[34px] sm:min-h-[38px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#2563EB] text-white text-[11px] sm:text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Send className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Kumpulkan Jawaban</span>
                      </button>
                    </>
                  )}
                </>
              )}

              {state && !isQuiz && !isSubmitted && screen === 'dashboard' && (
                <button
                  type="button"
                  onClick={onOpenSubmitModal}
                  className="inline-flex items-center gap-1 sm:gap-1.5 min-h-[34px] sm:min-h-[38px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#2563EB] text-white text-[11px] sm:text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Kumpulkan Jawaban</span>
                </button>
              )}

              {screen === 'teacher' && isTeacherUnlocked ? (
                <button
                  type="button"
                  onClick={onExitTeacherMode}
                  className="inline-flex items-center gap-1 sm:gap-1.5 min-h-[34px] sm:min-h-[38px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#1E3A8A] text-white text-[11px] sm:text-xs font-semibold hover:bg-[#172554] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <X className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Keluar Mode Guru</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenTeacherModal}
                  className="inline-flex items-center gap-1 sm:gap-1.5 min-h-[34px] sm:min-h-[38px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-[#0F172A] text-white text-[11px] sm:text-xs font-semibold hover:bg-[#1E293B] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <GraduationCap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Mode Guru</span>
                </button>
              )}
            </nav>
          </div>

          {/* Collapsible Question Number Drawer (Top Area Only) */}
          {isQuiz && isNumberPanelOpen && state && (
            <div
              className="mt-2 pt-3 pb-2 border-t border-[#E2E8F0] space-y-2.5"
              aria-label="Panel Nomor Soal"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#475569]">
                <span>
                  Pilih nomor soal (1–25 Pilihan Ganda · 26–30 Esai Matematis)
                </span>
                <button
                  type="button"
                  onClick={onToggleNumberPanel}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tutup Panel</span>
                </button>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
                {questions.map((q) => {
                  const answered = isQuestionAnswered(q, state);
                  const isCurrent = q.id === state.currentQuestionId;
                  const isEssay = q.type === QuestionType.ESSAY;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => onSelectQuestion(q.id)}
                      aria-label={`Soal nomor ${q.id}, ${isEssay ? 'Esai' : 'Pilihan Ganda'}, ${
                        answered ? 'Sudah dijawab' : 'Belum dijawab'
                      }`}
                      className={`min-h-[38px] px-1.5 py-1 rounded-lg text-xs font-mono-tabular font-semibold border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                        isCurrent
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                          : answered
                          ? 'bg-[#DBEAFE] text-[#1E3A8A] border-[#93C5FD] hover:bg-[#BFDBFE]'
                          : 'bg-white text-[#475569] border-[#CBD5E1] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <span>{q.id}</span>
                      {answered && <Check className="w-3 h-3 shrink-0" aria-hidden="true" />}
                      {!answered && isEssay && (
                        <span className="text-[10px] font-sans font-bold">E</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Top-Anchored Submit Confirmation Modal (Never at the bottom) */}
      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-start justify-center pt-10 sm:pt-16 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-confirm-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E2E8F0] shadow-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB] shrink-0">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="submit-confirm-title"
                  className="text-base font-bold text-[#0F172A]"
                >
                  Konfirmasi Pengumpulan Jawaban
                </h2>
                <p className="text-sm text-[#475569] mt-1 leading-relaxed">
                  Apakah Anda yakin ingin mengumpulkan seluruh jawaban? Pastikan semua soal sudah diperiksa.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onCloseSubmitModal}
                className="min-h-[42px] px-4 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                KEMBALI MEMERIKSA
              </button>
              <button
                type="button"
                onClick={onConfirmSubmit}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs sm:text-sm font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                YA, KUMPULKAN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top-Anchored Teacher Mode Password Modal */}
      {isTeacherModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-start justify-center pt-10 sm:pt-16 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="teacher-login-title"
        >
          <form
            onSubmit={onSubmitTeacherPassword}
            className="w-full max-w-md rounded-2xl bg-white border border-[#E2E8F0] shadow-xl p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#1E3A8A] shrink-0">
                  <Lock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="teacher-login-title"
                    className="text-base font-bold text-[#0F172A]"
                  >
                    Akses Mode Guru
                  </h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Masukkan password antarmuka guru untuk membuka kunci jawaban, pembahasan lengkap, rubrik esai, dan editor Indikator 23.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseTeacherModal}
                aria-label="Tutup dialog Mode Guru"
                className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="teacher-password-input"
                className="block text-xs font-semibold text-[#334155]"
              >
                Password Mode Guru
              </label>
              <input
                id="teacher-password-input"
                type="password"
                autoFocus
                value={teacherPasswordInput}
                onChange={(e) => onTeacherPasswordChange(e.target.value)}
                placeholder="Masukkan password guru"
                className="w-full min-h-[42px] px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
              />
              {teacherPasswordError && (
                <p className="text-xs font-medium text-[#DC2626]" role="alert">
                  {teacherPasswordError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onCloseTeacherModal}
                className="min-h-[40px] px-4 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#334155] hover:bg-[#F8FAFC] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#1E3A8A] text-white text-xs font-semibold hover:bg-[#172554] cursor-pointer"
              >
                Buka Mode Guru
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
