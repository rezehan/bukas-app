<template>
  <span :class="[colorClasses, 'inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium']">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: { type: String, default: 'gray' } // 'rose' | 'emerald' | 'blue' | 'amber' | 'gray'
})

const colorMap = {
  rose: 'bg-rose-50 text-rose-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  gray: 'bg-gray-50 text-gray-600'
}

const colorClasses = computed(() => colorMap[props.color] || colorMap.gray)
</script>
