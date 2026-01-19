
# **Blueprint: AEstimator Pro**

## **1. Visi Proyek & Standar Kualitas**

**AEstimator Pro** adalah platform estimasi dan manajemen proyek konstruksi berbasis web yang dirancang untuk merevolusi cara para profesional AEC (Arsitektur, Engineering, & Konstruksi) merencanakan, mengestimasi, dan mengelola proyek.

**Prinsip Inti:**
- **Single Source of Truth**: Mengintegrasikan semua data proyek ke dalam satu platform terpusat.
- **Modern & Intuitif**: Memberikan pengalaman pengguna premium melalui antarmuka yang bersih dan profesional.
- **Modular & Skalabel**: Arsitektur berbasis komponen yang memungkinkan pengembangan fitur di masa depan.
- **End-to-End Workflow**: Mencakup seluruh siklus hidup pra-konstruksi.

---

## **2. Arsitektur Aplikasi & Tumpukan Teknologi**

- **Frontend Framework**: React.js (dengan TypeScript)
- **Build Tool**: Vite
- **Component Library**: Ant Design (AntD)
- **Routing**: `react-router-dom`
- **State Management**: Zustand (dengan middleware persistensi)
- **Testing**: Vitest dan React Testing Library
- **Struktur Proyek**: `pages`, `components`, `layouts`, `router`, `store`, `assets`.
- **Layout Inti**: `MainLayout.tsx`.

---

## **3. Modul & Fitur yang Diimplementasikan**

### **Core Logic & UI Implemented**
- **Intelligent Bill of Quantity (BoQ) Generator**: Manajemen state, struktur pohon, fungsionalitas CRUD, dan pengujian unit.
- **AI-Assisted Project Scheduler**: Manajemen state, implementasi algoritma Jalur Kritis (CPM), integrasi UI, dan pengujian unit.

### **UI Only Implemented**
- **Dashboard Proyek**, **AI-Powered Drawing Analyzer**, **Hyper-Accurate Quantity Surveyor**, **Data-Driven Rate Analysis**, **Predictive Risk Manager**, **Comprehensive Reporting Suite**.

---

## **4. Peta Jalan Menuju Tingkat Enterprise**

Ini adalah rencana bertahap untuk mengembangkan AEstimator Pro menjadi aplikasi yang tangguh, kaya fitur, dan siap untuk lingkungan enterprise.

### **Fase 1: Fondasi Logika & Interaktivitas (Fokus Saat Ini)**
1.  **Lengkapi Logika Inti**: Implementasikan logika bisnis dan manajemen state untuk semua modul yang tersisa.
2.  **Interaktivitas Penuh**: Aktifkan fungsionalitas CRUD (Create, Read, Update, Delete) yang lengkap di seluruh antarmuka pengguna.
3.  **Persistensi Data**: Pastikan state aplikasi (misalnya, data BoQ dan Jadwal) disimpan secara lokal dan tidak hilang saat halaman disegarkan.

### **Fase 2: Fitur Lanjutan & Integrasi**
- **Integrasi AI**: Hubungkan UI ke layanan AI/ML yang sebenarnya untuk analisis.
- **Visualisasi Data**: Tingkatkan dasbor dan laporan dengan grafik yang lebih interaktif.
- **Kolaborasi Pengguna**: Perkenalkan fitur untuk memungkinkan banyak pengguna mengerjakan proyek yang sama.

### **Fase 3: Kesiapan Enterprise**
- **Otentikasi & Otorisasi**: Implementasikan sistem login pengguna dengan kontrol akses berbasis peran.
- **Manajemen Proyek**: Izinkan pengguna untuk membuat, beralih, dan mengelola beberapa proyek.
- **Skalabilitas & Keamanan**: Optimalkan kinerja dan terapkan praktik keamanan terbaik.

---

## **5. Rencana Pengembangan Saat Ini: Interaktivitas & Persistensi**

**Tujuan**: Mengubah aplikasi dari mode "hanya-baca" menjadi mode interaktif penuh dan memastikan data pengguna tetap ada.

**Langkah-langkah yang Direncanakan:**

1.  **Implementasikan Persistensi Data**: 
    - Instal `zustand/middleware`.
    - Perbarui `boqStore.ts` dan `schedulerStore.ts` untuk menggunakan middleware `persist`, menyimpan state ke `localStorage`.

2.  **Aktifkan Interaktivitas Penuh di Penjadwal Proyek**:
    - Buat komponen modal (`AddEditTaskModal.tsx`) untuk menambah dan mengedit tugas.
    - Hubungkan tombol "Add Task" dan fungsionalitas klik-baris tabel untuk membuka modal.
    - Implementasikan fungsi `removeTask` dengan dialog konfirmasi.

3.  **Tingkatkan Interaktivitas BoQ**: 
    - Terapkan pola yang sama (modal, tombol) untuk mengaktifkan fungsionalitas CRUD penuh untuk item BoQ.
