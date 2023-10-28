import { get, post } from '../apiCaller'
import { useAuthorizationHeader } from '../authHeader'

const New = {
  getAllNew: async () => {
    const endpoint = `/news/`

    try {
      const response = await get(endpoint, {}, useAuthorizationHeader)

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
  }
}
export default New
