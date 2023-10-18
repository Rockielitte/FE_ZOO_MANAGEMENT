import Account from '@/utils/api/Account'
import { useParams } from 'react-router-dom'

export const loaderAllAccount = (queryClient: any) => async () => {
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['account'],
      queryFn: Account.getAllAccount,
      staleTime: 10000
    })

    return data
  } catch (error) {
    console.log(error)
  }
  return null
}
