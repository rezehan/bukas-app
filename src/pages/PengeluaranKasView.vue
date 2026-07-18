<template>
  <div class="p-6 font-sans">

    <!-- Reusable Page Header -->
    <PageHeader title="Pengeluaran Kelas" subtitle="Catat dan pantau penggunaan uang kas kelas." />

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

      <!-- Kolom Kiri: Form Tambah Pengeluaran -->
      <div class="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
        <h2 class="text-lg font-bold text-gray-900 mb-5">Catat Pengeluaran</h2>

        <form @submit.prevent="simpanPengeluaran" class="space-y-4">
          <!-- Input Tanggal -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Tanggal</label>
            <input v-model="form.tanggal" type="date" required
              class="w-full border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow">
          </div>

          <!-- Input Nominal -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nominal (Rp)</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-sm font-medium">Rp</span>
              <input v-model="form.nominal" type="number" placeholder="0" required
                class="w-full border border-gray-200 text-gray-700 py-2.5 pl-11 pr-4 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow">
            </div>
          </div>

          <!-- Input Keterangan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Keterangan / Keperluan</label>
            <textarea v-model="form.keterangan" rows="3" placeholder="Misal: Fotokopi tugas kelompok..." required
              class="w-full border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow resize-none"></textarea>
          </div>

          <!-- Tombol Simpan -->
          <button type="submit"
            class="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium text-sm transition-colors flex justify-center items-center gap-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Simpan Pengeluaran
          </button>
        </form>
      </div>

      <!-- Kolom Kanan: Tabel Riwayat Pengeluaran -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">
        <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 class="text-sm font-bold text-gray-700">Riwayat Pengeluaran</h2>
          <span class="text-xs font-medium bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
            Total Terpakai: Rp {{ totalPengeluaran.toLocaleString('id-ID') }}
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-500">
            <thead class="bg-white text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th class="px-6 py-4 font-semibold w-24">Tanggal</th>
                <th class="px-6 py-4 font-semibold">Keterangan</th>
                <th class="px-6 py-4 font-semibold text-right">Nominal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <!-- Kondisi jika data kosong -->
              <tr v-if="pengeluaranList.length === 0">
                <td colspan="3" class="px-6 py-8 text-center text-gray-400">
                  Belum ada catatan pengeluaran.
                </td>
              </tr>

              <!-- Looping data pengeluaran -->
              <tr v-for="item in pengeluaranList" :key="item.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ formatTanggal(item.tanggal) }}</td>
                <td class="px-6 py-4 font-medium text-gray-900">{{ item.keterangan }}</td>
                <td class="px-6 py-4 text-right font-semibold text-rose-600">
                  - Rp {{ item.nominal.toLocaleString('id-ID') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/ui/PageHeader.vue'

// State untuk Form Input
const form = ref({
  tanggal: new Date().toISOString().split('T')[0], // Set default ke hari ini
  nominal: '',
  keterangan: ''
})

// Data Dummy Riwayat Pengeluaran (Disesuaikan dengan kebutuhan riil anak kuliahan/sekolah)
const pengeluaranList = ref([
  { id: 1, tanggal: '2026-07-15', nominal: 25000, keterangan: 'Fotokopi modul Real Analysis (10 rangkap)' },
  { id: 2, tanggal: '2026-07-10', nominal: 15000, keterangan: 'Beli spidol whiteboard dan penghapus' },
  { id: 3, tanggal: '2026-07-05', nominal: 50000, keterangan: 'Jenguk teman sakit (Beli buah)' },
])

// Menghitung Total Pengeluaran otomatis
const totalPengeluaran = computed(() => {
  return pengeluaranList.value.reduce((total, item) => total + item.nominal, 0)
})

// Fungsi Format Tanggal agar lebih mudah dibaca (Misal: 15 Jul 2026)
const formatTanggal = (tanggal) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return new Date(tanggal).toLocaleDateString('id-ID', options)
}

// Fungsi Submit Form
const simpanPengeluaran = () => {
  if (!form.value.nominal || !form.value.keterangan) return

  // Tambahkan data baru ke urutan paling atas (unshift)
  pengeluaranList.value.unshift({
    id: Date.now(),
    tanggal: form.value.tanggal,
    nominal: parseInt(form.value.nominal),
    keterangan: form.value.keterangan
  })

  // Reset form setelah berhasil menyimpan
  form.value.nominal = ''
  form.value.keterangan = ''

  alert('Data pengeluaran berhasil dicatat!')
}
</script>