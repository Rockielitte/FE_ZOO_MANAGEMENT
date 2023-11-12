import { post, remove, get, put } from '../apiCaller'
import { OrderFormValues } from '@/pages/tickets'

const MyOrder = {
  getOrder: async (orderId: string) => {
    const endpoint = `/orders/${orderId}`

    // try {
    const response = await get(endpoint)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  },

  createOrder: async (data: OrderFormValues) => {
    const endpoint = `/orders/`

    // try {
    const response = await post(endpoint, data)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  },

  updateOrderStatus: async (orderId: string, status: string, isUsed?: boolean) => {
    const endpoint = `/orders/${orderId}`

    // try {
    let bodyData
    if (!isUsed) bodyData = { status }
    else bodyData = { status, isUsed }

    const response = await put(endpoint, bodyData)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  },

  deleteOrder: async (orderId: string) => {
    const endpoint = `/orders/${orderId}`

    // try {
    const response = await remove(endpoint)

    return response
    // } catch (error: AxiosError) {
    //   console.log('Error code:', error.response)

    //   return error.response
    // }
  }
}
export default MyOrder
