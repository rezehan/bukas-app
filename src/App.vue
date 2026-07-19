<script setup>
import { useRoute } from 'vue-router'
// Pastikan path import Sidebar dan Navbar di bawah ini sesuai dengan folder kamu
import Sidebar from './components/layout/Sidebar.vue'
import Navbar from './components/layout/Navbar.vue'

// Kita gunakan useRoute untuk mendeteksi kita sedang berada di halaman mana
const route = useRoute()
</script>

<template>
  <!-- KONDISI 1: Jika berada di halaman login, HANYA tampilkan konten halamannya -->
  <div v-if="route.name === 'login'">
    <router-view />
  </div>

  <!-- KONDISI 2: Jika berada di halaman lain (Dashboard, dll), tampilkan Full Layout -->
  <div v-else class="flex h-screen bg-gray-50 overflow-hidden font-sans">
    
    <!-- Sidebar Kiri -->
    <Sidebar />

    <!-- Konten Kanan -->
    <div class="flex-1 flex flex-col relative overflow-hidden">
      <!-- Navbar Atas -->
      <Navbar />

      <!-- Area Halaman Utama yang Bisa Di-scroll -->
      <main class="flex-1 overflow-y-auto bg-gray-50">
        <router-view />
      </main>
    </div>

  </div>
</template>
