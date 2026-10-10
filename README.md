# WebPorto — Christian Andrew · Fullscreen + Carousel v6

Paket lengkap desain full screen terbaru, termasuk `theme.css` dan seluruh aset.

Portofolio HTML, CSS, dan JavaScript dengan halaman detail terpisah. Struktur folder mengikuti referensi WebPorto; isi tetap menggunakan portofolio Christian Andrew.

| File / folder | Isi |
| --- | --- |
| `index.html` | Home, About Me, Projects, Certificates, Social Media |
| `style.css` | Tema, navigasi, footer, dan tampilan halaman utama |
| `theme.css` | Desain full screen dengan judul serif navy, tombol coral, dan latar abu-abu biru |
| `carousel.css` | Kartu horizontal responsif dan ukuran sertifikat yang lebih kecil |
| `carousel.js` | Swipe, drag, tombol panah, keyboard, dan penghitung kartu |
| `script.js` | Menu responsif, navigasi, dan pengaturan tautan sosial / proyek |
| `assets/iconlogo/monogram.webp` | Visual monogram CA |
| `assets/cert/` | Gambar sertifikat untuk kartu dan tampilan perbesar |
| `assets/profile/` | Foto pribadi opsional untuk sisi kanan hero |
| `project/project-nurture.html` | Detail proyek Nurture |
| `project/project-pause.html` | Detail proyek PAUSE |
| `project/project-tropinata.html` | Detail proyek Tropinata |
| `project/project-04.html` dan `project/project-05.html` | Halaman detail contoh yang siap diisi |
| `project/project.css` | Tampilan bersama untuk halaman proyek |
| `project/project.js` | Mengaktifkan tautan proyek lengkap setelah URL tersedia |
| `experience/experience.html` | Rincian pengalaman dan kategori |
| `experience/style.css` | Tampilan halaman pengalaman |
| `experience/script.js` | Filter kategori pengalaman |

Kartu dan judul proyek menggunakan tautan HTML biasa. Tombol **My Experience** berada di About Me. Setiap halaman detail mempunyai navigasi kembali ke bagian terkait di halaman utama.

Galeri Projects berisi 5 kartu, dan Certificates berisi 4 kartu dengan ukuran lebih kecil. Dua proyek dan dua sertifikat tambahan adalah contoh yang belum diisi. Kedua galeri bisa digeser dengan swipe, drag mouse, tombol panah, atau keyboard (panah kiri/kanan, Home, End saat galeri mendapat fokus). Jumlah kartu dihitung otomatis dari isi HTML; tidak ada batas tiga proyek atau dua sertifikat.

Setiap proyek tampil sebagai satu kotak yang langsung terhubung ke halaman detail. Teks proyek ada di masing-masing file `project-*.html`; teks pengalaman ada di `experience.html`.

Keenam kartu Social Media memakai lebar kolom dan tinggi baris yang sama: tiga kolom di desktop, dua di tablet, dan satu di ponsel.

Tautan LinkedIn, WhatsApp, Instagram, email, CV Google Drive, dan GitHub disimpan di `portfolio.social` pada `script.js`. WhatsApp menerima nomor dengan kode negara (contoh format: `628...`) atau tautan WhatsApp; email menerima alamat email biasa. Nilai kosong tidak menghasilkan tautan profil aktif. CV menggunakan tautan berbagi Google Drive. GitHub juga tersedia di footer setiap halaman dan mengikuti nilai yang sama. Tautan dokumen atau prototipe proyek ada di `portfolio.projectLinks`.

Lokasi gambar sertifikat diatur pada `portfolio.certificates` di file yang sama, termasuk `certificate03` dan `certificate04` untuk dua kartu tambahan. Gambar ditampilkan utuh dan dapat diperbesar setelah berhasil dimuat. Folder `assets/cert/` memuat keterangan pengaturan gambarnya.

Hero memenuhi lebar layar dan setidaknya tinggi layar yang tersisa di bawah navigasi; pada layar kecil konten dapat memanjang agar teks tetap terbaca. Semua halaman memakai `theme.css`. Lokasi foto pribadi ada di `portfolio.profilePhoto`; jika kosong, visual monogram CA tetap digunakan. Font web memakai Google Fonts dengan font sistem sebagai cadangan.

Arsip tidak memerlukan backend atau proses build. Semua jalur file relatif terhadap folder masing-masing.

## Direct project links

Edit `script.js` under `portfolio.projectLinks` to add your published project URLs:

```js
projectLinks: {
  nurture: {
    figma: 'https://www.figma.com/design/...',
    caseStudy: '',
  },
  pause: {
    figma: 'https://www.figma.com/design/...',
    caseStudy: '',
  },
  tropinata: {
    figma: 'https://www.figma.com/design/...',
    caseStudy: '',
  },
  project04: {
    figma: 'https://www.figma.com/design/...',
    caseStudy: '',
  },
},
```

Only links with valid `http`/`https` URLs are displayed on the project detail page.

## Portfolio intro

The homepage now shows a short first-visit intro animation. It runs once per browser tab/session and respects `prefers-reduced-motion`.

## Contact cleanup

GitHub has been removed from the Social Media contact cards and footer.
