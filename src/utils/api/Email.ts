import { get } from '../apiCaller'

const Email = {
  sendQrCode: async (orderId: string) => {
    const endpoint = `/email/${orderId}`

    // try {
    const response = await get(endpoint)
    console.log('response: ', response)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default Email
