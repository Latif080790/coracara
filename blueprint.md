
# **Blueprint: AEstimator Pro**

## **1. Visi Proyek & Standar Kualitas**

**AEstimator Pro** adalah platform estimasi dan manajemen proyek konstruksi berbasis web yang dirancang untuk merevolusi cara para profesional AEC (Arsitektur, Engineering, & Konstruksi) merencanakan, mengestimasi, dan mengelola proyek.

**Prinsip Inti:**
- **Single Source of Truth**: Mengintegrasikan semua data proyek, dari gambar teknis hingga biaya dan jadwal, ke dalam satu platform terpusat.
- **Modern & Intuitif**: Memberikan pengalaman pengguna premium melalui antarmuka yang bersih, responsif, dan profesional yang dibangun dengan Ant Design.
- **Modular & Skalabel**: Arsitektur berbasis komponen yang memungkinkan penambahan dan pengembangan fitur di masa depan.
- **End-to-End Workflow**: Mencakup seluruh siklus hidup pra-konstruksi, mulai dari analisis gambar hingga pelaporan akhir.

---

## **2. Arsitektur Aplikasi & Tumpukan Teknologi**

- **Frontend Framework**: React.js (dengan TypeScript) untuk membangun antarmuka pengguna yang dinamis dan kuat.
- **Build Tool**: Vite untuk lingkungan pengembangan yang sangat cepat.
- **Component Library**: **Ant Design (AntD)** dipilih untuk menyediakan rangkaian komponen UI yang kaya, siap pakai, dan cocok untuk aplikasi tingkat perusahaan.
- **Routing**: `react-router-dom` digunakan untuk menangani navigasi sisi klien antar modul.
- **Struktur Proyek**: Organisasi kode yang jelas dan skalabel diadopsi, dengan memisahkan `pages`, `components`, `layouts`, `router`, dan `assets`.
- **Layout Inti**: `MainLayout.tsx` berfungsi sebagai kerangka utama aplikasi, menyediakan sidebar navigasi yang dapat diciutkan, header dengan konteks proyek, dan area konten utama.

---

## **3. Modul & Fitur yang Diimplementasikan (UI)**

Berikut adalah rincian dari semua modul yang antarmukanya telah berhasil diimplementasikan, memberikan fondasi visual dan fungsional untuk aplikasi.

### **0. Dashboard Proyek (Halaman Utama)**
- **Status**: UI Diimplementasikan
- **Tujuan**: Memberikan gambaran 360 derajat tentang kesehatan dan status proyek secara sekilas.
- **Fitur Utama**:
  - Kartu statistik untuk KPI utama (Total Biaya, Durasi, Tugas Selesai).
  - Grafik ringkasan biaya (Anggaran vs. Aktual).
  - Garis waktu ringkasan jadwal proyek.
  - Daftar aktivitas atau pembaruan terkini.

### **1. AI-Powered Drawing Analyzer**
- **Status**: UI Diimplementasikan
- **Tujuan**: Menyediakan alat untuk melihat dan menganalisis file gambar teknik (CAD/PDF).
- **Fitur Utama**:
  - Area tampilan utama (placeholder untuk viewer).
  - Toolbar dengan alat untuk zoom, pengukuran, dan markup.
  - Sidebar untuk manajemen layer (visibilitas) dan menampilkan properti objek yang dipilih.

### **2. Intelligent Bill of Quantity (BoQ) Generator**
- **Status**: UI Diimplementasikan
- **Tujuan**: Membuat, mengelola, dan mengedit Bill of Quantity (BoQ) dengan struktur hierarkis.
- **Fitur Utama**:
  - Tabel BoQ dengan kolom standar (Item, Deskripsi, Unit, Kuantitas, Harga Satuan, Jumlah).
  - Dukungan untuk struktur data pohon (WBS) untuk mengelompokkan item pekerjaan.
  - Input yang dapat diedit langsung di dalam tabel.
  - Toolbar untuk aksi seperti menambah item baru dan mengekspor data.

### **3. Hyper-Accurate Quantity Surveyor**
- **Status**: UI Diimplementasikan
- **Tujuan**: Memvalidasi dan membandingkan kuantitas dari berbagai sumber untuk meningkatkan akurasi.
- **Fitur Utama**:
  - Tabel perbandingan untuk kuantitas dari AI, manual, dan data historis.
  - Penandaan visual (tag) untuk varians dan outlier.
  - Kartu statistik untuk ringkasan validasi dan rentang probabilitas (P10, P50, P90).

### **4. Data-Driven Rate Analysis**
- **Status**: UI Diimplementasikan
- **Tujuan**: Menganalisis dan menentukan harga satuan pekerjaan (rate) berdasarkan data.
- **Fitur Utama**:
  - Tabel rincian komposisi harga satuan (Tenaga Kerja, Material, Alat, Overhead).
  - Slider interaktif untuk menyesuaikan margin keuntungan dan melihat dampaknya pada harga akhir.
  - Placeholder untuk visualisasi benchmarking data pasar dan historis.

### **5. AI-Assisted Project Scheduler**
- **Status**: UI Diimplementasikan
- **Tujuan**: Membuat, memvisualisasikan, dan mengelola jadwal proyek.
- **Fitur Utama**:
  - Daftar tugas dalam format tabel dengan detail (Durasi, Tanggal Mulai/Selesai, Predecessor).
  - Penandaan visual untuk tugas-tugas di **Jalur Kritis** (Critical Path).
  - Tampilan Gantt Chart yang disederhanakan menggunakan komponen Timeline.
  - Toolbar untuk aksi seperti menambah tugas dan dependensi.

### **6. Predictive Risk Manager**
- **Status**: UI Diimplementasikan
- **Tujuan**: Mengidentifikasi, melacak, dan mengelola risiko proyek.
- **Fitur Utama**:
  - Tabel **Risk Register** dengan detail (Probabilitas, Dampak, Skor Risiko, Status Mitigasi).
  - Penandaan visual berwarna untuk tingkat probabilitas, dampak, dan status.
  - Placeholder untuk visualisasi **Risk Heatmap** (matriks risiko).
  - Grafik progres untuk melacak status mitigasi risiko.

### **7. Comprehensive Reporting Suite**
- **Status**: UI Diimplementasikan
- **Tujuan**: Menggabungkan data dari semua modul untuk menghasilkan laporan yang dapat dibagikan.
- **Fitur Utama**:
  - Pustaka laporan yang tersedia (Ringkasan Biaya, BoQ Detail, dll.).
  - Opsi kustomisasi untuk memfilter laporan sebelum dibuat.
  - Area pratinjau dan tombol untuk mengekspor laporan ke format PDF atau Excel.
