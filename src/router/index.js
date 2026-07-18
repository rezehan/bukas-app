import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// 1. Pastikan semua halaman di-import di sini
import LoginView from '../pages/LoginView.vue'
import DashboardView from '../pages/DashboardView.vue'
import PencatatanKasView from '../pages/PencatatanKasView.vue'
import PengeluaranKasView from '../pages/PengeluaranKasView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView // Sekarang Vue sudah tahu dari mana asalnya
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true } // Menandakan butuh login
    },
    {
      path: '/pencatatan',
      name: 'pencatatan',
      component: PencatatanKasView,
      meta: { requiresAuth: true }
    },
    {
      path: '/pengeluaran',
      name: 'pengeluaran',
      component: PengeluaranKasView,
      meta: { requiresAuth: true }
    }
  ]
})

// 2. Pasang Satpam (Navigation Guard)
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const auth = getAuth()

  // Fungsi untuk mengecek status login secara real-time dari Firebase
  const getCurrentUser = () => new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })

  const currentUser = await getCurrentUser()

  if (requiresAuth && !currentUser) {
    // Jika mau masuk halaman rahasia (seperti dashboard) tapi belum login, tendang ke halaman Login ('/')
    next('/')
  } else if (to.path === '/' && currentUser) {
    // Jika SUDAH login tapi iseng mencoba buka halaman Login lagi, arahkan ke Dashboard
    next('/dashboard')
  } else {
    // Kondisi aman, silakan lewat
    next()
  }
})

export default router