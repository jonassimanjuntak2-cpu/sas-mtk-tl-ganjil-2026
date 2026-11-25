import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_QUESTIONS } from '../data/questions';
import { QuestionType } from '../types/assessment';
import {
  clearProgressStorage,
  computeProgressSummary,
  createEmptyProgressState,
  evaluateAssessment,
  loadProgressFromStorage,
  saveProgressToStorage,
  verifyTeacherPassword,
} from './scoring';
import {
  buildQuestionSpeechScript,
  convertMathToIndonesianSpeech,
} from './mathSpeech';
import { approxEqual, degToRad, evalPoly } from './mathVerification';

test('Bank soal memiliki tepat 30 soal: 25 PG dan 5 Esai', () => {
  assert.equal(ALL_QUESTIONS.length, 30);
  const pg = ALL_QUESTIONS.filter((q) => q.type === QuestionType.PG);
  const essay = ALL_QUESTIONS.filter((q) => q.type === QuestionType.ESSAY);
  assert.equal(pg.length, 25);
  assert.equal(essay.length, 5);

  // Verify sequential IDs 1..30
  ALL_QUESTIONS.forEach((q, idx) => {
    assert.equal(q.id, idx + 1);
  });
});

test('Seluruh 26 indikator kisi-kisi tercakup dan Indikator 2 memiliki 2 soal', () => {
  const indicators = new Set(ALL_QUESTIONS.map((q) => q.indicatorNumber));
  for (let i = 1; i <= 26; i++) {
    assert.ok(indicators.has(i), `Indikator ${i} harus ada`);
  }

  const ind2Count = ALL_QUESTIONS.filter((q) => q.indicatorNumber === 2).length;
  assert.equal(ind2Count, 2);

  const ind23 = ALL_QUESTIONS.find((q) => q.indicatorNumber === 23);
  assert.ok(ind23);
  assert.equal(ind23.type, QuestionType.ESSAY);
  assert.equal(ind23.isEditableSlot, true);
  assert.equal(ind23.waitingStatusText, 'Menunggu konfirmasi materi indikator 23');
});

test('Semua soal PG memiliki tepat 5 opsi (A-E) dan 1 indeks jawaban benar valid', () => {
  const pg = ALL_QUESTIONS.filter((q) => q.type === QuestionType.PG);
  for (const q of pg) {
    assert.ok(Array.isArray(q.options) && q.options.length === 5, `Q${q.id} harus punya 5 opsi`);
    assert.ok(
      typeof q.correctOptionIndex === 'number' &&
        q.correctOptionIndex >= 0 &&
        q.correctOptionIndex <= 4,
      `Q${q.id} harus punya 1 kunci valid 0..4`
    );
    assert.equal(new Set(q.options).size, 5, `Q${q.id} tidak boleh punya opsi duplikat`);
  }
});

test('Verifikasi matematis independen untuk seluruh soal Polinomial (Q1-Q12)', () => {
  // Q1: S(x) = P(x)Q(x) - R(x), a=3 => coeff x^3 = -8, coeff x^2 = 14
  const P = [2, -3, 3, -4];
  const Q = [1, 4, -2];
  const R = [3, -5, 0, 7, -1];
  const xTest = 2.5;
  const S_val = evalPoly(P, xTest) * evalPoly(Q, xTest) - evalPoly(R, xTest);
  const S_expected = evalPoly([2, 2, -8, 14, -29, 9], xTest);
  assert.ok(approxEqual(S_val, S_expected));

  // Q2: f(x) = (x^2 - 2x - 3)(2x^2 - x + 8) + (6x + 30)
  for (const x of [-2, -1, 0, 1, 3, 4]) {
    const lhs = evalPoly([2, -5, 4, -7, 6], x);
    const rhs = evalPoly([1, -2, -3], x) * evalPoly([2, -1, 8], x) + (6 * x + 30);
    assert.equal(lhs, rhs);
  }

  // Q3: 6x^3 - 7x^2 - 16x + 15 = (2x - 3)(3x^2 + x - 13/2) - 9/2
  for (const x of [-1, 0, 1.5, 2, 5]) {
    const lhs = evalPoly([6, -7, -16, 15], x);
    const rhs = (2 * x - 3) * evalPoly([3, 1, -6.5], x) - 4.5;
    assert.ok(approxEqual(lhs, rhs));
  }

  // Q4: k = 5 => P(2) = 2*Q(-1), P(1)+Q(1) = 17
  const P4 = [1, -3, 2, 15, -6];
  const Q4 = [2, 5, -4, 5];
  assert.equal(evalPoly(P4, 2), 2 * evalPoly(Q4, -1));
  assert.equal(evalPoly(P4, 1) + evalPoly(Q4, 1), 17);

  // Q5: A=2, B=3, C=-1 => A^2+B^2-C^2 = 12
  for (const x of [0, 1, 3, -2, 5]) {
    const lhs = (4 * x * x + 15 * x - 1) / ((x + 1) * (x - 2) * (x + 3));
    const rhs = 2 / (x + 1) + 3 / (x - 2) + -1 / (x + 3);
    assert.ok(approxEqual(lhs, rhs));
  }
  assert.equal(2 * 2 + 3 * 3 - (-1) * (-1), 12);

  // Q6: roots -2, -0.5, 2, 3 => 4*x1*x2 + x3 + x4 = 9
  const P6 = [2, -5, -11, 20, 12];
  for (const r of [-2, -0.5, 2, 3]) {
    assert.ok(approxEqual(evalPoly(P6, r), 0));
  }
  assert.equal(4 * (-2 * -0.5) + 2 + 3, 9);

  // Q7: S(x) = 5x + 2 matches P(2)=12, P(-2)=-8
  assert.equal(5 * 2 + 2, 12);
  assert.equal(5 * -2 + 2, -8);

  // Q8: V(4) = 4*(24-8)*(18-8)/? -> x(24-2x)(18-2x) at x=4 = 4*16*10 = 640
  assert.equal(4 * (24 - 8) * (18 - 8), 640);

  // Q9: (2x-1)(x+3)(x+1)(x-5) = 2x^4 - 3x^3 - 33x^2 - 13x + 15
  for (const x of [-3, -1, 0, 0.5, 1, 5]) {
    const lhs = (2 * x - 1) * (x + 3) * (x + 1) * (x - 5);
    const rhs = evalPoly([2, -3, -33, -13, 15], x);
    assert.ok(approxEqual(lhs, rhs));
  }

  // Q10: m=-10, F(-0.5)=G(-0.5), F(1.5)=-21/2
  const F10 = [4, -10, -5, 6];
  const G10 = [2, -3, 7, 10];
  assert.ok(approxEqual(evalPoly(F10, -0.5), evalPoly(G10, -0.5)));
  assert.ok(approxEqual(evalPoly(F10, 1.5), -10.5));

  // Q11: P(x) = (x^2-1)(2x-1) => P(2)=9, P(-2)=-15, P(-1.5)=-5
  const P11 = (x: number) => (x * x - 1) * (2 * x - 1);
  assert.ok(approxEqual(P11(1), 0));
  assert.ok(approxEqual(P11(-1), 0));
  assert.ok(approxEqual(P11(0.5), 0));
  assert.equal(P11(2), 9);
  assert.equal(P11(-2), -15);
  assert.equal(P11(-1.5), -5);

  // Q12: a=2, b=-3 => P(2)=12, P(-1)=3, 3a-2b=12
  const P12 = [1, 2, -5, -3, 6];
  assert.equal(evalPoly(P12, 2), 12);
  assert.equal(evalPoly(P12, -1), 3);
  assert.equal(3 * 2 - 2 * -3, 12);
});

test('Verifikasi matematis independen untuk soal Trigonometri PG & Esai (Q13-Q30)', () => {
  // Q13
  const alpha = Math.atan2(12, -5);
  const beta = Math.PI + Math.acos(8 / 17);
  const res13 =
    (13 * (Math.sin(alpha) + Math.cos(alpha)) + 17 * Math.sin(beta)) /
    (8 * Math.tan(beta));
  assert.ok(approxEqual(res13, -8 / 15));

  // Q14
  for (const deg of [25, 37, 63]) {
    const t = degToRad(deg);
    const expr =
      (Math.sin(Math.PI + t) * Math.cos(Math.PI / 2 - t) * Math.tan((3 * Math.PI) / 2 + t)) /
      (Math.cos(2 * Math.PI - t) * Math.sin(Math.PI / 2 + t));
    assert.ok(approxEqual(expr, Math.tan(t)));
  }

  // Q15
  const a15 = Math.atan(0.5);
  const b15 = Math.atan(1 / 3);
  assert.ok(approxEqual(Math.sin(a15 + b15) * Math.cos(a15 - b15), 0.7));

  // Q17
  const theta17 = Math.atan2(-4, -3);
  assert.ok(approxEqual(Math.cos(theta17 + Math.PI / 2), 4 / 5));
  assert.ok(approxEqual(Math.sin(theta17 + Math.PI / 2), -3 / 5));
  assert.ok(approxEqual(Math.tan(theta17), 4 / 3));

  // Q18: cos(A+B)=1/4, cos(A-B)=3/4
  const sumAB = Math.acos(0.25);
  const diffAB = Math.acos(0.75);
  const A18 = (sumAB + diffAB) / 2;
  const B18 = (sumAB - diffAB) / 2;
  assert.ok(approxEqual(Math.tan(A18) * Math.tan(B18), 0.5));

  // Q19: sin x - cos x = 1/2, x in (pi/4, pi/2)
  const sin2x = 0.75;
  const cos2x = -Math.sqrt(7) / 4;
  assert.ok(approxEqual(2 * sin2x * cos2x, (-3 * Math.sqrt(7)) / 8));

  // Q20 & Q21
  for (const deg of [20, 35, 70]) {
    const x = degToRad(deg);
    const M = (1 - Math.cos(2 * x) + Math.sin(2 * x)) / (1 + Math.cos(2 * x) + Math.sin(2 * x));
    assert.ok(approxEqual(M, 1 / Math.tan(Math.PI / 2 - x)));

    const p = Math.cos(x);
    const K =
      Math.sin(Math.PI + 2 * x) * Math.tan(Math.PI / 2 - x) -
      Math.cos(2 * Math.PI - 2 * x);
    assert.ok(approxEqual(K, 1 - 4 * p * p));
  }

  // Q22 & Q23 graph coordinates
  const f22 = (x: number) => 3 * Math.sin(2 * x - Math.PI / 3) + 1;
  assert.ok(approxEqual(f22(Math.PI / 6), 1));
  assert.ok(approxEqual(f22((5 * Math.PI) / 12), 4));
  assert.ok(approxEqual(f22((11 * Math.PI) / 12), -2));

  const f23 = (x: number) => 2 * Math.cos(2 * x - Math.PI / 3) - 1;
  assert.ok(approxEqual(f23(0), 0));
  assert.ok(approxEqual(f23(Math.PI / 6), 1));
  assert.ok(approxEqual(f23((2 * Math.PI) / 3), -3));
  assert.ok(approxEqual(f23((7 * Math.PI) / 6), 1));

  // Q24 tidal height
  const h24 = (t: number) => 1.2 * Math.cos((Math.PI / 6) * (t - 4)) + 2.4;
  assert.ok(approxEqual(h24(4), 3.6));
  assert.ok(approxEqual(h24(10), 1.2));
  assert.ok(approxEqual(h24(12), 1.8));

  // Q25 elevation
  const hPrime = 20 * Math.sqrt(3);
  assert.ok(approxEqual(hPrime / Math.tan(degToRad(30)) - hPrime / Math.tan(degToRad(60)), 40));

  // Q27, Q28, Q29, Q30 essay checks
  const theta27 = Math.acos(4 / 5);
  assert.ok(approxEqual(15 / Math.sin(theta27), 25));
  assert.ok(approxEqual(15 / Math.sin(2 * theta27), 15.625));
  assert.ok(approxEqual(15 / Math.tan(theta27) - 15 / Math.tan(2 * theta27), 15.625));

  const tanTheta28 = (d: number) => (6 * d) / (d * d + 16);
  assert.ok(approxEqual(tanTheta28(4), 0.75));
  assert.ok(approxEqual(tanTheta28(2), 0.6));
  assert.ok(approxEqual(tanTheta28(8), 0.6));

  for (const deg of [15, 32, 60]) {
    const x = degToRad(deg);
    const lhs29 = (Math.sin(2 * x) / (1 + Math.cos(2 * x))) * (Math.cos(x) / (1 + Math.cos(x)));
    assert.ok(approxEqual(lhs29, Math.tan(x / 2)));

    const lhs30 = Math.pow(Math.sin(x), 4) + Math.pow(Math.cos(x), 4);
    assert.ok(approxEqual(lhs30, (3 + Math.cos(4 * x)) / 4));
  }
  assert.ok(approxEqual(Math.pow(Math.sin(degToRad(15)), 4) + Math.pow(Math.cos(degToRad(15)), 4), 7 / 8));
});

test('Konverter audio MR JO tidak menyisakan kode LaTeX mentah', () => {
  const sample = buildQuestionSpeechScript({
    questionNumber: 1,
    indicatorTitle: 'Identitas',
    stimulusTitle: 'Rumus',
    stimulusText: 'Diketahui $\\frac{1 - \\cos 2x}{\\sqrt{x^2 + 1}}$ dan $(a+b)^2$',
    prompt: 'Nilai $\\sin 2x$ untuk $x = 30^\\circ$ adalah...',
    options: ['$\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$1$', '$0$', '$-1$'],
  });

  assert.equal(sample.includes('\\frac'), false);
  assert.equal(sample.includes('\\sqrt'), false);
  assert.equal(sample.includes('$'), false);
  assert.equal(sample.includes('{'), false);
  assert.ok(sample.includes('sinus 2x') || sample.includes('sinus dua x') || sample.includes('sinus 2 x') || sample.includes('sinus'));
  assert.ok(convertMathToIndonesianSpeech('(a+b)^2').includes('seluruhnya dikuadratkan'));
});

test('Sistem progres, localStorage, penilaian PG/Esai, dan password Mode Guru bekerja akurat', () => {
  assert.equal(verifyTeacherPassword('ABC'), true);
  assert.equal(verifyTeacherPassword('abc'), false);
  assert.equal(verifyTeacherPassword(''), false);

  const mem = new Map<string, string>();
  const mockStorage = {
    getItem: (k: string) => mem.get(k) ?? null,
    setItem: (k: string, v: string) => {
      mem.set(k, v);
    },
    removeItem: (k: string) => {
      mem.delete(k);
    },
  };

  let state = createEmptyProgressState('Nadia Putri', 'XI-A');
  state.pgAnswers[1] = ALL_QUESTIONS[0].correctOptionIndex!;
  state.pgAnswers[2] = (ALL_QUESTIONS[1].correctOptionIndex! + 1) % 5; // wrong
  state.essayAnswers[27] = 'Langkah 1: cos theta = 4/5.';
  saveProgressToStorage(state, mockStorage);

  const reloaded = loadProgressFromStorage(mockStorage);
  assert.ok(reloaded);
  assert.equal(reloaded.studentName, 'Nadia Putri');
  assert.equal(reloaded.pgAnswers[1], ALL_QUESTIONS[0].correctOptionIndex);
  assert.equal(reloaded.essayAnswers[27], 'Langkah 1: cos theta = 4/5.');

  const summary = computeProgressSummary(ALL_QUESTIONS, reloaded);
  assert.equal(summary.totalQuestions, 30);
  assert.equal(summary.answeredCount, 3);
  assert.equal(summary.unansweredCount, 27);
  assert.equal(summary.progressPercent, 10);

  reloaded.essayGrades[27] = {
    conceptScore: 2,
    formulaScore: 2,
    processScore: 1,
    calculationScore: 2,
    conclusionScore: 1,
    teacherNote: 'Bagus, lengkapi kesimpulan.',
  };

  const evalResult = evaluateAssessment(ALL_QUESTIONS, reloaded);
  assert.equal(evalResult.pgCorrectCount, 1);
  assert.equal(evalResult.pgScore, 2);
  assert.equal(evalResult.essayScore, 8);
  assert.equal(evalResult.finalScore, 10);

  clearProgressStorage(mockStorage);
  assert.equal(loadProgressFromStorage(mockStorage), null);
});
