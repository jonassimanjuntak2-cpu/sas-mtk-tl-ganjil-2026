import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, RotateCcw } from 'lucide-react';
import { Question, StudentProgressState } from '../types/assessment';
import { computeProgressSummary } from '../utils/scoring';

interface LoginViewProps {
  existingSession: StudentProgressState | null;
  questions: Question[];
  onStartNew: (studentName: string, studentClass: string) => void;
  onResumeExisting: () => void;
}

const CLASS_OPTIONS = [
  'XI-A',
  'XI-B',
  'XI-C',
  'XI-D',
  'XI-MIPA 1',
  'XI-MIPA 2',
  'XII-A',
  'XII-B',
  'XII-MIPA 1',
  'XII-MIPA 2',
];

export const LoginView: React.FC<LoginViewProps> = ({
  existingSession,
  questions,
  onStartNew,
  onResumeExisting,
}) => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [customClass, setCustomClass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const existingSummary = existingSession
    ? computeProgressSummary(questions, existingSession)
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim();
    const finalClass =
      selectedClass === '__custom__' ? customClass.trim() : selectedClass.trim();

    if (!finalName) {
      setErrorMsg('Nama Lengkap Murid wajib diisi.');
      return;
    }
    if (!finalClass) {
      setErrorMsg('Kelas wajib dipilih atau diisi.');
      return;
    }

    setErrorMsg('');
    onStartNew(finalName, finalClass);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        {/* Left: Editorial Overview */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#DBEAFE] bg-white p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#0284C7]">
              <span>Asesmen Digital SMA</span>
              <span aria-hidden="true">·</span>
              <span>Matematika Tingkat Lanjut</span>
              <span aria-hidden="true">·</span>
              <span>26 Indikator Kisi-Kisi</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] leading-tight text-balance">
              LATIHAN SUMATIF AKHIR SEMESTER MATEMATIKA TINGKAT LANJUT PRO
            </h1>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Platform latihan HOTS terstruktur yang dirancang untuk melatih penalaran aljabar polinomial, analisis fungsi dan identitas trigonometri, pemodelan periodik, serta pembuktian matematis setara buku teks.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2E8F0] grid grid-cols-3 gap-4">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-tabular text-[#1E3A8A]">
                30
              </div>
              <div className="text-xs text-[#64748B] mt-0.5">Total Soal HOTS</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-tabular text-[#2563EB]">
                25 PG
              </div>
              <div className="text-xs text-[#64748B] mt-0.5">5 Opsi (A–E)</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-tabular text-[#0284C7]">
                5 Esai
              </div>
              <div className="text-xs text-[#64748B] mt-0.5">Penalaran &amp; Bukti</div>
            </div>
          </div>
        </div>

        {/* Right: Student Login & Resume Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {existingSession && existingSummary && (
            <div className="rounded-2xl border border-[#93C5FD] bg-[#EFF6FF] p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3A8A]">
                <Clock className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                <span>Sesi Tersimpan di Perangkat Ini</span>
              </div>
              <div className="text-sm text-[#0F172A]">
                <p className="font-bold">{existingSession.studentName}</p>
                <p className="text-xs text-[#475569]">
                  Kelas {existingSession.studentClass} · Progres {existingSummary.answeredCount}/30 soal ({existingSummary.progressPercent}%)
                  {existingSession.isSubmitted ? ' · Sudah Dikumpulkan' : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={onResumeExisting}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-sm font-semibold hover:bg-[#172554] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Lanjutkan Progres Sebelumnya</span>
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4 flex-1"
            noValidate
          >
            <div className="flex items-center gap-2 text-[#1E3A8A]">
              <BookOpen className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />
              <h2 className="text-base font-bold">
                {existingSession ? 'Mulai Sesi Baru' : 'Identitas Murid'}
              </h2>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="student-name-input"
                className="block text-xs font-semibold text-[#334155]"
              >
                Nama Lengkap Murid
              </label>
              <input
                id="student-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Nadia Putri Maharani"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="student-class-select"
                className="block text-xs font-semibold text-[#334155]"
              >
                Kelas
              </label>
              <select
                id="student-class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
              >
                <option value="">-- Pilih Kelas --</option>
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
                <option value="__custom__">Kelas Lainnya (Ketik Manual)</option>
              </select>
            </div>

            {selectedClass === '__custom__' && (
              <div className="space-y-1.5">
                <label
                  htmlFor="student-custom-class"
                  className="block text-xs font-semibold text-[#334155]"
                >
                  Nama Kelas
                </label>
                <input
                  id="student-custom-class"
                  type="text"
                  value={customClass}
                  onChange={(e) => setCustomClass(e.target.value)}
                  placeholder="Contoh: XI-F4"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            )}

            {errorMsg && (
              <p className="text-xs font-semibold text-[#DC2626]" role="alert">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              <span>MULAI LATIHAN</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <p className="text-[11px] leading-relaxed text-[#64748B]">
              Progres latihan Anda tersimpan otomatis pada browser dan perangkat yang digunakan saat ini (tidak tersinkronisasi antargawai).
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
