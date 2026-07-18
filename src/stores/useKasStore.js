import { defineStore } from 'pinia'
import { db } from '../firebase/firebase' // Pastikan jalur file koneksi Firebase benar
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove, addDoc, writeBatch } from 'firebase/firestore'

export const useKasStore = defineStore('kas', {
    state: () => ({
        students: [],
        pengeluaran: [],
        nominalIuran: 5000,
        selectedWeek: 4, // Default minggu berjalan
        isLoading: false
    }),

    getters: {
        // Menghitung total uang masuk berdasarkan panjang array paidWeeks dari semua 20 siswa
        totalUangMasuk: (state) => {
            return state.students.reduce((total, student) => {
                return total + (student.paidWeeks.length * state.nominalIuran)
            }, 0)
        }
    },

    actions: {
        // 1. Mengambil data 20 siswa dari Firestore
        async fetchStudents() {
            this.isLoading = true
            try {
                const querySnapshot = await getDocs(collection(db, 'students'))
                const dataSiswa = []

                querySnapshot.forEach((doc) => {
                    dataSiswa.push({ id: doc.id, ...doc.data() })
                })

                // Jika database masih kosong, otomatis generate 20 orang ke Firestore
                if (dataSiswa.length === 0) {
                    await this.generate20Students()
                } else {
                    // Urutkan berdasarkan nama
                    this.students = dataSiswa.sort((a, b) => a.nama.localeCompare(b.nama))
                }
            } catch (error) {
                console.error("Gagal mengambil data siswa:", error)
            } finally {
                this.isLoading = false
            }
        },

        // 2. Logic untuk mengubah status bayar saat Toggle diklik
        async togglePayment(studentId, isPaid) {
            const studentRef = doc(db, 'students', studentId)
            const week = Number(this.selectedWeek)

            try {
                if (isPaid) {
                    // Jika ditandai lunas, masukkan angka minggu ke dalam array paidWeeks
                    await updateDoc(studentRef, {
                        paidWeeks: arrayUnion(week)
                    })
                } else {
                    // Jika dibatalkan, hapus angka minggu dari array paidWeeks
                    await updateDoc(studentRef, {
                        paidWeeks: arrayRemove(week)
                    })
                }

                // Update state lokal agar UI langsung berubah tanpa refresh
                const index = this.students.findIndex(s => s.id === studentId)
                if (index !== -1) {
                    if (isPaid) {
                        this.students[index].paidWeeks.push(week)
                    } else {
                        this.students[index].paidWeeks = this.students[index].paidWeeks.filter(w => w !== week)
                    }
                }
            } catch (error) {
                console.error("Gagal update pembayaran:", error)
            }
        },

        // 3. Fungsi otomatis membuat 20 data awal jika database masih kosong
        async generate20Students() {
            const batch = writeBatch(db)
            const defaultStudents = [
                "Raihan Abdillah", "Ahmad Faisal", "Budi Santoso", "Citra Kirana", "Dewi Lestari",
                "Eko Prasetyo", "Fajar Nugroho", "Gita Savitri", "Hadi Saputra", "Indah Permata",
                "Joko Susilo", "Kurnia Meiga", "Lestari Ayu", "Maya Septha", "Nurul Hidayah",
                "Oki Setiana", "Putri Marino", "Qori Maharani", "Reza Rahadian", "Siti Aminah"
            ]

            defaultStudents.forEach((nama) => {
                const docRef = doc(collection(db, 'students')) // Generate ID otomatis
                batch.set(docRef, {
                    nama: nama,
                    isBendahara: nama === "Raihan Abdillah", // Tandai bendahara
                    paidWeeks: [] // Kosong di awal
                })
            })

            await batch.commit()
            await this.fetchStudents() // Ambil ulang data setelah digenerate
        }
    }
})