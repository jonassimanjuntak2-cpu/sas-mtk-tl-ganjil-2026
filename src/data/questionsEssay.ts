import {
  DifficultyLevel,
  Question,
  QuestionType,
  TopicCategory,
} from '../types/assessment';

export const ESSAY_QUESTIONS: Question[] = [
  {
    id: 26,
    indicatorNumber: 23,
    indicatorTitle: 'Referensi Sumatif Nomor 3 (Slot Editable Guru)',
    type: QuestionType.ESSAY,
    category: TopicCategory.MENUNGGU_KONFIRMASI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 10,
    isEditableSlot: true,
    waitingStatusText: 'Menunggu konfirmasi materi indikator 23',
    stimulus: {
      kind: 'math_box',
      title: 'Status Kisi-Kisi Indikator 23',
      textContext:
        'Catatan tulisan tangan pada kisi-kisi asli bertuliskan: "23. (Sumatif no 3 [saham²])". Materi ini belum dikonfirmasi sehingga tidak boleh dikarang. Guru dapat mengisi soal asli melalui Mode Guru.',
      mathLines: ['\\text{Status: Menunggu konfirmasi materi indikator 23}'],
    },
    prompt:
      'Slot soal esai Indikator 23 sedang menunggu konfirmasi materi dari guru (catatan kisi-kisi: "Sumatif no 3 [saham²]"). Jika guru telah mengisi soal melalui Mode Guru, soal akan muncul di sini. Anda tetap dapat menuliskan catatan atau menunggu arahan guru.',
    solution: {
      diketahui: [
        'Catatan asli pada kisi-kisi: "23. (Sumatif no 3 [saham²])".',
        'Status saat ini: Menunggu konfirmasi materi indikator 23.',
      ],
      ditanyakan: 'Materi dan pertanyaan resmi yang diisi oleh guru pengampu.',
      landasanTeori:
        'Sesuai prinsip integritas asesmen, soal yang belum jelas pada catatan tulisan tangan tidak direkayasa. Guru dapat melengkapi soal, stimulus, kunci, serta rubrik penilaian pada panel Mode Guru.',
      rumus: ['\\text{Disesuaikan setelah konfirmasi guru pengampu}'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Membuka Mode Guru',
          detail: 'Masukkan password Mode Guru pada menu atas untuk mengakses editor Indikator 23.',
        },
        {
          stepNumber: 2,
          title: 'Melengkapi soal dan pembahasan',
          detail:
            'Isikan judul materi terkonfirmasi, teks stimulus, pertanyaan soal, dan panduan kunci jawaban lalu simpan.',
        },
      ],
      kesimpulan:
        'Slot siap diperbarui kapan saja oleh guru dan langsung tersimpan pada penyimpanan lokal perangkat ini.',
      highlightsRumus: ['Jangan menebak materi yang belum terkonfirmasi; gunakan editor Mode Guru.'],
      quickMethodMrJo:
        'Setelah guru mengonfirmasi materi Indikator 23 dan menyimpannya di Mode Guru, murid dapat langsung mengerjakan soal resmi pada nomor ini.',
      rubrik: [
        {
          aspect: 'Ketepatan konsep',
          maxPoints: 2,
          descriptor: 'Ketepatan konsep sesuai materi Indikator 23 yang dikonfirmasi guru.',
        },
        {
          aspect: 'Ketepatan penggunaan rumus',
          maxPoints: 2,
          descriptor: 'Ketepatan memilih dan menuliskan rumus sesuai materi terkonfirmasi.',
        },
        {
          aspect: 'Kelengkapan proses',
          maxPoints: 2,
          descriptor: 'Kelengkapan langkah sistematis dari informasi awal hingga solusi.',
        },
        {
          aspect: 'Ketepatan perhitungan',
          maxPoints: 2,
          descriptor: 'Akurasi manipulasi aljabar dan hasil numerik.',
        },
        {
          aspect: 'Kesimpulan',
          maxPoints: 2,
          descriptor: 'Penarikan kesimpulan akhir yang jelas dan menjawab pertanyaan.',
        },
      ],
    },
  },
  {
    id: 27,
    indicatorNumber: 24,
    indicatorTitle: 'Soal Cerita tentang Sudut Rangkap dan Sudut Berelasi',
    type: QuestionType.ESSAY,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 10,
    stimulus: {
      kind: 'svg_tower_wires',
      title: 'Diagram Penopang Menara Pemancar',
      caption:
        'Menara setinggi $15\\text{ meter}$ ditopang dua kawat lurus dari tanah datar dengan sudut elevasi $\\theta$ dan $2\\theta$ ($0^\\circ < \\theta < 45^\\circ$).',
      textContext:
        'Sebuah menara pemancar berdiri tegak setinggi $15\\text{ meter}$ di atas tanah datar dan ditahan oleh dua kawat baja menuju puncak menara. Kawat pertama membentuk sudut elevasi $\\theta$ terhadap tanah, sedangkan kawat kedua yang lebih dekat ke kaki menara membentuk sudut elevasi $2\\theta$ ($0^\\circ < \\theta < 45^\\circ$). Diketahui nilai sudut berelasi $\\sin(90^\\circ + \\theta) = \\frac{4}{5}$.',
    },
    prompt:
      'Selesaikan secara sistematis:\n(a) Gunakan rumus sudut berelasi dan sudut rangkap untuk menentukan nilai eksak $\\cos \\theta$, $\\sin \\theta$, $\\sin(180^\\circ - 2\\theta)$, serta $\\cos 2\\theta$.\n(b) Hitunglah panjang masing-masing kawat penahan serta jarak mendatar antara kedua titik pancang di tanah, lalu tuliskan kesimpulan geometrisnya!',
    solution: {
      diketahui: [
        'Tinggi menara $h = 15\\text{ meter}$.',
        'Sudut elevasi kawat 1 adalah $\\theta$ dan kawat 2 adalah $2\\theta$, dengan $0^\\circ < \\theta < 45^\\circ$.',
        '$\\sin(90^\\circ + \\theta) = \\frac{4}{5}$.',
      ],
      ditanyakan:
        '(a) Nilai $\\cos \\theta, \\sin \\theta, \\sin(180^\\circ - 2\\theta), \\cos 2\\theta$. (b) Panjang kawat $L_1, L_2$, jarak antarpancang $d_1 - d_2$, dan kesimpulan.',
      landasanTeori:
        'Rumus sudut berelasi $\\sin(90^\\circ + \\theta) = \\cos \\theta$ dan $\\sin(180^\\circ - 2\\theta) = \\sin 2\\theta$ menghubungkan informasi awal ke fungsi sudut dasar dan sudut rangkap. Karena $0^\\circ < \\theta < 45^\\circ$, baik $\\theta$ maupun $2\\theta$ berada di Kuadran I sehingga semua perbandingan bernilai positif.',
      rumus: [
        '\\sin(90^\\circ + \\theta) = \\cos \\theta, \\quad \\sin(180^\\circ - 2\\theta) = \\sin 2\\theta',
        '\\sin 2\\theta = 2\\sin \\theta \\cos \\theta, \\quad \\cos 2\\theta = \\cos^2 \\theta - \\sin^2 \\theta',
        'L_1 = \\frac{h}{\\sin \\theta}, \\quad L_2 = \\frac{h}{\\sin 2\\theta}, \\quad d = \\frac{h}{\\tan \\alpha}',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan $\\cos \\theta$ dan $\\sin \\theta$ dari sudut berelasi',
          detail:
            'Dari identitas $\\sin(90^\\circ + \\theta) = \\cos \\theta$, diperoleh $\\cos \\theta = \\frac{4}{5}$. Karena $\\theta$ lancip ($\\sin \\theta > 0$), $\\sin \\theta = \\sqrt{1 - \\left(\\frac{4}{5}\\right)^2} = \\frac{3}{5}$, dan $\\tan \\theta = \\frac{3}{4}$.',
        },
        {
          stepNumber: 2,
          title: 'Menentukan $\\sin(180^\\circ - 2\\theta)$ dan $\\cos 2\\theta$',
          detail:
            '$\\sin(180^\\circ - 2\\theta) = \\sin 2\\theta = 2\\sin\\theta\\cos\\theta = 2\\left(\\frac{3}{5}\\right)\\left(\\frac{4}{5}\\right) = \\frac{24}{25}$. Sedangkan $\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = \\frac{16}{25} - \\frac{9}{25} = \\frac{7}{25}$, sehingga $\\tan 2\\theta = \\frac{24}{7}$.',
        },
        {
          stepNumber: 3,
          title: 'Menghitung panjang kawat pertama ($L_1$) dan jarak pancang pertama ($d_1$)',
          detail:
            '$L_1 = \\frac{15}{\\sin \\theta} = \\frac{15}{3/5} = 25\\text{ meter}$, dan $d_1 = \\frac{15}{\\tan \\theta} = \\frac{15}{3/4} = 20\\text{ meter}$. (Uji Pythagoras: $20^2 + 15^2 = 625 = 25^2$).',
        },
        {
          stepNumber: 4,
          title: 'Menghitung panjang kawat kedua ($L_2$) dan jarak pancang kedua ($d_2$)',
          detail:
            '$L_2 = \\frac{15}{\\sin 2\\theta} = \\frac{15}{24/25} = \\frac{375}{24} = \\frac{125}{8} = 15{,}625\\text{ meter}$. Jarak mendatar ke kaki menara $d_2 = \\frac{15}{\\tan 2\\theta} = \\frac{15}{24/7} = \\frac{105}{24} = \\frac{35}{8} = 4{,}375\\text{ meter}$.',
        },
        {
          stepNumber: 5,
          title: 'Menghitung jarak antarpancang dan menarik kesimpulan',
          detail:
            'Jarak kedua pancang adalah $d_1 - d_2 = 20 - 4{,}375 = 15{,}625\\text{ meter}$ ($\\frac{125}{8}\\text{ meter}$). Menariknya, $d_1 - d_2 = L_2$ karena segitiga yang dibentuk kedua kawat dan tanah bersifat sama kaki (sudut puncak $= 2\\theta - \\theta = \\theta$).',
        },
      ],
      kesimpulan:
        'Diperoleh $\\cos \\theta = \\frac{4}{5}$, $\\sin \\theta = \\frac{3}{5}$, $\\sin(180^\\circ - 2\\theta) = \\frac{24}{25}$, dan $\\cos 2\\theta = \\frac{7}{25}$. Panjang kawat pertama $25\\text{ m}$, kawat kedua $15{,}625\\text{ m}$, serta jarak antara kedua pancang adalah $15{,}625\\text{ m}$ (sama panjang dengan kawat kedua).',
      highlightsRumus: [
        '$\\sin(90^\\circ + \\theta) = +\\cos \\theta$ karena $90^\\circ + \\theta$ di Kuadran II.',
        '$\\sin(180^\\circ - 2\\theta) = +\\sin 2\\theta$.',
      ],
      quickMethodMrJo:
        'Setelah dapat $L_2 = 15{,}625\\text{ m}$, pakai sifat sudut luar segitiga: sudut puncak antara dua kawat $= 2\\theta - \\theta = \\theta$. Jadi $\\triangle$ dua kawat adalah sama kaki sehingga jarak kedua pancang langsung sama dengan panjang kawat kedua ($15{,}625\\text{ m}$)!',
      rubrik: [
        {
          aspect: 'Ketepatan konsep',
          maxPoints: 2,
          descriptor: 'Mengubah sudut berelasi $\\sin(90^\\circ + \\theta)$ dan $\\sin(180^\\circ - 2\\theta)$ dengan tanda kuadran tepat.',
        },
        {
          aspect: 'Ketepatan penggunaan rumus',
          maxPoints: 2,
          descriptor: 'Menerapkan rumus $\\sin 2\\theta$, $\\cos 2\\theta$, serta perbandingan segitiga siku-siku dengan tepat.',
        },
        {
          aspect: 'Kelengkapan proses',
          maxPoints: 2,
          descriptor: 'Menunjukkan penurunan langkah demi langkah untuk bagian (a) dan (b) secara runtut.',
        },
        {
          aspect: 'Ketepatan perhitungan',
          maxPoints: 2,
          descriptor: 'Nilai $\\frac{24}{25}, \\frac{7}{25}, 25\\text{ m}, 15{,}625\\text{ m}$, dan jarak $15{,}625\\text{ m}$ dihitung akurat.',
        },
        {
          aspect: 'Kesimpulan',
          maxPoints: 2,
          descriptor: 'Menyimpulkan seluruh besaran beserta interpretasi satuan dan kesamaan panjang jarak antarpancang.',
        },
      ],
    },
  },
  {
    id: 28,
    indicatorNumber: 25,
    indicatorTitle: 'Rumus Tangen Selisih Dua Sudut',
    type: QuestionType.ESSAY,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 10,
    stimulus: {
      kind: 'svg_display_board',
      title: 'Diagram Sudut Pandang Papan Informasi Digital',
      caption:
        'Papan informasi setinggi $6\\text{ meter}$ terpasang di atas penyangga setinggi $2\\text{ meter}$ di atas garis horizontal mata pengamat yang berjarak $d\\text{ meter}$.',
      textContext:
        'Sebuah papan informasi digital setinggi $6\\text{ meter}$ dipasang vertikal di atas tiang penyangga sehingga tepi bawah papan berada $2\\text{ meter}$ dan tepi atas papan berada $8\\text{ meter}$ di atas garis horizontal mata pengamat. Pengamat berdiri pada jarak horizontal $d > 0$ meter dari tiang. Sudut elevasi ke tepi atas papan adalah $\\alpha$ dan ke tepi bawah papan adalah $\\beta$, sehingga sudut pandang papan adalah $\\theta = \\alpha - \\beta$.',
    },
    prompt:
      'Kerjakan seluruh bagian berikut secara terperinci:\n(a) Dengan menggunakan rumus $\\tan(\\alpha - \\beta)$, nyatakan $\\tan \\theta$ sebagai fungsi rasional dalam $d$.\n(b) Jika $d = 4\\text{ meter}$, tentukan nilai eksak $\\tan \\theta$, $\\sin \\theta$, dan $\\cos \\theta$.\n(c) Tentukan jarak horizontal $d$ yang menghasilkan sudut pandang dengan nilai $\\tan \\theta = \\frac{3}{5}$!',
    solution: {
      diketahui: [
        'Tinggi tepi bawah dari garis mata $= 2\\text{ m}$, tinggi tepi atas dari garis mata $= 8\\text{ m}$.',
        'Jarak horizontal pengamat $d > 0$, dengan $\\tan \\alpha = \\frac{8}{d}$ dan $\\tan \\beta = \\frac{2}{d}$.',
        '$\\theta = \\alpha - \\beta$.',
      ],
      ditanyakan: '(a) $\\tan \\theta$ dalam $d$; (b) $\\tan \\theta, \\sin \\theta, \\cos \\theta$ saat $d = 4$; (c) nilai $d$ jika $\\tan \\theta = \\frac{3}{5}$.',
      landasanTeori:
        'Rumus tangen selisih dua sudut $\\tan(A - B) = \\frac{\\tan A - \\tan B}{1 + \\tan A \\tan B}$ memungkinkan kita menghitung sudut pandang objek vertikal tanpa harus mengetahui sudut $\\alpha$ dan $\\beta$ secara terpisah.',
      rumus: ['\\tan(\\alpha - \\beta) = \\frac{\\tan \\alpha - \\tan \\beta}{1 + \\tan \\alpha \\tan \\beta}'],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menyubstitusikan $\\tan \\alpha$ dan $\\tan \\beta$ ke rumus $\\tan(\\alpha - \\beta)$',
          detail:
            '$\\tan \\theta = \\frac{\\frac{8}{d} - \\frac{2}{d}}{1 + \\left(\\frac{8}{d}\\right)\\left(\\frac{2}{d}\\right)} = \\frac{\\frac{6}{d}}{1 + \\frac{16}{d^2}}$.',
        },
        {
          stepNumber: 2,
          title: 'Menyederhanakan bentuk rasional dalam $d$',
          detail:
            'Kalikan pembilang dan penyebut dengan $d^2$: $\\tan \\theta = \\frac{6d}{d^2 + 16}$.',
        },
        {
          stepNumber: 3,
          title: 'Menghitung nilai eksak saat $d = 4\\text{ meter}$',
          detail:
            '$\\tan \\theta = \\frac{6(4)}{4^2 + 16} = \\frac{24}{32} = \\frac{3}{4}$. Karena $\\theta$ adalah sudut lancip ($0^\\circ < \\theta < 90^\\circ$), gunakan tripel Pythagoras $3$-$4$-$5$: $\\sin \\theta = \\frac{3}{5}$ dan $\\cos \\theta = \\frac{4}{5}$.',
        },
        {
          stepNumber: 4,
          title: 'Menyelesaikan persamaan untuk $\\tan \\theta = \\frac{3}{5}$',
          detail:
            '$\\frac{6d}{d^2 + 16} = \\frac{3}{5} \\implies 30d = 3d^2 + 48 \\implies d^2 - 10d + 16 = 0 \\implies (d - 2)(d - 8) = 0$. Diperoleh $d = 2\\text{ meter}$ atau $d = 8\\text{ meter}$.',
        },
        {
          stepNumber: 5,
          title: 'Verifikasi kedua jarak yang ditemukan',
          detail:
            'Jika $d = 2$: $\\tan \\alpha = 4, \\tan \\beta = 1 \\implies \\tan(\\alpha-\\beta) = \\frac{4-1}{1+4} = \\frac{3}{5}$. Jika $d = 8$: $\\tan \\alpha = 1, \\tan \\beta = \\frac{1}{4} \\implies \\tan(\\alpha-\\beta) = \\frac{1 - 1/4}{1 + 1/4} = \\frac{3}{5}$. Keduanya benar!',
        },
      ],
      kesimpulan:
        '(a) $\\tan \\theta = \\frac{6d}{d^2 + 16}$; (b) saat $d = 4\\text{ m}$, $\\tan \\theta = \\frac{3}{4}$, $\\sin \\theta = \\frac{3}{5}$, $\\cos \\theta = \\frac{4}{5}$; (c) nilai $\\tan \\theta = \\frac{3}{5}$ tercapai pada dua jarak yaitu $d = 2\\text{ meter}$ dan $d = 8\\text{ meter}$ (sudut pandang maksimumnya terjadi saat $d = \\sqrt{2 \\cdot 8} = 4\\text{ m}$).',
      highlightsRumus: [
        'Tanda pada rumus tangen selisih: pembilang dikurangi ($-$), penyebut ditambah ($+$).',
      ],
      quickMethodMrJo:
        'Perhatikan simetri $d_1 \\cdot d_2 = 2 \\times 8 = 16$! Sudut pandang $\\theta$ mencapai nilai terbesar tepat di rata-rata geometris $d = \\sqrt{2 \\times 8} = 4\\text{ m}$ (saat $\\tan \\theta_{\\text{maks}} = \\frac{3}{4}$).',
      rubrik: [
        {
          aspect: 'Ketepatan konsep',
          maxPoints: 2,
          descriptor: 'Mengidentifikasi $\\tan \\alpha = \\frac{8}{d}$ dan $\\tan \\beta = \\frac{2}{d}$ dengan benar.',
        },
        {
          aspect: 'Ketepatan penggunaan rumus',
          maxPoints: 2,
          descriptor: 'Menggunakan rumus $\\tan(\\alpha - \\beta)$ tanpa kesalahan tanda pembilang/penyebut.',
        },
        {
          aspect: 'Kelengkapan proses',
          maxPoints: 2,
          descriptor: 'Menyelesaikan seluruh sub-pertanyaan (a), (b), dan (c) secara runtut.',
        },
        {
          aspect: 'Ketepatan perhitungan',
          maxPoints: 2,
          descriptor: 'Penyederhanaan aljabar $\\frac{6d}{d^2+16}$, tripel $3$-$4$-$5$, dan pemfaktoran $(d-2)(d-8)=0$ tepat.',
        },
        {
          aspect: 'Kesimpulan',
          maxPoints: 2,
          descriptor: 'Menyimpulkan ketiga jawaban dengan jelas dan menyertakan satuan meter.',
        },
      ],
    },
  },
  {
    id: 29,
    indicatorNumber: 26,
    indicatorTitle: 'Membuktikan Identitas Trigonometri dengan Rumus Sudut Rangkap (Bagian 1)',
    type: QuestionType.ESSAY,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 10,
    stimulus: {
      kind: 'math_box',
      title: 'Pembuktian Identitas Trigonometri',
      textContext:
        'Perhatikan persamaan identitas trigonometri berikut untuk semua sudut $x$ di mana kedua ruas terdefinisi:',
      mathLines: ['\\frac{\\sin 2x}{1 + \\cos 2x} \\cdot \\frac{\\cos x}{1 + \\cos x} = \\tan\\frac{x}{2}'],
    },
    prompt:
      'Buktikan identitas trigonometri di atas secara logis dan terstruktur dengan mentransformasikan ruas kiri hingga tepat sama dengan ruas kanan! Sertakan pula alasan pemilihan bentuk rumus sudut rangkap serta syarat pembatasan nilai $x$ agar identitas terdefinisi.',
    solution: {
      diketahui: [
        'Ruas kiri (LHS): $\\frac{\\sin 2x}{1 + \\cos 2x} \\cdot \\frac{\\cos x}{1 + \\cos x}$.',
        'Ruas kanan (RHS): $\\tan\\frac{x}{2}$.',
      ],
      ditanyakan: 'Pembuktian matematis bahwa $\\text{LHS} = \\text{RHS}$ beserta syarat domain.',
      landasanTeori:
        'Pembuktian identitas dilakukan dengan mengolah satu ruas (biasanya ruas yang lebih kompleks) secara deduktif menggunakan identitas sudut rangkap tanpa memindah-mindahkan suku lintas tanda sama dengan. Penggunaan bentuk $\\cos 2\\alpha = 2\\cos^2\\alpha - 1$ dipilih secara khusus untuk meniadakan konstanta $+1$ pada penyebut $(1 + \\cos 2\\alpha)$.',
      rumus: [
        '\\sin 2x = 2\\sin x \\cos x',
        '\\cos 2x = 2\\cos^2 x - 1',
        '\\sin x = 2\\sin\\frac{x}{2}\\cos\\frac{x}{2}, \\quad \\cos x = 2\\cos^2\\frac{x}{2} - 1',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Menentukan syarat domain agar kedua ruas terdefinisi',
          detail:
            'Penyebut tidak boleh nol: $1 + \\cos 2x \\neq 0 \\implies \\cos x \\neq 0$ ($x \\neq \\frac{\\pi}{2} + k\\pi$), serta $1 + \\cos x \\neq 0 \\implies \\cos\\frac{x}{2} \\neq 0$ ($x \\neq \\pi + 2k\\pi$).',
        },
        {
          stepNumber: 2,
          title: 'Mengubah $\\sin 2x$ dan $\\cos 2x$ pada pecahan pertama',
          detail:
            '$\\frac{\\sin 2x}{1 + \\cos 2x} = \\frac{2\\sin x \\cos x}{1 + (2\\cos^2 x - 1)} = \\frac{2\\sin x \\cos x}{2\\cos^2 x} = \\frac{\\sin x}{\\cos x}$.',
        },
        {
          stepNumber: 3,
          title: 'Mengalikan dengan pecahan kedua dan menyederhanakan $\\cos x$',
          detail:
            '$\\text{LHS} = \\frac{\\sin x}{\\cos x} \\cdot \\frac{\\cos x}{1 + \\cos x} = \\frac{\\sin x}{1 + \\cos x}$ (karena $\\cos x \\neq 0$).',
        },
        {
          stepNumber: 4,
          title: 'Menerapkan rumus sudut rangkap pada sudut $x = 2\\left(\\frac{x}{2}\\right)$',
          detail:
            'Gunakan $\\sin x = 2\\sin\\frac{x}{2}\\cos\\frac{x}{2}$ dan $1 + \\cos x = 1 + \\left(2\\cos^2\\frac{x}{2} - 1\\right) = 2\\cos^2\\frac{x}{2}$.',
        },
        {
          stepNumber: 5,
          title: 'Menyederhanakan hingga memperoleh ruas kanan',
          detail:
            '$\\text{LHS} = \\frac{2\\sin\\frac{x}{2}\\cos\\frac{x}{2}}{2\\cos^2\\frac{x}{2}} = \\frac{\\sin\\frac{x}{2}}{\\cos\\frac{x}{2}} = \\tan\\frac{x}{2} = \\text{RHS}$. (Terbukti).',
        },
      ],
      kesimpulan:
        'Dengan menerapkan rumus sudut rangkap dua kali secara berurutan (pada sudut $2x$ dan sudut $x$), ruas kiri terbukti identik dengan ruas kanan $\\tan\\frac{x}{2}$ untuk $x \\neq \\frac{\\pi}{2} + k\\pi$ dan $x \\neq \\pi + 2k\\pi$.',
      highlightsRumus: [
        'Bentuk $1 + \\cos 2\\theta = 2\\cos^2 \\theta$ adalah kunci utama menyederhanakan penyebut berpola $1 + \\cos$.',
      ],
      quickMethodMrJo:
        'Ingat jembatan dua langkahnya: $\\frac{\\sin 2x}{1 + \\cos 2x} = \\tan x$, lalu $\\tan x \\cdot \\frac{\\cos x}{1 + \\cos x} = \\frac{\\sin x}{1 + \\cos x}$, lalu ulangi pola yang sama satu level ke bawah menjadi $\\tan\\frac{x}{2}$!',
      rubrik: [
        {
          aspect: 'Ketepatan konsep',
          maxPoints: 2,
          descriptor: 'Alur pembuktian searah (LHS ke RHS) tanpa memindah ruas serta mencantumkan pembatasan domain.',
        },
        {
          aspect: 'Ketepatan penggunaan rumus',
          maxPoints: 2,
          descriptor: 'Memilih $\\cos 2x = 2\\cos^2 x - 1$ dan menerapkannya lagi untuk $x = 2(\\frac{x}{2})$.',
        },
        {
          aspect: 'Kelengkapan proses',
          maxPoints: 2,
          descriptor: 'Setiap transformasi aljabar dan pencoretan faktor $\\cos x$ dan $2\\cos\\frac{x}{2}$ tertulis jelas.',
        },
        {
          aspect: 'Ketepatan perhitungan',
          maxPoints: 2,
          descriptor: 'Tidak ada kesalahan tanda atau koefisien angka $2$ saat menyederhanakan.',
        },
        {
          aspect: 'Kesimpulan',
          maxPoints: 2,
          descriptor: 'Menyatakan bukti tercapai ($\\text{LHS} = \\text{RHS}$) secara tegas.',
        },
      ],
    },
  },
  {
    id: 30,
    indicatorNumber: 26,
    indicatorTitle: 'Membuktikan Identitas Trigonometri dengan Rumus Sudut Rangkap (Bagian 2)',
    type: QuestionType.ESSAY,
    category: TopicCategory.TRIGONOMETRI,
    difficulty: DifficultyLevel.TINGGI,
    weight: 10,
    stimulus: {
      kind: 'math_box',
      title: 'Identitas Pangkat Empat dan Sudut Rangkap Ganda',
      textContext:
        'Dalam analisis gelombang dan daya harmonik, bentuk pangkat empat sering diturunkan menjadi bentuk sudut rangkap linear berikut:',
      mathLines: ['\\sin^4 x + \\cos^4 x = \\frac{3 + \\cos 4x}{4}'],
    },
    prompt:
      'Kerjakan dua bagian berikut secara sistematis:\n(a) Buktikan kebenaran identitas $\\sin^4 x + \\cos^4 x = \\frac{3 + \\cos 4x}{4}$ menggunakan manipulasi kuadrat sempurna dan rumus sudut rangkap.\n(b) Gunakan identitas yang telah Anda buktikan tersebut untuk menentukan nilai eksak $\\sin^4 15^\\circ + \\cos^4 15^\\circ$!',
    solution: {
      diketahui: [
        'Identitas target: $\\sin^4 x + \\cos^4 x = \\frac{3 + \\cos 4x}{4}$.',
        'Sudut aplikasi: $x = 15^\\circ$.',
      ],
      ditanyakan: '(a) Pembuktian identitas; (b) Nilai eksak $\\sin^4 15^\\circ + \\cos^4 15^\\circ$.',
      landasanTeori:
        'Bentuk $a^2 + b^2$ dapat ditulis sebagai $(a + b)^2 - 2ab$. Dengan $a = \\sin^2 x$ dan $b = \\cos^2 x$, identitas Pythagoras $\\sin^2 x + \\cos^2 x = 1$ langsung menyederhanakan jumlah kuadrat tersebut, lalu rumus sudut rangkap $\\sin 2x$ dan $\\cos 4x = 1 - 2\\sin^2 2x$ menurunkan pangkat menjadi derajat satu.',
      rumus: [
        '\\sin^2 x + \\cos^2 x = 1',
        '\\sin 2x = 2\\sin x \\cos x \\implies \\sin x \\cos x = \\frac{1}{2}\\sin 2x',
        '\\cos 4x = 1 - 2\\sin^2 2x \\implies \\sin^2 2x = \\frac{1 - \\cos 4x}{2}',
      ],
      langkahPenyelesaian: [
        {
          stepNumber: 1,
          title: 'Mengubah ruas kiri dengan identitas kuadrat sempurna',
          detail:
            '$\\sin^4 x + \\cos^4 x = (\\sin^2 x)^2 + (\\cos^2 x)^2 = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x \\cos^2 x$.',
        },
        {
          stepNumber: 2,
          title: 'Menerapkan identitas Pythagoras dan rumus $\\sin 2x$',
          detail:
            'Substitusi $\\sin^2 x + \\cos^2 x = 1$ dan $\\sin x \\cos x = \\frac{1}{2}\\sin 2x$: $1^2 - 2\\left(\\frac{1}{2}\\sin 2x\\right)^2 = 1 - 2\\left(\\frac{1}{4}\\sin^2 2x\\right) = 1 - \\frac{1}{2}\\sin^2 2x$.',
        },
        {
          stepNumber: 3,
          title: 'Menurunkan $\\sin^2 2x$ menggunakan rumus $\\cos 4x$',
          detail:
            'Dari $\\cos 4x = \\cos(2 \\cdot 2x) = 1 - 2\\sin^2 2x$, diperoleh $\\sin^2 2x = \\frac{1 - \\cos 4x}{2}$.',
        },
        {
          stepNumber: 4,
          title: 'Menyederhanakan menuju ruas kanan',
          detail:
            '$\\text{LHS} = 1 - \\frac{1}{2}\\left(\\frac{1 - \\cos 4x}{2}\\right) = 1 - \\frac{1 - \\cos 4x}{4} = \\frac{4 - 1 + \\cos 4x}{4} = \\frac{3 + \\cos 4x}{4} = \\text{RHS}$. (Terbukti).',
        },
        {
          stepNumber: 5,
          title: 'Menghitung nilai eksak untuk $x = 15^\\circ$',
          detail:
            'Substitusi $x = 15^\\circ$: $\\sin^4 15^\\circ + \\cos^4 15^\\circ = \\frac{3 + \\cos(4 \\cdot 15^\\circ)}{4} = \\frac{3 + \\cos 60^\\circ}{4} = \\frac{3 + \\frac{1}{2}}{4} = \\frac{7/2}{4} = \\frac{7}{8}$.',
        },
      ],
      kesimpulan:
        '(a) Identitas $\\sin^4 x + \\cos^4 x = \\frac{3 + \\cos 4x}{4}$ terbukti benar untuk seluruh bilangan real $x$. (b) Nilai eksak $\\sin^4 15^\\circ + \\cos^4 15^\\circ$ adalah $\\frac{7}{8}$.',
      highlightsRumus: [
        'Identitas reduksi pangkat penting: $\\sin^4 x + \\cos^4 x = 1 - \\frac{1}{2}\\sin^2 2x = \\frac{3 + \\cos 4x}{4}$.',
      ],
      quickMethodMrJo:
        'Bentuk $15^\\circ$ langsung berlipat empat menjadi $60^\\circ$ yang merupakan sudut istimewa! Sehingga tidak perlu menghitung $\\sin 15^\\circ = \\frac{\\sqrt{6}-\\sqrt{2}}{4}$ lalu memangkatkannya empat kali.',
      rubrik: [
        {
          aspect: 'Ketepatan konsep',
          maxPoints: 2,
          descriptor: 'Menggunakan pemfaktoran $a^2 + b^2 = (a+b)^2 - 2ab$ dan pembuktian satu arah.',
        },
        {
          aspect: 'Ketepatan penggunaan rumus',
          maxPoints: 2,
          descriptor: 'Tepat menerapkan $\\sin 2x = 2\\sin x\\cos x$ dan $\\cos 4x = 1 - 2\\sin^2 2x$.',
        },
        {
          aspect: 'Kelengkapan proses',
          maxPoints: 2,
          descriptor: 'Langkah penurunan dari derajat 4 $\\to$ derajat 2 $\\to$ derajat 1 tertulis lengkap.',
        },
        {
          aspect: 'Ketepatan perhitungan',
          maxPoints: 2,
          descriptor: 'Koefisien pecahan $\\frac{1}{2}, \\frac{1}{4}$, tanda $+\\cos 4x$, serta nilai $\\frac{7}{8}$ akurat.',
        },
        {
          aspect: 'Kesimpulan',
          maxPoints: 2,
          descriptor: 'Menyimpulkan bukti bagian (a) dan nilai eksak bagian (b) secara tepat.',
        },
      ],
    },
  },
];
