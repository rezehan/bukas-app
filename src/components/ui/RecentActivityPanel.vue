<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h2 class="text-lg font-bold text-gray-900 mb-6">{{ title }}</h2>

    <div class="space-y-6">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :type="activity.type"
        :desc="activity.desc"
        :time="activity.time"
      />
    </div>

    <button
      class="w-full mt-8 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
      @click="$emit('view-log')">
      Lihat Buku Kas
    </button>
  </div>
</template>

<script setup>
import ActivityItem from './ActivityItem.vue'

defineProps({
  title: { type: String, default: 'Aktivitas Terakhir' },
  activities: { type: Array, required: true }
})

defineEmits(['view-log'])
</script>
