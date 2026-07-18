<template>
  <div class="p-6 font-sans">

    <!-- Loading State -->
    <div v-if="kasStore.isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <!-- Total Saldo Kas -->
        <StatCard title="Total Saldo Kas" :value="'Rp ' + kasStore.totalUangMasuk.toLocaleString('id-ID')"
          iconBgClass="bg-emerald-50" iconColorClass="text-emerald-600">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
          </template>
        </StatCard>

        <!-- Pemasukan (Minggu Ini) -->
        <StatCard :title="'Pemasukan (Minggu ke-' + kasStore.selectedWeek + ')'"
          :value="'Rp ' + pemasukanMingguIni.toLocaleString('id-ID')" iconBgClass="bg-blue-50"
          iconColorClass="text-blue-600">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </template>
        </StatCard>

        <!-- Pengeluaran -->
        <StatCard title="Pengeluaran (Minggu Ini)" value="Rp 0" iconBgClass="bg-rose-50" iconColorClass="text-rose-600">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
            </svg>
          </template>
        </StatCard>

        <!-- Total Siswa Nunggak -->
        <StatCard title="Siswa Belum Bayar" :value="unpayableStudents.length + ' Orang'" iconBgClass="bg-amber-50"
          iconColorClass="text-amber-600">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </template>
        </StatCard>

      </div>

      <!-- Main Content Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Kolom Kiri: Tabel Seluruh Siswa -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 class="text-sm font-bold text-gray-900">Status Pembayaran (Minggu ke-{{ kasStore.selectedWeek }}) 📊
            </h2>

            <!-- Dropdown Pindah Minggu Cepat -->
            <select v-model="kasStore.selectedWeek"
              class="bg-white border border-gray-200 text-gray-700 py-1.5 px-3 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm cursor-pointer">
              <option v-for="week in 16" :key="week" :value="week">Minggu ke-{{ week }}</option>
            </select>
          </div>

          <div class="overflow-y-auto h-[380px]">
            <table class="w-full text-left text-sm text-gray-500 relative">
              <thead class="bg-white text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10 shadow-sm">
                <tr>
                  <th class="px-6 py-4 font-semibold">Nama Siswa</th>
                  <th class="px-6 py-4 font-semibold">Status Iuran</th>
                  <th class="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">

                <!-- Looping SEMUA Siswa (Bukan cuma yang nunggak) -->
                <tr v-for="student in kasStore.students" :key="student.id"
                  class="hover:bg-gray-50/50 transition-colors">

                  <!-- Nama -->
                  <td class="px-6 py-4 flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase shadow-sm border border-white">
                      {{ student.nama.substring(0, 2) }}
                    </div>
                    <div>
                      <span class="font-medium text-gray-900 block">{{ student.nama }}</span>
                    </div>
                  </td>

                  <!-- Status & Nominal -->
                  <td class="px-6 py-4">
                    <!-- Jika Belum Bayar (0) -->
                    <span v-if="getNominalBayar(student) === 0"
                      class="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-rose-50 text-rose-600 border border-rose-100">
                      <div class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                      Belum Bayar
                    </span>
                    <!-- Jika Sudah Bayar (> 0) -->
                    <span v-else
                      class="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Lunas (Rp {{ getNominalBayar(student).toLocaleString('id-ID') }})
                    </span>
                  </td>

                  <!-- Aksi -->
                  <td class="px-6 py-4 text-right">
                    <!-- Tombol Catat Cepat HANYA untuk yang belum bayar -->
                    <button v-if="getNominalBayar(student) === 0" @click="catatCepat(student.id, student.nama)"
                      class="text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-colors border border-transparent hover:border-emerald-200 shadow-sm">
                      Catat Cepat
                    </button>
                    <!-- Indikator Selesai untuk yang sudah bayar -->
                    <span v-else class="text-xs font-bold text-gray-400 uppercase tracking-wider px-3">
                      Selesai
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Kolom Kanan: Aktivitas Terakhir -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Aktivitas Terakhir</h2>

            <div class="space-y-5">
              <div v-for="activity in recentActivities" :key="activity.id" class="flex gap-4 items-start">
                <div
                  :class="`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 shadow-sm ${activity.type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'}`">
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 leading-snug">{{ activity.desc }}</p>
                  <p class="text-[11px] text-gray-400 mt-0.5 font-medium">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <router-link :to="{ name: 'pencatatan' }"
            class="w-full mt-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors flex justify-center uppercase tracking-wide">
            Ke Mode Pencatatan Penuh
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useKasStore } from '../stores/useKasStore'
import StatCard from '../components/ui/StatCard.vue'

const kasStore = useKasStore()

// Fungsi Bantuan: Mengambil nominal bayar siswa pada minggu yang sedang dipilih
const getNominalBayar = (student) => {
  if (!student.payments) return 0
  const weekStr = String(kasStore.selectedWeek)
  return student.payments[weekStr] || 0
}

// Menghitung berapa orang yang masih 0 (Untuk Kartu "Siswa Belum Bayar")
const unpayableStudents = computed(() => {
  if (!kasStore.students) return []
  return kasStore.students.filter(student => getNominalBayar(student) === 0)
})

// Menghitung total Rp yang masuk khusus di minggu yang sedang dipilih
const pemasukanMingguIni = computed(() => {
  if (!kasStore.students) return 0
  return kasStore.students.reduce((total, student) => total + getNominalBayar(student), 0)
})

// Fitur Catat Cepat langsung dari Dashboard
const catatCepat = async (studentId, namaSiswa) => {
  const input = prompt(`Masukkan nominal bayar kas seikhlasnya untuk ${namaSiswa} (Minggu ke-${kasStore.selectedWeek}):`, "2000")

  if (input !== null && input !== "") {
    const nominal = parseInt(input)
    if (!isNaN(nominal) && nominal > 0) {
      await kasStore.bayarKas(studentId, nominal)
    } else {
      alert("Nominal tidak valid! Harap masukkan angka yang benar.")
    }
  }
}

// Data Dummy Aktivitas
const recentActivities = [
  { id: 1, type: 'in', desc: 'Sistem KasKelas berhasil terhubung ke Firestore Database', time: 'Hari ini, 09:30' },
  { id: 2, type: 'in', desc: 'Sistem Pembayaran Seikhlasnya aktif', time: 'Hari ini, 09:35' },
  { id: 3, type: 'out', desc: 'Sistem berhasil membaca Role Bendahara', time: 'Baru saja' },
]

onMounted(() => {
  kasStore.fetchStudents()
})
</script>