<template>
  <div class="p-6 font-sans">

    <!-- Reusable Page Header -->
    <PageHeader title="Pencatatan Kas" subtitle="Catat nominal masuk iuran kas (seikhlasnya) teman sekelas.">
      <template #actions>

        <!-- CUSTOM DROPDOWN MINGGU -->
        <div class="relative">
          <!-- Overlay transparan untuk menutup dropdown jika klik di luar -->
          <div v-if="isDropdownOpen" @click="isDropdownOpen = false" class="fixed inset-0 z-40"></div>

          <!-- Tombol Trigger Dropdown -->
          <button @click="isDropdownOpen = !isDropdownOpen"
            class="relative z-50 flex items-center justify-between w-44 px-4 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200">
            <span class="flex items-center gap-2">
              <!-- Ikon Kalender -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Minggu {{ kasStore.selectedWeek }}
            </span>
            <!-- Ikon Panah (Berputar saat terbuka) -->
            <svg :class="{ 'rotate-180': isDropdownOpen }" class="w-4 h-4 text-gray-400 transition-transform duration-300"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Menu Dropdown dengan Animasi Vue -->
          <transition enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-2 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-95">
            <div v-if="isDropdownOpen"
              class="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white border border-gray-100 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="p-1.5 max-h-64 overflow-y-auto">
                <button v-for="week in 16" :key="week" @click="pilihMinggu(week)" :class="[
                  kasStore.selectedWeek === week
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium',
                  'flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-150'
                ]">
                  Minggu ke-{{ week }}
                  <!-- Ikon Centang hanya muncul di minggu yang sedang aktif -->
                  <svg v-if="kasStore.selectedWeek === week" class="w-4 h-4 text-emerald-600" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>
        <!-- END CUSTOM DROPDOWN -->

      </template>
    </PageHeader>

    <!-- Loading State -->
    <div v-if="kasStore.isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>

    <!-- Tabel Daftar 20 Siswa -->
    <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 class="text-sm font-bold text-gray-700">Daftar Siswa Kelas</h2>
        <span class="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full shadow-sm">
          Total Uang Kas Kelas: Rp {{ kasStore.totalUangMasuk.toLocaleString('id-ID') }}
        </span>
      </div>

      <div class="overflow-x-auto h-[60vh]">
        <table class="w-full text-left text-sm text-gray-500 relative">
          <thead class="bg-white text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10 shadow-sm">
            <tr>
              <th class="px-6 py-4 font-semibold w-16">No</th>
              <th class="px-6 py-4 font-semibold">Nama Siswa</th>
              <th class="px-6 py-4 font-semibold">Total Pribadi Terkumpul</th>
              <th class="px-6 py-4 font-semibold">Input Nominal (Minggu {{ kasStore.selectedWeek }})</th>
              <th class="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(student, index) in kasStore.students" :key="student.id"
              class="hover:bg-gray-50/50 transition-colors">

              <td class="px-6 py-4 text-gray-400 font-medium">{{ index + 1 }}</td>

              <td class="px-6 py-4">
                <span class="font-medium text-gray-900">{{ student.nama }}</span>
                <span v-if="student.isBendahara"
                  class="ml-2 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide">
                  Bendahara
                </span>
              </td>

              <td class="px-6 py-4">
                <span class="font-bold text-gray-800">
                  Rp {{ hitungTotalSiswa(student).toLocaleString('id-ID') }}
                </span>
              </td>

              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-gray-400 font-medium text-sm">Rp</span>
                  <input type="number" v-model="inputNominal[student.id]" placeholder="0"
                    class="w-32 border border-gray-200 text-gray-900 font-bold py-2 px-3 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow">
                </div>
              </td>

              <td class="px-6 py-4 text-right">
                <button @click="simpanPembayaran(student.id, student.nama)"
                  class="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-100 hover:border-emerald-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all shadow-sm">
                  Simpan
                </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useKasStore } from '../stores/useKasStore'
import PageHeader from '../components/ui/PageHeader.vue'

const kasStore = useKasStore()

// State untuk custom dropdown
const isDropdownOpen = ref(false)
const inputNominal = ref({})

// Fungsi ketika minggu di-klik pada dropdown
const pilihMinggu = (week) => {
  kasStore.selectedWeek = week
  isDropdownOpen.value = false // Tutup menu setelah memilih
}

const hitungTotalSiswa = (student) => {
  if (!student.payments) return 0
  return Object.values(student.payments).reduce((sum, amount) => sum + amount, 0)
}

const setInputValues = () => {
  kasStore.students.forEach(student => {
    const weekStr = String(kasStore.selectedWeek)
    inputNominal.value[student.id] = student.payments && student.payments[weekStr] ? student.payments[weekStr] : ''
  })
}

const simpanPembayaran = async (studentId, namaSiswa) => {
  const nominal = parseInt(inputNominal.value[studentId]) || 0
  await kasStore.bayarKas(studentId, nominal)
  console.log(`Berhasil menyimpan Rp ${nominal} untuk ${namaSiswa} di Minggu ke-${kasStore.selectedWeek}`)
}

watch(() => kasStore.selectedWeek, () => {
  setInputValues()
})

onMounted(async () => {
  await kasStore.fetchStudents()
  setInputValues()
})
</script>