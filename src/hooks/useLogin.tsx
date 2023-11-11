import { CredentialResponse } from '@react-oauth/google'
import axios, { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { toast } from '@/components/ui/use-toast'
import { get } from '@/utils/apiCaller'

import { useUserStore } from '@/stores'

interface UseLogin {
  login: (data: CredentialResponse) => void
  //   getUser: User | null
  //   logout: () => void
  isLoading: boolean
  isSuccess: boolean
}

export const useLogin = (): UseLogin => {
  const setUser = useUserStore((state) => state.setUser)
  // const { user } = useUserStore()

  const {
    mutate: login,
    isLoading,
    isSuccess
  } = useMutation({
    mutationKey: 'login',
    mutationFn: async (data: CredentialResponse) => {
      const endpoint = `/auth/login-google`

      return await get(endpoint, { credential: data.credential }, {})
    },
    onSuccess: async (res: AxiosResponse) => {
      toast({
        variant: 'success',
        title: 'login Success!'
        // description: 'Your request has been processed successfully.'
      })
      setUser({ token: res.data.accessToken })

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
  // if (user?.token != null && !isLoading) {

  // }
  return {
    login,
    isSuccess,
    isLoading
  }
}
