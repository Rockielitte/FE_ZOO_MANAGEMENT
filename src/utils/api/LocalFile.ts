import { post } from '../apiCaller'
import { useAuthorizationHeader } from '../authHeader'

const LocalFile = {
  uploadFile: async (data: { file: File }) => {
    const endpoint = `/utils/upload`

    const formData = new FormData()
    formData.append('file', data.file)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const test = useAuthorizationHeader()

    // try {
    const response = await post(endpoint, formData, {}, test.headers)
    console.log('imageurl: ' + response.data)

    return response.data
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default LocalFile
