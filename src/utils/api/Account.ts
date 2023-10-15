import { get } from '../apiCaller'

const Account = {
  getAllAccount: async () => {
    const endpoint = `/accounts/get-all`

    try {
      const response = await get(
        endpoint,
        {},
        {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RBRkYiLCJzdWIiOiJtaW5ocGhhbTM0NDZAZ21haWwuY29tIiwiaWF0IjoxNjk3MzgzOTYxLCJleHAiOjE2OTc0MDE5NjF9.gW3D253DpJ-F9lPEOFJ0p4nkh7uRry4lb0WYFJGU6aY'
        }
      )

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
export default Account
