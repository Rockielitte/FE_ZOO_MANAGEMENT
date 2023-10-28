import { get, post, put } from '../apiCaller'
import { AccountFormValues } from '@/pages/dashboard/accounts/components/AccountForm'
import { useAuthorizationHeader } from '../authHeader'

const Account = {
  getAllAccount: async () => {
    const endpoint = `/accounts/`

    try {
      const response = await get(
        endpoint,
        {},
        {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
        }
      )

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  getAccountDetail: async (slug: string) => {
    const endpoint = `/accounts/${slug}`

    try {
      const response = await get(
        endpoint,
        {},
        {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
        }
      )
      console.log('accountDetail: ', response.data)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  createAccount: async (data: AccountFormValues) => {
    const endpoint = `/accounts/`

    // try {
    const response = await post(
      endpoint,
      data,
      {},
      {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
      }
    )
    console.log('response: ', response)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  },
  updateAccount: async (data: AccountFormValues, id: string) => {
    const endpoint = `/accounts/${id}`

    // try {
    const response = await put(
      endpoint,
      data,
      {},
      {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
      }
    )
    console.log('response: ', response)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default Account
