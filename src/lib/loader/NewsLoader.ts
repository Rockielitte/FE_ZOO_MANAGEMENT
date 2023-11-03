import { QueryClient } from 'react-query'
import { LoaderFunctionArgs } from 'react-router-dom'
import { newDetailQuery } from '@/pages/dashboard/news/components/NewDetail'

export const loaderNewDetail =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = newDetailQuery(params.id)
    // ⬇️ return data or fetch it
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  }
