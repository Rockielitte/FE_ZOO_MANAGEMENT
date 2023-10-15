import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Jwt } from '../types'
interface userState {
  user: Jwt | null
  setUser: (user: Jwt) => void
}
export const useUserStore = create<userState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (us) => set({ user: us })
      }),
      {
        name: 'user-storage'
      }
    )
  )
)
