import { accountsGetAll } from '@/pages/dashboard/accounts'
import { accountDetailQuery } from '@/pages/dashboard/accounts/components/AccountDetail'
// import Account from '@/utils/api/Account'
import { QueryClient } from 'react-query'
import { LoaderFunctionArgs } from 'react-router-dom'

export const loaderAllAccount = (queryClient: QueryClient) => async () => {
  const query = accountsGetAll()
  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
}
export const loaderAccountDetail =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = accountDetailQuery(params.id)
    // ⬇️ return data or fetch it
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  }
