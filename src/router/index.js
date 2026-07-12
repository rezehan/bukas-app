import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore.js'

import DashboardView from '../pages/DashboardView.vue'
import PencatatanKasView from '../pages/PencatatanKasView.vue'
import PengeluaranKasView from '../pages/PengeluaranKasView.vue'
import LoginView from '../pages/LoginView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },

  {
    path: '/login',
    component: LoginView,
    name: 'Login',
    meta: { requiresAuth: false },
  },

  {
    path: '/dashboard',
    component: DashboardView,
    name: 'DashboardView',
    meta: { requiresAuth: true },
  },
  {
    path: '/pencatatan',
    component: PencatatanKasView,
    name: 'PencatatanKasView',
    meta: { requiresAuth: true },
  },
  {
    path: '/pengeluaran',
    component: PengeluaranKasView,
    name: 'PengeluaranKasView',
    meta: { requiresAuth: true },
  },

  // rute tak dikenal diarahkan balik ke dashboard
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // tunggu Firebase selesai mengecek status login (hanya sekali, di navigasi pertama)
  if (!authStore.isReady) {
    await authStore.init()
  }

  const isAuthenticated = !!authStore.user
  const requiresAuth = to.meta.requiresAuth !== false

  if (requiresAuth && !isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.path === '/login' && isAuthenticated) {
    return { path: '/dashboard' }
  }

  return true
})

export default router