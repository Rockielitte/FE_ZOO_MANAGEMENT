import { post } from '../apiCaller'
import { useAuthorizationHeader } from '../authHeader'

const LocalFile = {
  uploadFile: async (data: { file: File }) => {
    const endpoint = `/utils/upload`
    console.log('data: ' + data.file.name)
    const formData = new FormData()
    formData.append('file', data.file)
    const test = useAuthorizationHeader()

    // try {
    const response = await post(
      endpoint,
      formData,
      {},
      test.headers
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
