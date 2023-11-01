import { post } from '../apiCaller'

const LocalFile = {
  uploadFile: async (data: { file: File }) => {
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
        'Content-Type': 'multipart/form-data',

        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
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
