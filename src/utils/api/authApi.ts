import { get } from '@/utils/apiCaller'
import { useAuthorizationHeader } from '../authHeader'
import axios from 'axios'

const authApi = {
  getUser: async () => {
    const endpoint = `/auth/profile`
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const test = useAuthorizationHeader()

    try {
      const response = await get(endpoint, {}, test.headers)
      console.log('accountDetail: ', response)

      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)

        return error.response
      }
      return null
    }
  }
}

export default authApi
