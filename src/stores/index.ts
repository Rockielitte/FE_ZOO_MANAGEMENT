import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IUser } from '../types'
interface userState {
  user: IUser
  increase: (user: IUser) => void
}
export const useUserStore = create<userState>()(
  devtools(
    persist(
      (set) => ({
        user: {},
        increase: (user) => set(() => user)
      }),
      {
        name: 'user-storage'
      }
    )
  )
)
