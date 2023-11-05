import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores'
import useAuthStore from '@/stores/authStore'
import { toast } from '@/components/ui/use-toast'
import { useQueryClient } from 'react-query'
interface UseLogout {
  //   getUser: User | null
  logout: () => void
}

export const useLogout = (): UseLogout => {
  const navigate = useNavigate()
  const client = useQueryClient()
  const { clearToken } = useUserStore()
  const { clearUser } = useAuthStore()
  const logout = (): void => {
    clearToken()
    clearUser()
    toast({
      variant: 'success',
      title: 'Logout Success!',
      description: 'Your request has been processed successfully.'
    })
    client.invalidateQueries(['login'])
    localStorage.removeItem('user-storage')
    navigate('/authentication/login')
  }
  return {
    logout
  }
}
