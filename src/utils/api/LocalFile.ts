import { get, post, put } from '../apiCaller'

import { useAuthorizationHeader } from '../authHeader'

const LocalFile = {
  uploadFile: async (data) => {
    const endpoint = `/upload`
    console.log('data: ' + data.file.name)
    const formData = new FormData()
    formData.append('file', data.file)

    // try {
    const response = await post(
      endpoint,
      formData,
      {},
      {
        'Content-Type': 'multipart/form-data'
      }
    )
    console.log('response: ', response)

    return response.data
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default LocalFile
