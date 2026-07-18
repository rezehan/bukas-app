<template>
  <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
      <p class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <!-- Slot untuk tombol aksi di sebelah kanan (fleksibel) -->
    <div class="flex items-center gap-3 w-full sm:w-auto">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>