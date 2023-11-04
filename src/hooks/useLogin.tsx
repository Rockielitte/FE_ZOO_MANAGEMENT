import { CredentialResponse } from '@react-oauth/google'
import axios, { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { get } from '@/utils/apiCaller'

import { useUserStore } from '@/stores'
import useAuth from './useAuth'

interface UseLogin {
  login: (data: CredentialResponse) => void
  //   getUser: User | null
  //   logout: () => void
  isLoading: boolean
}

export const useLogin = (): UseLogin => {
  const navigate = useNavigate()
  const { getUser } = useAuth()

  const setUser = useUserStore((state) => state.setUser)

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async (data: CredentialResponse) => {
      const endpoint = `/auth/login-google`

      return await get(endpoint, { credential: data.credential }, {})
    },
    onSuccess: (res: AxiosResponse) => {
      toast({
        variant: 'success',
        title: 'login Success!'
        // description: 'Your request has been processed successfully.'
      })
      setUser({ token: res.data.accessToken })

      navigate('/dashboard/accounts')
      // window.location.reload()
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Account is not allowed to access the system'
        })
      }
    }
  })
  getUser()
  return {
    login,
    // getUser,
    isLoading
  }
}
