import { AxiosError, isAxiosError } from 'axios'
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
      const response = await post(
        endpoint,
        data,
        {},
        {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJtaW5ocGhhbTM0NDZAZ21haWwuY29tIiwiaWF0IjoxNjk3OTExNjgxLCJleHAiOjE2OTc5Mjk2ODF9.4jbXJf5yqa-Y8RXWk8YcgIyreUcf3k5ANm_q5yD62Ys'
        }
      )
      console.log('response: ', response)

      return response
    } catch (error: AxiosError) {
      console.log('Error code:', error.response)

      return error.response
    }
  }
}
export default Account
