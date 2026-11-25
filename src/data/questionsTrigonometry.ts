import {
  DifficultyLevel,
  Question,
  QuestionType,
  TopicCategory,
} from '../types/assessment';

export const TRIGONOMETRY_PG_QUESTIONS: Question[] = [
  {
    id: 13,
    indicatorNumber: 12,
    indicatorTitle: 'Nilai Fungsi Trigonometri di Berbagai Kuadran',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Posisi Sudut pada Kuadran Berbeda',
      textContext:
        'Diketahui dua sudut $\\alpha$ dan $\\beta$ berada pada kuadran yang berbeda dengan informasi berikut:',
      mathLines: [
        '\\tan \\alpha = -\\frac{12}{5}, \\quad \\frac{\\pi}{2} < \\alpha < \\pi',
        '\\cos \\beta = -\\frac{8}{17}, \\quad \\pi < \\beta < \\frac{3\\pi}{2}',
      ],
    },
    prompt:
      'Dengan memperhatikan tanda masing-masing fungsi trigonometri pada kuadrannya, nilai eksak dari $\\frac{13(\\sin \\alpha + \\cos \\alpha) + 17\\sin \\beta}{8\\tan \\beta}$ adalah...',
    options: ['$-\\frac{22}{15}$', '$-\\frac{11}{15}$', '$-\\frac{8}{15}$', '$\\frac{8}{15}$', '$\\frac{22}{15}$'],
    correctOptionIndex: 2,
    solution: {
      diketahui: [
        '$\\tan \\alpha = -\\frac{12}{5}$ dengan $\\alpha \\in \\text{Kuadran II}$ ($\\frac{\\pi}{2} < \\alpha < \\pi$).',
        '$\\cos \\beta = -\\frac{8}{17}$ dengan $\\beta \\in \\text{Kuadran III}$ ($\\pi < \\beta < \\frac{3\\pi}{2}$).',
      ],
      ditanyakan: 'Nilai dari $\\frac{13(\\sin \\alpha + \\cos \\alpha) + 17\\sin \\beta}{8\\tan \\beta}$.',
      landasanTeori:
        'Pada lingkaran koordinat: di Kuadran II hanya sinus dan kosekan bernilai positif ($\\sin > 0, \\cos < 0, \\tan < 0$); di Kuadran III hanya tangen dan kotangen bernilai positif ($\\sin < 0, \\cos < 0, \\tan > 0$). Segitiga acuan siku-siku menggunakan teorema Pythagoras.',
      rumus: [
        'r = \\sqrt{x^2 + y^2}',
        '\\sin \\theta = \\frac{y}{r}, \\quad \\cos \\theta = \\frac{x}{r}, \\quad \\tan \\theta = \\frac{y}{x}',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan nilai $\\sin \\alpha$ dan $\\cos \\alpha$ di Kuadran II',
          detail:
            'Dari $\\tan \\alpha = -\\frac{12}{5}$ di Kuadran II, posisi koordinat adalah $x = -5$ dan $y = 12$. Sisi miring $r = \\sqrt{(-5)^2 + 12^2} = 13$. Maka $\\sin \\alpha = \\frac{12}{13}$ dan $\\cos \\alpha = -\\frac{5}{13}$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan nilai $\\sin \\beta$ dan $\\tan \\beta$ di Kuadran III',
          detail:
            'Dari $\\cos \\beta = -\\frac{8}{17}$ di Kuadran III, diperoleh $x = -8$ dan $r = 17$. Karena di Kuadran III nilai $y < 0$, maka $y = -\\sqrt{17^2 - 8^2} = -\\sqrt{289 - 64} = -15$. Jadi $\\sin \\beta = -\\frac{15}{17}$ dan $\\tan \\beta = \\frac{-15}{-8} = \\frac{15}{8}$.',
        },
        {
          stepNumber: 3,
          title: 'Menghitung pembilang ekspresi',
          detail:
            '$13(\\sin \\alpha + \\cos \\alpha) + 17\\sin \\beta = 13\\left(\\frac{12}{13} - \\frac{5}{13}\\right) + 17\\left(-\\frac{15}{17}\\right) = 7 - 15 = -8$.',
        },
        {
          stepNumber: 4,
          title: 'Menghitung penyebut ekspresi',
          detail: '$8\\tan \\beta = 8\\left(\\frac{15}{8}\\right) = 15$.',
        },
        {
          stepNumber: 5,
          title: 'Menyederhanakan hasil akhir dan memeriksa tanda',
          detail:
            'Rasio akhir adalah $\\frac{-8}{15} = -\\frac{8}{15}$. Seluruh tanda kuadran sudah terverifikasi.',
        },
      ],
      kesimpulan:
        'Nilai dari $\\frac{13(\\sin \\alpha + \\cos \\alpha) + 17\\sin \\beta}{8\\tan \\beta}$ adalah $-\\frac{8}{15}$ (Pilihan C).',
      highlightsRumus: [
        'Ingat urutan positif kuadran (ASTC / Semua-Sin-Tan-Cos): K1 semua $+$, K2 $\\sin +$, K3 $\\tan +$, K4 $\\cos +$.',
        'Tripel Pythagoras yang sering muncul: $(5, 12, 13)$ dan $(8, 15, 17)$.',
      ],
      quickMethodMrJo:
        'Langsung baca tripel Pythagorasnya: $\\alpha \\to (x, y, r) = (-5, 12, 13)$ dan $\\beta \\to (x, y, r) = (-8, -15, 17)$. Ekspresinya langsung menjadi $\\frac{(12 - 5) + (-15)}{15} = -\\frac{8}{15}$!',
    },
  },
  {
    id: 14,
    indicatorNumber: 13,
    indicatorTitle: 'Menyederhanakan Bentuk Trigonometri dengan Rumus Sudut Berelasi',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Ekspresi Sudut Berelasi',
      textContext:
        'Untuk $\\theta$ bukan kelipatan $90^\\circ$, perhatikan bentuk trigonometri berikut:',
      mathLines: [
        'E = \\frac{\\sin(180^\\circ + \\theta) \\cdot \\cos(90^\\circ - \\theta) \\cdot \\tan(270^\\circ + \\theta)}{\\cos(360^\\circ - \\theta) \\cdot \\sin(90^\\circ + \\theta)}',
      ],
    },
    prompt:
      'Bentuk paling sederhana yang ekuivalen dengan $E$ pada domain terdefinisinya adalah...',
    options: [
      '$\\tan \\theta$',
      '$-\\tan \\theta$',
      '$\\cot \\theta$',
      '$-\\cot \\theta$',
      '$\\sin \\theta \\cos \\theta$',
    ],
    correctOptionIndex: 0,
    solution: {
      diketahui: [
        '$E = \\frac{\\sin(180^\\circ + \\theta) \\cdot \\cos(90^\\circ - \\theta) \\cdot \\tan(270^\\circ + \\theta)}{\\cos(360^\\circ - \\theta) \\cdot \\sin(90^\\circ + \\theta)}$',
      ],
      ditanyakan: 'Bentuk paling sederhana dari $E$.',
      landasanTeori:
        'Pada rumus sudut berelasi: sudut patokan $180^\\circ$ dan $360^\\circ$ mempertahankan nama fungsi ($\\sin \\to \\sin$, $\\cos \\to \\cos$), sedangkan sudut patokan $90^\\circ$ dan $270^\\circ$ mengubah nama fungsi menjadi kofungsinya ($\\sin \\leftrightarrow \\cos$, $\\tan \\leftrightarrow \\cot$). Tanda positif/negatif mengikuti kuadran sudut awal saat $\\theta$ dianggap lancip.',
      rumus: [
        '\\sin(180^\\circ + \\theta) = -\\sin \\theta',
        '\\cos(90^\\circ - \\theta) = \\sin \\theta',
        '\\tan(270^\\circ + \\theta) = -\\cot \\theta',
        '\\cos(360^\\circ - \\theta) = \\cos \\theta, \\quad \\sin(90^\\circ + \\theta) = \\cos \\theta',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Mengubah setiap faktor pada pembilang',
          detail:
            '$180^\\circ + \\theta$ berada di Kuadran III sehingga $\\sin(180^\\circ + \\theta) = -\\sin \\theta$. Sudut $90^\\circ - \\theta$ di Kuadran I sehingga $\\cos(90^\\circ - \\theta) = \\sin \\theta$. Sudut $270^\\circ + \\theta$ di Kuadran IV sehingga $\\tan(270^\\circ + \\theta) = -\\cot \\theta$.',
        },
        {
          stepNumber: 2,
          title: 'Mengubah setiap faktor pada penyebut',
          detail:
            'Sudut $360^\\circ - \\theta$ di Kuadran IV sehingga $\\cos(360^\\circ - \\theta) = +\\cos \\theta$. Sudut $90^\\circ + \\theta$ di Kuadran II sehingga $\\sin(90^\\circ + \\theta) = +\\cos \\theta$.',
        },
        {
          stepNumber: 3,
          title: 'Menyubstitusikan seluruh hasil transformasi ke $E$',
          detail:
            '$E = \\frac{(-\\sin \\theta)(\\sin \\theta)(-\\cot \\theta)}{(\\cos \\theta)(\\cos \\theta)} = \\frac{\\sin^2 \\theta \\cdot \\frac{\\cos \\theta}{\\sin \\theta}}{\\cos^2 \\theta}$.',
        },
        {
          stepNumber: 4,
          title: 'Menyederhanakan identitas dasar',
          detail:
            '$E = \\frac{\\sin \\theta \\cos \\theta}{\\cos^2 \\theta} = \\frac{\\sin \\theta}{\\cos \\theta} = \\tan \\theta$.',
        },
        {
          stepNumber: 5,
          title: 'Uji numerik dengan $\\theta = 30^\\circ$',
          detail:
            '$\\frac{\\sin 210^\\circ \\cdot \\cos 60^\\circ \\cdot \\tan 300^\\circ}{\\cos 330^\\circ \\cdot \\sin 120^\\circ} = \\frac{(-\\frac{1}{2})(\\frac{1}{2})(-\\sqrt{3})}{(\\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{3}}{2})} = \\frac{\\sqrt{3}/4}{3/4} = \\frac{\\sqrt{3}}{3} = \\tan 30^\\circ$. Terbukti benar!',
        },
      ],
      kesimpulan: 'Bentuk paling sederhana dari $E$ adalah $\\tan \\theta$ (Pilihan A).',
      highlightsRumus: [
        'Patokan $90^\\circ, 270^\\circ$ $\\to$ fungsi berubah ke kofungsi; patokan $180^\\circ, 360^\\circ$ $\\to$ fungsi tetap.',
      ],
      quickMethodMrJo:
        'Hitung jumlah tanda minusnya dulu: K3-sin ($-$), K1-cos ($+$), K4-tan ($-$) di atas; K4-cos ($+$), K2-sin ($+$) di bawah. Dua tanda minus saling meniadakan sehingga hasil pasti POSITIF! Lalu $\\frac{\\sin \\cdot \\sin \\cdot \\cot}{\\cos \\cdot \\cos} = \\tan \\theta$.',
    },
  },
  {
    id: 15,
    indicatorNumber: 14,
    indicatorTitle: 'Jumlah dan Selisih Dua Sudut',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'svg_compound_angles',
      title: 'Diagram Segitiga Siku-Siku pada Kisi Persegi Satuan',
      caption:
        'Sudut lancip $\\alpha$ dan $\\beta$ dikonstruksi dari dua segitiga siku-siku pada kisi berpetak presisi.',
      textContext:
        'Dari kisi koordinat, diketahui $\\tan \\alpha = \\frac{1}{2}$ dan $\\tan \\beta = \\frac{1}{3}$ dengan $0 < \\beta < \\alpha < \\frac{\\pi}{2}$.',
    },
    prompt:
      'Berdasarkan hubungan jumlah dan selisih dua sudut dari diagram tersebut, nilai eksak dari $\\sin(\\alpha + \\beta) \\cdot \\cos(\\alpha - \\beta)$ adalah...',
    options: ['$\\frac{1}{2}$', '$\\frac{3}{5}$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{7}{10}$', '$\\frac{7\\sqrt{2}}{10}$'],
    correctOptionIndex: 3,
    solution: {
      diketahui: [
        '$\\tan \\alpha = \\frac{1}{2}$ dan $\\tan \\beta = \\frac{1}{3}$.',
        '$\\alpha$ dan $\\beta$ keduanya sudut lancip.',
      ],
      ditanyakan: 'Nilai dari $\\sin(\\alpha + \\beta) \\cdot \\cos(\\alpha - \\beta)$.',
      landasanTeori:
        'Dari nilai tangen sudut lancip, kita dapat menentukan sinus dan cosinus masing-masing sudut melalui segitiga siku-siku, lalu menerapkan rumus sinus jumlah dua sudut dan cosinus selisih dua sudut.',
      rumus: [
        '\\sin(\\alpha + \\beta) = \\sin \\alpha \\cos \\beta + \\cos \\alpha \\sin \\beta',
        '\\cos(\\alpha - \\beta) = \\cos \\alpha \\cos \\beta + \\sin \\alpha \\sin \\beta',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan nilai sinus dan cosinus sudut $\\alpha$ dan $\\beta$',
          detail:
            'Untuk $\\tan \\alpha = \\frac{1}{2}$, sisi miring $= \\sqrt{1^2 + 2^2} = \\sqrt{5}$, sehingga $\\sin \\alpha = \\frac{1}{\\sqrt{5}}$ dan $\\cos \\alpha = \\frac{2}{\\sqrt{5}}$. Untuk $\\tan \\beta = \\frac{1}{3}$, sisi miring $= \\sqrt{1^2 + 3^2} = \\sqrt{10}$, sehingga $\\sin \\beta = \\frac{1}{\\sqrt{10}}$ dan $\\cos \\beta = \\frac{3}{\\sqrt{10}}$.',
        },
        {
          stepNumber: 2,
          title: 'Menghitung $\\sin(\\alpha + \\beta)$',
          detail:
            '$\\sin(\\alpha + \\beta) = \\left(\\frac{1}{\\sqrt{5}}\\right)\\left(\\frac{3}{\\sqrt{10}}\\right) + \\left(\\frac{2}{\\sqrt{5}}\\right)\\left(\\frac{1}{\\sqrt{10}}\\right) = \\frac{3 + 2}{\\sqrt{50}} = \\frac{5}{5\\sqrt{2}} = \\frac{1}{\\sqrt{2}}$. (Ini juga menunjukkan $\\alpha + \\beta = 45^\\circ$!).',
        },
        {
          stepNumber: 3,
          title: 'Menghitung $\\cos(\\alpha - \\beta)$',
          detail:
            '$\\cos(\\alpha - \\beta) = \\left(\\frac{2}{\\sqrt{5}}\\right)\\left(\\frac{3}{\\sqrt{10}}\\right) + \\left(\\frac{1}{\\sqrt{5}}\\right)\\left(\\frac{1}{\\sqrt{10}}\\right) = \\frac{6 + 1}{\\sqrt{50}} = \\frac{7}{\\sqrt{50}}$.',
        },
        {
          stepNumber: 4,
          title: 'Mengalikan kedua nilai',
          detail:
            '$\\sin(\\alpha + \\beta) \\cdot \\cos(\\alpha - \\beta) = \\frac{5}{\\sqrt{50}} \\cdot \\frac{7}{\\sqrt{50}} = \\frac{35}{50} = \\frac{7}{10}$.',
        },
        {
          stepNumber: 5,
          title: 'Verifikasi alternatif dengan identitas tangen',
          detail:
            '$\\tan(\\alpha + \\beta) = \\frac{\\frac{1}{2}+\\frac{1}{3}}{1-\\frac{1}{6}} = 1 \\implies \\alpha + \\beta = 45^\\circ$, dan $\\tan(\\alpha - \\beta) = \\frac{\\frac{1}{2}-\\frac{1}{3}}{1+\\frac{1}{6}} = \\frac{1}{7} \\implies \\cos(\\alpha - \\beta) = \\frac{7}{\\sqrt{50}}$. Hasil kali $\\frac{1}{\\sqrt{2}} \\cdot \\frac{7}{5\\sqrt{2}} = \\frac{7}{10}$. Cocok!',
        },
      ],
      kesimpulan:
        'Nilai dari $\\sin(\\alpha + \\beta) \\cdot \\cos(\\alpha - \\beta)$ adalah $\\frac{7}{10}$ (Pilihan D).',
      highlightsRumus: [
        'Fakta klasik kisi persegi: jika $\\tan \\alpha = \\frac{1}{2}$ dan $\\tan \\beta = \\frac{1}{3}$ (lancip), maka $\\alpha + \\beta = 45^\\circ$.',
      ],
      quickMethodMrJo:
        'Gunakan identitas $\\sin(\\alpha + \\beta)\\cos(\\alpha - \\beta) = \\frac{1}{2}(\\sin 2\\alpha + \\sin 2\\beta)$. Dengan $\\sin 2\\alpha = \\frac{2\\tan\\alpha}{1+\\tan^2\\alpha} = \\frac{1}{1+1/4} = \\frac{4}{5}$ dan $\\sin 2\\beta = \\frac{2/3}{1+1/9} = \\frac{3}{5}$, hasilnya $\\frac{1}{2}(\\frac{4}{5} + \\frac{3}{5}) = \\frac{7}{10}$!',
    },
  },
  {
    id: 16,
    indicatorNumber: 15,
    indicatorTitle: 'Amplitudo, Periode, Nilai Maksimum dan Minimum Fungsi Trigonometri',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Transformasi Fungsi Sinusoidal',
      textContext:
        'Perhatikan persamaan fungsi trigonometri yang dibandingkan terhadap bentuk baku $y = a \\sin b(x + c) + d$:',
      mathLines: ['y = -4\\sin\\left(3x + \\frac{\\pi}{2}\\right) + 5'],
    },
    prompt:
      'Manakah pernyataan analisis karakteristik grafik fungsi tersebut yang TEPAT secara matematis?',
    options: [
      'Amplitudonya $-4$, periodenya $\\frac{2\\pi}{3}$, pergeseran horizontal $\\frac{\\pi}{2}$ ke kiri, nilai maksimum $9$, dan nilai minimum $1$.',
      'Amplitudonya $4$, periodenya $\\frac{2\\pi}{3}$, pergeseran horizontal $\\frac{\\pi}{6}$ ke kiri, nilai maksimum $9$, dan nilai minimum $1$.',
      'Amplitudonya $4$, periodenya $\\frac{2\\pi}{3}$, pergeseran horizontal $\\frac{\\pi}{6}$ ke kanan, nilai maksimum $9$, dan nilai minimum $1$.',
      'Amplitudonya $4$, periodenya $6\\pi$, pergeseran horizontal $\\frac{\\pi}{6}$ ke kiri, nilai maksimum $5$, dan nilai minimum $-4$.',
      'Amplitudonya $4$, periodenya $\\frac{\\pi}{3}$, pergeseran horizontal $\\frac{\\pi}{2}$ ke kiri, nilai maksimum $9$, dan nilai minimum $-1$.',
    ],
    correctOptionIndex: 1,
    solution: {
      diketahui: ['Fungsi $y = -4\\sin\\left(3x + \\frac{\\pi}{2}\\right) + 5$.'],
      ditanyakan: 'Amplitudo, periode, pergeseran horizontal, nilai maksimum, dan nilai minimum.',
      landasanTeori:
        'Untuk membaca pergeseran horizontal (fase) secara akurat pada bentuk $y = a \\sin(bx + k) + d$, koefisien $b$ harus difaktorkan keluar menjadi $y = a \\sin b(x + c) + d$ dengan $c = \\frac{k}{b}$. Amplitudo selalu bernilai tak negatif ($|a|$).',
      rumus: [
        'A = |a|, \\quad T = \\frac{2\\pi}{|b|}',
        'y_{\\text{maks}} = d + |a|, \\quad y_{\\text{min}} = d - |a|',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Mengubah persamaan ke bentuk baku $y = a \\sin b(x + c) + d$',
          detail:
            'Keluarkan faktor $3$: $3x + \\frac{\\pi}{2} = 3\\left(x + \\frac{\\pi}{6}\\right)$. Jadi $y = -4\\sin 3\\left(x + \\frac{\\pi}{6}\\right) + 5$, sehingga $a = -4$, $b = 3$, $c = \\frac{\\pi}{6}$, dan $d = 5$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan amplitudo dan efek tanda negatif',
          detail:
            'Amplitudo $A = |a| = |-4| = 4$ (amplitudo adalah jarak simpangan maksimum dari garis tengah sehingga selalu positif; tanda negatif hanya mencerminkan grafik terhadap garis $y = 5$).',
        },
        {
          stepNumber: 3,
          title: 'Menghitung periode',
          detail: 'Periode $T = \\frac{2\\pi}{|b|} = \\frac{2\\pi}{3}$.',
        },
        {
          stepNumber: 4,
          title: 'Menentukan pergeseran horizontal dan vertikal',
          detail:
            'Karena berbentuk $\\left(x + \\frac{\\pi}{6}\\right) = \\left(x - (-\\frac{\\pi}{6})\\right)$, grafik bergeser $\\frac{\\pi}{6}$ satuan ke KIRI, dan $d = +5$ berarti bergeser $5$ satuan ke atas.',
        },
        {
          stepNumber: 5,
          title: 'Menghitung nilai maksimum dan minimum serta verifikasi',
          detail:
            'Karena nilai $\\sin(\\dots) \\in [-1, 1]$: $y_{\\text{maks}} = 5 + 4 = 9$ (terjadi saat $\\sin = -1$) dan $y_{\\text{min}} = 5 - 4 = 1$ (terjadi saat $\\sin = +1$).',
        },
      ],
      kesimpulan:
        'Amplitudo $4$, periode $\\frac{2\\pi}{3}$, pergeseran horizontal $\\frac{\\pi}{6}$ ke kiri, nilai maksimum $9$, dan minimum $1$ (Pilihan B).',
      highlightsRumus: [
        'JANGAN langsung menyimpulkan pergeseran sebesar $\\frac{\\pi}{2}$ sebelum koefisien $x$ dikeluarkan dari kurung!',
      ],
      quickMethodMrJo:
        'Tiga jebakan klasik di soal ini: (1) Amplitudo selalu positif ($|-4| = 4$), (2) Pergeseran wajib bagi $3$ ($\\frac{\\pi/2}{3} = \\frac{\\pi}{6}$), (3) Tanda $+$ di $(x + \\frac{\\pi}{6})$ berarti geser ke KIRI.',
    },
  },
  {
    id: 17,
    indicatorNumber: 16,
    indicatorTitle: 'Perbandingan Trigonometri pada Lingkaran Satuan',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'svg_unit_circle',
      title: 'Lingkaran Satuan $x^2 + y^2 = 1$',
      caption:
        'Titik $P\\left(-\\frac{3}{5}, y_P\\right)$ terletak pada lingkaran satuan di kuadran III dengan sudut posisi $\\theta$. Titik $Q$ merupakan hasil rotasi titik $P$ sebesar $+90^\\circ$ berlawanan arah jarum jam terhadap titik asal $O(0,0)$.',
    },
    prompt:
      'Berdasarkan konsep koordinat lingkaran satuan, koordinat titik $Q$ dan nilai $\\tan \\theta$ berturut-turut adalah...',
    options: [
      '$Q\\left(-\\frac{4}{5}, -\\frac{3}{5}\\right)$ dan $\\tan \\theta = -\\frac{4}{3}$',
      '$Q\\left(\\frac{4}{5}, \\frac{3}{5}\\right)$ dan $\\tan \\theta = \\frac{4}{3}$',
      '$Q\\left(\\frac{3}{5}, -\\frac{4}{5}\\right)$ dan $\\tan \\theta = \\frac{3}{4}$',
      '$Q\\left(-\\frac{4}{5}, \\frac{3}{5}\\right)$ dan $\\tan \\theta = \\frac{4}{3}$',
      '$Q\\left(\\frac{4}{5}, -\\frac{3}{5}\\right)$ dan $\\tan \\theta = \\frac{4}{3}$',
    ],
    correctOptionIndex: 4,
    solution: {
      diketahui: [
        'Titik $P\\left(-\\frac{3}{5}, y_P\\right)$ pada lingkaran satuan $x^2 + y^2 = 1$ di Kuadran III.',
        'Sudut posisi titik $P$ adalah $\\theta$, dan sudut posisi titik $Q$ adalah $\\theta + \\frac{\\pi}{2}$.',
      ],
      ditanyakan: 'Koordinat titik $Q$ dan nilai $\\tan \\theta$.',
      landasanTeori:
        'Setiap titik $(x, y)$ pada lingkaran satuan $x^2 + y^2 = 1$ dengan sudut $\\theta$ dari sumbu-$x$ positif memenuhi $x = \\cos \\theta$ dan $y = \\sin \\theta$. Rotasi $+90^\\circ$ ($+\\frac{\\pi}{2}$) mengubah sudut menjadi $\\theta + \\frac{\\pi}{2}$ sehingga berlaku $\\cos(\\theta + \\frac{\\pi}{2}) = -\\sin \\theta$ dan $\\sin(\\theta + \\frac{\\pi}{2}) = \\cos \\theta$.',
      rumus: [
        '\\cos^2 \\theta + \\sin^2 \\theta = 1',
        'Q = \\left(\\cos\\left(\\theta + \\frac{\\pi}{2}\\right), \\sin\\left(\\theta + \\frac{\\pi}{2}\\right)\\right) = (-\\sin \\theta, \\cos \\theta)',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan ordinat $y_P$ pada lingkaran satuan',
          detail:
            'Substitusi $x_P = -\\frac{3}{5}$ ke $x_P^2 + y_P^2 = 1$: $\\left(-\\frac{3}{5}\\right)^2 + y_P^2 = 1 \\implies y_P^2 = 1 - \\frac{9}{25} = \\frac{16}{25}$. Karena $P$ di Kuadran III ($y_P < 0$), maka $y_P = -\\frac{4}{5}$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan nilai $\\cos \\theta$, $\\sin \\theta$, dan $\\tan \\theta$',
          detail:
            'Dari koordinat $P\\left(-\\frac{3}{5}, -\\frac{4}{5}\\right)$ diperoleh $\\cos \\theta = -\\frac{3}{5}$ dan $\\sin \\theta = -\\frac{4}{5}$. Maka $\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta} = \\frac{-4/5}{-3/5} = \\frac{4}{3}$.',
        },
        {
          stepNumber: 3,
          title: 'Menentukan koordinat titik $Q$ hasil rotasi $+90^\\circ$',
          detail:
            'Sudut titik $Q$ adalah $\\theta + 90^\\circ$ (berada di Kuadran IV). Absis $x_Q = \\cos(\\theta + 90^\\circ) = -\\sin \\theta = -\\left(-\\frac{4}{5}\\right) = \\frac{4}{5}$.',
        },
        {
          stepNumber: 4,
          title: 'Menghitung ordinat titik $Q$',
          detail: '$y_Q = \\sin(\\theta + 90^\\circ) = \\cos \\theta = -\\frac{3}{5}$.',
        },
        {
          stepNumber: 5,
          title: 'Memverifikasi posisi kuadran dan jarak ke pusat',
          detail:
            'Titik $Q\\left(\\frac{4}{5}, -\\frac{3}{5}\\right)$ memiliki $x_Q > 0$ dan $y_Q < 0$ (benar di Kuadran IV) serta $(\\frac{4}{5})^2 + (-\\frac{3}{5})^2 = 1$ (benar pada lingkaran satuan).',
        },
      ],
      kesimpulan:
        'Koordinat titik $Q$ adalah $\\left(\\frac{4}{5}, -\\frac{3}{5}\\right)$ dan $\\tan \\theta = \\frac{4}{3}$ (Pilihan E).',
      highlightsRumus: [
        'Rotasi $+90^\\circ$ terhadap pusat $O$: $(x, y) \\mapsto (-y, x)$.',
      ],
      quickMethodMrJo:
        'Di Kuadran III, $P$ bertanda $(-,-)$, jadi $y_P = -\\frac{4}{5}$ dan $\\tan \\theta = +\\frac{4}{3}$. Rotasi $+90^\\circ$ berlawanan jarum jam membawa titik dari K-III ke K-IV yang bertanda $(+, -)$ dan membalik $(x, y) \\to (-y, x) = (\\frac{4}{5}, -\\frac{3}{5})$!',
    },
  },
  {
    id: 18,
    indicatorNumber: 17,
    indicatorTitle: 'Rumus Jumlah dan Selisih Dua Sudut (Sinus dan Cosinus)',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Relasi Cosinus Jumlah dan Selisih Dua Sudut',
      textContext: 'Diketahui dua sudut $A$ dan $B$ memenuhi persamaan trigonometri berikut:',
      mathLines: [
        '\\cos(A + B) = \\frac{1}{4} \\quad \\text{dan} \\quad \\cos(A - B) = \\frac{3}{4}',
      ],
    },
    prompt:
      'Dengan menguraikan rumus cosinus jumlah dan selisih dua sudut, nilai eksak dari $\\tan A \\cdot \\tan B$ adalah...',
    options: ['$\\frac{1}{4}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{3}{4}$', '$2$'],
    correctOptionIndex: 2,
    solution: {
      diketahui: ['$\\cos(A + B) = \\frac{1}{4}$', '$\\cos(A - B) = \\frac{3}{4}$'],
      ditanyakan: 'Nilai dari $\\tan A \\cdot \\tan B$.',
      landasanTeori:
        'Ekspansi $\\cos(A + B)$ dan $\\cos(A - B)$ mengandung dua suku yang sama yaitu $\\cos A \\cos B$ dan $\\sin A \\sin B$ dengan tanda yang berlawanan. Menjumlahkan dan mengurangkan kedua persamaan tersebut memisahkan masing-masing suku tanpa perlu mengetahui besar sudut $A$ dan $B$ secara terpisah.',
      rumus: [
        '\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B',
        '\\cos(A - B) = \\cos A \\cos B + \\sin A \\sin B',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menuliskan sistem dua persamaan dari rumus cosinus',
          detail:
            '(1) $\\cos A \\cos B - \\sin A \\sin B = \\frac{1}{4}$, dan (2) $\\cos A \\cos B + \\sin A \\sin B = \\frac{3}{4}$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan nilai $\\cos A \\cos B$ dengan penjumlahan',
          detail:
            'Jumlahkan (1) dan (2): $2\\cos A \\cos B = \\frac{1}{4} + \\frac{3}{4} = 1 \\implies \\cos A \\cos B = \\frac{1}{2}$.',
        },
        {
          stepNumber: 3,
          title: 'Menentukan nilai $\\sin A \\sin B$ dengan pengurangan',
          detail:
            'Kurangkan (1) dari (2): $2\\sin A \\sin B = \\frac{3}{4} - \\frac{1}{4} = \\frac{1}{2} \\implies \\sin A \\sin B = \\frac{1}{4}$.',
        },
        {
          stepNumber: 4,
          title: 'Menghitung nilai $\\tan A \\cdot \\tan B$',
          detail:
            '$\\tan A \\cdot \\tan B = \\frac{\\sin A}{\\cos A} \\cdot \\frac{\\sin B}{\\cos B} = \\frac{\\sin A \\sin B}{\\cos A \\cos B} = \\frac{1/4}{1/2} = \\frac{1}{2}$.',
        },
        {
          stepNumber: 5,
          title: 'Memeriksa eksistensi sudut dan konsistensi',
          detail:
            'Karena $|\\cos A \\cos B| = \\frac{1}{2} \\le 1$ dan $|\\sin A \\sin B| = \\frac{1}{4} \\le 1$, serta $\\cos(A+B) = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}$ dan $\\cos(A-B) = \\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}$, solusi eksis dan valid.',
        },
      ],
      kesimpulan: 'Nilai dari $\\tan A \\cdot \\tan B$ adalah $\\frac{1}{2}$ (Pilihan C).',
      highlightsRumus: [
        '$\\tan A \\tan B = \\frac{\\cos(A - B) - \\cos(A + B)}{\\cos(A - B) + \\cos(A + B)}$.',
      ],
      quickMethodMrJo:
        'Pakai rumus rasio langsung: $\\tan A \\tan B = \\frac{\\cos(A-B) - \\cos(A+B)}{\\cos(A-B) + \\cos(A+B)} = \\frac{3/4 - 1/4}{3/4 + 1/4} = \\frac{1/2}{1} = \\frac{1}{2}$!',
    },
  },
  {
    id: 19,
    indicatorNumber: 18,
    indicatorTitle: 'Rumus Sudut Rangkap (Sinus dan Cosinus)',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Persamaan Selisih Sinus dan Cosinus',
      textContext:
        'Diketahui sudut lancip $x$ pada selang $0 < x < \\frac{\\pi}{2}$ memenuhi persamaan berikut:',
      mathLines: ['\\sin x - \\cos x = \\frac{1}{2}'],
    },
    prompt:
      'Dengan menganalisis posisi sudut $x$ dan menerapkan rumus sudut rangkap secara berjenjang, nilai eksak dari $\\sin 4x$ adalah...',
    options: [
      '$-\\frac{3\\sqrt{7}}{8}$',
      '$\\frac{3\\sqrt{7}}{8}$',
      '$-\\frac{\\sqrt{7}}{4}$',
      '$\\frac{3}{4}$',
      '$-\\frac{3}{8}$',
    ],
    correctOptionIndex: 0,
    solution: {
      diketahui: [
        '$\\sin x - \\cos x = \\frac{1}{2}$',
        'Domain sudut: $0 < x < \\frac{\\pi}{2}$.',
      ],
      ditanyakan: 'Nilai dari $\\sin 4x$.',
      landasanTeori:
        'Menguadratkan $(\\sin x - \\cos x)$ menghasilkan bentuk $1 - \\sin 2x$ karena identitas $\\sin^2 x + \\cos^2 x = 1$ dan $2\\sin x\\cos x = \\sin 2x$. Selanjutnya, menentukan tanda $\\cos 2x$ wajib memeriksa selang sudut $2x$ berdasarkan tanda positif dari $\\sin x - \\cos x$.',
      rumus: [
        '\\sin 2x = 2\\sin x \\cos x',
        '\\sin 4x = 2\\sin 2x \\cos 2x',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan nilai $\\sin 2x$',
          detail:
            'Kuadratkan kedua ruas: $(\\sin x - \\cos x)^2 = \\left(\\frac{1}{2}\\right)^2 \\implies \\sin^2 x - 2\\sin x \\cos x + \\cos^2 x = \\frac{1}{4} \\implies 1 - \\sin 2x = \\frac{1}{4} \\implies \\sin 2x = \\frac{3}{4}$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan kuadran sudut $2x$',
          detail:
            'Karena $0 < x < \\frac{\\pi}{2}$ dan $\\sin x - \\cos x = \\frac{1}{2} > 0$, maka $\\sin x > \\cos x$. Pada kuadran I, kondisi $\\sin x > \\cos x$ terjadi pada selang $\\frac{\\pi}{4} < x < \\frac{\\pi}{2}$. Akibatnya $\\frac{\\pi}{2} < 2x < \\pi$, artinya $2x$ berada di Kuadran II.',
        },
        {
          stepNumber: 3,
          title: 'Menentukan nilai $\\cos 2x$ sesuai kuadrannya',
          detail:
            'Karena $2x \\in \\text{Kuadran II}$, nilai $\\cos 2x < 0$. Jadi $\\cos 2x = -\\sqrt{1 - \\sin^2 2x} = -\\sqrt{1 - \\frac{9}{16}} = -\\frac{\\sqrt{7}}{4}$.',
        },
        {
          stepNumber: 4,
          title: 'Menghitung nilai $\\sin 4x$',
          detail:
            'Terapkan rumus sudut rangkap pada sudut $2x$: $\\sin 4x = 2\\sin 2x \\cos 2x = 2\\left(\\frac{3}{4}\\right)\\left(-\\frac{\\sqrt{7}}{4}\\right) = -\\frac{3\\sqrt{7}}{8}$.',
        },
        {
          stepNumber: 5,
          title: 'Memeriksa kewajaran sudut secara numerik',
          detail:
            'Dari $\\sin 2x = 0{,}75$ di Kuadran II, diperoleh $2x \\approx 131{,}4^\\circ$, sehingga $4x \\approx 262{,}8^\\circ$ (Kuadran III, di mana sinus memang bernilai negatif) dan $\\sin(262{,}8^\\circ) \\approx -0{,}992 \\approx -\\frac{3\\sqrt{7}}{8}$. Terbukti valid!',
        },
      ],
      kesimpulan: 'Nilai eksak dari $\\sin 4x$ adalah $-\\frac{3\\sqrt{7}}{8}$ (Pilihan A).',
      highlightsRumus: [
        '$(\\sin x \\pm \\cos x)^2 = 1 \\pm \\sin 2x$.',
        'Jangan lupa mengecek $\\sin x > \\cos x \\iff x > 45^\\circ$ untuk menentukan kuadran $2x$.',
      ],
      quickMethodMrJo:
        'Langsung $1 - \\sin 2x = \\frac{1}{4} \\implies \\sin 2x = \\frac{3}{4}$. Karena $\\sin x > \\cos x$ di K-I, $x > 45^\\circ \\implies 2x > 90^\\circ$ (K-II), sehingga $\\cos 2x$ WAJIB negatif ($-\\frac{\\sqrt{7}}{4}$). Kalikan $2 \\cdot \\frac{3}{4} \\cdot (-\\frac{\\sqrt{7}}{4}) = -\\frac{3\\sqrt{7}}{8}$.',
    },
  },
  {
    id: 20,
    indicatorNumber: 19,
    indicatorTitle: 'Menerapkan Identitas Trigonometri (Variasi 1: Sudut Rangkap & Berelasi)',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Bentuk Pecahan Sudut Rangkap',
      textContext:
        'Diberikan ekspresi trigonometri untuk $x$ yang memenuhi syarat penyebut tak nol:',
      mathLines: ['M = \\frac{1 - \\cos 2x + \\sin 2x}{1 + \\cos 2x + \\sin 2x}'],
    },
    prompt:
      'Dengan menerapkan identitas sudut rangkap dan sudut berelasi, bentuk yang selalu setara dengan $M$ adalah...',
    options: [
      '$\\tan\\left(\\frac{\\pi}{2} - x\\right)$',
      '$\\cot\\left(\\frac{\\pi}{2} - x\\right)$',
      '$\\cot\\left(\\frac{\\pi}{2} + x\\right)$',
      '$\\tan(\\pi - x)$',
      '$\\sec x \\cdot \\csc x$',
    ],
    correctOptionIndex: 1,
    solution: {
      diketahui: ['$M = \\frac{1 - \\cos 2x + \\sin 2x}{1 + \\cos 2x + \\sin 2x}$'],
      ditanyakan: 'Bentuk sudut berelasi yang setara dengan $M$.',
      landasanTeori:
        'Rumus sudut rangkap $\\cos 2x$ memiliki dua bentuk strategis untuk menghilangkan konstanta $1$: $1 - \\cos 2x = 2\\sin^2 x$ dan $1 + \\cos 2x = 2\\cos^2 x$. Setelah disederhanakan, hasilnya dihubungkan dengan rumus sudut berelasi $\\tan x = \\cot(\\frac{\\pi}{2} - x)$.',
      rumus: [
        '1 - \\cos 2x = 2\\sin^2 x, \\quad 1 + \\cos 2x = 2\\cos^2 x',
        '\\sin 2x = 2\\sin x \\cos x',
        '\\cot\\left(\\frac{\\pi}{2} - x\\right) = \\tan x',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Mengubah pembilang dengan substitusi sudut rangkap',
          detail:
            'Pembilang $= (1 - \\cos 2x) + \\sin 2x = 2\\sin^2 x + 2\\sin x \\cos x = 2\\sin x(\\sin x + \\cos x)$.',
        },
        {
          stepNumber: 2,
          title: 'Mengubah penyebut dengan substitusi sudut rangkap',
          detail:
            'Penyebut $= (1 + \\cos 2x) + \\sin 2x = 2\\cos^2 x + 2\\sin x \\cos x = 2\\cos x(\\cos x + \\sin x)$.',
        },
        {
          stepNumber: 3,
          title: 'Menyederhanakan faktor persekutuan',
          detail:
            'Untuk $\\sin x + \\cos x \\neq 0$ dan $\\cos x \\neq 0$: $M = \\frac{2\\sin x(\\sin x + \\cos x)}{2\\cos x(\\sin x + \\cos x)} = \\frac{\\sin x}{\\cos x} = \\tan x$.',
        },
        {
          stepNumber: 4,
          title: 'Mencocokkan dengan identitas sudut berelasi pada opsi',
          detail:
            'Periksa tiap opsi: (A) $\\tan(\\frac{\\pi}{2} - x) = \\cot x$; (B) $\\cot(\\frac{\\pi}{2} - x) = \\tan x$; (C) $\\cot(\\frac{\\pi}{2} + x) = -\\tan x$; (D) $\\tan(\\pi - x) = -\\tan x$.',
        },
        {
          stepNumber: 5,
          title: 'Uji numerik pada $x = \\frac{\\pi}{6}$ ($30^\\circ$)',
          detail:
            '$M = \\frac{1 - \\frac{1}{2} + \\frac{\\sqrt{3}}{2}}{1 + \\frac{1}{2} + \\frac{\\sqrt{3}}{2}} = \\frac{1 + \\sqrt{3}}{3 + \\sqrt{3}} = \\frac{1}{\\sqrt{3}} = \\tan 30^\\circ = \\cot(90^\\circ - 30^\\circ)$. Benar!',
        },
      ],
      kesimpulan: 'Bentuk yang setara dengan $M$ adalah $\\cot\\left(\\frac{\\pi}{2} - x\\right)$ (Pilihan B).',
      highlightsRumus: [
        'Pasangan strategis: lihat $1 - \\cos 2x \\to$ ubah ke $2\\sin^2 x$; lihat $1 + \\cos 2x \\to$ ubah ke $2\\cos^2 x$.',
      ],
      quickMethodMrJo:
        'Trik substitusi sudut uji $x = 30^\\circ$: $\\frac{1 - 0{,}5 + 0{,}866}{1 + 0{,}5 + 0{,}866} = \\frac{1{,}366}{2{,}366} \\approx 0{,}577 = \\frac{1}{\\sqrt{3}} = \\cot 60^\\circ = \\cot(\\frac{\\pi}{2} - 30^\\circ)$.',
    },
  },
  {
    id: 21,
    indicatorNumber: 19,
    indicatorTitle: 'Menerapkan Identitas Trigonometri (Variasi 2: Transformasi Aljabar)',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Transformasi Ekspresi Sudut Berelasi ke Parameter $p$',
      textContext:
        'Diketahui $\\cos \\alpha = p$ untuk suatu sudut lancip $0^\\circ < \\alpha < 90^\\circ$. Perhatikan ekspresi berikut:',
      mathLines: ['K = \\sin(180^\\circ + 2\\alpha) \\cdot \\tan(90^\\circ - \\alpha) - \\cos(360^\\circ - 2\\alpha)'],
    },
    prompt:
      'Dengan menggabungkan identitas sudut berelasi dan sudut rangkap, bentuk $K$ bila dinyatakan dalam $p$ adalah...',
    options: ['$-1$', '$1 - 2p^2$', '$2p^2 - 1$', '$1 - 4p^2$', '$4p^2 - 1$'],
    correctOptionIndex: 3,
    solution: {
      diketahui: [
        '$\\cos \\alpha = p$ dengan $0^\\circ < \\alpha < 90^\\circ$',
        '$K = \\sin(180^\\circ + 2\\alpha) \\cdot \\tan(90^\\circ - \\alpha) - \\cos(360^\\circ - 2\\alpha)$',
      ],
      ditanyakan: 'Bentuk sederhana $K$ dalam variabel $p$.',
      landasanTeori:
        'Pertama sederhanakan seluruh sudut berelasi menjadi fungsi dari $2\\alpha$ dan $\\alpha$, kemudian nyatakan $\\sin 2\\alpha$ serta $\\cos 2\\alpha$ dalam $\\cos \\alpha$ dan $\\sin \\alpha$.',
      rumus: [
        '\\sin(180^\\circ + \\theta) = -\\sin \\theta, \\quad \\tan(90^\\circ - \\alpha) = \\cot \\alpha',
        '\\cos(360^\\circ - \\theta) = \\cos \\theta, \\quad \\cos 2\\alpha = 2\\cos^2 \\alpha - 1',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menerapkan rumus sudut berelasi pada setiap suku',
          detail:
            '$\\sin(180^\\circ + 2\\alpha) = -\\sin 2\\alpha$; $\\tan(90^\\circ - \\alpha) = \\cot \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}$; $\\cos(360^\\circ - 2\\alpha) = \\cos 2\\alpha$.',
        },
        {
          stepNumber: 2,
          title: 'Menguraikan $\\sin 2\\alpha$ pada suku pertama',
          detail:
            '$(-\\sin 2\\alpha) \\cdot \\cot \\alpha = (-2\\sin \\alpha \\cos \\alpha) \\cdot \\frac{\\cos \\alpha}{\\sin \\alpha} = -2\\cos^2 \\alpha$.',
        },
        {
          stepNumber: 3,
          title: 'Menguraikan $\\cos 2\\alpha$ ke dalam bentuk cosinus',
          detail:
            '$K = -2\\cos^2 \\alpha - (2\\cos^2 \\alpha - 1) = -2\\cos^2 \\alpha - 2\\cos^2 \\alpha + 1 = 1 - 4\\cos^2 \\alpha$.',
        },
        {
          stepNumber: 4,
          title: 'Menyubstitusikan $\\cos \\alpha = p$',
          detail: 'Diperoleh $K = 1 - 4p^2$.',
        },
        {
          stepNumber: 5,
          title: 'Uji numerik pada $\\alpha = 30^\\circ$ ($p = \\frac{\\sqrt{3}}{2}$)',
          detail:
            '$K = \\sin(240^\\circ)\\tan(60^\\circ) - \\cos(300^\\circ) = (-\\frac{\\sqrt{3}}{2})(\\sqrt{3}) - \\frac{1}{2} = -\\frac{3}{2} - \\frac{1}{2} = -2$. Dengan rumus $1 - 4(\\frac{\\sqrt{3}}{2})^2 = 1 - 3 = -2$. Tepat!',
        },
      ],
      kesimpulan: 'Bentuk $K$ dalam $p$ adalah $1 - 4p^2$ (Pilihan D).',
      highlightsRumus: [
        'Rumus sudut berelasi berlaku sama baiknya jika sudutnya berupa $2\\alpha$ selama pola penulisan $180^\\circ + \\theta$ dan $360^\\circ - \\theta$ dipatuhi.',
      ],
      quickMethodMrJo:
        'Coba $\\alpha = 60^\\circ \\implies p = \\frac{1}{2}$. Hitung $K = \\sin 300^\\circ \\tan 30^\\circ - \\cos 240^\\circ = (-\\frac{\\sqrt{3}}{2})(\\frac{1}{\\sqrt{3}}) - (-\\frac{1}{2}) = 0$. Dari opsi yang bernilai $0$ saat $p^2 = \\frac{1}{4}$ hanyalah $1 - 4p^2$ dan $4p^2 - 1$. Uji lagi $\\alpha = 30^\\circ$ ($K = -2$) $\\implies$ pasti $1 - 4p^2$!',
    },
  },
  {
    id: 22,
    indicatorNumber: 20,
    indicatorTitle: 'Menentukan Persamaan Grafik Fungsi Trigonometri (Variasi 1: Sinus)',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'svg_sine_graph',
      title: 'Grafik Fungsi Sinusoidal pada Bidang Kartesius',
      caption:
        'Grafik melalui titik garis tengah naik di $\\left(\\frac{\\pi}{6}, 1\\right)$, mencapai puncak maksimum di $\\left(\\frac{5\\pi}{12}, 4\\right)$, dan lembah minimum di $\\left(\\frac{11\\pi}{12}, -2\\right)$.',
    },
    prompt:
      'Berdasarkan koordinat titik puncak, titik lembah, dan pergeseran fase pada grafik tersebut, persamaan fungsi trigonometri yang sesuai adalah...',
    options: [
      '$y = 3\\sin\\left(2x + \\frac{\\pi}{3}\\right) + 1$',
      '$y = 3\\sin\\left(2x - \\frac{\\pi}{6}\\right) + 1$',
      '$y = 3\\sin\\left(2x - \\frac{\\pi}{3}\\right) + 1$',
      '$y = 3\\sin\\left(x - \\frac{\\pi}{6}\\right) + 1$',
      '$y = 4\\sin\\left(2x - \\frac{\\pi}{3}\\right) - 2$',
    ],
    correctOptionIndex: 2,
    solution: {
      diketahui: [
        'Titik garis tengah naik: $\\left(\\frac{\\pi}{6}, 1\\right)$',
        'Titik puncak maksimum: $\\left(\\frac{5\\pi}{12}, 4\\right)$',
        'Titik lembah minimum: $\\left(\\frac{11\\pi}{12}, -2\\right)$',
      ],
      ditanyakan: 'Persamaan grafik fungsi trigonometri tersebut.',
      landasanTeori:
        'Dari nilai maksimum $y_{\\text{maks}}$ dan minimum $y_{\\text{min}}$, amplitudo adalah $\\frac{y_{\\text{maks}} - y_{\\text{min}}}{2}$ dan garis tengah vertikal adalah $\\frac{y_{\\text{maks}} + y_{\\text{min}}}{2}$. Jarak horizontal dari puncak ke lembah terdekat sama dengan setengah periode ($\\frac{T}{2}$).',
      rumus: [
        'a = \\frac{y_{\\text{maks}} - y_{\\text{min}}}{2}, \\quad d = \\frac{y_{\\text{maks}} + y_{\\text{min}}}{2}',
        'b = \\frac{2\\pi}{T}, \\quad y = a\\sin b(x - x_0) + d',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menghitung amplitudo $a$ dan pergeseran vertikal $d$',
          detail:
            '$a = \\frac{4 - (-2)}{2} = \\frac{6}{2} = 3$ dan $d = \\frac{4 + (-2)}{2} = \\frac{2}{2} = 1$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan periode $T$ dan koefisien $b$',
          detail:
            'Jarak puncak ke lembah terdekat $= \\frac{11\\pi}{12} - \\frac{5\\pi}{12} = \\frac{6\\pi}{12} = \\frac{\\pi}{2}$. Karena itu setengah periode, maka $T = 2 \\times \\frac{\\pi}{2} = \\pi$, sehingga $b = \\frac{2\\pi}{\\pi} = 2$.',
        },
        {
          stepNumber: 3,
          title: 'Menentukan pergeseran horizontal $x_0$ untuk fungsi sinus positif',
          detail:
            'Grafik sinus baku $y = \\sin u$ melewati garis tengah sambil naik saat $u = 0$. Pada grafik, titik naik garis tengah terjadi di $x_0 = \\frac{\\pi}{6}$.',
        },
        {
          stepNumber: 4,
          title: 'Menyusun persamaan lengkap',
          detail:
            '$y = 3\\sin 2\\left(x - \\frac{\\pi}{6}\\right) + 1 = 3\\sin\\left(2x - \\frac{\\pi}{3}\\right) + 1$.',
        },
        {
          stepNumber: 5,
          title: 'Memverifikasi ketiga titik koordinat pada grafik',
          detail:
            'Saat $x = \\frac{5\\pi}{12}$: $y = 3\\sin\\left(\\frac{5\\pi}{6} - \\frac{2\\pi}{6}\\right) + 1 = 3\\sin\\frac{\\pi}{2} + 1 = 4$. Saat $x = \\frac{11\\pi}{12}$: $y = 3\\sin\\frac{3\\pi}{2} + 1 = -2$. Seluruh titik cocok!',
        },
      ],
      kesimpulan:
        'Persamaan grafik yang sesuai adalah $y = 3\\sin\\left(2x - \\frac{\\pi}{3}\\right) + 1$ (Pilihan C).',
      highlightsRumus: [
        'Titik mulai gelombang sinus ($+$) selalu berada pada garis tengah yang bergerak NAIK ke kanan.',
      ],
      quickMethodMrJo:
        'Cek langsung dua hal: tinggi gelombang $\\frac{4 - (-2)}{2} = 3$ dan tengahnya $1$. Lalu substitusi titik puncak $x = \\frac{5\\pi}{12}$ ke opsi; hanya $2(\\frac{5\\pi}{12}) - \\frac{\\pi}{3} = \\frac{\\pi}{2}$ yang memberi $\\sin = 1 \\implies y = 4$!',
    },
  },
  {
    id: 23,
    indicatorNumber: 20,
    indicatorTitle: 'Menentukan Persamaan Grafik Fungsi Trigonometri (Variasi 2: Cosinus)',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'svg_cosine_graph',
      title: 'Grafik Fungsi Cosinus dengan Pergeseran',
      caption:
        'Grafik memotong titik asal $(0, 0)$, mencapai puncak maksimum di $\\left(\\frac{\\pi}{6}, 1\\right)$, lembah minimum di $\\left(\\frac{2\\pi}{3}, -3\\right)$, dan kembali mencapai puncak di $\\left(\\frac{7\\pi}{6}, 1\\right)$.',
    },
    prompt:
      'Persamaan fungsi cosinus yang merepresentasikan grafik tersebut secara akurat adalah...',
    options: [
      '$y = 2\\cos\\left(2x - \\frac{\\pi}{3}\\right) - 1$',
      '$y = 2\\cos\\left(2x + \\frac{\\pi}{3}\\right) - 1$',
      '$y = 2\\cos\\left(2x - \\frac{\\pi}{6}\\right) - 1$',
      '$y = -2\\cos\\left(2x - \\frac{\\pi}{3}\\right) - 1$',
      '$y = 2\\cos\\left(x - \\frac{\\pi}{6}\\right) - 1$',
    ],
    correctOptionIndex: 0,
    solution: {
      diketahui: [
        'Titik puncak berurutan: $\\left(\\frac{\\pi}{6}, 1\\right)$ dan $\\left(\\frac{7\\pi}{6}, 1\\right)$.',
        'Titik lembah: $\\left(\\frac{2\\pi}{3}, -3\\right)$, serta melalui $(0, 0)$.',
      ],
      ditanyakan: 'Persamaan grafik fungsi cosinus.',
      landasanTeori:
        'Fungsi cosinus positif $y = a\\cos b(x - x_0) + d$ ($a > 0$) selalu mencapai nilai maksimum di $x = x_0$. Jarak antara dua puncak berurutan tepat sama dengan satu periode $T$.',
      rumus: [
        'T = x_{\\text{puncak 2}} - x_{\\text{puncak 1}}',
        'y = a\\cos b(x - x_{\\text{puncak}}) + d',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan amplitudo dan garis tengah',
          detail:
            '$a = \\frac{1 - (-3)}{2} = 2$ dan $d = \\frac{1 + (-3)}{2} = -1$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan periode dan frekuensi sudut $b$',
          detail:
            '$T = \\frac{7\\pi}{6} - \\frac{\\pi}{6} = \\pi \\implies b = \\frac{2\\pi}{T} = \\frac{2\\pi}{\\pi} = 2$.',
        },
        {
          stepNumber: 3,
          title: 'Menentukan fase puncak cosinus positif',
          detail:
            'Puncak pertama untuk $x > 0$ berada di $x_0 = \\frac{\\pi}{6}$. Maka persamaan berbentuk $y = 2\\cos 2\\left(x - \\frac{\\pi}{6}\\right) - 1$.',
        },
        {
          stepNumber: 4,
          title: 'Menyederhanakan bentuk sudut',
          detail: '$y = 2\\cos\\left(2x - \\frac{\\pi}{3}\\right) - 1$.',
        },
        {
          stepNumber: 5,
          title: 'Memverifikasi perpotongan sumbu $(0, 0)$',
          detail:
            'Substitusi $x = 0$: $y = 2\\cos\\left(-\\frac{\\pi}{3}\\right) - 1 = 2\\left(\\frac{1}{2}\\right) - 1 = 0$. Terbukti grafik melalui $(0, 0)$!',
        },
      ],
      kesimpulan:
        'Persamaan fungsi yang sesuai adalah $y = 2\\cos\\left(2x - \\frac{\\pi}{3}\\right) - 1$ (Pilihan A).',
      highlightsRumus: [
        'Untuk cosinus, langsung kunci $x_0$ di koordinat $x$ titik PUNCAK positif.',
      ],
      quickMethodMrJo:
        'Puncak di $x = \\frac{\\pi}{6}$ memberi $2x - \\frac{\\pi}{3} = 0 \\implies \\cos 0 = 1$, sehingga $y = 2(1) - 1 = 1$. Dan saat $x = 0$, $2\\cos(-\\frac{\\pi}{3}) - 1 = 0$. Langsung Opsi A!',
    },
  },
  {
    id: 24,
    indicatorNumber: 21,
    indicatorTitle: 'Penerapan Fungsi Trigonometri pada Fenomena Periodik',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'photo',
      title: 'Data Pengamatan Pasang Surut Air Laut di Dermaga',
      imageUrl: '/src/assets/images/stimulus_tidal_pier_1795609728338.jpg',
      imageAlt: 'Dermaga pelabuhan dengan tiang pengukur tinggi pasang surut air laut',
      caption:
        'Stasiun pemantauan pelabuhan mencatat ketinggian permukaan air laut sebagai fungsi sinusoidal terhadap waktu $t$ (dalam jam setelah pukul $00.00$).',
      tableHeaders: ['Waktu Pengamatan', 'Jam ($t$)', 'Kondisi Laut', 'Ketinggian Air ($h$)'],
      tableRows: [
        ['Pukul $04.00$', '$4$', 'Pasang Maksimum', '$3{,}6\\text{ meter}$'],
        ['Pukul $10.00$', '$10$', 'Surut Minimum', '$1{,}2\\text{ meter}$'],
      ],
    },
    prompt:
      'Sebuah kapal kargo membutuhkan kedalaman air minimal $2{,}0\\text{ meter}$ agar dapat bersandar dengan aman. Berdasarkan model fungsi sinusoidal $h(t)$ dari data tabel pengamatan tersebut, berapakah perkiraan ketinggian air pada pukul $12.00$ dan bagaimana status sandar kapal?',
    options: [
      '$3{,}0\\text{ meter}$; kapal aman bersandar',
      '$2{,}4\\text{ meter}$; kapal aman bersandar',
      '$2{,}0\\text{ meter}$; kapal tepat berada di batas aman',
      '$1{,}6\\text{ meter}$; kapal belum aman bersandar',
      '$1{,}8\\text{ meter}$; kapal belum aman bersandar',
    ],
    correctOptionIndex: 4,
    solution: {
      diketahui: [
        'Pasang maksimum terjadi pada $t = 4$ dengan $h_{\\text{maks}} = 3{,}6\\text{ m}$.',
        'Surut minimum berikutnya pada $t = 10$ dengan $h_{\\text{min}} = 1{,}2\\text{ m}$.',
        'Syarat aman bersandar: $h(12) \\ge 2{,}0\\text{ m}$.',
      ],
      ditanyakan: 'Nilai $h(12)$ dan kesimpulan keamanan sandar kapal pukul $12.00$.',
      landasanTeori:
        'Fenomena pasang surut periodik dapat dimodelkan dengan fungsi cosinus $h(t) = a\\cos(b(t - t_{\\text{maks}})) + d$, di mana $t_{\\text{maks}}$ adalah waktu tercapainya puncak pasang pertama, selisih waktu puncak ke lembah terdekat adalah setengah periode ($\\frac{T}{2}$), amplitudo $a = \\frac{h_{\\text{maks}} - h_{\\text{min}}}{2}$, dan kedalaman rata-rata $d = \\frac{h_{\\text{maks}} + h_{\\text{min}}}{2}$.',
      rumus: [
        'h(t) = a\\cos\\left(\\frac{2\\pi}{T}(t - t_{\\text{maks}})\\right) + d',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan amplitudo $a$ dan ketinggian rata-rata $d$',
          detail:
            '$a = \\frac{3{,}6 - 1{,}2}{2} = \\frac{2{,}4}{2} = 1{,}2\\text{ m}$ dan $d = \\frac{3{,}6 + 1{,}2}{2} = 2{,}4\\text{ m}$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan periode $T$ dan nilai $b$',
          detail:
            'Dari puncak $t = 4$ ke surut minimum $t = 10$ berjarak $10 - 4 = 6\\text{ jam}$ ($= \\frac{T}{2}$), sehingga periode penuh $T = 12\\text{ jam}$ dan $b = \\frac{2\\pi}{12} = \\frac{\\pi}{6}$.',
        },
        {
          stepNumber: 3,
          title: 'Menyusun persamaan model pasang surut',
          detail:
            'Dengan puncak di $t_{\\text{maks}} = 4$: $h(t) = 1{,}2\\cos\\left(\\frac{\\pi}{6}(t - 4)\\right) + 2{,}4$.',
        },
        {
          stepNumber: 4,
          title: 'Memprediksi ketinggian air pada pukul $12.00$ ($t = 12$)',
          detail:
            '$h(12) = 1{,}2\\cos\\left(\\frac{\\pi}{6}(12 - 4)\\right) + 2{,}4 = 1{,}2\\cos\\left(\\frac{4\\pi}{3}\\right) + 2{,}4 = 1{,}2\\left(-\\frac{1}{2}\\right) + 2{,}4 = -0{,}6 + 2{,}4 = 1{,}8\\text{ meter}$.',
        },
        {
          stepNumber: 5,
          title: 'Membandingkan dengan syarat aman kapal',
          detail:
            'Karena $1{,}8\\text{ meter} < 2{,}0\\text{ meter}$, maka pada pukul $12.00$ air masih dalam fase naik dari titik surut tetapi belum cukup dalam untuk kapal bersandar dengan aman.',
        },
      ],
      kesimpulan:
        'Tinggi air pada pukul $12.00$ adalah $1{,}8\\text{ meter}$, sehingga kapal belum aman bersandar (Pilihan E).',
      highlightsRumus: [
        'Jika puncak di $t = t_0$ diketahui, model $a\\cos(b(t - t_0)) + d$ jauh lebih cepat disusun daripada model sinus.',
      ],
      quickMethodMrJo:
        'Periode $12$ jam artinya setiap $2$ jam sudut bergeser $\\frac{2}{12} \\times 360^\\circ = 60^\\circ$. Dari surut minimum pukul $10.00$ ($180^\\circ$) ke pukul $12.00$ hanya bertambah $2$ jam ($+60^\\circ \\to 240^\\circ$), dan $\\cos 240^\\circ = -\\frac{1}{2}$. Jadi $h(12) = 2{,}4 + 1{,}2(-0{,}5) = 1{,}8\\text{ m}$!',
    },
  },
  {
    id: 25,
    indicatorNumber: 22,
    indicatorTitle: 'Perbandingan Trigonometri pada Segitiga Siku-Siku (Sudut Elevasi)',
    type: QuestionType.PG,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'svg_elevation_double',
      title: 'Pengukuran Tinggi Mercusuar dengan Teodolit',
      imageUrl: '/src/assets/images/stimulus_lighthouse_survey_1795609727764.jpg',
      imageAlt: 'Tim survei mengukur tinggi mercusuar di atas promenade datar menggunakan teodolit',
      caption:
        'Dua posisi pengamatan segaris $A$ dan $B$ di tanah datar berjarak $AB = 40\\text{ meter}$, dengan sudut elevasi puncak mercusuar masing-masing $30^\\circ$ dan $60^\\circ$ dari ketinggian lensa teodolit $1{,}6\\text{ meter}$.',
    },
    prompt:
      'Berdasarkan analisis geometri dan perbandingan trigonometri pada diagram survei tersebut, tinggi total mercusuar dari permukaan tanah datar adalah...',
    options: [
      '$20\\sqrt{3}\\text{ meter}$',
      '$(20\\sqrt{3} + 1{,}6)\\text{ meter}$',
      '$(40\\sqrt{3} + 1{,}6)\\text{ meter}$',
      '$\\left(\\frac{40}{3}\\sqrt{3} + 1{,}6\\right)\\text{ meter}$',
      '$(20\\sqrt{3} - 1{,}6)\\text{ meter}$',
    ],
    correctOptionIndex: 1,
    solution: {
      diketahui: [
        'Jarak dua titik pengamatan segaris: $AB = 40\\text{ m}$.',
        'Sudut elevasi dari $A$ adalah $30^\\circ$, dari $B$ (lebih dekat ke mercusuar) adalah $60^\\circ$.',
        'Tinggi lensa teodolit dari tanah: $t_{\\text{alat}} = 1{,}6\\text{ m}$.',
      ],
      ditanyakan: 'Tinggi total mercusuar $H$ dari permukaan tanah datar.',
      landasanTeori:
        'Pada dua segitiga siku-siku yang berbagi sisi tegak yang sama $h\'$ (tinggi puncak di atas garis horizontal mata/lensa), hubungan jarak mendatar dengan tinggi menggunakan perbandingan tangen ($\\tan \\theta = \\frac{\\text{depan}}{\\text{samping}}$). Tinggi total diperoleh dengan menambahkan tinggi alat ukur $1{,}6\\text{ m}$.',
      rumus: [
        '\\tan \\theta = \\frac{h\'}{d}, \\quad H = h\' + t_{\\text{alat}}',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Memisalkan jarak mendatar dan tinggi di atas garis alat',
          detail:
            'Misalkan $d = BD$ adalah jarak mendatar titik $B$ ke dasar mercusuar $D$, dan $h\'$ adalah tinggi puncak di atas garis horizontal teodolit. Maka $AD = d + 40$.',
        },
        {
          stepNumber: 2,
          title: 'Menyusun persamaan tangen dari titik $B$ ($60^\\circ$)',
          detail:
            '$\\tan 60^\\circ = \\frac{h\'}{d} \\implies \\sqrt{3} = \\frac{h\'}{d} \\implies d = \\frac{h\'}{\\sqrt{3}}$.',
        },
        {
          stepNumber: 3,
          title: 'Menyusun persamaan tangen dari titik $A$ ($30^\\circ$)',
          detail:
            '$\\tan 30^\\circ = \\frac{h\'}{d + 40} \\implies \\frac{1}{\\sqrt{3}} = \\frac{h\'}{\\frac{h\'}{\\sqrt{3}} + 40}$.',
        },
        {
          stepNumber: 4,
          title: 'Menyelesaikan nilai $h\'$',
          detail:
            'Kali silang: $\\frac{h\'}{\\sqrt{3}} + 40 = h\'\\sqrt{3} \\implies 40 = h\'\\left(\\sqrt{3} - \\frac{1}{\\sqrt{3}}\\right) = h\'\\left(\\frac{2}{\\sqrt{3}}\\right) \\implies h\' = \\frac{40\\sqrt{3}}{2} = 20\\sqrt{3}\\text{ meter}$.',
        },
        {
          stepNumber: 5,
          title: 'Menambahkan tinggi teodolit untuk memperoleh tinggi total',
          detail:
            '$H = h\' + 1{,}6 = (20\\sqrt{3} + 1{,}6)\\text{ meter}$. Cek: $d = 20\\text{ m}$, $AD = 60\\text{ m}$, $\\frac{20\\sqrt{3}}{60} = \\frac{\\sqrt{3}}{3} = \\tan 30^\\circ$. Terbukti akurat!',
        },
      ],
      kesimpulan:
        'Tinggi total mercusuar dari permukaan tanah adalah $(20\\sqrt{3} + 1{,}6)\\text{ meter}$ (Pilihan B).',
      highlightsRumus: [
        'Pada survei sudut elevasi dengan teodolit/klinometer, tinggi mata atau tinggi tripod WAJIB ditambahkan di langkah akhir.',
      ],
      quickMethodMrJo:
        'Perhatikan sudut istimewa pada $\\triangle ABC$ (puncak $C$): sudut luar $60^\\circ = 30^\\circ + \\angle ACB \\implies \\angle ACB = 30^\\circ$! Karena $\\angle A = \\angle ACB = 30^\\circ$, $\\triangle ABC$ sama kaki sehingga $BC = AB = 40\\text{ m}$! Maka $h\' = BC \\sin 60^\\circ = 40 \\cdot \\frac{\\sqrt{3}}{2} = 20\\sqrt{3}$, lalu tambah $1{,}6\\text{ m}$!',
    },
  },
];
