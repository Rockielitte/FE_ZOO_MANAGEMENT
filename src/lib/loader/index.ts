import LeaderBoard from '../../utils/api/LeaderBoard'

export const loaderLeaderBoard = (queryClient: any) => async () => {
  console.log('reloAD NE')

  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['repoData'],
      queryFn: LeaderBoard.getLeaderBoard,
      staleTime: 10000
    })

    return data
  } catch (error) {
    console.log(error)
  }
  return null
}
