import AnimalSpecies from "@/utils/api/AnimalSpecies"
import { speciesDetailQuery } from "@/pages/dashboard/Species/components/SpeciesDetail"

export const loaderSpecies = (queryClient: any) => async () => {
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['repoData'],
      queryFn: AnimalSpecies.getAllSpecies,
      staleTime: 10000
    })

    return data
  } catch (error) {
    console.log(error)
  }
  return null
}
export const loaderSpeciesDetail = (queryClient: any) => async ({ params }) => {
    const query = speciesDetailQuery(params.id)
    return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
      )
  }