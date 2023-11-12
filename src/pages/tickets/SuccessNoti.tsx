import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Email from '@/utils/api/Email'
import MyOrder from '@/utils/api/MyOrder'
import Payment from '@/utils/api/Payment'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessNoti = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [isValidReturnUrl, setIsValidReturnUrl] = useState<boolean>(false)

  const navigate = useNavigate()

  const search = useLocation().search

  const handleCloseDialog = () => {
    setOpen(false)
    navigate('/')
  }

  useEffect(() => {
    async function processOrderValid() {
      try {
        const url = window.location.href
        const response = await Payment.isValidReturnUrl(url)
        if (response.data) {
          const orderIdOnParams = new URLSearchParams(search).get('vnp_TxnRef') as string
          if (orderIdOnParams) {
            Promise.all([Email.sendQrCode(orderIdOnParams), MyOrder.updateOrderStatus(orderIdOnParams, 'DONE')])

            setIsValidReturnUrl(true)

            localStorage.removeItem('order')
          }
        } else navigate('/')
      } catch (error) {
        console.log(error)
      }
    }

    processOrderValid()
  }, [])
  return (
    <div className='h-screen flex items-center justify-center'>
      {isValidReturnUrl && (
        <Dialog open={open} onOpenChange={() => handleCloseDialog()}>
          <DialogContent className='sm:max-w-[400px] min-h-[200px]'>
            <DialogHeader>
              <DialogTitle>Order successfully</DialogTitle>
              <DialogDescription>Order information will be sent to your email</DialogDescription>
            </DialogHeader>
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
