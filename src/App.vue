<template>
  <!-- Halaman yang tidak butuh auth (mis. /login) tampil polos, tanpa Sidebar/Navbar -->
  <div v-if="route.meta.requiresAuth === false" class="h-screen overflow-y-auto">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>

  <!-- Halaman yang butuh auth tampil dengan layout lengkap -->
  <div v-else class="flex h-screen overflow-hidden">
    <Sidebar />
    <div class="flex flex-col flex-1 overflow-hidden ml-[240px]">
      <Navbar />
      <main class="flex-1 overflow-y-auto p-7">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import Navbar from './components/layout/Navbar.vue'

const route = useRoute()
</script>