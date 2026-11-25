import React, { useMemo, useRef } from 'react';
import { Check, Info, Lock } from 'lucide-react';
import {
  Question,
  QuestionType,
  StudentProgressState,
} from '../types/assessment';
import { MathText } from './MathText';
import { StimulusRenderer } from './StimulusRenderer';
import { MrJoAudioBar } from './MrJoAudioBar';
import { buildQuestionSpeechScript } from '../utils/mathSpeech';

interface QuestionWorkspaceProps {
  question: Question;
  totalQuestions: number;
  state: StudentProgressState;
  onSelectPgOption: (questionId: number, optionIndex: number) => void;
  onChangeEssayAnswer: (questionId: number, text: string) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;

const MATH_TOOLBAR_ITEMS = [
  { label: 'x²', insert: '²' },
  { label: 'x³', insert: '³' },
  { label: '√()', insert: '√()' },
  { label: 'a/b', insert: '()/()' },
  { label: 'π', insert: 'π' },
  { label: '°', insert: '°' },
  { label: 'θ', insert: 'θ' },
  { label: 'α', insert: 'α' },
  { label: 'β', insert: 'β' },
  { label: 'sin', insert: 'sin ' },
  { label: 'cos', insert: 'cos ' },
  { label: 'tan', insert: 'tan ' },
  { label: '≡', insert: '≡ ' },
  { label: '≠', insert: '≠ ' },
  { label: '≤', insert: '≤ ' },
  { label: '≥', insert: '≥ ' },
  { label: '±', insert: '±' },
  { label: '→', insert: ' → ' },
  { label: '∴', insert: '∴ ' },
];

export const QuestionWorkspace: React.FC<QuestionWorkspaceProps> = ({
  question,
  totalQuestions,
  state,
  onSelectPgOption,
  onChangeEssayAnswer,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isLocked = state.isSubmitted;
  const isInd23 = question.indicatorNumber === 23;
  const ind23 = state.indicator23Override;
  const effectiveTitle =
    isInd23 && ind23.isConfigured ? ind23.customTitle : question.indicatorTitle;
  const effectivePrompt =
    isInd23 && ind23.isConfigured ? ind23.customPrompt : question.prompt;
  const effectiveStimulus = useMemo(() => {
    if (isInd23 && ind23.isConfigured) {
      return {
        kind: 'math_box' as const,
        title: ind23.customTitle || 'Stimulus Indikator 23',
        textContext: ind23.customStimulusText,
      };
    }
    return question.stimulus;
  }, [isInd23, ind23, question.stimulus]);

  const speechScript = useMemo(() => {
    return buildQuestionSpeechScript({
      questionNumber: question.id,
      indicatorTitle: effectiveTitle,
      stimulusTitle: effectiveStimulus.title,
      stimulusText: [
        effectiveStimulus.textContext,
        effectiveStimulus.caption,
        effectiveStimulus.mathLines?.join('. '),
      ]
        .filter(Boolean)
        .join('. '),
      prompt: effectivePrompt,
      options: question.options,
    });
  }, [question.id, question.options, effectiveTitle, effectiveStimulus, effectivePrompt]);

  const insertMathSymbol = (token: string) => {
    if (isLocked) return;
    const current = state.essayAnswers[question.id] ?? '';
    const el = textareaRef.current;
    if (!el) {
      onChangeEssayAnswer(question.id, current + token);
      return;
    }
    const start = el.selectionStart ?? current.length;
    const end = el.selectionEnd ?? current.length;
    const updated = current.slice(0, start) + token + current.slice(end);
    onChangeEssayAnswer(question.id, updated);

    requestAnimationFrame(() => {
      el.focus();
      const cursorPos = token.endsWith('()')
        ? start + token.length - 1
        : start + token.length;
      el.setSelectionRange(cursorPos, cursorPos);
    });
  };

  const selectedPgIndex = state.pgAnswers[question.id];
  const essayValue = state.essayAnswers[question.id] ?? '';

  return (
    <main className="max-w-4xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 space-y-5">
      {/* Submission Lock Notice if already submitted */}
      {isLocked && (
        <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 flex items-center gap-2.5 text-xs sm:text-sm text-[#1E3A8A]">
          <Lock className="w-4 h-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
          <span>
            Jawaban Anda sudah dikumpulkan dan terkunci. Kunci jawaban serta pembahasan lengkap hanya dapat dibuka melalui Mode Guru.
          </span>
        </div>
      )}

      {/* Question Card */}
      <article className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-7 space-y-5">
        {/* Clean Unboxed Metadata Header */}
        <header className="space-y-2 pb-4 border-b border-[#E2E8F0]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#0284C7]">
            <span className="font-mono-tabular font-bold text-[#1E3A8A]">
              Soal {question.id} / {totalQuestions}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {question.type === QuestionType.PG ? 'Pilihan Ganda' : 'Esai Matematis'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Indikator {question.indicatorNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{question.category}</span>
            <span aria-hidden="true">·</span>
            <span>Tingkat {question.difficulty}</span>
          </div>

          <h1 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
            {effectiveTitle}
          </h1>
        </header>

        {/* MR JO Audio Bar (Top area inside card, never bottom) */}
        <MrJoAudioBar scriptText={speechScript} label="Dengarkan Soal" />

        {/* Waiting notice for unconfigured Indicator 23 */}
        {isInd23 && !ind23.isConfigured && (
          <div className="rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1 text-xs sm:text-sm text-[#1E3A8A]">
              <p className="font-bold">
                {question.waitingStatusText ?? 'Menunggu konfirmasi materi indikator 23'}
              </p>
              <p className="text-[#334155] leading-relaxed">
                Catatan tulisan tangan pada kisi-kisi tertulis &ldquo;Sumatif no. 3 [saham²]&rdquo;. Slot ini tidak dikarang agar tetap akurat sesuai materi asli kelas Anda. Guru dapat mengisi soal resmi melalui Mode Guru.
              </p>
            </div>
          </div>
        )}

        {/* Stimulus */}
        <StimulusRenderer stimulus={effectiveStimulus} />

        {/* Question Prompt */}
        <section className="space-y-2 pt-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Pertanyaan
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#0F172A]">
            <MathText text={effectivePrompt} />
          </div>
        </section>

        {/* PG Options A-E */}
        {question.type === QuestionType.PG && question.options && (
          <section aria-label="Pilihan Jawaban" className="space-y-2.5 pt-2">
            {question.options.map((optionText, idx) => {
              const isSelected = selectedPgIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isLocked}
                  onClick={() => onSelectPgOption(question.id, idx)}
                  aria-pressed={isSelected}
                  className={`w-full min-h-[52px] text-left rounded-xl border p-3.5 sm:p-4 transition-colors flex items-start gap-3.5 ${
                    isLocked ? 'cursor-not-allowed opacity-85' : 'cursor-pointer'
                  } ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#0F172A]'
                      : 'border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#93C5FD] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-[#F8FAFC] text-[#1E3A8A] border-[#CBD5E1]'
                    }`}
                  >
                    {OPTION_LETTERS[idx]}
                  </span>
                  <span className="flex-1 text-sm sm:text-base leading-relaxed pt-0.5">
                    <MathText text={optionText} />
                  </span>
                  {isSelected && (
                    <Check
                      className="w-4 h-4 text-[#2563EB] shrink-0 mt-1.5"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </section>
        )}

        {/* Essay Math Editor */}
        {question.type === QuestionType.ESSAY && (
          <section aria-label="Area Jawaban Esai Matematis" className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label
                htmlFor={`essay-textarea-${question.id}`}
                className="text-xs font-semibold text-[#1E3A8A]"
              >
                Lembar Jawaban Esai (Tuliskan diketahui, rumus, langkah penyelesaian, dan kesimpulan)
              </label>
              <span className="text-[11px] text-[#64748B]">
                Tersimpan otomatis saat mengetik
              </span>
            </div>

            {/* Virtual Math Toolbar */}
            <div
              className="rounded-xl border border-[#DBEAFE] bg-[#F8FAFC] p-2.5 space-y-1.5"
              role="toolbar"
              aria-label="Toolbar Simbol Matematika"
            >
              <div className="text-[11px] font-medium text-[#475569]">
                Sisipkan Simbol &amp; Notasi Matematika:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {MATH_TOOLBAR_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    disabled={isLocked}
                    onClick={() => insertMathSymbol(item.insert)}
                    className="min-h-[34px] px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono-tabular font-semibold text-[#1E3A8A] hover:bg-[#EFF6FF] hover:border-[#93C5FD] disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              ref={textareaRef}
              id={`essay-textarea-${question.id}`}
              rows={8}
              disabled={isLocked}
              value={essayValue}
              onChange={(e) => onChangeEssayAnswer(question.id, e.target.value)}
              placeholder="Tuliskan langkah penyelesaian matematis Anda di sini..."
              className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-sm leading-relaxed text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] disabled:bg-[#F8FAFC] disabled:text-[#475569]"
            />
          </section>
        )}
      </article>
    </main>
  );
};
