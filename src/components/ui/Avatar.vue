<template>
  <div :class="[sizeClass, 'rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold flex-shrink-0']">
    {{ initials }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  initials: { type: String, required: true },
  size: { type: String, default: 'md' } // 'sm' | 'md' | 'lg'
})

const sizeMap = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm'
}

const sizeClass = computed(() => sizeMap[props.size] || sizeMap.md)
</script>
