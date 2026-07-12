<template>
  <div
    class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
    <!-- Icon Container dengan warna dinamis -->
    <div :class="`p-3 rounded-xl flex-shrink-0 ${iconBgClass} ${iconColorClass}`">
      <slot name="icon"></slot>
    </div>

    <!-- Text Content -->
    <div>
      <p class="text-sm font-medium text-gray-500 mb-1">{{ title }}</p>
      <h3 class="text-2xl font-bold text-gray-900">{{ value }}</h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  iconBgClass: {
    type: String,
    default: 'bg-blue-50'
  },
  iconColorClass: {
    type: String,
    default: 'text-blue-600'
  }
})
</script>