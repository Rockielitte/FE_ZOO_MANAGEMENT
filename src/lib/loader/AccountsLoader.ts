import Account from '@/utils/api/Account'

export const loaderAllAccount = (queryClient: any) => async () => {
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['account'],
      queryFn: Account.getAllAccount,
      staleTime: 100
    })

    return data
  } catch (error) {
    console.log(error)
  }
  return null
}
