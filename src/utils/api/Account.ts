import { AxiosError, isAxiosError } from 'axios'
import { get, post } from '../apiCaller'
import { AccountFormValues } from '@/pages/accounts/components/AccountForm'
import { useAuthorizationHeader } from '../authHeader'

const Account = {
  getAllAccount: async () => {
    const endpoint = `/accounts/`

    try {
      const response = await get(endpoint, {}, useAuthorizationHeader)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  createAccount: async (data: AccountFormValues) => {
    const endpoint = `/accounts/`

    // try {
    const response = await post(endpoint, data, {}, useAuthorizationHeader)
    console.log('response: ', response)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default Account
