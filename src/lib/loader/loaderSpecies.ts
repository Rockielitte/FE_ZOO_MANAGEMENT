import { speciesDetailQuery } from '@/pages/dashboard/Species/components/SpeciesDetail'
import { LoaderFunctionArgs } from 'react-router-dom'
import { QueryClient } from 'react-query'

export const loaderSpeciesDetail =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = speciesDetailQuery(params.id)
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  }
