import { get, post } from '../apiCaller'

const Payment = {
  createPaymentURL: async (orderId: string) => {
    const endpoint = `/payment/?orderId=${orderId}`

    // try {
    const response = await get(endpoint)
    console.log('response: ', response)

    return response
  },

  isValidReturnUrl: async (url: string) => {
    const endpoint = `/payment/is-valid-return-url`

    // try {
    const response = await post(endpoint, { url })
    console.log('response: ', response)

    return response
  }
}

export default Payment
