import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  ClipboardCheck,
  Edit3,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import {
  EssayGrade,
  Indicator23Override,
  Question,
  QuestionType,
  StudentProgressState,
} from '../types/assessment';
import {
  computeProgressSummary,
  DEFAULT_INDICATOR_23_OVERRIDE,
  evaluateAssessment,
  formatDuration,
  getEssayGradeTotal,
} from '../utils/scoring';
import { MathText } from './MathText';
import { StimulusRenderer } from './StimulusRenderer';
import { MrJoAudioBar } from './MrJoAudioBar';
import { buildSolutionSpeechScript } from '../utils/mathSpeech';

interface TeacherDashboardProps {
  state: StudentProgressState;
  questions: Question[];
  onSaveEssayGrade: (questionId: number, grade: EssayGrade) => void;
  onSaveIndicator23: (override: Indicator23Override) => void;
  onResetProgress: () => void;
}

type TeacherTab = 'summary' | 'solutions' | 'essay_grading' | 'indicator23';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  state,
  questions,
  onSaveEssayGrade,
  onSaveIndicator23,
  onResetProgress,
}) => {
  const [activeTab, setActiveTab] = useState<TeacherTab>('summary');
  const [selectedSolutionId, setSelectedSolutionId] = useState<number>(1);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Indicator 23 local draft form state
  const [ind23Title, setInd23Title] = useState(state.indicator23Override.customTitle);
  const [ind23Stimulus, setInd23Stimulus] = useState(
    state.indicator23Override.customStimulusText
  );
  const [ind23Prompt, setInd23Prompt] = useState(state.indicator23Override.customPrompt);
  const [ind23Guide, setInd23Guide] = useState(state.indicator23Override.customAnswerGuide);
  const [ind23Summary, setInd23Summary] = useState(
    state.indicator23Override.customSolutionSummary
  );
  const [ind23SavedBanner, setInd23SavedBanner] = useState('');

  const summary = useMemo(
    () => computeProgressSummary(questions, state),
    [questions, state]
  );
  const evaluation = useMemo(
    () => evaluateAssessment(questions, state),
    [questions, state]
  );

  const essayQuestions = useMemo(
    () => questions.filter((q) => q.type === QuestionType.ESSAY),
    [questions]
  );

  const activeSolutionQuestion =
    questions.find((q) => q.id === selectedSolutionId) ?? questions[0];

  const solutionAudioScript = useMemo(() => {
    const sol = activeSolutionQuestion.solution;
    return buildSolutionSpeechScript({
      questionNumber: activeSolutionQuestion.id,
      diketahui: sol.diketahui,
      ditanyakan: sol.ditanyakan,
      landasanTeori: sol.landasanTeori,
      rumus: sol.rumus,
      langkahPenyelesaian: sol.langkahPenyelesaian,
      kesimpulan: sol.kesimpulan,
      highlightsRumus: sol.highlightsRumus,
      quickMethodMrJo: sol.quickMethodMrJo,
    });
  }, [activeSolutionQuestion]);

  const handleGradeFieldChange = (
    qId: number,
    field: keyof Omit<EssayGrade, 'teacherNote'>,
    val: number
  ) => {
    const existing: EssayGrade = state.essayGrades[qId] ?? {
      conceptScore: 0,
      formulaScore: 0,
      processScore: 0,
      calculationScore: 0,
      conclusionScore: 0,
      teacherNote: '',
    };
    onSaveEssayGrade(qId, {
      ...existing,
      [field]: Math.max(0, Math.min(2, val)),
    });
  };

  const handleGradeNoteChange = (qId: number, note: string) => {
    const existing: EssayGrade = state.essayGrades[qId] ?? {
      conceptScore: 0,
      formulaScore: 0,
      processScore: 0,
      calculationScore: 0,
      conclusionScore: 0,
      teacherNote: '',
    };
    onSaveEssayGrade(qId, {
      ...existing,
      teacherNote: note,
    });
  };

  const handleSaveInd23 = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveIndicator23({
      isConfigured: Boolean(ind23Prompt.trim()),
      customTitle: ind23Title.trim() || 'Indikator 23 — Referensi Sumatif Nomor 3',
      customStimulusText: ind23Stimulus.trim(),
      customPrompt: ind23Prompt.trim(),
      customAnswerGuide: ind23Guide.trim(),
      customSolutionSummary: ind23Summary.trim(),
      updatedAt: new Date().toISOString(),
    });
    setInd23SavedBanner('Slot Indikator 23 berhasil disimpan.');
    setTimeout(() => setInd23SavedBanner(''), 3000);
  };

  const handleResetInd23 = () => {
    setInd23Title(DEFAULT_INDICATOR_23_OVERRIDE.customTitle);
    setInd23Stimulus('');
    setInd23Prompt('');
    setInd23Guide('');
    setInd23Summary('');
    onSaveIndicator23({ ...DEFAULT_INDICATOR_23_OVERRIDE });
    setInd23SavedBanner('Dikembalikan ke status menunggu konfirmasi.');
    setTimeout(() => setInd23SavedBanner(''), 3000);
  };

  return (
    <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-5 sm:pt-7 space-y-5">
      {/* Teacher Mode Header & Tabs */}
      <section className="rounded-2xl border border-[#BFDBFE] bg-white p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-[#0284C7]">
              Mode Guru Terbuka · Kunci Jawaban, Pembahasan &amp; Rubrik Penilaian
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-0.5">
              Dashboard Evaluasi Guru — {state.studentName} ({state.studentClass})
            </h1>
            <p className="text-xs text-[#64748B] mt-1">
              Status: {state.isSubmitted ? 'Sudah Dikumpulkan' : 'Belum Dikumpulkan (Progres Berjalan)'} · Progres {summary.answeredCount}/30 ({summary.progressPercent}%) · Durasi {formatDuration(state.elapsedSeconds)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Progres Murid</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E2E8F0]"
          role="tablist"
          aria-label="Menu Mode Guru"
        >
          {[
            { id: 'summary' as const, label: 'Ringkasan & Nilai', icon: ClipboardCheck },
            { id: 'solutions' as const, label: 'Kunci & Pembahasan (30 Soal)', icon: BookOpen },
            { id: 'essay_grading' as const, label: 'Penilaian Esai (Rubrik)', icon: Sparkles },
            { id: 'indicator23' as const, label: 'Edit Indikator 23', icon: Edit3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#1E3A8A] text-white'
                    : 'bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] hover:bg-[#EFF6FF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* TAB 1: Summary & Analytics */}
      {activeTab === 'summary' && (
        <section className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="text-xs text-[#64748B]">Skor Pilihan Ganda (Bobot 50)</div>
              <div className="text-2xl font-bold font-mono-tabular text-[#2563EB] mt-1">
                {evaluation.pgScore} / {evaluation.pgMaxScore}
              </div>
              <div className="text-xs text-[#475569] mt-0.5">
                Benar {evaluation.pgCorrectCount} dari 25 soal
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="text-xs text-[#64748B]">Skor Esai Guru (Bobot 50)</div>
              <div className="text-2xl font-bold font-mono-tabular text-[#0284C7] mt-1">
                {evaluation.essayScore} / {evaluation.essayMaxScore}
              </div>
              <div className="text-xs text-[#475569] mt-0.5">
                Dinilai {evaluation.essayGradedCount} dari 5 esai
              </div>
            </div>

            <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4">
              <div className="text-xs text-[#1E3A8A] font-semibold">Skor Akhir Total</div>
              <div className="text-2xl font-bold font-mono-tabular text-[#1E3A8A] mt-1">
                {evaluation.finalScore} / {evaluation.maxScore}
              </div>
              <div className="text-xs text-[#1E3A8A] mt-0.5">
                Pencapaian {evaluation.achievementPercent}%
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="text-xs text-[#64748B]">Progres Pengerjaan</div>
              <div className="text-2xl font-bold font-mono-tabular text-[#0F172A] mt-1">
                {summary.progressPercent}%
              </div>
              <div className="text-xs text-[#475569] mt-0.5">
                {summary.answeredCount} dijawab · {summary.unansweredCount} kosong
              </div>
            </div>
          </div>

          {/* Topic Analysis */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0F172A]">
              Analisis Penguasaan Materi PG
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {evaluation.topicAnalysis.map((item) => (
                <div
                  key={item.category}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0F172A]">{item.category}</span>
                    <span className="text-xs font-mono-tabular font-semibold text-[#1E3A8A]">
                      {item.correct}/{item.total} ({item.accuracyPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB]"
                      style={{ width: `${item.accuracyPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#475569]">
                    {item.needsReview
                      ? 'Perlu pendalaman kembali pada indikator yang belum tepat.'
                      : 'Penguasaan konsep pada bagian ini sudah baik.'}
                  </p>
                </div>
              ))}
            </div>

            {evaluation.weakIndicators.length > 0 && (
              <div className="pt-2 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  Indikator PG yang Perlu Dipelajari Kembali ({evaluation.weakIndicators.length} nomor)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {evaluation.weakIndicators.map((w) => (
                    <button
                      key={w.questionId}
                      type="button"
                      onClick={() => {
                        setSelectedSolutionId(w.questionId);
                        setActiveTab('solutions');
                      }}
                      className="text-left rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs hover:bg-[#EFF6FF] transition-colors cursor-pointer"
                    >
                      <span className="font-mono-tabular font-bold text-[#1E3A8A]">
                        No. {w.questionId} (Indikator {w.indicatorNumber})
                      </span>
                      <span className="text-[#475569]"> — {w.indicatorTitle}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 2: Full Textbook Explanations & Keys */}
      {activeTab === 'solutions' && (
        <section className="space-y-4">
          {/* Selector grid at top */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 space-y-2.5">
            <div className="text-xs font-semibold text-[#1E3A8A]">
              Pilih Nomor Soal untuk Membuka Kunci &amp; Pembahasan Lengkap (1–30):
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
              {questions.map((q) => {
                const isPg = q.type === QuestionType.PG;
                const studentOpt = state.pgAnswers[q.id];
                const isCorrect = isPg && studentOpt === q.correctOptionIndex;
                const isWrong =
                  isPg && typeof studentOpt === 'number' && studentOpt !== q.correctOptionIndex;
                const active = q.id === selectedSolutionId;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setSelectedSolutionId(q.id)}
                    className={`min-h-[38px] rounded-lg text-xs font-mono-tabular font-bold border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : isCorrect
                        ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                        : isWrong
                        ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                        : 'bg-[#F8FAFC] text-[#334155] border-[#CBD5E1]'
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Full Solution */}
          <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
              <div>
                <div className="text-xs font-semibold text-[#0284C7]">
                  Soal {activeSolutionQuestion.id} · Indikator {activeSolutionQuestion.indicatorNumber} ·{' '}
                  {activeSolutionQuestion.type === QuestionType.PG ? 'Pilihan Ganda' : 'Esai Matematis'}
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] mt-0.5">
                  {activeSolutionQuestion.indicatorNumber === 23 &&
                  state.indicator23Override.isConfigured
                    ? state.indicator23Override.customTitle
                    : activeSolutionQuestion.indicatorTitle}
                </h2>
              </div>

              {activeSolutionQuestion.type === QuestionType.PG &&
                typeof activeSolutionQuestion.correctOptionIndex === 'number' && (
                  <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3.5 py-2 text-xs font-bold text-[#1E3A8A]">
                    Kunci Jawaban: {OPTION_LETTERS[activeSolutionQuestion.correctOptionIndex]}
                  </div>
                )}
            </div>

            {/* MR JO Audio for Solution */}
            <MrJoAudioBar
              scriptText={solutionAudioScript}
              label="Dengarkan Pembahasan MR JO"
              compact
            />

            {/* Student answer comparison */}
            {activeSolutionQuestion.type === QuestionType.PG ? (
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-[#334155]">
                    Jawaban Murid:{' '}
                    {typeof state.pgAnswers[activeSolutionQuestion.id] === 'number'
                      ? OPTION_LETTERS[state.pgAnswers[activeSolutionQuestion.id]]
                      : 'Belum dijawab'}
                  </span>
                  {typeof state.pgAnswers[activeSolutionQuestion.id] === 'number' &&
                    (state.pgAnswers[activeSolutionQuestion.id] ===
                    activeSolutionQuestion.correctOptionIndex ? (
                      <span className="inline-flex items-center gap-1 font-bold text-[#047857]">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Benar (+
                        {activeSolutionQuestion.weight} poin)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-[#DC2626]">
                        <XCircle className="w-4 h-4" aria-hidden="true" /> Salah (0 poin)
                      </span>
                    ))}
                </div>
                {activeSolutionQuestion.options &&
                  typeof activeSolutionQuestion.correctOptionIndex === 'number' && (
                    <div className="text-[#0F172A]">
                      <strong>Opsi Benar ({OPTION_LETTERS[activeSolutionQuestion.correctOptionIndex]}): </strong>
                      <MathText
                        text={
                          activeSolutionQuestion.options[
                            activeSolutionQuestion.correctOptionIndex
                          ]
                        }
                      />
                    </div>
                  )}
              </div>
            ) : (
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2">
                <div className="text-xs font-bold text-[#1E3A8A]">Jawaban Esai Murid:</div>
                <p className="text-sm text-[#0F172A] whitespace-pre-wrap">
                  {state.essayAnswers[activeSolutionQuestion.id]?.trim() ||
                    'Murid belum mengisi jawaban esai pada nomor ini.'}
                </p>
              </div>
            )}

            {/* Question & Stimulus Recap */}
            <StimulusRenderer stimulus={activeSolutionQuestion.stimulus} />
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-sm text-[#0F172A]">
              <div className="text-xs font-semibold text-[#64748B] mb-1">Pertanyaan:</div>
              <MathText
                text={
                  activeSolutionQuestion.indicatorNumber === 23 &&
                  state.indicator23Override.isConfigured
                    ? state.indicator23Override.customPrompt
                    : activeSolutionQuestion.prompt
                }
              />
            </div>

            {/* Custom Teacher Override Solution for Indikator 23 if configured */}
            {activeSolutionQuestion.indicatorNumber === 23 &&
              state.indicator23Override.isConfigured && (
                <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 space-y-2 text-sm text-[#0F172A]">
                  <div className="text-xs font-bold text-[#1E3A8A]">
                    Panduan Kunci &amp; Pembahasan Guru (Indikator 23 Terkonfirmasi):
                  </div>
                  <MathText
                    text={
                      state.indicator23Override.customAnswerGuide ||
                      'Belum ada panduan kunci.'
                    }
                  />
                  {state.indicator23Override.customSolutionSummary && (
                    <div className="pt-1 text-xs text-[#334155]">
                      <MathText text={state.indicator23Override.customSolutionSummary} />
                    </div>
                  )}
                </div>
              )}

            {/* Textbook-Grade Solution Breakdown */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display text-base font-bold text-[#1E3A8A]">
                Pembahasan Matematis Lengkap (Standar Buku Teks)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                    Diketahui
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-[#334155]">
                    {activeSolutionQuestion.solution.diketahui.map((d, i) => (
                      <li key={i}>
                        <MathText text={d} />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                    Ditanyakan
                  </div>
                  <p className="text-sm text-[#334155]">
                    <MathText text={activeSolutionQuestion.solution.ditanyakan} />
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Landasan Teori &amp; Alasan Pemilihan Rumus
                </div>
                <p className="text-sm leading-relaxed text-[#334155]">
                  <MathText text={activeSolutionQuestion.solution.landasanTeori} />
                </p>
              </div>

              <div className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF]/60 p-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Rumus Utama
                </div>
                {activeSolutionQuestion.solution.rumus.map((r, i) => (
                  <div key={i} className="text-sm text-[#0F172A] overflow-x-auto">
                    <MathText text={`$$${r}$$`} />
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Penyelesaian Langkah demi Langkah
                </div>
                {activeSolutionQuestion.solution.langkahPenyelesaian.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-1"
                  >
                    <div className="text-xs font-bold text-[#2563EB]">
                      Langkah {step.stepNumber}. <MathText text={step.title} />
                    </div>
                    <div className="text-sm leading-relaxed text-[#0F172A]">
                      <MathText text={step.detail} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Kesimpulan Akhir
                </div>
                <p className="text-sm font-medium text-[#0F172A] leading-relaxed">
                  <MathText text={activeSolutionQuestion.solution.kesimpulan} />
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A]">
                    <Lightbulb className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                    <span>HIGHLIGHTS RUMUS</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-[#334155]">
                    {activeSolutionQuestion.solution.highlightsRumus.map((h, i) => (
                      <li key={i}>
                        <MathText text={h} />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-[#BFDBFE] bg-white p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A]">
                    <Sparkles className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                    <span>QUICK METHOD MR JO</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#334155]">
                    <MathText text={activeSolutionQuestion.solution.quickMethodMrJo} />
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* TAB 3: Essay Rubric Grading */}
      {activeTab === 'essay_grading' && (
        <section className="space-y-4">
          {essayQuestions.map((eq) => {
            const grade = state.essayGrades[eq.id] ?? {
              conceptScore: 0,
              formulaScore: 0,
              processScore: 0,
              calculationScore: 0,
              conclusionScore: 0,
              teacherNote: '',
            };
            const total = getEssayGradeTotal(grade);

            const fields: Array<{
              key: keyof Omit<EssayGrade, 'teacherNote'>;
              aspect: string;
            }> = [
              { key: 'conceptScore', aspect: 'Ketepatan konsep' },
              { key: 'formulaScore', aspect: 'Ketepatan penggunaan rumus' },
              { key: 'processScore', aspect: 'Kelengkapan proses' },
              { key: 'calculationScore', aspect: 'Ketepatan perhitungan' },
              { key: 'conclusionScore', aspect: 'Kesimpulan' },
            ];

            return (
              <div
                key={eq.id}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <div className="text-xs font-semibold text-[#0284C7]">
                      Soal Esai Nomor {eq.id} · Indikator {eq.indicatorNumber}
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {eq.indicatorNumber === 23 && state.indicator23Override.isConfigured
                        ? state.indicator23Override.customTitle
                        : eq.indicatorTitle}
                    </h3>
                  </div>
                  <div className="text-sm font-mono-tabular font-bold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-1.5 rounded-xl">
                    Skor Esai: {total} / 10
                  </div>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-1">
                  <div className="text-xs font-bold text-[#334155]">Jawaban Murid:</div>
                  <p className="text-sm text-[#0F172A] whitespace-pre-wrap">
                    {state.essayAnswers[eq.id]?.trim() || 'Belum dijawab oleh murid.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fields.map((f, idx) => {
                    const rubricDesc =
                      eq.solution.rubrik?.[idx]?.descriptor ?? f.aspect;
                    return (
                      <div
                        key={f.key}
                        className="rounded-xl border border-[#E2E8F0] p-3 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0F172A]">{f.aspect}</div>
                          <div className="text-[11px] text-[#64748B] mt-0.5">
                            <MathText text={rubricDesc} />
                          </div>
                        </div>
                        <select
                          aria-label={`Skor ${f.aspect} untuk soal ${eq.id}`}
                          value={grade[f.key]}
                          onChange={(e) =>
                            handleGradeFieldChange(eq.id, f.key, Number(e.target.value))
                          }
                          className="min-h-[38px] px-2.5 py-1 rounded-lg border border-[#CBD5E1] text-xs font-mono-tabular font-bold text-[#1E3A8A] bg-white shrink-0"
                        >
                          <option value={0}>0 / 2</option>
                          <option value={1}>1 / 2</option>
                          <option value={2}>2 / 2</option>
                        </select>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor={`teacher-note-${eq.id}`}
                    className="block text-xs font-semibold text-[#334155]"
                  >
                    Catatan Umpan Balik Guru
                  </label>
                  <input
                    id={`teacher-note-${eq.id}`}
                    type="text"
                    value={grade.teacherNote}
                    onChange={(e) => handleGradeNoteChange(eq.id, e.target.value)}
                    placeholder="Tambahkan catatan koreksi atau apresiasi untuk murid..."
                    className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm text-[#0F172A]"
                  />
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* TAB 4: Indicator 23 Editable Slot */}
      {activeTab === 'indicator23' && (
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-[#0F172A]">
              Editor Slot Soal Esai Indikator 23 (Referensi: &ldquo;Sumatif no 3 [saham²]&rdquo;)
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Status bawaan adalah &ldquo;Menunggu konfirmasi materi indikator 23&rdquo;. Setelah Anda mengonfirmasi materi aslinya, isi formulir berikut agar murid melihat soal resmi pada Soal Nomor 26.
            </p>
          </div>

          {ind23SavedBanner && (
            <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-3.5 py-2.5 text-xs font-semibold text-[#047857]">
              {ind23SavedBanner}
            </div>
          )}

          <form onSubmit={handleSaveInd23} className="space-y-3.5">
            <div className="space-y-1">
              <label htmlFor="ind23-title" className="block text-xs font-semibold text-[#334155]">
                Judul Materi / Indikator 23
              </label>
              <input
                id="ind23-title"
                type="text"
                value={ind23Title}
                onChange={(e) => setInd23Title(e.target.value)}
                className="w-full min-h-[40px] px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="ind23-stimulus" className="block text-xs font-semibold text-[#334155]">
                Teks Stimulus (Opsional, mendukung format LaTeX $...$)
              </label>
              <textarea
                id="ind23-stimulus"
                rows={3}
                value={ind23Stimulus}
                onChange={(e) => setInd23Stimulus(e.target.value)}
                placeholder="Masukkan data atau informasi stimulus Indikator 23..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="ind23-prompt" className="block text-xs font-semibold text-[#334155]">
                Pertanyaan Soal Resmi Indikator 23
              </label>
              <textarea
                id="ind23-prompt"
                rows={4}
                value={ind23Prompt}
                onChange={(e) => setInd23Prompt(e.target.value)}
                placeholder="Tuliskan pertanyaan esai resmi untuk Soal Nomor 26..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="ind23-guide" className="block text-xs font-semibold text-[#334155]">
                Kunci / Panduan Jawaban Guru
              </label>
              <textarea
                id="ind23-guide"
                rows={3}
                value={ind23Guide}
                onChange={(e) => setInd23Guide(e.target.value)}
                placeholder="Tuliskan kunci jawaban atau langkah penyelesaian yang diharapkan..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="ind23-summary" className="block text-xs font-semibold text-[#334155]">
                Catatan Tambahan Pembahasan
              </label>
              <input
                id="ind23-summary"
                type="text"
                value={ind23Summary}
                onChange={(e) => setInd23Summary(e.target.value)}
                placeholder="Tips atau catatan khusus untuk penilaian..."
                className="w-full min-h-[40px] px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="submit"
                className="min-h-[42px] px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs sm:text-sm font-semibold hover:bg-[#1D4ED8] cursor-pointer"
              >
                Simpan Soal Indikator 23
              </button>
              <button
                type="button"
                onClick={handleResetInd23}
                className="min-h-[42px] px-4 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-semibold text-[#334155] hover:bg-[#F8FAFC] cursor-pointer"
              >
                Kembalikan ke Status Menunggu
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Top-Anchored Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-start justify-center pt-10 sm:pt-16 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="teacher-reset-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E2E8F0] shadow-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#FEF2F2] text-[#DC2626] shrink-0">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 id="teacher-reset-title" className="text-base font-bold text-[#0F172A]">
                  Konfirmasi Reset Progres
                </h3>
                <p className="text-sm text-[#475569] mt-1">
                  Semua jawaban murid dan nilai esai di perangkat ini akan dihapus. Lanjutkan?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="min-h-[40px] px-4 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#0F172A] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsResetModalOpen(false);
                  onResetProgress();
                }}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#DC2626] text-white text-xs font-semibold cursor-pointer"
              >
                Ya, Reset Progres
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
