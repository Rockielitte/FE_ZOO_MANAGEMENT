/* eslint-disable react-hooks/rules-of-hooks */
import { get, post, put } from '../apiCaller'
import { AccountFormValues } from '@/pages/dashboard/accounts/components/AccountForm'
import { useAuthorizationHeader } from '../authHeader'

const Account = {
  getAllAccount: async () => {
    const endpoint = `/accounts/`
    const test = useAuthorizationHeader()
    try {
      const response = await get(endpoint, {}, test.headers)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  getAccountDetail: async (slug: string) => {
    const endpoint = `/accounts/${slug}`
    const test = useAuthorizationHeader()

    try {
      const response = await get(endpoint, {}, test.headers)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  createAccount: async (data: AccountFormValues) => {
    const endpoint = `/accounts/`
    const test = useAuthorizationHeader()

    // try {
    const response = await post(endpoint, data, {}, test.headers)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  },
  updateAccount: async (data: AccountFormValues, id: string) => {
    const endpoint = `/accounts/${id}`
    const test = useAuthorizationHeader()

    // try {
    const response = await put(endpoint, data, {}, test.headers)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  },
  banAccount: async (status: string, id: string) => {
    const endpoint = `/accounts/update-status/${id}`
    const test = useAuthorizationHeader()

    // try {
    const response = await put(endpoint, { status: status }, {}, test.headers)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default Account
