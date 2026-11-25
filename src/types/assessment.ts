export enum QuestionType {
  PG = 'PG',
  ESSAY = 'ESSAY',
}

export enum DifficultyLevel {
  DASAR = 'Dasar',
  MENENGAH = 'Menengah',
  TINGGI = 'Tinggi',
}

export enum TopicCategory {
  POLINOMIAL = 'Polinomial',
  TRIGONOMETRI = 'Trigonometri',
  MENUNGGU_KONFIRMASI = 'Menunggu Konfirmasi',
}

export type StimulusKind =
  | 'none'
  | 'photo'
  | 'svg_horner_table'
  | 'svg_unit_circle'
  | 'svg_sine_graph'
  | 'svg_cosine_graph'
  | 'svg_compound_angles'
  | 'svg_elevation_double'
  | 'svg_tower_wires'
  | 'svg_display_board'
  | 'data_table'
  | 'math_box';

export interface StimulusSpec {
  kind: StimulusKind;
  title: string;
  caption?: string;
  imageUrl?: string;
  imageAlt?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  mathLines?: string[];
  textContext?: string;
}

export interface EssayRubricCriterion {
  aspect:
    | 'Ketepatan konsep'
    | 'Ketepatan penggunaan rumus'
    | 'Kelengkapan proses'
    | 'Ketepatan perhitungan'
    | 'Kesimpulan';
  maxPoints: number;
  descriptor: string;
}

export interface SolutionBreakdown {
  diketahui: string[];
  ditanyakan: string;
  landasanTeori: string;
  rumus: string[];
  langkahPenyelesaian: Array<{
    stepNumber: number;
    title: string;
    detail: string;
  }>;
  kesimpulan: string;
  highlightsRumus: string[];
  quickMethodMrJo: string;
  rubrik?: EssayRubricCriterion[];
}

export interface Question {
  id: number; // 1 to 30
  indicatorNumber: number; // 1 to 26
  indicatorTitle: string;
  type: QuestionType;
  category: TopicCategory;
  difficulty: DifficultyLevel;
  stimulus: StimulusSpec;
  prompt: string;
  options?: [string, string, string, string, string]; // A..E for PG
  correctOptionIndex?: number; // 0..4 for PG
  weight: number; // e.g., 2 points per PG (50 total) + 10 points per Essay (50 total) = 100
  isEditableSlot?: boolean; // True for Indicator 23
  waitingStatusText?: string; // "Menunggu konfirmasi materi indikator 23"
  solution: SolutionBreakdown;
}

export interface Indicator23Override {
  isConfigured: boolean;
  customTitle: string;
  customStimulusText: string;
  customPrompt: string;
  customAnswerGuide: string;
  customSolutionSummary: string;
  updatedAt?: string;
}

export interface EssayGrade {
  conceptScore: number; // max 2
  formulaScore: number; // max 2
  processScore: number; // max 2
  calculationScore: number; // max 2
  conclusionScore: number; // max 2
  teacherNote: string;
}

export interface StudentProgressState {
  studentName: string;
  studentClass: string;
  startedAt: string;
  lastSavedAt: string;
  elapsedSeconds: number;
  currentQuestionId: number;
  pgAnswers: Record<number, number>; // questionId -> optionIndex (0..4)
  essayAnswers: Record<number, string>; // questionId -> text
  isSubmitted: boolean;
  submittedAt?: string;
  essayGrades: Record<number, EssayGrade>;
  indicator23Override: Indicator23Override;
}

export type AppScreen = 'login' | 'dashboard' | 'quiz' | 'submitted' | 'teacher';
