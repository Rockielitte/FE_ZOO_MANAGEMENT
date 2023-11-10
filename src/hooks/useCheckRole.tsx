import { User } from '@/types/index'
import useQueryCustom from './useQueryCustom'
const useCheckRole = () => {
  const profile = useQueryCustom({
    query: `/auth/profile`,
    queryKey: ['profile'],
    data: {},
    dataRes: {} as User
  })
  return {
    loading: profile.isLoading,
    role: (profile.data as User)?.role
  }
}

export default useCheckRole
