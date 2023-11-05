import useAuthStore from '@/stores/authStore'
import { User } from '@/types'
import { useQuery } from 'react-query'
import { useUserStore } from '@/stores'
import { get } from '@/utils/apiCaller'
import axios from 'axios'
import { useEffect } from 'react'
type AuthHook = {
  getUser: () => User | null
  isAdmin: () => boolean
  isStaff: () => boolean
  isTrainer: () => boolean
}

const useAuth = (): AuthHook => {
  const { user, setUser } = useAuthStore()
  const token = useUserStore((state) => state.user)?.token
  console.log(token, 'token')

  const { data: userData } = useQuery({
    queryKey: ['own'],
    enabled: !!token,
    queryFn: async () => {
      return await get(
        '/auth/profile',
        {},
        {
          Authorization: `Bearer ${token} `
        }
      )
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
      }
    },
    // onSuccess: (res) => {
    //   console.log(res.data)

    //   setUser(res.data.data)
    // }
    select: (data) => data.data
  })
  useEffect(() => {
    if (userData) {
      setUser(userData)
    }
  }, [setUser, userData])
  const getUser = (): User | null => {
    return user
  }

  const isAdmin = (): boolean => {
    return user?.role.toString() === 'ADMIN'
  }

  const isStaff = (): boolean => {
    return user?.role.toString() === 'STAFF'
  }
  const isTrainer = (): boolean => {
    return user?.role.toString() === 'TRAINER'
  }

  return { getUser, isAdmin, isStaff, isTrainer }
}

export default useAuth
