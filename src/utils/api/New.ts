import { get, post } from '../apiCaller'
import { useAuthorizationHeader } from '../authHeader'

const New = {
  getAllNew: async () => {
    const endpoint = `/news/`

    try {
      const response = await get(
        endpoint,
        {},
        {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
        }
      )

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  getNewDetail: async (slug: string | undefined) => {
    const endpoint = `/news/${slug}`

    try {
      const response = await get(
        endpoint,
        {},
        {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
        }
      )

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
    const response = await post(
      endpoint,
      data,
      {},
      {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
      }
    )
    console.log('response: ', response)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default New
