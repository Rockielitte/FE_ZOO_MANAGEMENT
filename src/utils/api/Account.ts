import { get, post } from '../apiCaller'
import { AccountFormValues } from '@/pages/accounts/components/AccountForm'

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
            'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RBRkYiLCJzdWIiOiJtaW5ocGhhbTM0NDZAZ21haWwuY29tIiwiaWF0IjoxNjk3NTA3OTQ3LCJleHAiOjE2OTc1MjU5NDd9.h1LzaJTOs-HQ0tkgYn35qSLC6lRw_OD9Fhm8x1TGygM'
        }
      )

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  createAccount: async (data: AccountFormValues) => {
    const endpoint = `/accounts/create`

    try {
      const response = (await post)<AccountFormValues>(
        endpoint,
        data,
        {},
        {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RBRkYiLCJzdWIiOiJtaW5ocGhhbTM0NDZAZ21haWwuY29tIiwiaWF0IjoxNjk3NTA3OTQ3LCJleHAiOjE2OTc1MjU5NDd9.h1LzaJTOs-HQ0tkgYn35qSLC6lRw_OD9Fhm8x1TGygM'
        }
      ).then((res) => res.data)

      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
export default Account
