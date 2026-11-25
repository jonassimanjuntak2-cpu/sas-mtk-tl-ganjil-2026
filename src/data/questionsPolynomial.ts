import {
  DifficultyLevel,
  Question,
  QuestionType,
  TopicCategory,
} from '../types/assessment';

export const POLYNOMIAL_QUESTIONS: Question[] = [
  {
    id: 1,
    indicatorNumber: 1,
    indicatorTitle: 'Operasi Polinomial, Derajat, dan Koefisien',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Komponen Sistem Polinomial',
      textContext:
        'Diberikan tiga polinomial berkoefisien real dengan parameter $a \\in \\mathbb{R}$ sebagai berikut:',
      mathLines: [
        'P(x) = 2x^3 - 3x^2 + ax - 4',
        'Q(x) = x^2 + 4x - 2',
        'R(x) = 3x^4 - 5x^3 + 7x - 1',
      ],
    },
    prompt:
      'Hasil operasi polinomial $S(x) = P(x) \\cdot Q(x) - R(x)$ memiliki koefisien suku berderajat $3$ sebesar $-8$. Berdasarkan informasi tersebut, nilai $a$ serta koefisien suku berderajat $2$ pada $S(x)$ berturut-turut adalah...',
    options: [
      '$a = 3$ dan $10$',
      '$a = 3$ dan $14$',
      '$a = -3$ dan $-10$',
      '$a = 13$ dan $54$',
      '$a = -13$ dan $-50$',
    ],
    correctOptionIndex: 1,
    solution: {
      diketahui: [
        '$P(x) = 2x^3 - 3x^2 + ax - 4$',
        '$Q(x) = x^2 + 4x - 2$',
        '$R(x) = 3x^4 - 5x^3 + 7x - 1$',
        'Koefisien $x^3$ pada $S(x) = P(x)\\cdot Q(x) - R(x)$ adalah $-8$.',
      ],
      ditanyakan: 'Nilai parameter $a$ dan koefisien suku berderajat $2$ ($x^2$) pada $S(x)$.',
      landasanTeori:
        'Pada perkalian dua polinomial berderajat $m$ dan $n$, derajat hasil kali adalah $m + n$. Koefisien suku berderajat $k$ pada $P(x)\\cdot Q(x)$ diperoleh dengan menjumlahkan seluruh hasil kali pasangan suku dari $P(x)$ dan $Q(x)$ yang jumlah pangkatnya tepat sama dengan $k$. Pengurangan polinomial hanya mengubah koefisien pada suku-suku sejenis.',
      rumus: [
        '\\deg(P \\cdot Q) = \\deg(P) + \\deg(Q)',
        '[x^k](P\\cdot Q) = \\sum_{i+j=k} p_i q_j',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Mengidentifikasi pasangan suku pembentuk $x^3$ pada $P(x)\\cdot Q(x)$',
          detail:
            'Suku berderajat $3$ dari $(2x^3 - 3x^2 + ax - 4)(x^2 + 4x - 2)$ berasal dari kombinasi: $(2x^3)(-2) + (-3x^2)(4x) + (ax)(x^2) = -4x^3 - 12x^3 + ax^3 = (a - 16)x^3$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan koefisien $x^3$ pada $S(x)$',
          detail:
            'Karena $S(x) = P(x)\\cdot Q(x) - R(x)$ dan suku $x^3$ pada $R(x)$ adalah $-5x^3$, maka koefisien $x^3$ pada $S(x)$ adalah $(a - 16) - (-5) = a - 11$.',
        },
        {
          stepNumber: 3,
          title: 'Menyelesaikan persamaan parameter $a$',
          detail:
            'Diketahui koefisien $x^3$ pada $S(x)$ adalah $-8$, sehingga $a - 11 = -8 \\implies a = 3$.',
        },
        {
          stepNumber: 4,
          title: 'Menghitung koefisien suku berderajat $2$ pada $S(x)$',
          detail:
            'Suku $x^2$ pada $P(x)\\cdot Q(x)$ berasal dari $(-3x^2)(-2) + (ax)(4x) + (-4)(x^2) = 6x^2 + 4ax^2 - 4x^2 = (4a + 2)x^2$. Pada $R(x)$, koefisien $x^2$ bernilai $0$. Substitusi $a = 3$ menghasilkan $4(3) + 2 = 14$.',
        },
        {
          stepNumber: 5,
          title: 'Memeriksa kebenaran hasil secara menyeluruh',
          detail:
            'Dengan $a = 3$, ekspansi lengkap $S(x) = 2x^5 + 2x^4 - 8x^3 + 14x^2 - 29x + 9$. Uji $x = 1$: $P(1)Q(1) - R(1) = (-2)(3) - 4 = -10$, dan jumlah koefisien $S(1) = 2 + 2 - 8 + 14 - 29 + 9 = -10$. Cocok!',
        },
      ],
      kesimpulan:
        'Nilai parameter $a = 3$ dan koefisien suku berderajat $2$ pada $S(x)$ adalah $14$ (Pilihan B).',
      highlightsRumus: [
        'Tidak perlu mengekspansi seluruh perkalian polinomial; fokuskan perkalian hanya pada pasangan pangkat target.',
        'Perhatikan tanda negatif saat mengurangkan $R(x)$: $-(-5x^3) = +5x^3$.',
      ],
      quickMethodMrJo:
        'Cukup pasangkan indeks koefisien yang jumlah pangkatnya $3$: $(2)(-2) + (-3)(4) + a(1) - (-5) = -8 \\implies a = 3$. Lalu untuk $x^2$: $(-3)(-2) + 3(4) + (-4)(1) - 0 = 14$. Selesai dalam 20 detik!',
    },
  },
  {
    id: 2,
    indicatorNumber: 2,
    indicatorTitle: 'Pembagian Polinomial (Variasi 1: Pembagian Bersusun)',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Identitas Pembagian Polinomial',
      textContext:
        'Suatu polinomial berderajat empat dinyatakan oleh $f(x) = 2x^4 - 5x^3 + 4x^2 - 7x + 6$ dan akan dibagi oleh polinomial kuadrat $D(x) = x^2 - 2x - 3$.',
      mathLines: ['f(x) = D(x) \\cdot H(x) + S(x), \\quad \\deg(S) < \\deg(D)'],
    },
    prompt:
      'Jika $H(x)$ menyatakan hasil bagi dan $S(x)$ menyatakan sisa pembagian $f(x)$ oleh $D(x)$, pasangan $H(x)$ dan $S(x)$ yang memenuhi identitas pembagian di atas adalah...',
    options: [
      '$H(x) = 2x^2 - x + 8$ dan $S(x) = 6x + 30$',
      '$H(x) = 2x^2 - x + 8$ dan $S(x) = -6x + 30$',
      '$H(x) = 2x^2 - 9x - 8$ dan $S(x) = 6x - 18$',
      '$H(x) = 2x^2 + x + 8$ dan $S(x) = 6x + 30$',
      '$H(x) = 2x^2 - x + 4$ dan $S(x) = 12x + 18$',
    ],
    correctOptionIndex: 0,
    solution: {
      diketahui: [
        'Polinomial yang dibagi: $f(x) = 2x^4 - 5x^3 + 4x^2 - 7x + 6$',
        'Pembagi: $D(x) = x^2 - 2x - 3$',
      ],
      ditanyakan: 'Hasil bagi $H(x)$ dan sisa pembagian $S(x)$.',
      landasanTeori:
        'Berdasarkan algoritma pembagian polinomial, karena $\\deg(f) = 4$ dan $\\deg(D) = 2$, maka hasil bagi $H(x)$ berderajat $4 - 2 = 2$ dan sisa pembagian $S(x)$ berderajat maksimal $1$ (berbentuk linear $px + q$).',
      rumus: ['f(x) = (x^2 - 2x - 3)H(x) + S(x)'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan suku pertama hasil bagi',
          detail:
            'Bagi suku utama $2x^4$ dengan $x^2$ diperoleh $2x^2$. Kalikan dengan pembagi: $2x^2(x^2 - 2x - 3) = 2x^4 - 4x^3 - 6x^2$. Kurangkan dari $f(x)$ menghasilkan sisa sementara $-x^3 + 10x^2 - 7x + 6$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan suku kedua hasil bagi',
          detail:
            'Bagi $-x^3$ dengan $x^2$ diperoleh $-x$. Kalikan dengan pembagi: $-x(x^2 - 2x - 3) = -x^3 + 2x^2 + 3x$. Kurangkan dari sisa sementara menghasilkan $8x^2 - 10x + 6$.',
        },
        {
          stepNumber: 3,
          title: 'Menentukan suku konstanta hasil bagi dan sisa akhir',
          detail:
            'Bagi $8x^2$ dengan $x^2$ diperoleh $+8$. Kalikan dengan pembagi: $8(x^2 - 2x - 3) = 8x^2 - 16x - 24$. Kurangkan dari $8x^2 - 10x + 6$ menghasilkan $(-10x - (-16x)) + (6 - (-24)) = 6x + 30$.',
        },
        {
          stepNumber: 4,
          title: 'Mengonfirmasi derajat sisa',
          detail:
            'Derajat $S(x) = 6x + 30$ adalah $1 < \\deg(D) = 2$, sehingga proses pembagian berhenti.',
        },
        {
          stepNumber: 5,
          title: 'Uji kebenaran melalui akar pembagi',
          detail:
            'Faktorkan $x^2 - 2x - 3 = (x - 3)(x + 1)$. Nilai $f(3) = 2(81) - 5(27) + 4(9) - 21 + 6 = 48$, sedangkan $S(3) = 6(3) + 30 = 48$. Nilai $f(-1) = 2 + 5 + 4 + 7 + 6 = 24$, sedangkan $S(-1) = -6 + 30 = 24$. Terbukti tepat!',
        },
      ],
      kesimpulan:
        'Hasil bagi adalah $H(x) = 2x^2 - x + 8$ dan sisa pembagian adalah $S(x) = 6x + 30$ (Pilihan A).',
      highlightsRumus: [
        'Pada setiap langkah pengurangan bersusun, selalu perhatikan pengurangan bilangan negatif: $4x^2 - (-6x^2) = 10x^2$.',
        'Selalu verifikasi sisa pembagian menggunakan akar-akar pembagi jika pembagi dapat difaktorkan.',
      ],
      quickMethodMrJo:
        'Untuk menyaring opsi sisa secara instan: uji $x = -1 \\implies f(-1) = 2 + 5 + 4 + 7 + 6 = 24$. Dari opsi yang ada, hanya $S(-1) = 6(-1) + 30 = 24$ (Opsi A & D). Lalu cek koefisien $x^3$ pada $(x^2 - 2x - 3)(2x^2 + bx + c)$: $b - 4 = -5 \\implies b = -1$. Langsung Opsi A!',
    },
  },
  {
    id: 3,
    indicatorNumber: 2,
    indicatorTitle: 'Pembagian Polinomial (Variasi 2: Analisis Metode Horner)',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'svg_horner_table',
      title: 'Lembar Kerja Metode Horner Milik Raka',
      caption:
        'Raka membagi $P(x) = 6x^3 - 7x^2 - 16x + 15$ dengan $(2x - 3)$ menggunakan skema Horner untuk $x = \\frac{3}{2}$.',
      textContext:
        'Berdasarkan skema Horner yang ia susun, Raka menyimpulkan bahwa hasil baginya adalah $6x^2 + 2x - 13$ dan sisanya adalah $-\\frac{9}{2}$.',
    },
    prompt:
      'Evaluasilah proses perhitungan dan kesimpulan Raka pada stimulus di atas. Pernyataan analisis yang paling tepat mengenai hasil kerja Raka adalah...',
    options: [
      'Kesimpulan Raka sudah benar seluruhnya karena angka pada baris terakhir Horner langsung menyatakan hasil bagi dan sisa.',
      'Raka keliru menentukan nilai pengali Horner; seharusnya menggunakan $x = -\\frac{3}{2}$ sehingga sisa pembagiannya berubah.',
      'Perhitungan sisa $-\\frac{9}{2}$ sudah tepat, tetapi hasil bagi Raka keliru karena belum dibagi oleh koefisien $x$ pada pembagi ($2$), sehingga hasil bagi yang benar adalah $3x^2 + x - \\frac{13}{2}$.',
      'Hasil bagi yang benar adalah $3x^2 + x - \\frac{13}{2}$, dan sisa pembagiannya juga harus dibagi $2$ menjadi $-\\frac{9}{4}$.',
      'Raka keliru pada penjumlahan kolom ketiga; seharusnya bernilai $-19$ bukan $-13$.',
    ],
    correctOptionIndex: 2,
    solution: {
      diketahui: [
        'Polinomial yang dibagi: $P(x) = 6x^3 - 7x^2 - 16x + 15$',
        'Pembagi linear non-monik: $(2x - 3)$',
        'Kesimpulan Raka: $H(x) = 6x^2 + 2x - 13$ dan $S = -\\frac{9}{2}$.',
      ],
      ditanyakan: 'Evaluasi ketepatan hasil bagi dan sisa pada metode Horner untuk pembagi $(ax + b)$.',
      landasanTeori:
        'Skema Horner dengan konstanta $k = -\\frac{b}{a}$ sejatinya membagi $P(x)$ dengan faktor monik $\\left(x - k\\right) = \\left(x + \\frac{b}{a}\\right)$. Untuk memperoleh hasil bagi oleh $(ax + b)$, faktor $a$ harus dikeluarkan dari hasil bagi sementara, sedangkan sisa pembagian tidak ikut terbagi oleh $a$.',
      rumus: [
        'P(x) = \\left(x - \\frac{3}{2}\\right) H_{\\text{Horner}}(x) + S = (2x - 3) \\cdot \\frac{H_{\\text{Horner}}(x)}{2} + S',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Memeriksa nilai pengali Horner',
          detail:
            'Pembuat nol pembagi $(2x - 3) = 0$ adalah $x = \\frac{3}{2}$. Langkah Raka memilih $k = \\frac{3}{2}$ sudah benar.',
        },
        {
          stepNumber: 2,
          title: 'Memverifikasi aritmetika baris Horner',
          detail:
            'Turunkan $6$. Lalu $6 \\times \\frac{3}{2} = 9 \\implies -7 + 9 = 2$. Lalu $2 \\times \\frac{3}{2} = 3 \\implies -16 + 3 = -13$. Lalu $-13 \\times \\frac{3}{2} = -\\frac{39}{2} \\implies 15 - \\frac{39}{2} = -\\frac{9}{2}$. Seluruh perhitungan baris Raka benar.',
        },
        {
          stepNumber: 3,
          title: 'Menganalisis hubungan pembagi $(x - \\frac{3}{2})$ dengan $(2x - 3)$',
          detail:
            'Dari baris terakhir diperoleh $P(x) = \\left(x - \\frac{3}{2}\\right)(6x^2 + 2x - 13) - \\frac{9}{2}$.',
        },
        {
          stepNumber: 4,
          title: 'Menyesuaikan hasil bagi untuk pembagi $(2x - 3)$',
          detail:
            'Faktorkan $2$ dari hasil bagi sementara: $P(x) = \\left(x - \\frac{3}{2}\\right) \\cdot 2\\left(3x^2 + x - \\frac{13}{2}\\right) - \\frac{9}{2} = (2x - 3)\\left(3x^2 + x - \\frac{13}{2}\\right) - \\frac{9}{2}$.',
        },
        {
          stepNumber: 5,
          title: 'Menarik kesimpulan evaluasi',
          detail:
            'Hasil bagi yang benar adalah $3x^2 + x - \\frac{13}{2}$, sedangkan sisa pembagian tetap $-\\frac{9}{2}$ (tidak dibagi $2$).',
        },
      ],
      kesimpulan:
        'Sisa $-\\frac{9}{2}$ sudah tepat, tetapi hasil bagi harus dibagi $2$ menjadi $3x^2 + x - \\frac{13}{2}$ (Pilihan C).',
      highlightsRumus: [
        'Jika membagi dengan $(ax + b)$ via Horner menggunakan $x = -\\frac{b}{a}$, maka: $H_{\\text{asli}}(x) = \\frac{H_{\\text{Horner}}(x)}{a}$ dan $S_{\\text{asli}} = S_{\\text{Horner}}$.',
      ],
      quickMethodMrJo:
        'Ingat prinsip emas Horner untuk $(ax+b)$: "Hasil dibagi $a$, Sisa tetap apa adanya!" Cek derajat tertinggi: $6x^3 \\div 2x = 3x^2$, jadi koefisien awal hasil bagi wajib $3$, bukan $6$.',
    },
  },
  {
    id: 4,
    indicatorNumber: 3,
    indicatorTitle: 'Teorema Sisa',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Relasi Sisa Dua Polinomial',
      textContext:
        'Diketahui dua polinomial $P(x)$ dan $Q(x)$ dengan sebuah konstanta $k$ yang belum diketahui:',
      mathLines: [
        'P(x) = x^4 - 3x^3 + 2x^2 + 3kx - 6',
        'Q(x) = 2x^3 + kx^2 - 4x + 5',
      ],
    },
    prompt:
      'Apabila sisa pembagian $P(x)$ oleh $(x - 2)$ sama dengan dua kali sisa pembagian $Q(x)$ oleh $(x + 1)$, maka sisa pembagian polinomial $P(x) + Q(x)$ oleh $(x - 1)$ adalah...',
    options: ['$5$', '$11$', '$14$', '$17$', '$23$'],
    correctOptionIndex: 3,
    solution: {
      diketahui: [
        '$P(x) = x^4 - 3x^3 + 2x^2 + 3kx - 6$',
        '$Q(x) = 2x^3 + kx^2 - 4x + 5$',
        'Sisa $P(x) \\div (x - 2)$ sama dengan $2 \\times$ sisa $Q(x) \\div (x + 1)$.',
      ],
      ditanyakan: 'Sisa pembagian $(P(x) + Q(x))$ oleh $(x - 1)$.',
      landasanTeori:
        'Menurut Teorema Sisa, jika polinomial $f(x)$ dibagi oleh $(x - c)$, maka sisa pembagiannya adalah $f(c)$. Selain itu, nilai penjumlahan dua polinomial di $x = c$ memenuhi $(P + Q)(c) = P(c) + Q(c)$.',
      rumus: ['S = f(c) \\text{ untuk pembagi } (x - c)'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan sisa pembagian $P(x)$ oleh $(x - 2)$',
          detail:
            'Substitusi $x = 2$: $P(2) = 2^4 - 3(2^3) + 2(2^2) + 3k(2) - 6 = 16 - 24 + 8 + 6k - 6 = 6k - 6$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan sisa pembagian $Q(x)$ oleh $(x + 1)$',
          detail:
            'Substitusi $x = -1$: $Q(-1) = 2(-1)^3 + k(-1)^2 - 4(-1) + 5 = -2 + k + 4 + 5 = k + 7$.',
        },
        {
          stepNumber: 3,
          title: 'Menyusun persamaan dan mencari nilai $k$',
          detail:
            'Dari syarat $P(2) = 2Q(-1)$, diperoleh $6k - 6 = 2(k + 7) \\implies 6k - 6 = 2k + 14 \\implies 4k = 20 \\implies k = 5$.',
        },
        {
          stepNumber: 4,
          title: 'Menghitung sisa pembagian $P(x) + Q(x)$ oleh $(x - 1)$',
          detail:
            'Berdasarkan Teorema Sisa, sisa pembagian adalah $P(1) + Q(1)$. Dengan $k = 5$: $P(1) = 1 - 3 + 2 + 15 - 6 = 9$ dan $Q(1) = 2 + 5 - 4 + 5 = 8$.',
        },
        {
          stepNumber: 5,
          title: 'Menjumlahkan dan memverifikasi hasil',
          detail:
            'Total sisa $= 9 + 8 = 17$. Verifikasi kondisi awal untuk $k = 5$: $P(2) = 6(5) - 6 = 24$ dan $2Q(-1) = 2(5 + 7) = 24$. Terbukti konsisten.',
        },
      ],
      kesimpulan:
        'Sisa pembagian $P(x) + Q(x)$ oleh $(x - 1)$ adalah $17$ (Pilihan D).',
      highlightsRumus: [
        'Pembagi $(x - c) \\implies$ sisa $f(c)$; pembagi $(x + c) \\implies$ sisa $f(-c)$.',
      ],
      quickMethodMrJo:
        'Hitung cepat substitusi: $P(2) = 6k - 6$ dan $Q(-1) = k + 7$. Dari $6k - 6 = 2k + 14$ langsung dapat $k = 5$. Lalu jumlahkan semua koefisien $P$ dan $Q$ untuk $x=1$: $(1-3+2+15-6)+(2+5-4+5) = 9 + 8 = 17$.',
    },
  },
  {
    id: 5,
    indicatorNumber: 4,
    indicatorTitle: 'Kesamaan Dua Polinomial',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Dekomposisi Pecahan Parsial',
      textContext:
        'Untuk setiap bilangan real $x \\neq -1, 2, -3$, berlaku kesamaan identitas aljabar berikut:',
      mathLines: [
        '\\frac{4x^2 + 15x - 1}{(x + 1)(x - 2)(x + 3)} \\equiv \\frac{A}{x + 1} + \\frac{B}{x - 2} + \\frac{C}{x + 3}',
      ],
    },
    prompt:
      'Dengan menggunakan prinsip kesamaan dua polinomial setelah menyamakan penyebut, nilai dari $A^2 + B^2 - C^2$ adalah...',
    options: ['$10$', '$12$', '$14$', '$16$', '$18$'],
    correctOptionIndex: 1,
    solution: {
      diketahui: [
        'Identitas $\\frac{4x^2 + 15x - 1}{(x + 1)(x - 2)(x + 3)} \\equiv \\frac{A}{x + 1} + \\frac{B}{x - 2} + \\frac{C}{x + 3}$ untuk $x \\neq -1, 2, -3$.',
      ],
      ditanyakan: 'Nilai $A^2 + B^2 - C^2$.',
      landasanTeori:
        'Dua polinomial dikatakan identik atau sama ($P(x) \\equiv Q(x)$) jika dan hanya jika koefisien suku-suku sejenis pada kedua ruas bernilai sama, atau keduanya memiliki nilai yang sama untuk seluruh nilai $x$ termasuk saat diperluas secara kontinu ke pembuat nol penyebut.',
      rumus: [
        '4x^2 + 15x - 1 \\equiv A(x - 2)(x + 3) + B(x + 1)(x + 3) + C(x + 1)(x - 2)',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Mengalikan kedua ruas dengan penyebut persekutuan',
          detail:
            'Kalikan kedua ruas dengan $(x + 1)(x - 2)(x + 3)$ sehingga terbentuk kesamaan polinomial: $4x^2 + 15x - 1 \\equiv A(x^2 + x - 6) + B(x^2 + 4x + 3) + C(x^2 - x - 2)$.',
        },
        {
          stepNumber: 2,
          title: 'Membentuk sistem persamaan linear koefisien',
          detail:
            'Kelompokkan suku sejenis pada ruas kanan: $(A + B + C)x^2 + (A + 4B - C)x + (-6A + 3B - 2C)$. Dari kesamaan polinomial diperoleh sistem: (1) $A + B + C = 4$, (2) $A + 4B - C = 15$, (3) $-6A + 3B - 2C = -1$.',
        },
        {
          stepNumber: 3,
          title: 'Menyelesaikan sistem persamaan',
          detail:
            'Jumlahkan (1) dan (2): $2A + 5B = 19$. Eliminasi $C$ dari $2\\times$(1) + (3): $-4A + 5B = 7$. Kurangkan kedua persamaan baru tersebut: $6A = 12 \\implies A = 2$. Substitusi ke $2(2) + 5B = 19 \\implies B = 3$. Lalu $2 + 3 + C = 4 \\implies C = -1$.',
        },
        {
          stepNumber: 4,
          title: 'Memeriksa kesamaan dengan substitusi titik pembuat nol',
          detail:
            'Uji $x = 2$: ruas kiri $4(4)+30-1 = 45$; ruas kanan $B(3)(5) = 15B \\implies B = 3$. Uji $x = -1$: ruas kiri $4-15-1 = -12$; ruas kanan $A(-3)(2) = -6A \\implies A = 2$. Uji $x = -3$: ruas kiri $36-45-1 = -10$; ruas kanan $C(-2)(-5) = 10C \\implies C = -1$. Konsisten!',
        },
        {
          stepNumber: 5,
          title: 'Menghitung nilai ekspresi akhir',
          detail: '$A^2 + B^2 - C^2 = 2^2 + 3^2 - (-1)^2 = 4 + 9 - 1 = 12$.',
        },
      ],
      kesimpulan: 'Nilai dari $A^2 + B^2 - C^2$ adalah $12$ (Pilihan B).',
      highlightsRumus: [
        'Pada kesamaan polinomial pecahan parsial, metode tutup/substitusi pembuat nol sangat efektif untuk verifikasi cepat.',
      ],
      quickMethodMrJo:
        'Gunakan "Metode Tutup" pada pembuat nol: untuk $A$, tutup $(x+1)$ dan substitusi $x=-1$: $A = \\frac{4-15-1}{(-3)(2)} = 2$. Untuk $B$ ($x=2$): $B = \\frac{16+30-1}{(3)(5)} = 3$. Untuk $C$ ($x=-3$): $C = \\frac{36-45-1}{(-2)(-5)} = -1$. Maka $4 + 9 - 1 = 12$.',
    },
  },
  {
    id: 6,
    indicatorNumber: 5,
    indicatorTitle: 'Menentukan Akar Persamaan Polinomial dengan Teorema Faktor',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Persamaan Polinomial Berderajat Empat',
      textContext:
        'Diberikan persamaan suku banyak berderajat empat dengan seluruh akar real berbeda $x_1 < x_2 < x_3 < x_4$:',
      mathLines: ['P(x) = 2x^4 - 5x^3 - 11x^2 + 20x + 12 = 0'],
    },
    prompt:
      'Dengan menerapkan Teorema Faktor dan uji akar rasional pada $P(x) = 0$, nilai dari $4(x_1 \\cdot x_2) + x_3 + x_4$ adalah...',
    options: ['$3$', '$5$', '$7$', '$8$', '$9$'],
    correctOptionIndex: 4,
    solution: {
      diketahui: [
        'Persamaan polinomial: $P(x) = 2x^4 - 5x^3 - 11x^2 + 20x + 12 = 0$',
        'Urutan akar real: $x_1 < x_2 < x_3 < x_4$.',
      ],
      ditanyakan: 'Nilai dari $4(x_1 \\cdot x_2) + x_3 + x_4$.',
      landasanTeori:
        'Berdasarkan Teorema Faktor, $(x - r)$ merupakan faktor dari $P(x)$ jika dan hanya jika $P(r) = 0$. Untuk polinomial berkoefisien bulat $a_n x^n + \\dots + a_0$, calon akar rasional $\\frac{p}{q}$ memenuhi $p \\mid a_0$ dan $q \\mid a_n$.',
      rumus: ['P(r) = 0 \\iff (x - r) \\mid P(x)'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menguji faktor-faktor bulat dari konstanta $12$',
          detail:
            'Uji $x = 1$: $P(1) = 2 - 5 - 11 + 20 + 12 = 18 \\neq 0$. Uji $x = 2$: $P(2) = 2(16) - 5(8) - 11(4) + 20(2) + 12 = 32 - 40 - 44 + 40 + 12 = 0$. Jadi $(x - 2)$ adalah faktor.',
        },
        {
          stepNumber: 2,
          title: 'Menurunkan derajat polinomial dengan Horner untuk $x = 2$',
          detail:
            'Koefisien $[2, -5, -11, 20, 12]$ dibagi $(x - 2)$ menghasilkan hasil bagi $2x^3 - x^2 - 13x - 6$.',
        },
        {
          stepNumber: 3,
          title: 'Mencari faktor berikutnya dari hasil bagi kubik',
          detail:
            'Misalkan $H(x) = 2x^3 - x^2 - 13x - 6$. Uji $x = -2$: $H(-2) = 2(-8) - 4 + 26 - 6 = -16 - 4 + 26 - 6 = 0$. Jadi $(x + 2)$ juga faktor.',
        },
        {
          stepNumber: 4,
          title: 'Memfaktorkan faktor kuadrat tersisa',
          detail:
            'Bagi $2x^3 - x^2 - 13x - 6$ dengan $(x + 2)$ via Horner menghasilkan $2x^2 - 5x - 3 = (2x + 1)(x - 3)$. Jadi $P(x) = (x + 2)(2x + 1)(x - 2)(x - 3)$.',
        },
        {
          stepNumber: 5,
          title: 'Mengurutkan akar dan menghitung nilai ekspresi',
          detail:
            'Akar-akarnya adalah $x_1 = -2, x_2 = -\\frac{1}{2}, x_3 = 2, x_4 = 3$. Nilai $4(x_1 \\cdot x_2) + x_3 + x_4 = 4((-2)(-\\frac{1}{2})) + 2 + 3 = 4(1) + 5 = 9$.',
        },
      ],
      kesimpulan: 'Nilai dari $4(x_1 \\cdot x_2) + x_3 + x_4$ adalah $9$ (Pilihan E).',
      highlightsRumus: [
        'Setiap faktor linear ditemukan, langsung turunkan derajat polinomial dengan Horner agar pencarian akar selanjutnya lebih ringan.',
      ],
      quickMethodMrJo:
        'Cek cepat jumlah akar dari Teorema Vieta: $x_1+x_2+x_3+x_4 = \\frac{5}{2}$ dan hasil kali $= \\frac{12}{2} = 6$. Setelah menemukan $x=2$ dan $x=-2$ (yang hasil kalinya $-4$), sisa dua akar punya hasil kali $-\\frac{6}{4} = -\\frac{3}{2}$ dan jumlah $\\frac{5}{2}$, langsung ketebak $3$ dan $-\\frac{1}{2}$!',
    },
  },
  {
    id: 7,
    indicatorNumber: 6,
    indicatorTitle: 'Teorema Sisa dengan Pembagi Berderajat Dua',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'data_table',
      title: 'Catatan Data Pembagian Polinomial $P(x)$',
      tableHeaders: ['Pembagi', 'Bentuk Faktor', 'Sisa Pembagian'],
      tableRows: [
        ['$x - 2$', '$(x - 2)$', '$12$'],
        ['$x^2 - x - 6$', '$(x - 3)(x + 2)$', '$3x - 2$'],
        ['$x^2 - 4$', '$(x - 2)(x + 2)$', '$S(x) = ax + b$'],
      ],
    },
    prompt:
      'Berdasarkan data hasil pembagian pada tabel di atas, sisa pembagian $P(x)$ oleh $(x^2 - 4)$ adalah...',
    options: ['$5x + 2$', '$5x - 2$', '$2x + 5$', '$-5x + 2$', '$4x + 4$'],
    correctOptionIndex: 0,
    solution: {
      diketahui: [
        '$P(x)$ dibagi $(x - 2)$ bersisa $12$.',
        '$P(x)$ dibagi $(x^2 - x - 6)$ bersisa $(3x - 2)$.',
      ],
      ditanyakan: 'Sisa pembagian $P(x)$ oleh $(x^2 - 4)$.',
      landasanTeori:
        'Jika suatu polinomial dibagi oleh pembagi kuadrat $(x - p)(x - q)$ dengan $p \\neq q$, sisa pembagiannya berbentuk polinomial linear $S(x) = ax + b$ dan memenuhi $P(p) = S(p)$ serta $P(q) = S(q)$.',
      rumus: [
        'P(x) = (x^2 - 4)H(x) + (ax + b)',
        'P(2) = 2a + b \\quad \\text{dan} \\quad P(-2) = -2a + b',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Mengekstrak nilai polinomial dari pembagi pertama',
          detail: 'Karena $P(x)$ dibagi $(x - 2)$ bersisa $12$, maka $P(2) = 12$.',
        },
        {
          stepNumber: 2,
          title: 'Mengekstrak nilai polinomial dari pembagi kuadratik yang diketahui',
          detail:
            'Faktorkan $x^2 - x - 6 = (x - 3)(x + 2)$. Untuk $x = -2$, $P(-2) = 3(-2) - 2 = -8$. (Catatan: $P(3) = 7$ tidak dibutuhkan untuk pembagi $x^2 - 4$).',
        },
        {
          stepNumber: 3,
          title: 'Menyusun sistem persamaan untuk sisa $S(x) = ax + b$',
          detail:
            'Dari $P(2) = 12 \\implies 2a + b = 12$, dan dari $P(-2) = -8 \\implies -2a + b = -8$.',
        },
        {
          stepNumber: 4,
          title: 'Menentukan nilai $a$ dan $b$',
          detail:
            'Jumlahkan kedua persamaan: $2b = 4 \\implies b = 2$. Substitusi ke $2a + 2 = 12 \\implies 2a = 10 \\implies a = 5$.',
        },
        {
          stepNumber: 5,
          title: 'Memeriksa hasil sisa $S(x) = 5x + 2$',
          detail: 'Cek $S(2) = 5(2) + 2 = 12 = P(2)$ dan $S(-2) = 5(-2) + 2 = -8 = P(-2)$. Benar!',
        },
      ],
      kesimpulan: 'Sisa pembagian $P(x)$ oleh $(x^2 - 4)$ adalah $5x + 2$ (Pilihan A).',
      highlightsRumus: [
        'Selalu faktorkan pembagi kuadrat untuk melihat akar mana yang beririsan dengan pembagi target.',
      ],
      quickMethodMrJo:
        'Ambil dua titiknya: $(2, 12)$ dan $(-2, -8)$. Gradien $a = \\frac{12 - (-8)}{2 - (-2)} = \\frac{20}{4} = 5$. Lalu $b = 12 - 5(2) = 2$. Sisa $= 5x + 2$!',
    },
  },
  {
    id: 8,
    indicatorNumber: 7,
    indicatorTitle: 'Masalah Kontekstual Polinomial dan Faktor-Faktornya',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'photo',
      title: 'Prototipe Kemasan Lipat Tanpa Tutup',
      imageUrl: '/src/assets/images/stimulus_packaging_box_1795609729134.jpg',
      imageAlt: 'Prototipe kotak kemasan karton geometris di atas meja gambar bersama jangka sorong',
      caption:
        'Ilustrasi prototipe kemasan karton yang dibentuk dari lembaran persegi panjang melalui pemotongan sudut persegi.',
      textContext:
        'Sebuah kotak kemasan tanpa tutup dibuat dari selembar karton berukuran $24\\text{ cm} \\times 18\\text{ cm}$ dengan memotong persegi identik bersisi $x\\text{ cm}$ di keempat sudutnya lalu melipat sisi-sisinya ke atas.',
    },
    prompt:
      'Volume kotak dinyatakan oleh $V(x)$ dan ditargetkan tepat $640\\text{ cm}^3$. Setelah dimodelkan menjadi persamaan polinomial dan difaktorkan untuk mencari tinggi $x$ bilangan bulat, kesimpulan yang paling tepat mengenai akar-akar persamaan polinomial dan dimensi kotak tersebut adalah...',
    options: [
      'Diperoleh faktor $(x - 4)$, dan terdapat dua ukuran tinggi bilangan bulat yang memenuhi syarat fisik kotak yaitu $4\\text{ cm}$ dan $14\\text{ cm}$.',
      'Model volumenya adalah $V(x) = x(24 - x)(18 - x)$ dengan tinggi yang memenuhi adalah $x = 4\\text{ cm}$.',
      'Persamaan $x^3 - 21x^2 + 108x - 160 = 0$ memiliki faktor $(x - 4)$ dengan satu ukuran tinggi bulat yang valid yaitu $4\\text{ cm}$ (panjang $16\\text{ cm}$, lebar $10\\text{ cm}$), sedangkan akar lain yang lebih dari $9\\text{ cm}$ tidak memenuhi syarat domain geometri.',
      'Persamaan $x^3 - 21x^2 + 108x - 160 = 0$ memiliki tiga akar bilangan bulat positif sehingga menghasilkan tiga desain kotak yang berbeda.',
      'Tinggi kotak $x = 2\\text{ cm}$ menghasilkan volume tepat $640\\text{ cm}^3$ karena $2$ membagi habis $160$.',
    ],
    correctOptionIndex: 2,
    solution: {
      diketahui: [
        'Ukuran karton awal: panjang $24\\text{ cm}$, lebar $18\\text{ cm}$.',
        'Potongan persegi di tiap sudut: $x \\times x\\text{ cm}$.',
        'Volume target: $V(x) = 640\\text{ cm}^3$.',
      ],
      ditanyakan: 'Model polinomial, interpretasi faktor/akar terhadap domain fisik, serta dimensi kotak.',
      landasanTeori:
        'Pemodelan volume balok hasil lipatan karton mengurangi masing-masing panjang dan lebar sebesar $2x$ (kiri-kanan dan atas-bawah). Agar dimensi panjang, lebar, dan tinggi bernilai positif, harus dipenuhi syarat domain $x > 0$, $24 - 2x > 0$, dan $18 - 2x > 0$, yakni $0 < x < 9$.',
      rumus: ['V(x) = x(24 - 2x)(18 - 2x) = 4x(12 - x)(9 - x)'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menyusun persamaan polinomial dari target volume',
          detail:
            '$4x(12 - x)(9 - x) = 640 \\implies x(x^2 - 21x + 108) = 160 \\implies x^3 - 21x^2 + 108x - 160 = 0$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan faktor linear bulat menggunakan Teorema Faktor',
          detail:
            'Uji $x = 4$: $4^3 - 21(4^2) + 108(4) - 160 = 64 - 336 + 432 - 160 = 0$. Jadi $(x - 4)$ adalah faktor.',
        },
        {
          stepNumber: 3,
          title: 'Memfaktorkan untuk memeriksa akar-akar lainnya',
          detail:
            'Pembagian $(x^3 - 21x^2 + 108x - 160)$ oleh $(x - 4)$ menghasilkan $x^2 - 17x + 40 = 0$. Dengan rumus kuadrat: $x = \\frac{17 \\pm \\sqrt{289 - 160}}{2} = \\frac{17 \\pm \\sqrt{129}}{2}$.',
        },
        {
          stepNumber: 4,
          title: 'Menginterpretasikan akar terhadap batas geometri $0 < x < 9$',
          detail:
            'Akar $x_2 = \\frac{17 - \\sqrt{129}}{2} \\approx 2{,}82\\text{ cm}$ valid secara fisik tetapi bukan bilangan bulat. Akar $x_3 = \\frac{17 + \\sqrt{129}}{2} \\approx 14{,}18\\text{ cm}$ ditolak karena melanggar syarat $18 - 2x > 0$ (lebar akan bernilai negatif).',
        },
        {
          stepNumber: 5,
          title: 'Menentukan dimensi kotak yang valid',
          detail:
            'Untuk $x = 4\\text{ cm}$: panjang $= 24 - 2(4) = 16\\text{ cm}$, lebar $= 18 - 2(4) = 10\\text{ cm}$, tinggi $= 4\\text{ cm}$. Cek volume: $16 \\times 10 \\times 4 = 640\\text{ cm}^3$.',
        },
      ],
      kesimpulan:
        'Persamaan $x^3 - 21x^2 + 108x - 160 = 0$ memiliki faktor $(x - 4)$ dengan ukuran valid bulat $16\\text{ cm} \\times 10\\text{ cm} \\times 4\\text{ cm}$, sedangkan akar $> 9\\text{ cm}$ gugur oleh kendala fisik (Pilihan C).',
      highlightsRumus: [
        'Pada soal cerita polinomial, selalu periksa syarat fisis ($\\text{panjang}, \\text{lebar}, \\text{tinggi} > 0$) sebelum menerima akar.',
      ],
      quickMethodMrJo:
        'Faktorkan $160$ agar memenuhi pola $x(12-x)(9-x) = 160$. Coba $x = 4$: $4 \\times 8 \\times 5 = 160$! Langsung dapat panjang $2(8)=16$ dan lebar $2(5)=10$.',
    },
  },
  {
    id: 9,
    indicatorNumber: 8,
    indicatorTitle: 'Menentukan Faktor Lainnya',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Polinomial Berparameter dengan Faktor Diketahui',
      textContext:
        'Diketahui $(2x - 1)$ dan $(x + 3)$ merupakan dua faktor linear dari polinomial berikut:',
      mathLines: ['P(x) = 2x^4 + ax^3 - 33x^2 + bx + 15'],
    },
    prompt:
      'Setelah menentukan nilai $a$ dan $b$ terlebih dahulu, pasangan faktor linear lainnya dari polinomial $P(x)$ adalah...',
    options: [
      '$(x - 1)$ dan $(x + 5)$',
      '$(x + 1)$ dan $(x - 5)$',
      '$(x - 1)$ dan $(x - 5)$',
      '$(x + 1)$ dan $(x + 5)$',
      '$(x - 3)$ dan $(x + 5)$',
    ],
    correctOptionIndex: 1,
    solution: {
      diketahui: [
        '$P(x) = 2x^4 + ax^3 - 33x^2 + bx + 15$',
        'Faktor yang diketahui: $(2x - 1)$ dan $(x + 3)$.',
      ],
      ditanyakan: 'Dua faktor linear lainnya dari $P(x)$.',
      landasanTeori:
        'Jika $(2x - 1)$ dan $(x + 3)$ adalah faktor dari $P(x)$, maka $P(\\frac{1}{2}) = 0$ dan $P(-3) = 0$. Selain itu, hasil kali $(2x - 1)(x + 3) = 2x^2 + 5x - 3$ juga membagi habis $P(x)$.',
      rumus: ['P(x) = (2x - 1)(x + 3) \\cdot Q(x)'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Membentuk persamaan dari faktor $(2x - 1)$',
          detail:
            'Substitusi $x = \\frac{1}{2}$: $2(\\frac{1}{16}) + a(\\frac{1}{8}) - 33(\\frac{1}{4}) + b(\\frac{1}{2}) + 15 = 0$. Kalikan $8$: $1 + a - 66 + 4b + 120 = 0 \\implies a + 4b = -55$.',
        },
        {
          stepNumber: 2,
          title: 'Membentuk persamaan dari faktor $(x + 3)$',
          detail:
            'Substitusi $x = -3$: $2(81) + a(-27) - 33(9) + b(-3) + 15 = 0 \\implies 162 - 27a - 297 - 3b + 15 = 0 \\implies -27a - 3b = 120 \\implies 9a + b = -40$.',
        },
        {
          stepNumber: 3,
          title: 'Menyelesaikan sistem untuk memperoleh $a$ dan $b$',
          detail:
            'Dari $b = -40 - 9a$, substitusi ke $a + 4(-40 - 9a) = -55 \\implies -35a - 160 = -55 \\implies -35a = 105 \\implies a = -3$. Maka $b = -40 - 9(-3) = -13$.',
        },
        {
          stepNumber: 4,
          title: 'Membagi $P(x)$ dengan $(2x^2 + 5x - 3)$',
          detail:
            '$P(x) = 2x^4 - 3x^3 - 33x^2 - 13x + 15$. Hasil bagi oleh $(2x^2 + 5x - 3)$: suku awal $x^2$, suku konstanta $15 \\div (-3) = -5$. Uji koefisien $x^3$: $(2x^2)(kx) + (5x)(x^2) = (2k + 5)x^3 = -3x^3 \\implies k = -4$. Jadi hasil baginya $x^2 - 4x - 5$.',
        },
        {
          stepNumber: 5,
          title: 'Memfaktorkan hasil bagi dan memverifikasi hasil',
          detail:
            '$x^2 - 4x - 5 = (x + 1)(x - 5)$. Verifikasi konstanta akhir: $(-1)(3)(1)(-5) = +15$, dan uji $x=1$: $2 - 3 - 33 - 13 + 15 = -32$ sama dengan $(1)(4)(2)(-4) = -32$. Cocok!',
        },
      ],
      kesimpulan:
        'Faktor linear lainnya dari $P(x)$ adalah $(x + 1)$ dan $(x - 5)$ (Pilihan B).',
      highlightsRumus: [
        'Hasil kali seluruh konstanta faktor linear harus sama dengan konstanta polinomial ($+15$).',
      ],
      quickMethodMrJo:
        'Tanpa mencari $a$ dan $b$ dulu: konstanta dari $(2x - 1)(x + 3)$ adalah $-1 \\times 3 = -3$. Agar hasil kali konstanta menjadi $+15$, konstanta dua faktor sisanya wajib memiliki hasil kali $\\frac{15}{-3} = -5$. Itu hanya mungkin tanda berlawanan (Opsi A, B, E). Lalu cek $P(x)$ dengan membandingkan koefisien $x^2$: $2c + 5k - 3(1) = -33$ (dengan $c=-5$) $\\implies -10 + 5k - 3 = -33 \\implies k = -4$, sehingga $x^2 - 4x - 5 = (x + 1)(x - 5)$!',
    },
  },
  {
    id: 10,
    indicatorNumber: 9,
    indicatorTitle: 'Teorema Sisa dengan Pembagi Berbentuk ax + b',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Dua Polinomial dengan Pembagi Linear $(ax + b)$',
      textContext: 'Diketahui dua polinomial $F(x)$ dan $G(x)$ sebagai berikut:',
      mathLines: [
        'F(x) = 4x^3 + mx^2 - 5x + 6',
        'G(x) = 2x^3 - 3x^2 + 7x + 10',
      ],
    },
    prompt:
      'Jika $F(x)$ dan $G(x)$ memberikan sisa pembagian yang sama ketika keduanya dibagi oleh $(2x + 1)$, maka sisa pembagian $F(x)$ oleh $(2x - 3)$ adalah...',
    options: ['$-\\frac{27}{2}$', '$-12$', '$-11$', '$-\\frac{21}{2}$', '$\\frac{21}{2}$'],
    correctOptionIndex: 3,
    solution: {
      diketahui: [
        '$F(x) = 4x^3 + mx^2 - 5x + 6$',
        '$G(x) = 2x^3 - 3x^2 + 7x + 10$',
        'Sisa $F(x) \\div (2x + 1)$ sama dengan sisa $G(x) \\div (2x + 1)$.',
      ],
      ditanyakan: 'Sisa pembagian $F(x)$ oleh $(2x - 3)$.',
      landasanTeori:
        'Berdasarkan Teorema Sisa untuk pembagi berbentuk $(ax + b)$ dengan $a \\neq 0$, sisa pembagian polinomial $P(x)$ oleh $(ax + b)$ adalah $P\\left(-\\frac{b}{a}\\right)$.',
      rumus: ['S = P\\left(-\\frac{b}{a}\\right) \\text{ untuk pembagi } (ax + b)'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan nilai substitusi dari pembagi $(2x + 1)$',
          detail: '$2x + 1 = 0 \\implies x = -\\frac{1}{2}$.',
        },
        {
          stepNumber: 2,
          title: 'Menghitung sisa pembagian $G(x)$ dan $F(x)$ di $x = -\\frac{1}{2}$',
          detail:
            '$G\\left(-\\frac{1}{2}\\right) = 2\\left(-\\frac{1}{8}\\right) - 3\\left(\\frac{1}{4}\\right) + 7\\left(-\\frac{1}{2}\\right) + 10 = -\\frac{1}{4} - \\frac{3}{4} - \\frac{7}{2} + 10 = 9 - \\frac{7}{2} = \\frac{11}{2}$. Selanjutnya $F\\left(-\\frac{1}{2}\\right) = 4\\left(-\\frac{1}{8}\\right) + m\\left(\\frac{1}{4}\\right) - 5\\left(-\\frac{1}{2}\\right) + 6 = -\\frac{1}{2} + \\frac{m}{4} + \\frac{5}{2} + 6 = \\frac{m}{4} + 8$.',
        },
        {
          stepNumber: 3,
          title: 'Menentukan nilai parameter $m$',
          detail:
            'Karena sisa sama: $\\frac{m}{4} + 8 = \\frac{11}{2} \\implies \\frac{m}{4} = \\frac{11}{2} - \\frac{16}{2} = -\\frac{5}{2} \\implies m = -10$.',
        },
        {
          stepNumber: 4,
          title: 'Menghitung sisa pembagian $F(x)$ oleh $(2x - 3)$',
          detail:
            'Pembuat nol pembagi $(2x - 3)$ adalah $x = \\frac{3}{2}$. Dengan $m = -10$: $F\\left(\\frac{3}{2}\\right) = 4\\left(\\frac{27}{8}\\right) - 10\\left(\\frac{9}{4}\\right) - 5\\left(\\frac{3}{2}\\right) + 6$.',
        },
        {
          stepNumber: 5,
          title: 'Menyederhanakan pecahan akhir',
          detail:
            '$F\\left(\\frac{3}{2}\\right) = \\frac{27}{2} - \\frac{45}{2} - \\frac{15}{2} + \\frac{12}{2} = \\frac{27 - 45 - 15 + 12}{2} = -\\frac{21}{2}$.',
        },
      ],
      kesimpulan: 'Sisa pembagian $F(x)$ oleh $(2x - 3)$ adalah $-\\frac{21}{2}$ (Pilihan D).',
      highlightsRumus: [
        'Hati-hati pada tanda pangkat ganjil untuk pecahan negatif: $(-\\frac{1}{2})^3 = -\\frac{1}{8}$.',
      ],
      quickMethodMrJo:
        'Samakan penyebut per $4$ saat menghitung di $x = -\\frac{1}{2}$: $G(-\\frac{1}{2}) = \\frac{-1-3-14+40}{4} = \\frac{22}{4}$, dan $F(-\\frac{1}{2}) = \\frac{-2+m+10+24}{4} = \\frac{m+32}{4}$. Jadi $m+32 = 22 \\implies m = -10$. Langsung substitusi $x = \\frac{3}{2}$!',
    },
  },
  {
    id: 11,
    indicatorNumber: 10,
    indicatorTitle: 'Teorema Sisa, Teorema Faktor, dan Akar Polinomial',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.TINGGI,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Rekonstruksi Polinomial Derajat Tiga',
      textContext:
        'Suatu polinomial berderajat tiga $P(x)$ memenuhi tiga kondisi matematis berikut:',
      mathLines: [
        'P(x) \\text{ habis dibagi oleh } (x^2 - 1)',
        'P(x) \\text{ dibagi } (x - 2) \\text{ bersisa } 9',
        'P(x) \\text{ dibagi } (x + 2) \\text{ bersisa } -15',
      ],
    },
    prompt:
      'Berdasarkan rekonstruksi polinomial $P(x)$, akar ketiga dari persamaan $P(x) = 0$ (selain $1$ dan $-1$) serta sisa pembagian $P(x)$ oleh $(2x + 3)$ berturut-turut adalah...',
    options: [
      '$\\frac{1}{2}$ dan $-5$',
      '$-\\frac{1}{2}$ dan $-5$',
      '$\\frac{1}{2}$ dan $5$',
      '$2$ dan $-5$',
      '$\\frac{1}{2}$ dan $-\\frac{5}{2}$',
    ],
    correctOptionIndex: 0,
    solution: {
      diketahui: [
        '$P(x)$ berderajat $3$ dan habis dibagi $(x^2 - 1)$.',
        '$P(2) = 9$ dan $P(-2) = -15$.',
      ],
      ditanyakan: 'Akar ketiga dari $P(x) = 0$ dan sisa pembagian $P(x)$ oleh $(2x + 3)$.',
      landasanTeori:
        'Jika polinomial berderajat $3$ habis dibagi oleh faktor berderajat $2$, yaitu $(x^2 - 1)$, maka hasil baginya pasti berbentuk polinomial linear $(ax + b)$ sehingga $P(x) = (x^2 - 1)(ax + b)$.',
      rumus: ['P(x) = (x^2 - 1)(ax + b)'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menyusun bentuk umum $P(x)$ dari Teorema Faktor',
          detail:
            'Karena $\\deg(P) = 3$ dan $(x^2 - 1)$ adalah faktor, maka $P(x) = (x^2 - 1)(ax + b)$ dengan $a \\neq 0$.',
        },
        {
          stepNumber: 2,
          title: 'Menggunakan Teorema Sisa di $x = 2$ dan $x = -2$',
          detail:
            '$P(2) = (2^2 - 1)(2a + b) = 3(2a + b) = 9 \\implies 2a + b = 3$. Lalu $P(-2) = ((-2)^2 - 1)(-2a + b) = 3(-2a + b) = -15 \\implies -2a + b = -5$.',
        },
        {
          stepNumber: 3,
          title: 'Menentukan nilai $a$ dan $b$',
          detail:
            'Jumlahkan kedua persamaan: $2b = -2 \\implies b = -1$. Substitusi ke $2a - 1 = 3 \\implies 2a = 4 \\implies a = 2$. Jadi $P(x) = (x^2 - 1)(2x - 1)$.',
        },
        {
          stepNumber: 4,
          title: 'Menentukan akar ketiga dari $P(x) = 0$',
          detail:
            '$(x - 1)(x + 1)(2x - 1) = 0 \\implies$ akar-akarnya adalah $x = -1, x = 1,$ dan $x = \\frac{1}{2}$. Jadi akar ketiganya adalah $\\frac{1}{2}$.',
        },
        {
          stepNumber: 5,
          title: 'Menentukan sisa pembagian oleh $(2x + 3)$',
          detail:
            'Substitusi $x = -\\frac{3}{2}$: $P\\left(-\\frac{3}{2}\\right) = \\left(\\frac{9}{4} - 1\\right)\\left(2\\left(-\\frac{3}{2}\\right) - 1\\right) = \\left(\\frac{5}{4}\\right)(-4) = -5$.',
        },
      ],
      kesimpulan:
        'Akar ketiga adalah $\\frac{1}{2}$ dan sisa pembagian oleh $(2x + 3)$ adalah $-5$ (Pilihan A).',
      highlightsRumus: [
        'Menuliskan $P(x)$ dalam bentuk faktor $(x^2 - 1)(ax + b)$ jauh lebih efisien daripada memisalkan $ax^3 + bx^2 + cx + d$.',
      ],
      quickMethodMrJo:
        'Karena $x^2 - 1 = 3$ untuk kedua titik $x = \\pm 2$, langsung bagi sisa dengan $3$: di $x=2$ faktor linearnya $3$, di $x=-2$ faktor linearnya $-5$. Garis yang lewat $(2, 3)$ dan $(-2, -5)$ punya gradien $2$ dan konstanta $-1 \\implies (2x - 1)$, akarnya $\\frac{1}{2}$, dan di $x = -\\frac{3}{2}$ bernilai $\\frac{5}{4}(-4) = -5$!',
    },
  },
  {
    id: 12,
    indicatorNumber: 11,
    indicatorTitle: 'Menentukan Koefisien yang Belum Diketahui dengan Teorema Sisa',
    type: QuestionType.PG,
    category: TopicCategory.POLINOMIAL,
    difficulty: DifficultyLevel.MENENGAH,
    weight: 2,
    stimulus: {
      kind: 'math_box',
      title: 'Polinomial Berderajat Empat dengan Dua Parameter',
      textContext:
        'Diketahui polinomial $P(x) = x^4 + ax^3 - 5x^2 + bx + 6$ dengan $a, b \\in \\mathbb{R}$.',
      mathLines: [
        'P(x) \\div (x - 2) \\text{ bersisa } 12',
        'P(x) \\div (x + 1) \\text{ bersisa } 3',
      ],
    },
    prompt:
      'Dengan menentukan koefisien $a$ dan $b$ secara sistematis menggunakan Teorema Sisa, nilai dari $3a - 2b$ adalah...',
    options: ['$-12$', '$0$', '$6$', '$9$', '$12$'],
    correctOptionIndex: 4,
    solution: {
      diketahui: [
        '$P(x) = x^4 + ax^3 - 5x^2 + bx + 6$',
        '$P(2) = 12$ dan $P(-1) = 3$.',
      ],
      ditanyakan: 'Nilai $3a - 2b$.',
      landasanTeori:
        'Setiap informasi sisa pembagian oleh faktor linear menghasilkan satu persamaan linear dalam koefisien-koefisien polinomial yang belum diketahui. Dua kondisi bebas cukup untuk menentukan dua parameter $a$ dan $b$ secara unik.',
      rumus: ['P(c) = \\text{Sisa pembagian oleh } (x - c)'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Membentuk persamaan pertama dari $P(2) = 12$',
          detail:
            '$2^4 + a(2^3) - 5(2^2) + b(2) + 6 = 12 \\implies 16 + 8a - 20 + 2b + 6 = 12 \\implies 8a + 2b + 2 = 12 \\implies 4a + b = 5$.',
        },
        {
          stepNumber: 2,
          title: 'Membentuk persamaan kedua dari $P(-1) = 3$',
          detail:
            '$(-1)^4 + a(-1)^3 - 5(-1)^2 + b(-1) + 6 = 3 \\implies 1 - a - 5 - b + 6 = 3 \\implies -a - b + 2 = 3 \\implies -a - b = 1$.',
        },
        {
          stepNumber: 3,
          title: 'Mengeliminasi variabel $b$',
          detail:
            'Jumlahkan persamaan $4a + b = 5$ dan $-a - b = 1$ sehingga diperoleh $3a = 6 \\implies a = 2$.',
        },
        {
          stepNumber: 4,
          title: 'Menentukan nilai $b$ dan memverifikasi',
          detail:
            'Substitusi $a = 2$ ke $-a - b = 1$: $-2 - b = 1 \\implies b = -3$. Cek $P(2) = 16 + 16 - 20 - 6 + 6 = 12$ dan $P(-1) = 1 - 2 - 5 + 3 + 6 = 3$. Tepat!',
        },
        {
          stepNumber: 5,
          title: 'Menghitung nilai $3a - 2b$',
          detail: '$3(2) - 2(-3) = 6 + 6 = 12$.',
        },
      ],
      kesimpulan: 'Nilai dari $3a - 2b$ adalah $12$ (Pilihan E).',
      highlightsRumus: [
        'Sederhanakan tiap persamaan dengan membagi faktor persekutuan ($2$) sebelum mengeliminasi.',
      ],
      quickMethodMrJo:
        'Dari $P(2) = 12$: $8a + 2b = 10 \\implies 4a + b = 5$. Dari $P(-1) = 3$: $a + b = -1$. Kurangkan keduanya langsung dapat $3a = 6 \\implies a = 2, b = -3$. Hitung $3(2) - 2(-3) = 12$.',
    },
  },
];
