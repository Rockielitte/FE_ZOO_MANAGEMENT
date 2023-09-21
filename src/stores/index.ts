import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IUser } from '../types'
interface userState {
  user: IUser | null
  setUser: (user: IUser) => void
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
