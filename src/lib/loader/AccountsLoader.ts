import { accountsGetAll } from '@/pages/dashboard/accounts'
import { accountDetailQuery } from '@/pages/dashboard/accounts/components/AccountDetail'
import Account from '@/utils/api/Account'
import { QueryClient } from 'react-query'
import { LoaderFunctionArgs } from 'react-router-dom'

export const loaderAllAccount = (queryClient: QueryClient) => async () => {
  try {
    const query = accountsGetAll()
    // const data = await queryClient.fetchQuery({
    //   queryKey: ['account'],
    //   queryFn: Account.getAllAccount,
    //   staleTime: 100000
    // })

    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  } catch (error) {
    console.log(error)
    return null
  }
}
export const loaderAccountDetail =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = accountDetailQuery(params.id)
    // ⬇️ return data or fetch it
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  }
