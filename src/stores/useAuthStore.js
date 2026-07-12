import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isReady = ref(false)

  let readyPromise = null

  // Menunggu Firebase selesai mengecek status login pertama kali
  // (dipanggil sekali oleh router guard, aman dipanggil berkali-kali)
  function init() {
    if (readyPromise) return readyPromise

    readyPromise = new Promise((resolve) => {
      onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser
        if (!isReady.value) {
          isReady.value = true
          resolve()
        }
      })
    })

    return readyPromise
  }

  async function login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    user.value = credential.user
    return credential.user
  }

  async function logout() {
    await signOut(auth)
    user.value = null
  }

  return { user, isReady, init, login, logout }
})
