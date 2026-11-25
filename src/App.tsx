import React, { useEffect, useState } from 'react';
import { ALL_QUESTIONS } from './data/questions';
import {
  AppScreen,
  EssayGrade,
  Indicator23Override,
  StudentProgressState,
} from './types/assessment';
import {
  clearProgressStorage,
  createEmptyProgressState,
  loadProgressFromStorage,
  saveProgressToStorage,
  verifyTeacherPassword,
} from './utils/scoring';
import { TopNavigation } from './components/TopNavigation';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { QuestionWorkspace } from './components/QuestionWorkspace';
import { SubmittedView } from './components/SubmittedView';
import { TeacherDashboard } from './components/TeacherDashboard';

export default function App() {
  const [savedSession, setSavedSession] = useState<StudentProgressState | null>(() =>
    loadProgressFromStorage()
  );
  const [state, setState] = useState<StudentProgressState | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return loadProgressFromStorage() ?? createEmptyProgressState('Murid Uji', 'XI-A');
      }
    }
    return null;
  });

  const [screen, setScreen] = useState<AppScreen>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        const loaded = loadProgressFromStorage();
        return loaded?.isSubmitted ? 'submitted' : 'dashboard';
      }
    }
    return 'login';
  });

  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState(false);
  const [isNumberPanelOpen, setIsNumberPanelOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [teacherPasswordInput, setTeacherPasswordInput] = useState('');
  const [teacherPasswordError, setTeacherPasswordError] = useState('');
  const [saveFeedbackText, setSaveFeedbackText] = useState('');

  // Auto-save whenever state updates
  useEffect(() => {
    if (state) {
      saveProgressToStorage(state);
      setSavedSession(state);
    }
  }, [state]);

  // Track elapsed study time while active and not submitted
  useEffect(() => {
    if (!state || state.isSubmitted || screen === 'login') return;
    const timer = window.setInterval(() => {
      setState((prev) => {
        if (!prev || prev.isSubmitted) return prev;
        return {
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [Boolean(state), state?.isSubmitted, screen]);

  const showSavedFeedback = (label = 'Tersimpan') => {
    setSaveFeedbackText(label);
    window.setTimeout(() => setSaveFeedbackText(''), 2200);
  };

  const handleStartNew = (studentName: string, studentClass: string) => {
    const fresh = createEmptyProgressState(studentName, studentClass);
    saveProgressToStorage(fresh);
    setSavedSession(fresh);
    setState(fresh);
    setIsTeacherUnlocked(false);
    setIsNumberPanelOpen(false);
    setScreen('dashboard');
  };

  const handleResumeExisting = () => {
    const loaded = loadProgressFromStorage();
    if (!loaded) return;
    setState(loaded);
    setIsNumberPanelOpen(false);
    setScreen(loaded.isSubmitted ? 'submitted' : 'dashboard');
  };

  const handleStartOrContinue = (questionId?: number) => {
    if (!state) return;
    const targetId =
      typeof questionId === 'number' && questionId >= 1 && questionId <= ALL_QUESTIONS.length
        ? questionId
        : state.currentQuestionId;

    setState((prev) => (prev ? { ...prev, currentQuestionId: targetId } : prev));
    setIsNumberPanelOpen(false);
    setScreen('quiz');
    window.scrollTo(0, 0);
  };

  const handleSelectQuestion = (questionId: number) => {
    if (!state) return;
    setState((prev) => (prev ? { ...prev, currentQuestionId: questionId } : prev));
    setIsNumberPanelOpen(false);
    setScreen('quiz');
    window.scrollTo(0, 0);
  };

  const handlePrevQuestion = () => {
    if (!state || state.currentQuestionId <= 1) return;
    handleSelectQuestion(state.currentQuestionId - 1);
  };

  const handleNextQuestion = () => {
    if (!state || state.currentQuestionId >= ALL_QUESTIONS.length) return;
    handleSelectQuestion(state.currentQuestionId + 1);
  };

  const handleSelectPgOption = (questionId: number, optionIndex: number) => {
    setState((prev) => {
      if (!prev || prev.isSubmitted) return prev;
      return {
        ...prev,
        pgAnswers: {
          ...prev.pgAnswers,
          [questionId]: optionIndex,
        },
      };
    });
    showSavedFeedback('Jawaban tersimpan');
  };

  const handleChangeEssayAnswer = (questionId: number, text: string) => {
    setState((prev) => {
      if (!prev || prev.isSubmitted) return prev;
      return {
        ...prev,
        essayAnswers: {
          ...prev.essayAnswers,
          [questionId]: text,
        },
      };
    });
  };

  const handleManualSave = () => {
    if (!state) return;
    saveProgressToStorage(state);
    showSavedFeedback('Progres tersimpan');
  };

  const handleConfirmSubmit = () => {
    if (!state) return;
    const submittedState: StudentProgressState = {
      ...state,
      isSubmitted: true,
      submittedAt: new Date().toISOString(),
    };
    saveProgressToStorage(submittedState);
    setState(submittedState);
    setIsSubmitModalOpen(false);
    setIsNumberPanelOpen(false);
    setScreen('submitted');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProgress = () => {
    clearProgressStorage();
    setSavedSession(null);
    setState(null);
    setIsTeacherUnlocked(false);
    setIsNumberPanelOpen(false);
    setScreen('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTeacherModal = () => {
    if (isTeacherUnlocked && state) {
      setScreen('teacher');
      setIsNumberPanelOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTeacherPasswordInput('');
    setTeacherPasswordError('');
    setIsTeacherModalOpen(true);
  };

  const handleSubmitTeacherPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyTeacherPassword(teacherPasswordInput)) {
      setTeacherPasswordError('Password salah. Akses Mode Guru ditolak.');
      return;
    }

    // Ensure a session object exists if teacher opens Mode Guru directly from login screen
    if (!state) {
      const fallback =
        loadProgressFromStorage() ?? createEmptyProgressState('Pratinjau Guru', 'Mode Guru');
      setState(fallback);
    }

    setIsTeacherUnlocked(true);
    setIsTeacherModalOpen(false);
    setTeacherPasswordError('');
    setTeacherPasswordInput('');
    setIsNumberPanelOpen(false);
    setScreen('teacher');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitTeacherMode = () => {
    if (!state) {
      setScreen('login');
      return;
    }
    setScreen(state.isSubmitted ? 'submitted' : 'dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveEssayGrade = (questionId: number, grade: EssayGrade) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        essayGrades: {
          ...prev.essayGrades,
          [questionId]: grade,
        },
      };
    });
    showSavedFeedback('Nilai esai disimpan');
  };

  const handleSaveIndicator23 = (override: Indicator23Override) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        indicator23Override: override,
      };
    });
    showSavedFeedback('Indikator 23 diperbarui');
  };

  const currentQuestion =
    ALL_QUESTIONS.find((q) => q.id === (state?.currentQuestionId ?? 1)) ?? ALL_QUESTIONS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <TopNavigation
        screen={screen}
        questions={ALL_QUESTIONS}
        state={state}
        isTeacherUnlocked={isTeacherUnlocked}
        isNumberPanelOpen={isNumberPanelOpen}
        isSubmitModalOpen={isSubmitModalOpen}
        isTeacherModalOpen={isTeacherModalOpen}
        teacherPasswordInput={teacherPasswordInput}
        teacherPasswordError={teacherPasswordError}
        saveFeedbackText={saveFeedbackText}
        onNavigateDashboard={() => {
          if (!state) return;
          setIsNumberPanelOpen(false);
          setScreen(state.isSubmitted ? 'submitted' : 'dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleNumberPanel={() => setIsNumberPanelOpen((v) => !v)}
        onSelectQuestion={handleSelectQuestion}
        onPrevQuestion={handlePrevQuestion}
        onNextQuestion={handleNextQuestion}
        onManualSave={handleManualSave}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onCloseSubmitModal={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
        onOpenTeacherModal={handleOpenTeacherModal}
        onCloseTeacherModal={() => setIsTeacherModalOpen(false)}
        onTeacherPasswordChange={(v) => {
          setTeacherPasswordInput(v);
          if (teacherPasswordError) setTeacherPasswordError('');
        }}
        onSubmitTeacherPassword={handleSubmitTeacherPassword}
        onExitTeacherMode={handleExitTeacherMode}
      />

      <div className="flex-1">
        {screen === 'login' && (
          <LoginView
            existingSession={savedSession}
            questions={ALL_QUESTIONS}
            onStartNew={handleStartNew}
            onResumeExisting={handleResumeExisting}
          />
        )}

        {screen === 'dashboard' && state && (
          <DashboardView
            state={state}
            questions={ALL_QUESTIONS}
            onStartOrContinue={handleStartOrContinue}
            onResetProgress={handleResetProgress}
          />
        )}

        {screen === 'quiz' && state && (
          <QuestionWorkspace
            question={currentQuestion}
            totalQuestions={ALL_QUESTIONS.length}
            state={state}
            onSelectPgOption={handleSelectPgOption}
            onChangeEssayAnswer={handleChangeEssayAnswer}
          />
        )}

        {screen === 'submitted' && state && (
          <SubmittedView
            state={state}
            questions={ALL_QUESTIONS}
            onGoDashboard={() => setScreen('dashboard')}
            onOpenTeacherModal={handleOpenTeacherModal}
          />
        )}

        {screen === 'teacher' && state && isTeacherUnlocked && (
          <TeacherDashboard
            state={state}
            questions={ALL_QUESTIONS}
            onSaveEssayGrade={handleSaveEssayGrade}
            onSaveIndicator23={handleSaveIndicator23}
            onResetProgress={handleResetProgress}
          />
        )}
      </div>

      {/* Mandatory Anti-Misclick Bottom Safe Zone (260px completely empty & non-interactive) */}
      <div
        aria-hidden="true"
        data-testid="bottom-safe-zone"
        className="h-[260px] w-full pointer-events-none select-none shrink-0"
      />
    </div>
  );
}
