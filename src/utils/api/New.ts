/* eslint-disable react-hooks/rules-of-hooks */

import { NewType } from '@/types'
import { get, post } from '../apiCaller'
import { useAuthorizationHeader } from '../authHeader'
import { PostCreationRequest } from '@/components/Editor'

const New = {
  getAllNew: async () => {
    const endpoint = `/news/`
    const test = useAuthorizationHeader()
    try {
      const response = await get(endpoint, {}, test.headers)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  getNewDetail: async (slug: string | undefined) => {
    const endpoint = `/news/${slug}`
    const test = useAuthorizationHeader()

    try {
      const response = await get(endpoint, {}, test.headers)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  createNew: async (data: PostCreationRequest) => {
    const endpoint = `/news/`
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const test = useAuthorizationHeader()

    // try {
    const response = await post<NewType>(endpoint, data, {}, test.headers)
    console.log('response: ', response)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default New
