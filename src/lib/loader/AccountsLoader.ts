import Account from '@/utils/api/Account'

export const loaderAccount = (queryClient: any) => async () => {
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
