// authStore.ts
import { User } from '@/types'
import { create } from 'zustand'

type AuthStore = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}))

export default useAuthStore
