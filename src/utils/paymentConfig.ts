import { format } from 'date-fns'
import qs from 'qs'
import cryptoJS from 'crypto-js'
// const { createHmac } = await import('node:crypto')
export class PaymentConfig {
  static vnp_PayUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'

  static vnp_ReturnUrl = 'http://localhost:8080/result-return'

  static vnp_TmnCode = 'S56HVL3J'

  static vnp_HashSecret = 'MSPLQJFWWYHOFXFHLGLSSVOVPBEYSEME'

  static vnp_apiUrl = 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction'

  public static async createPaymentUrl(total: number, orderId: string) {
    const date = new Date()
    const currentDate = format(date, 'yyyyMMddHHmmss')
    date.setMinutes(date.getMinutes() + 15)
    const expireDate = format(date, 'yyyyMMddHHmmss')

    let mapParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Amount: (total * 100).toString(),
      vnp_CreateDate: currentDate,
      vnp_ExpireDate: expireDate,
      vnp_CurrCode: 'USD',
      vnp_Locale: 'vn',
      vnp_IpAddr: '127.0.0.1',
      vnp_TxnRef: orderId,
      vnp_OrderType: 'other',
      vnp_OrderInfo: 'Pay+order+' + orderId,
      vnp_ReturnUrl: this.vnp_ReturnUrl
    }
    mapParams['vnp_Version'] = '2.1.0'
    mapParams['vnp_Command'] = 'pay'
    mapParams['vnp_TmnCode'] = this.vnp_TmnCode
    mapParams['vnp_Amount'] = (total * 100).toString()
    mapParams['vnp_CreateDate'] = currentDate
    mapParams['vnp_ExpireDate'] = expireDate
    mapParams['vnp_CurrCode'] = 'USD'
    mapParams['vnp_Locale'] = 'vn'
    mapParams['vnp_IpAddr'] = '127.0.0.1'
    mapParams['vnp_TxnRef'] = orderId
    mapParams['vnp_OrderType'] = 'other'
    mapParams['vnp_OrderInfo'] = 'Pay+order+' + orderId
    mapParams['vnp_ReturnUrl'] = this.vnp_ReturnUrl
    mapParams = Object.fromEntries(Object.entries(mapParams).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)))
    const signData = qs.stringify(mapParams, { encode: false })
    console.log(signData)
    // const signed = Base64.stringify(hmacSHA512(signData, this.vnp_HashSecret))
    // const hmac = crypto.createHmac('sha512', this.vnp_HashSecret)
    // const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
    // const hmac = cryptoJS.HmacSHA512(signData, this.vnp_HashSecret)
    // const signed = hmac.toString(cryptoJS.enc.Hex)
    const utf8SignData = cryptoJS.enc.Utf8.parse(signData)
    const utf8HashSecret = cryptoJS.enc.Utf8.parse(this.vnp_HashSecret)

    const hmac = cryptoJS.HmacSHA512(utf8SignData, utf8HashSecret)
    const signed = hmac.toString(cryptoJS.enc.Hex)
    // const signed = await this.generateHmac(encodeURIComponent(signData))
    mapParams['vnp_SecureHash'] = signed
    const url = this.vnp_PayUrl + '?' + qs.stringify(mapParams, { encode: false })
    return url
  }
  static async generateHmac(data: string) {
    const encoder = new TextEncoder()
    const encodedData = encoder.encode(data)
    const encodedKey = encoder.encode(encodeURIComponent(this.vnp_HashSecret))

    const cryptoKey = await crypto.subtle.importKey('raw', encodedKey, { name: 'HMAC', hash: 'SHA-512' }, false, [
      'sign'
    ])

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, encodedData)
    const hexSignature = Array.from(new Uint8Array(signature))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')

    return hexSignature
  }
}
