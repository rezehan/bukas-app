<template>
  <div class="flex gap-4">
    <div :class="`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'}`" />
    <div>
      <p class="text-sm font-medium text-gray-900">{{ desc }}</p>
      <p class="text-xs text-gray-500 mt-1">{{ time }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, required: true }, // 'in' | 'out'
  desc: { type: String, required: true },
  time: { type: String, required: true }
})
</script>
