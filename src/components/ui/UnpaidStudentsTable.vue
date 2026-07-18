<template>
  <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
      <h2 class="text-lg font-bold text-gray-900">{{ title }}</h2>
      <button class="text-sm font-medium text-blue-600 hover:text-blue-700" @click="$emit('view-all')">
        Lihat Semua Siswa
      </button>
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
          <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50/50 transition-colors">
            <td class="px-6 py-4 flex items-center gap-3">
              <Avatar :initials="student.initials" />
              <span class="font-medium text-gray-900">{{ student.name }}</span>
            </td>
            <td class="px-6 py-4">
              <StatusBadge color="rose">Nunggak {{ student.weeks }} Minggu</StatusBadge>
            </td>
            <td class="px-6 py-4 text-right">
              <button
                class="text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
                @click="$emit('mark-paid', student.id)">
                Tandai Lunas
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Avatar from './Avatar.vue'
import StatusBadge from './StatusBadge.vue'

defineProps({
  title: { type: String, default: 'Perlu Ditagih (Minggu Ini) ⚠️' },
  students: { type: Array, required: true }
})

defineEmits(['view-all', 'mark-paid'])
</script>
