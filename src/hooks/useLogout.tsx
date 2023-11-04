import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores'
import useAuthStore from '@/stores/authStore'
import { toast } from '@/components/ui/use-toast'
interface UseLogout {
  //   getUser: User | null
  logout: () => void
}

export const useLogout = (): UseLogout => {
  const navigate = useNavigate()
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
    navigate('/authentication/login')
  }
  return {
    logout
  }
}
