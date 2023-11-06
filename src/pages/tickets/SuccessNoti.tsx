import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Order } from '@/types'
import MyOrder from '@/utils/api/MyOrder'
import Payment from '@/utils/api/Payment'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessNoti = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('example@gmail.com')
  const [orderId, setOrderId] = useState<string>('example@ID')
  const [isValidReturnUrl, setIsValidReturnUrl] = useState<boolean>(false)

  const navigate = useNavigate()

  const search = useLocation().search

  const handleCloseDialog = () => {
    setOpen(false)
    navigate('/')
  }

  useEffect(() => {
    // function getOrderId() {
    //   if (new URLSearchParams(search).get('vnp_TxnRef') as string) {
    //     setOrderId(new URLSearchParams(search).get('vnp_TxnRef') as string)
    //   }
    // }
    async function processOrderValid() {
      try {
        const url = window.location.href
        const response = await Payment.isValidReturnUrl(url)
        if (response.data) {
          const orderIdOnParams = new URLSearchParams(search).get('vnp_TxnRef') as string
          if (orderIdOnParams) {
            const response = await MyOrder.getOrder(orderIdOnParams)

            setEmail(response.data.email)

            setOrderId(new URLSearchParams(search).get('vnp_TxnRef') as string)

            setIsValidReturnUrl(true)

            const orderString = localStorage.getItem('order')
            if (orderString) {
              const order = JSON.parse(orderString) as Order
              if (orderIdOnParams == order.id) {
                await MyOrder.updateOrderStatus(orderIdOnParams, 'DONE')
                localStorage.removeItem('order')
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    // async function updateOrderStatus() {
    //   const orderIdOnParams = new URLSearchParams(search).get('vnp_TxnRef') as string

    //   const orderString = localStorage.getItem('order')
    //   if (orderString) {
    //     const order = JSON.parse(orderString) as Order

    //     if (orderIdOnParams && orderIdOnParams == order.id) {
    //       await MyOrder.updateOrderStatus(orderIdOnParams, 'DONE')
    //       localStorage.removeItem('order')
    //     }
    //   }
    // }

    // getOrderId()
    processOrderValid()
    // updateOrderStatus()
  }, [])
  return (
    <div className='h-screen flex items-center justify-center'>
      {isValidReturnUrl ? (
        <Dialog open={open} onOpenChange={() => handleCloseDialog()}>
          <DialogContent className='sm:max-w-[500px] min-h-[350px]'>
            <DialogHeader>
              <DialogTitle>Order successfully</DialogTitle>
              <DialogDescription>Order information will be sent to your email</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Order ID
                </Label>
                <Input value={orderId} id='name' defaultValue='Pedro Duarte' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Email
                </Label>
                <Input value={email} id='username' defaultValue='@peduarte' className='col-span-3' />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => handleCloseDialog()} type='submit'>
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={open} onOpenChange={() => handleCloseDialog()}>
          <DialogContent className='sm:max-w-[500px] min-h-[350px]'>
            <DialogHeader>
              <DialogTitle className='text-red-600'>Invalid Order</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Order ID
                </Label>
                <Input value={orderId} id='name' defaultValue='Pedro Duarte' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Email
                </Label>
                <Input value={email} id='username' defaultValue='@peduarte' className='col-span-3' />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => handleCloseDialog()} type='submit'>
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default SuccessNoti
