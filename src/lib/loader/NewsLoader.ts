import { newsGetAll } from '@/pages/dashboard/news'
import { accountDetailQuery } from '@/pages/dashboard/accounts/components/AccountDetail'

import { QueryClient } from 'react-query'
import { LoaderFunctionArgs } from 'react-router-dom'

export const loaderAllNews = (queryClient: QueryClient) => async () => {
  try {
    const query = newsGetAll()
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
