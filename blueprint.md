# **Blueprint Proyek: AEstimator Pro**

Dokumen ini berfungsi sebagai cetak biru teknis dan strategis untuk pengembangan aplikasi AEstimator Pro. Ini menguraikan arsitektur, desain, peta jalan, dan rencana implementasi saat ini.

---

## **1. Ikhtisar Aplikasi**

**AEstimator Pro** adalah aplikasi web modern yang dirancang untuk merevolusi manajemen proyek konstruksi. Ini mengintegrasikan Bill of Quantities (BoQ), penjadwalan proyek, dan analisis biaya ke dalam satu platform yang mulus, didukung oleh wawasan berbasis AI untuk memberikan perkiraan yang lebih akurat dan cerdas.

---

## **2. Fitur Utama & Desain**

-   **Dasbor Terpusat**: Memberikan gambaran umum proyek secara real-time.
-   **Manajemen BoQ Interaktif**: Perincian biaya yang terperinci dan dapat disesuaikan.
-   **Penjadwalan Jalur Kritis**: Visualisasi jadwal proyek dan dependensi tugas.
-   **Analisis Harga Cerdas**: Perbandingan harga pasar dengan data historis.
-   **Desain Modern & Responsif**: Dibangun dengan Ant Design untuk pengalaman pengguna yang bersih di semua perangkat.
-   **Visualisasi Data Canggih**: Grafik dan bagan interaktif didukung oleh `@ant-design/charts`.

---

## **3. Modul Aplikasi & Komponen**

-   **`Dashboard.tsx`**: Halaman utama dan titik masuk aplikasi.
-   **`BoQGenerator.tsx`**: Mengelola dan menampilkan data Bill of Quantities.
-   **`ProjectScheduler.tsx`**: Mengelola dan menampilkan jadwal proyek.
-   **`RateAnalysis.tsx`**: Menganalisis dan membandingkan harga material/jasa.
-   **`stores/`**: Berisi semua logika manajemen state (Zustand).
    -   `boqStore.ts`
    -   `schedulerStore.ts`

---

## **4. Peta Jalan Menuju Tingkat Enterprise**

Ini adalah rencana bertahap untuk mengembangkan AEstimator Pro menjadi aplikasi yang tangguh, kaya fitur, dan siap untuk lingkungan enterprise.

### **Fase 1: Fondasi Logika & Interaktivitas (Selesai)**

### **Fase 2: Fitur Lanjutan & Integrasi (Selesai)**

### **Fase 3: Kesiapan Enterprise (Fokus Saat Ini)**
-   **Otentikasi & Otorisasi (Fokus Saat Ini)**: Implementasikan sistem login pengguna dengan kontrol akses berbasis peran.
-   **Manajemen Proyek**: Izinkan pengguna untuk membuat, beralih, dan mengelola beberapa proyek.
-   **Skalabilitas & Keamanan**: Optimalkan kinerja dan terapkan praktik keamanan terbaik.

---

## **5. Rencana Pengembangan Saat Ini: Fase 3 - Otentikasi & Otorisasi**

**Tujuan**: Mengamankan aplikasi dengan memperkenalkan alur otentikasi pengguna, termasuk halaman login dan rute yang dilindungi.

**Langkah-langkah yang Direncanakan:**

1.  **Perbarui `userStore.ts`**:
    -   Tambahkan flag `isAuthenticated` ke dalam *store*.
    -   Implementasikan fungsi `login(email, password)` yang menyimulasikan validasi kredensial dan mengatur `isAuthenticated` menjadi `true`.
    -   Implementasikan fungsi `logout()` yang mengatur ulang status otentikasi.

2.  **Buat Halaman Login**:
    -   Buat komponen `LoginPage.tsx` baru di `src/pages`.
    -   Desain formulir login yang menarik secara visual dengan input untuk email dan kata sandi, validasi, dan tombol "Log In".

3.  **Implementasikan Rute yang Dilindungi**:
    -   Buat komponen `ProtectedRoute.tsx` yang memeriksa flag `isAuthenticated` dari `userStore`.
    -   Jika pengguna tidak diautentikasi, komponen ini akan mengalihkannya ke halaman login.

4.  **Perbarui `AppRouter.tsx`**:
    -   Bungkus `MainLayout` di dalam `ProtectedRoute` untuk mengamankan semua rute aplikasi utama.
    -   Tambahkan rute `/login` baru yang merender `LoginPage`.

5.  **Perbarui `MainLayout.tsx`**:
    -   Tambahkan menu dropdown pengguna pada avatar di header, yang berisi opsi "Logout".
    -   Memanggil fungsi `logout()` dari `userStore` saat diklik.
