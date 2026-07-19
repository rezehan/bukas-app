<template>
  <aside class="fixed left-0 top-0 bottom-0 w-60 flex flex-col z-50 bg-white border-r border-gray-100">

    <!-- Brand -->
    <div class="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
      <img :src="logoUrl" alt="Logo TokoKu" class="h-10 w-auto object-contain flex-shrink-0" />
      <div class="flex flex-col leading-tight">
        <span class="text-[15px] font-bold text-gray-900">Buku Kas</span>
        <span class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Buku Kas Kelas</span>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 flex flex-col px-4 pt-6 overflow-y-auto">
      <span class="text-[10px] font-bold tracking-widest text-gray-400 px-3 mb-3">MENU UTAMA</span>
      <div class="flex flex-col gap-1">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
          class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          :class="$route.path === item.to
            ? 'bg-emerald-50 text-emerald-700'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-colors duration-200"
            :class="$route.path === item.to
              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
              : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'" v-html="item.icon">
          </span>
          <span class="flex-1">{{ item.label }}</span>
          <span v-if="item.badge"
            class="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white bg-rose-500 min-w-[18px] text-center">
            {{ item.badge }}
          </span>
        </RouterLink>
      </div>
    </nav>

    <!-- User -->
    <div class="px-4 pb-5 pt-3 border-t border-gray-100">
      <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50">
        <div class="relative flex-shrink-0">
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-emerald-500 to-emerald-600">
            {{ userInitials }}
          </div>
          <span
            class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
        </div>
        <div class="flex-1 flex flex-col leading-tight min-w-0">
          <span class="text-[13px] font-semibold text-gray-900 truncate">{{ userEmail }}</span>
          <span class="text-[11px] text-gray-400">Administrator</span>
        </div>
        <button type="button" @click="handleLogout" title="Keluar" aria-label="Keluar"
          class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/useAuthStore.js'
import logoUrl from '../../assets/SYNAPSE.png'

const router = useRouter()
const authStore = useAuthStore()

const userEmail = computed(() => authStore.user?.email || 'Admin Toko')
const userInitials = computed(() => {
  const email = authStore.user?.email
  return email ? email.slice(0, 2).toUpperCase() : 'AD'
})

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' }) // sebelumnya '/login' (path yang tidak ada), sekarang pakai nama route
}

const navItems = computed(() => [
  {
    to: '/dashboard', label: 'Dashboard',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  },
  {
    to: '/pencatatan', label: 'Pencatatan Kas',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  },
  {
    to: '/pengeluaran', label: 'Pengeluaran Kas',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
  },
])
</script>