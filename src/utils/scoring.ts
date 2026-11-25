import {
  EssayGrade,
  Indicator23Override,
  Question,
  QuestionType,
  StudentProgressState,
  TopicCategory,
} from '../types/assessment';

export const STORAGE_KEY = 'mtk_tl_pro_sumatif_state_v1';
export const TEACHER_MODE_PASSWORD = 'ABC';

export const DEFAULT_INDICATOR_23_OVERRIDE: Indicator23Override = {
  isConfigured: false,
  customTitle: 'Indikator 23 — Referensi Sumatif Nomor 3',
  customStimulusText: '',
  customPrompt: '',
  customAnswerGuide: '',
  customSolutionSummary: '',
};

export function createEmptyProgressState(
  studentName: string,
  studentClass: string
): StudentProgressState {
  const now = new Date().toISOString();
  return {
    studentName: studentName.trim(),
    studentClass: studentClass.trim(),
    startedAt: now,
    lastSavedAt: now,
    elapsedSeconds: 0,
    currentQuestionId: 1,
    pgAnswers: {},
    essayAnswers: {},
    isSubmitted: false,
    essayGrades: {},
    indicator23Override: { ...DEFAULT_INDICATOR_23_OVERRIDE },
  };
}

export function verifyTeacherPassword(passwordInput: string): boolean {
  return passwordInput.trim() === TEACHER_MODE_PASSWORD;
}

export function isQuestionAnswered(
  question: Question,
  state: StudentProgressState
): boolean {
  if (question.type === QuestionType.PG) {
    return typeof state.pgAnswers[question.id] === 'number';
  }
  const text = state.essayAnswers[question.id];
  return typeof text === 'string' && text.trim().length > 0;
}

export interface ProgressSummary {
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  progressPercent: number;
  pgTotal: number;
  pgAnswered: number;
  essayTotal: number;
  essayAnswered: number;
}

export function computeProgressSummary(
  questions: Question[],
  state: StudentProgressState
): ProgressSummary {
  const pgQuestions = questions.filter((q) => q.type === QuestionType.PG);
  const essayQuestions = questions.filter((q) => q.type === QuestionType.ESSAY);

  const pgAnswered = pgQuestions.filter((q) => isQuestionAnswered(q, state)).length;
  const essayAnswered = essayQuestions.filter((q) => isQuestionAnswered(q, state)).length;
  const answeredCount = pgAnswered + essayAnswered;
  const totalQuestions = questions.length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent =
    totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  return {
    totalQuestions,
    answeredCount,
    unansweredCount,
    progressPercent,
    pgTotal: pgQuestions.length,
    pgAnswered,
    essayTotal: essayQuestions.length,
    essayAnswered,
  };
}

export function getEssayGradeTotal(grade?: EssayGrade): number {
  if (!grade) return 0;
  return (
    clampScore(grade.conceptScore, 2) +
    clampScore(grade.formulaScore, 2) +
    clampScore(grade.processScore, 2) +
    clampScore(grade.calculationScore, 2) +
    clampScore(grade.conclusionScore, 2)
  );
}

function clampScore(value: number, max: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(max, Math.round(value * 10) / 10));
}

export interface AssessmentEvaluation {
  pgCorrectCount: number;
  pgTotalCount: number;
  pgScore: number;
  pgMaxScore: number;
  essayGradedCount: number;
  essayTotalCount: number;
  essayScore: number;
  essayMaxScore: number;
  finalScore: number;
  maxScore: number;
  achievementPercent: number;
  topicAnalysis: Array<{
    category: TopicCategory;
    correct: number;
    total: number;
    accuracyPercent: number;
    needsReview: boolean;
  }>;
  weakIndicators: Array<{
    questionId: number;
    indicatorNumber: number;
    indicatorTitle: string;
  }>;
}

export function evaluateAssessment(
  questions: Question[],
  state: StudentProgressState
): AssessmentEvaluation {
  const pgQuestions = questions.filter((q) => q.type === QuestionType.PG);
  const essayQuestions = questions.filter((q) => q.type === QuestionType.ESSAY);

  let pgCorrectCount = 0;
  let pgScore = 0;
  let pgMaxScore = 0;

  const weakIndicators: AssessmentEvaluation['weakIndicators'] = [];

  for (const q of pgQuestions) {
    pgMaxScore += q.weight;
    const chosen = state.pgAnswers[q.id];
    if (typeof chosen === 'number' && chosen === q.correctOptionIndex) {
      pgCorrectCount += 1;
      pgScore += q.weight;
    } else {
      weakIndicators.push({
        questionId: q.id,
        indicatorNumber: q.indicatorNumber,
        indicatorTitle: q.indicatorTitle,
      });
    }
  }

  let essayScore = 0;
  let essayMaxScore = 0;
  let essayGradedCount = 0;

  for (const q of essayQuestions) {
    essayMaxScore += q.weight;
    const grade = state.essayGrades[q.id];
    if (grade) {
      essayGradedCount += 1;
      // Scale 10-point rubric to q.weight
      essayScore += (getEssayGradeTotal(grade) / 10) * q.weight;
    }
  }

  const finalScore = Math.round((pgScore + essayScore) * 10) / 10;
  const maxScore = pgMaxScore + essayMaxScore;
  const achievementPercent =
    maxScore === 0 ? 0 : Math.round((finalScore / maxScore) * 100);

  const categories = [TopicCategory.POLINOMIAL, TopicCategory.TRIGONOMETRI];
  const topicAnalysis = categories.map((category) => {
    const inCat = pgQuestions.filter((q) => q.category === category);
    const correct = inCat.filter(
      (q) => state.pgAnswers[q.id] === q.correctOptionIndex
    ).length;
    const total = inCat.length;
    const accuracyPercent = total === 0 ? 0 : Math.round((correct / total) * 100);
    return {
      category,
      correct,
      total,
      accuracyPercent,
      needsReview: accuracyPercent < 75,
    };
  });

  return {
    pgCorrectCount,
    pgTotalCount: pgQuestions.length,
    pgScore,
    pgMaxScore,
    essayGradedCount,
    essayTotalCount: essayQuestions.length,
    essayScore: Math.round(essayScore * 10) / 10,
    essayMaxScore,
    finalScore,
    maxScore,
    achievementPercent,
    topicAnalysis,
    weakIndicators,
  };
}

export function loadProgressFromStorage(
  storage: Pick<Storage, 'getItem'> | undefined = typeof window !== 'undefined'
    ? window.localStorage
    : undefined
): StudentProgressState | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StudentProgressState>;
    if (!parsed || typeof parsed.studentName !== 'string' || !parsed.studentName.trim()) {
      return null;
    }
    return {
      studentName: parsed.studentName,
      studentClass: parsed.studentClass ?? '',
      startedAt: parsed.startedAt ?? new Date().toISOString(),
      lastSavedAt: parsed.lastSavedAt ?? new Date().toISOString(),
      elapsedSeconds: typeof parsed.elapsedSeconds === 'number' ? parsed.elapsedSeconds : 0,
      currentQuestionId:
        typeof parsed.currentQuestionId === 'number' &&
        parsed.currentQuestionId >= 1 &&
        parsed.currentQuestionId <= 30
          ? parsed.currentQuestionId
          : 1,
      pgAnswers: parsed.pgAnswers ?? {},
      essayAnswers: parsed.essayAnswers ?? {},
      isSubmitted: Boolean(parsed.isSubmitted),
      submittedAt: parsed.submittedAt,
      essayGrades: parsed.essayGrades ?? {},
      indicator23Override: parsed.indicator23Override ?? {
        ...DEFAULT_INDICATOR_23_OVERRIDE,
      },
    };
  } catch {
    return null;
  }
}

export function saveProgressToStorage(
  state: StudentProgressState,
  storage: Pick<Storage, 'setItem'> | undefined = typeof window !== 'undefined'
    ? window.localStorage
    : undefined
): void {
  if (!storage) return;
  try {
    const payload: StudentProgressState = {
      ...state,
      lastSavedAt: new Date().toISOString(),
    };
    storage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function clearProgressStorage(
  storage: Pick<Storage, 'removeItem'> | undefined = typeof window !== 'undefined'
    ? window.localStorage
    : undefined
): void {
  if (!storage) return;
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}

export function formatDuration(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}
