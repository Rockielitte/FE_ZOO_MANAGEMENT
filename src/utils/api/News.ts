import { get, post, put } from '../apiCaller'
import { AccountFormValues } from '@/pages/dashboard/accounts/components/AccountForm'
import { useAuthorizationHeader } from '../authHeader'

const News = {
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
  getAccountDetail: async (slug: string) => {
    const endpoint = `/accounts/${slug}`

    try {
      const response = await get(endpoint, {}, useAuthorizationHeader)
      console.log('accountDetail: ', response.data)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  createNew: async (data) => {
    const endpoint = `/news/`
    console.log('new infor: ', data)

    // try {
    const response = await post(endpoint, data, {}, {})
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
    const response = await put(endpoint, data, {}, useAuthorizationHeader)
    console.log('response: ', response)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default News
