<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div class="flex flex-col items-center mb-8">
        <div class="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center bg-white shadow-lg mb-4">
          <img :src="logoUrl" alt="Logo" class="w-full h-full object-contain" />
        </div>
        <h1 class="text-lg font-bold text-gray-900">Masuk ke TokoKu</h1>
        <p class="text-sm text-gray-500 mt-1">Silakan login untuk melanjutkan</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-gray-600">Email</label>
          <input v-model="email" type="email" required autocomplete="email" placeholder="nama@email.com"
            class="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-gray-600">Kata Sandi</label>
          <input v-model="password" type="password" required autocomplete="current-password" placeholder="••••••••"
            class="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors" />
        </div>

        <p v-if="errorMessage" class="text-xs font-medium text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">
          {{ errorMessage }}
        </p>

        <button type="submit" :disabled="loading"
          class="mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-medium text-sm transition-colors">
          {{ loading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoUrl from '../assets/SYNAPSE.png'
import { useAuthStore } from '../stores/useAuthStore.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    router.push(redirectPath)
  } catch (err) {
    errorMessage.value = 'Email atau kata sandi salah. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>
