<script setup>
import { useRoute } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import Navbar from './components/layout/Navbar.vue'

// Alat untuk mengecek kita sedang di halaman mana
const route = useRoute()
</script>

<template>
  <!-- JIKA HALAMAN LOGIN: Tampilkan halamannya saja, tanpa Sidebar dan Navbar -->
  <div v-if="route.name === 'login'">
    <router-view />
  </div>

  <!-- JIKA HALAMAN LAIN (Dashboard dll): Tampilkan lengkap dengan Sidebar dan Navbar -->
  <div v-else class="flex h-screen bg-gray-50 overflow-hidden font-sans">

    <Sidebar />

    <!-- ml-60 = offset sebesar lebar Sidebar (w-60), karena Sidebar posisinya 'fixed' -->
    <div class="flex-1 flex flex-col relative overflow-hidden ml-60 min-w-0">
      <Navbar />

      <main class="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 min-w-0">
        <router-view />
      </main>
    </div>

  </div>
</template>