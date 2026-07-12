<template>
  <div class="p-6 font-sans">

    <!-- Header Section -->
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Halo, Bendahara! 👋</h1>
        <p class="text-sm text-gray-500 mt-1">Ini ringkasan kas kelas minggu ke-4.</p>
      </div>
      <button
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Catat Pemasukan
      </button>
    </header>

    <!-- Stats Grid (Reusable Components) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      <!-- Total Saldo -->
      <StatCard title="Total Saldo Kas" value="Rp 450.000" iconBgClass="bg-emerald-50"
        iconColorClass="text-emerald-600">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
          </svg>
        </template>
      </StatCard>

      <!-- Pemasukan Minggu Ini -->
      <StatCard title="Pemasukan (Minggu Ini)" value="Rp 80.000" iconBgClass="bg-blue-50"
        iconColorClass="text-blue-600">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </template>
      </StatCard>

      <!-- Pengeluaran Minggu Ini -->
      <StatCard title="Pengeluaran (Minggu Ini)" value="Rp 15.000" iconBgClass="bg-rose-50"
        iconColorClass="text-rose-600">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
          </svg>
        </template>
      </StatCard>

      <!-- Total Siswa Nunggak -->
      <StatCard title="Siswa Belum Bayar" value="4 Orang" iconBgClass="bg-amber-50" iconColorClass="text-amber-600">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </template>
      </StatCard>

    </div>

    <!-- Main Content Section: Tabel Tunggakan & Aktivitas -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Kolom Kiri: Tabel Prioritas (Siswa Belum Bayar) -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-900">Perlu Ditagih (Minggu Ini) ⚠️</h2>
          <button class="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Semua Siswa</button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-500">
            <thead class="bg-gray-50 text-gray-700">
              <tr>
                <th class="px-6 py-4 font-medium">Nama Siswa</th>
                <th class="px-6 py-4 font-medium">Status Tunggakan</th>
                <th class="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="student in unpayableStudents" :key="student.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                    {{ student.initials }}
                  </div>
                  <span class="font-medium text-gray-900">{{ student.name }}</span>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-rose-50 text-rose-600">
                    Nunggak {{ student.weeks }} Minggu
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                    class="text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
                    Tandai Lunas
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Kolom Kanan: Aktivitas Terakhir -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-6">Aktivitas Terakhir</h2>

        <div class="space-y-6">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex gap-4">
            <div
              :class="`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${activity.type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'}`">
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ activity.desc }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>

        <button
          class="w-full mt-8 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
          Lihat Buku Kas
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
// Menggunakan relative path
import StatCard from '../components/ui/StatCard.vue'

// Ganti data dummy ini nanti dengan data teman sekelas yang asli
const unpayableStudents = [
  { id: 1, name: 'Budi Santoso', initials: 'BS', weeks: 2 },
  { id: 2, name: 'Siti Aminah', initials: 'SA', weeks: 1 },
  { id: 3, name: 'Rizky Pratama', initials: 'RP', weeks: 3 },
  { id: 4, name: 'Dewi Lestari', initials: 'DL', weeks: 1 },
]

const recentActivities = [
  { id: 1, type: 'in', desc: 'Ahmad membayar kas minggu ke-4', time: 'Hari ini, 09:30' },
  { id: 2, type: 'in', desc: 'Fajar membayar kas minggu ke-4', time: 'Kemarin, 14:15' },
  { id: 3, type: 'out', desc: 'Beli spidol whiteboard (2 pcs)', time: 'Senin, 10:00' },
  { id: 4, type: 'in', desc: 'Rina melunasi tunggakan 2 minggu', time: 'Senin, 08:20' },
]
</script>