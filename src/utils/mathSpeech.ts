/**
 * Converts text containing LaTeX math ($...$, $$...$$) and math symbols
 * into natural Indonesian spoken prose for Web Speech API (id-ID).
 * Ensures MR JO never reads raw LaTeX backslashes, braces, or garbled symbols.
 */
export function convertMathToIndonesianSpeech(input: string): string {
  if (!input) return '';

  let text = input;

  // Strip display math delimiters and inline math delimiters cleanly
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, inner) => ` ${speakLatexFragment(inner)} `);
  text = text.replace(/\$([^$]+?)\$/g, (_, inner) => ` ${speakLatexFragment(inner)} `);

  // Also handle stray unicode math symbols outside $...$
  text = replaceUnicodeMathSymbols(text);

  // Normalize whitespace & punctuation pauses
  text = text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();

  return text;
}

function speakLatexFragment(raw: string): string {
  let s = raw.trim();

  // Remove \left and \right sizing directives
  s = s.replace(/\\left\s*/g, '').replace(/\\right\s*/g, '');
  s = s.replace(/\\text\{([^}]*)\}/g, '$1');
  s = s.replace(/\\mathrm\{([^}]*)\}/g, '$1');

  // Iteratively resolve nested \frac{a}{b} (from innermost out)
  for (let i = 0; i < 6; i++) {
    const next = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 per $2');
    if (next === s) break;
    s = next;
  }

  // \sqrt[n]{x} and \sqrt{x}
  s = s.replace(/\\sqrt\[([^\]]+)\]\{([^{}]+)\}/g, 'akar pangkat $1 dari $2');
  for (let i = 0; i < 4; i++) {
    const next = s.replace(/\\sqrt\{([^{}]+)\}/g, 'akar kuadrat dari $1');
    if (next === s) break;
    s = next;
  }

  // Trigonometric powers like \sin^2 x, \cos^2 A, \sin^4 x
  s = s.replace(/\\sin\^2\s*([a-zA-Z0-9\\()]+)/g, 'sinus kuadrat $1');
  s = s.replace(/\\cos\^2\s*([a-zA-Z0-9\\()]+)/g, 'cosinus kuadrat $1');
  s = s.replace(/\\tan\^2\s*([a-zA-Z0-9\\()]+)/g, 'tangen kuadrat $1');
  s = s.replace(/\\sin\^\{?(\d+)\}?\s*/g, 'sinus pangkat $1 ');
  s = s.replace(/\\cos\^\{?(\d+)\}?\s*/g, 'cosinus pangkat $1 ');
  s = s.replace(/\\tan\^\{?(\d+)\}?\s*/g, 'tangen pangkat $1 ');

  // Trigonometric and standard functions
  s = s.replace(/\\sin\b/g, 'sinus');
  s = s.replace(/\\cos\b/g, 'cosinus');
  s = s.replace(/\\tan\b/g, 'tangen');
  s = s.replace(/\\cot\b/g, 'kotangen');
  s = s.replace(/\\sec\b/g, 'sekan');
  s = s.replace(/\\csc\b/g, 'kosekan');

  // Greek letters & constants
  s = s.replace(/\\alpha\b/g, 'alfa');
  s = s.replace(/\\beta\b/g, 'beta');
  s = s.replace(/\\gamma\b/g, 'gamma');
  s = s.replace(/\\theta\b/g, 'teta');
  s = s.replace(/\\pi\b/g, 'pi');
  s = s.replace(/\\Delta\b/g, 'delta');

  // Degrees
  s = s.replace(/\^\s*\\circ/g, ' derajat');
  s = s.replace(/\\circ/g, ' derajat');

  // Relations & operators
  s = s.replace(/\\equiv/g, 'ekuivalen dengan');
  s = s.replace(/\\approx/g, 'kira-kira sama dengan');
  s = s.replace(/\\neq/g, 'tidak sama dengan');
  s = s.replace(/\\leq/g, 'kurang dari atau sama dengan');
  s = s.replace(/\\geq/g, 'lebih dari atau sama dengan');
  s = s.replace(/\\in\b/g, 'anggota himpunan');
  s = s.replace(/\\notin\b/g, 'bukan anggota himpunan');
  s = s.replace(/\\implies/g, 'maka');
  s = s.replace(/\\Rightarrow/g, 'maka');
  s = s.replace(/\\therefore/g, 'jadi');
  s = s.replace(/\\cdot/g, ' dikali ');
  s = s.replace(/\\times/g, ' kali ');
  s = s.replace(/\\div/g, ' dibagi ');
  s = s.replace(/\\pm/g, 'plus minus');

  // Groupings like (a+b)^2 -> a ditambah b, seluruhnya dikuadratkan
  s = s.replace(/\(([^()]+)\)\^2\b/g, '$1, seluruhnya dikuadratkan');
  s = s.replace(/\(([^()]+)\)\^3\b/g, '$1, seluruhnya dipangkatkan tiga');
  s = s.replace(/\(([^()]+)\)\^\{([^{}]+)\}/g, '$1, seluruhnya dipangkatkan $2');

  // Exponents & subscripts
  s = s.replace(/\^2\b/g, ' kuadrat');
  s = s.replace(/\^3\b/g, ' pangkat tiga');
  s = s.replace(/\^\{2\}/g, ' kuadrat');
  s = s.replace(/\^\{3\}/g, ' pangkat tiga');
  s = s.replace(/\^\{([^{}]+)\}/g, ' pangkat $1');
  s = s.replace(/\^([a-zA-Z0-9-]+)/g, ' pangkat $1');
  s = s.replace(/_\{([^{}]+)\}/g, ' indeks $1');
  s = s.replace(/_([a-zA-Z0-9]+)/g, ' indeks $1');

  // Absolute value |x|
  s = s.replace(/\|([^|]+)\|/g, 'nilai mutlak $1');

  // Basic arithmetic symbols inside math
  s = s.replace(/\+/g, ' ditambah ');
  s = s.replace(/=/g, ' sama dengan ');
  s = s.replace(/</g, ' kurang dari ');
  s = s.replace(/>/g, ' lebih dari ');
  s = s.replace(/(\w|\))\s*-\s*(\w|\()/g, '$1 dikurangi $2');
  s = s.replace(/(^|\s)-(\d|[a-zA-Z])/g, '$1negatif $2');

  // Clean up remaining LaTeX braces, backslashes, or commas
  s = s.replace(/\\\{/g, 'himpunan ').replace(/\\\}/g, '');
  s = s.replace(/[{}]/g, '');
  s = s.replace(/\\[a-zA-Z]+/g, ' ');
  s = s.replace(/,/g, ' koma ');

  return replaceUnicodeMathSymbols(s);
}

function replaceUnicodeMathSymbols(s: string): string {
  return s
    .replace(/\(([^()]+)\)\^2\b/g, '$1, seluruhnya dikuadratkan')
    .replace(/\(([^()]+)\)\^3\b/g, '$1, seluruhnya dipangkatkan tiga')
    .replace(/\^2\b/g, ' kuadrat')
    .replace(/\^3\b/g, ' pangkat tiga')
    .replace(/²/g, ' kuadrat')
    .replace(/³/g, ' pangkat tiga')
    .replace(/√\(([^)]+)\)/g, 'akar kuadrat dari $1')
    .replace(/√([a-zA-Z0-9]+)/g, 'akar kuadrat $1')
    .replace(/°/g, ' derajat')
    .replace(/π/g, ' pi ')
    .replace(/θ/g, ' teta ')
    .replace(/α/g, ' alfa ')
    .replace(/β/g, ' beta ')
    .replace(/≡/g, ' ekuivalen dengan ')
    .replace(/≠/g, ' tidak sama dengan ')
    .replace(/≤/g, ' kurang dari atau sama dengan ')
    .replace(/≥/g, ' lebih dari atau sama dengan ')
    .replace(/±/g, ' plus minus ')
    .replace(/×/g, ' kali ')
    .replace(/÷/g, ' dibagi ')
    .replace(/→/g, ' menuju ')
    .replace(/∴/g, ' jadi ');
}

export function buildQuestionSpeechScript(params: {
  questionNumber: number;
  indicatorTitle: string;
  stimulusTitle: string;
  stimulusText?: string;
  prompt: string;
  options?: [string, string, string, string, string];
}): string {
  const parts: string[] = [];
  parts.push(`Soal nomor ${params.questionNumber}. Materi: ${params.indicatorTitle}.`);
  if (params.stimulusText) {
    parts.push(`Informasi stimulus ${params.stimulusTitle}: ${convertMathToIndonesianSpeech(params.stimulusText)}.`);
  }
  parts.push(`Pertanyaan: ${convertMathToIndonesianSpeech(params.prompt)}.`);

  if (params.options) {
    const labels = ['A', 'B', 'C', 'D', 'E'];
    parts.push('Pilihan jawaban:');
    params.options.forEach((opt, idx) => {
      parts.push(`Pilihan ${labels[idx]}: ${convertMathToIndonesianSpeech(opt)}.`);
    });
  } else {
    parts.push('Ini adalah soal esai matematis. Tuliskan langkah penyelesaian dan kesimpulan Anda secara sistematis.');
  }

  return parts.join(' ');
}

export function buildSolutionSpeechScript(params: {
  questionNumber: number;
  diketahui: string[];
  ditanyakan: string;
  landasanTeori: string;
  rumus: string[];
  langkahPenyelesaian: Array<{ stepNumber: number; title: string; detail: string }>;
  kesimpulan: string;
  highlightsRumus: string[];
  quickMethodMrJo: string;
}): string {
  const parts: string[] = [];
  parts.push(`Pembahasan oleh Mister Jo untuk soal nomor ${params.questionNumber}.`);
  parts.push(
    `Diketahui: ${params.diketahui.map((d) => convertMathToIndonesianSpeech(d)).join('. ')}.`
  );
  parts.push(`Ditanyakan: ${convertMathToIndonesianSpeech(params.ditanyakan)}.`);
  parts.push(`Landasan teori: ${convertMathToIndonesianSpeech(params.landasanTeori)}.`);
  parts.push(
    `Rumus utama yang digunakan: ${params.rumus.map((r) => convertMathToIndonesianSpeech(r)).join('. ')}.`
  );
  parts.push('Langkah-langkah penyelesaian:');
  params.langkahPenyelesaian.forEach((step) => {
    parts.push(
      `Langkah ${step.stepNumber}, ${step.title}: ${convertMathToIndonesianSpeech(step.detail)}.`
    );
  });
  parts.push(`Kesimpulan: ${convertMathToIndonesianSpeech(params.kesimpulan)}.`);
  parts.push(
    `Sorotan rumus penting: ${params.highlightsRumus.map((h) => convertMathToIndonesianSpeech(h)).join('. ')}.`
  );
  parts.push(`Metode cepat Mister Jo: ${convertMathToIndonesianSpeech(params.quickMethodMrJo)}.`);
  return parts.join(' ');
}
