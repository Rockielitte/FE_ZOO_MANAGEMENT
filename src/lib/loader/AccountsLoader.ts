import { accountDetailQuery } from '@/pages/dashboard/accounts/components/AccountDetail'

import authApi from '@/utils/api/authApi'
import { QueryClient } from 'react-query'
import { LoaderFunctionArgs } from 'react-router-dom'

export const loaderAccountDetail =
  (queryClient: QueryClient) =>
    async ({ params }: LoaderFunctionArgs) => {
      const query = accountDetailQuery(params.id)
      // ⬇️ return data or fetch it
      return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    }
export async function GetInfoUser() {
  const info = await authApi.getUser()

  return info
}
