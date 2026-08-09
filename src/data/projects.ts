export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  year: string;
  client: string;
  role: string;
  url?: string;
  challenges?: string[];
  solutions?: string[];
  impact?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "103",
    slug: "website-ikapa-untuk-mendukung-publikasi-dan-identitas-digital-organisasi",
    title: "Website IKAPA",
    category: "Website Organisasi",

    description:
      "Portal resmi Ikatan Keluarga Pakuan Agung untuk menyajikan profil organisasi, berita, kepengurusan, dan dokumentasi kegiatan secara profesional.",

    longDescription:
      "Website IKAPA dikembangkan sebagai pusat informasi digital untuk Ikatan Keluarga Pakuan Agung. Platform ini membantu organisasi membangun identitas digital yang lebih profesional sekaligus memudahkan anggota dan masyarakat dalam mengakses profil organisasi, berita, struktur kepengurusan, agenda, serta dokumentasi kegiatan melalui satu website yang modern, responsif, dan mudah dikelola.",

    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Shadcn/ui",
      "Tailwind CSS"
    ],

    image: "/projects/ikapa.jpg",
    year: "2026",
    client: "Ikatan Keluarga Pakuan Agung (IKAPA)",
    role: "Frontend Developer",

    challenges: [
      "Menerjemahkan kebutuhan identitas organisasi ke dalam antarmuka yang profesional tanpa mengurangi kemudahan akses informasi.",
      "Menyusun berbagai jenis konten seperti profil, kepengurusan, berita, agenda, dan dokumentasi agar tetap mudah dinavigasi.",
      "Menjaga konsistensi tampilan dan pengalaman pengguna pada berbagai ukuran layar."
    ],

    solutions: [
      "Membangun struktur halaman dan navigasi menggunakan Next.js dengan pendekatan komponen yang reusable.",
      "Mengembangkan komponen UI menggunakan TypeScript, Tailwind CSS, dan Shadcn/ui untuk menjaga konsistensi antarhalaman.",
      "Menerapkan responsive layout pada halaman informasi, card, navigasi, dan section konten agar tetap optimal pada desktop maupun mobile."
    ],

    impact: [
      "Menghasilkan website organisasi yang lebih profesional dan konsisten secara visual.",
      "Memudahkan pengguna menemukan informasi organisasi, berita, kepengurusan, dan dokumentasi kegiatan.",
      "Memberikan pengalaman akses yang lebih nyaman melalui antarmuka responsif pada berbagai perangkat."
    ],

    liveUrl: "https://ikapa.or.id/",
    githubUrl: ""
  },

  {
    id: "59",
    slug: "master-education-platform-tryout-online-untuk-belajar-dan-berlatih-lebih-terarah",
    title: "Master Education",
    category: "Platform Tryout & Pembelajaran Digital",

    description:
      "Platform pembelajaran digital untuk mendukung persiapan CPNS dan Sekolah Kedinasan melalui latihan soal, simulasi ujian, pembahasan, dan analisis hasil belajar.",

    longDescription:
      "Master Education merupakan platform tryout online yang dirancang untuk membantu peserta mempersiapkan ujian CPNS dan Sekolah Kedinasan secara lebih terarah. Platform ini mengintegrasikan paket belajar, latihan soal, pembahasan, simulasi ujian, serta analisis hasil dalam satu sistem sehingga peserta dapat berlatih secara fleksibel sekaligus mengevaluasi perkembangan kemampuan mereka.",

    tech: [
      "Next.js",
      "Express.js",
      "PostgreSQL",
      "Shadcn/ui",
      "Tailwind CSS"
    ],

    image: "/projects/masteredu.jpg",
    year: "2025",
    client: "MASTER EDUCATION",
    role: "Frontend Developer",

    challenges: [
      "Membangun alur antarmuka yang mampu menangani berbagai aktivitas belajar mulai dari memilih paket hingga melihat hasil latihan.",
      "Menyajikan soal, timer, navigasi, pembahasan, dan status pengerjaan tanpa membuat halaman ujian terasa terlalu kompleks.",
      "Mengubah data hasil pengerjaan menjadi informasi visual yang mudah dipahami oleh peserta."
    ],

    solutions: [
      "Membangun flow pembelajaran menggunakan Next.js yang menghubungkan halaman paket, latihan, pembahasan, simulasi, dan hasil secara terstruktur.",
      "Mengembangkan komponen ujian interaktif dengan timer, navigasi soal, status jawaban, dan state pengerjaan menggunakan React.",
      "Membangun tampilan statistik dan hasil ujian menggunakan komponen UI yang membantu peserta memahami skor dan performa mereka."
    ],

    impact: [
      "Membuat proses latihan dan simulasi ujian terasa lebih terstruktur dalam satu platform.",
      "Memudahkan peserta memahami hasil pengerjaan melalui tampilan skor dan statistik yang lebih informatif.",
      "Memberikan pengalaman belajar digital yang lebih nyaman melalui antarmuka responsif dan konsisten."
    ],

    liveUrl: "https://mastereducation.id/",
    githubUrl: ""
  },

  {
    id: "96",
    slug: "pengembangan-website-spmb-online-kabupaten-musi-rawas",
    title: "SPMB Online Kabupaten Musi Rawas",
    category: "Sistem Penerimaan Murid Baru",

    description:
      "Platform digital untuk mendukung proses penerimaan murid baru Kabupaten Musi Rawas secara online, transparan, dan terintegrasi.",

    longDescription:
      "SPMB Online Kabupaten Musi Rawas dikembangkan untuk membantu Dinas Pendidikan mengelola proses penerimaan murid baru pada jenjang SD dan SMP secara digital. Sistem ini mencakup pendaftaran online, validasi data dan dokumen, pengelolaan jalur seleksi, pemetaan wilayah berdasarkan domisili, monitoring kuota sekolah, hingga pengumuman hasil seleksi dalam satu platform terintegrasi.",

    tech: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "AWS"
    ],

    image: "/projects/spmb.jpg",
    year: "2026",
    client: "Dinas Pendidikan - Kabupaten Musi Rawas",
    role: "Backend Developer",

    challenges: [
      "Menyajikan alur pendaftaran yang panjang dengan banyak field, dokumen, validasi, dan pilihan jalur tanpa membuat pengguna bingung.",
      "Membangun antarmuka untuk proses verifikasi data yang memiliki banyak status, kondisi, dan informasi pendukung.",
      "Menyajikan data pendaftar, sekolah, kuota, dan hasil seleksi dalam dashboard yang tetap mudah dipantau."
    ],

    solutions: [
      "Membangun form pendaftaran bertahap dengan validasi input, upload dokumen, feedback error, dan state form menggunakan React dan Next.js.",
      "Mengembangkan komponen tabel, filter, pagination, status badge, modal, dan detail data untuk mendukung proses verifikasi operator.",
      "Membangun dashboard monitoring dengan tampilan data yang terstruktur sehingga informasi pendaftar, sekolah, kuota, dan seleksi lebih mudah dipantau."
    ],

    impact: [
      "Mempermudah calon peserta didik mengikuti proses pendaftaran melalui antarmuka yang lebih terstruktur.",
      "Membantu operator melakukan verifikasi dan monitoring data melalui dashboard yang lebih informatif.",
      "Meningkatkan aksesibilitas proses SPMB melalui platform web yang responsif dan dapat digunakan dari berbagai perangkat."
    ],

    liveUrl: "https://spmb.musirawaskab.go.id/",
    githubUrl: ""
  },

  {
    id: "87",
    slug: "pengembangan-sipaten-sistem-informasi-peta-potensi-daerah",
    title: "SIPATEN",
    category: "Sistem Informasi Peta Potensi Daerah",

    description:
      "Platform digital untuk menyajikan potensi investasi, informasi wilayah, statistik, dan peta daerah secara interaktif bagi masyarakat dan calon investor.",

    longDescription:
      "SIPATEN (Sistem Informasi Peta Potensi Daerah) dikembangkan sebagai platform digital untuk membantu DPMPTSP Kabupaten Lampung Timur mempublikasikan potensi investasi dan informasi wilayah secara lebih modern. Platform ini menghadirkan peta potensi daerah, informasi investasi, statistik PMA dan PMDN, publikasi, galeri, serta informasi pendukung dalam satu antarmuka yang mudah diakses.",

    tech: [
      "Next.js",
      "PostgreSQL",
      "Leaflet",
      "Tailwind CSS"
    ],

    image: "/projects/sipaten.jpg",
    year: "2025",
    client: "Dinas PTSP Lampung Timur",
    role: "Frontend Developer",

    challenges: [
      "Menyajikan data potensi investasi dan informasi wilayah yang cukup kompleks tanpa membuat halaman terasa padat.",
      "Mengintegrasikan informasi geografis ke dalam antarmuka sehingga data lokasi tetap mudah dipahami oleh pengguna.",
      "Menjaga performa dan responsivitas halaman yang memiliki banyak data, card, statistik, dan elemen peta."
    ],

    solutions: [
      "Membangun struktur halaman menggunakan Next.js dan komponen reusable untuk memisahkan informasi investasi, profil wilayah, statistik, dan publikasi.",
      "Mengembangkan WebGIS interaktif menggunakan Leaflet dengan marker, peta, dan detail informasi lokasi yang terhubung dengan data potensi daerah.",
      "Menerapkan responsive layout menggunakan Tailwind CSS agar konten, peta, card, dan informasi statistik tetap nyaman digunakan pada berbagai perangkat."
    ],

    impact: [
      "Menyediakan pengalaman eksplorasi informasi potensi daerah yang lebih interaktif melalui WebGIS.",
      "Memudahkan pengguna memahami informasi investasi dan lokasi potensi melalui kombinasi data visual dan geografis.",
      "Menghasilkan antarmuka yang responsif dan terstruktur untuk menyajikan informasi daerah dalam jumlah besar."
    ],

    liveUrl: "https://sipaten.lampungtimurkab.go.id/",
    githubUrl: ""
  },

  {
    id: "88",
    slug: "pengembangan-sistem-tryout-utbk-online-ruang-para-bintang",
    title: "Ruang Para Bintang",
    category: "Sistem Tryout UTBK Online",

    description:
      "Platform tryout UTBK berbasis CBT yang membantu lembaga bimbingan belajar menyelenggarakan simulasi ujian, mengelola bank soal, memantau peserta, dan menganalisis hasil ujian secara digital.",

    longDescription:
      "Sistem Tryout UTBK Online Ruang Para Bintang dikembangkan sebagai platform Computer Based Test (CBT) untuk menghadirkan pengalaman simulasi ujian yang lebih realistis dan terstruktur. Platform ini mencakup bank soal, paket tryout, pengaturan subtes dan durasi, manajemen peserta, monitoring ujian, penilaian otomatis, hingga analisis hasil tryout melalui dashboard administrator.",

    tech: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Shadcn/ui"
    ],

    image: "/projects/ruangbintang.jpg",
    year: "2026",
    client: "STARED MEDAN",
    role: "Frontend Developer",

    challenges: [
      "Membangun antarmuka CBT yang harus menampilkan soal, timer, navigasi, status jawaban, dan informasi ujian secara bersamaan.",
      "Menjaga fokus peserta saat mengerjakan ujian dengan mengurangi elemen visual yang tidak diperlukan.",
      "Menyajikan dashboard dengan data peserta, paket ujian, hasil, dan statistik tanpa membuat informasi terasa terlalu padat."
    ],

    solutions: [
      "Mengembangkan interface CBT menggunakan React dan Next.js dengan timer, navigasi soal, indikator status jawaban, dan layout pengerjaan yang terstruktur.",
      "Membangun komponen UI menggunakan Shadcn/ui dan Tailwind CSS untuk menjaga konsistensi antara halaman peserta dan administrator.",
      "Mengembangkan dashboard administrator dengan tabel, filter, statistik, dan visualisasi data untuk membantu monitoring peserta serta hasil tryout."
    ],

    impact: [
      "Menghasilkan pengalaman pengerjaan CBT yang lebih fokus, terstruktur, dan nyaman bagi peserta.",
      "Memudahkan administrator mengelola dan memantau data tryout melalui dashboard yang terpusat.",
      "Meningkatkan pengalaman penggunaan platform melalui UI yang responsif dan konsisten pada berbagai perangkat."
    ],

    liveUrl: "https://bimbelruangparabintang.com/",
    githubUrl: ""
  },

  {
    id: "71",
    slug: "smartschool-website-sistem-manajemen-sekolah-digital-terintegrasi",
    title: "SMARTSCHOOL",
    category: "Sistem Manajemen Sekolah Digital Terintegrasi",

    description:
      "Platform manajemen sekolah digital terintegrasi yang menghubungkan Dinas Pendidikan, sekolah, guru, tenaga administrasi, dan peserta didik dalam satu ekosistem digital.",

    longDescription:
      "SMARTSCHOOL Versi Website dikembangkan oleh Newus Technology untuk mendukung digitalisasi pengelolaan pendidikan di Dinas Pendidikan Kabupaten PALI. Platform ini mengintegrasikan berbagai kebutuhan sekolah seperti manajemen data siswa dan guru, absensi digital, e-learning, ujian online, dashboard monitoring, informasi sekolah, pelaporan pendidikan, serta integrasi dengan sistem pendidikan lainnya dalam satu platform berbasis web.",

    tech: [
      "Next.js",
      "React",
      "PostgreSQL",
      "Tailwind CSS",
      "Shadcn/ui"
    ],

    image: "/projects/disdikpali.jpg",
    year: "2025",
    client: "Dinas Pendidikan Kabupaten PALI",
    role: "Frontend Developer",

    challenges: [
      "Menyajikan banyak modul pendidikan seperti data siswa, guru, absensi, pembelajaran, ujian, dan pelaporan melalui antarmuka yang tetap terstruktur.",
      "Membangun dashboard untuk berbagai role pengguna dengan kebutuhan informasi dan hak akses yang berbeda.",
      "Menjaga konsistensi UI pada banyak halaman dan modul dengan karakteristik data serta interaksi yang berbeda."
    ],

    solutions: [
      "Mengembangkan komponen UI reusable menggunakan Next.js, React, Tailwind CSS, dan Shadcn/ui untuk menjaga konsistensi antar modul.",
      "Membangun dashboard dan halaman manajemen data dengan tabel, filter, statistik, form, modal, dan komponen interaktif sesuai kebutuhan masing-masing role.",
      "Menerapkan responsive layout dan struktur UI berbasis role agar fitur tetap mudah digunakan oleh Dinas Pendidikan, sekolah, guru, maupun peserta didik."
    ],

    impact: [
      "Menghasilkan antarmuka manajemen pendidikan yang lebih terstruktur dan mudah digunakan oleh berbagai jenis pengguna.",
      "Memudahkan pengguna memantau data, aktivitas sekolah, statistik, dan laporan melalui dashboard yang lebih informatif.",
      "Meningkatkan pengalaman penggunaan platform melalui UI yang responsif, konsisten, dan reusable di berbagai modul."
    ],

    liveUrl:
      "https://dinaspendidikan.palikab.go.id",

    githubUrl: ""
  }
];