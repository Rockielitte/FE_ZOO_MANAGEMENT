import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Order, OrderStatusEnum } from '@/types'
import MyOrder from '@/utils/api/MyOrder'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { toast } from 'react-toastify'
const Qrcode = () => {
  const [data, setData] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [order, setOrder] = useState<Order | null>(null)

  const clear = () => {
    setData('')
    setError('')
    setOrder(null)
  }

  const confirm = () => {
    MyOrder.updateOrderStatus(data, 'DONE', true)
    toast.success('Confirm ticket successfully!!')
    clear()
  }

  const isToday = (visitDate: Date): boolean => {
    const currentDate = new Date()
    return (
      visitDate.getFullYear() == currentDate.getFullYear() &&
      visitDate.getMonth() === currentDate.getMonth() &&
      visitDate.getDate() === currentDate.getDate()
    )
  }

  const handleResult = async (orderId: string) => {
    try {
      clear()
      setData(orderId)
      const res = await MyOrder.getOrder(orderId)
      const order = res.data as Order
      const visitDate = new Date(order.visitDate)
      if (order.status != OrderStatusEnum.DONE) setError('This ticket is not approved')
      else if (!isToday(visitDate)) setError('The visit date is not today')
      else if (order.used) setError('This ticket was used')
      setOrder(order)
    } catch (error) {
      setError('Ticket not found')
    }
  }

  return (
    <div className='flex flex-col lg:flex-row justify-around'>
      <div className='basis-[40%]'>
        <Button className='w-full'>QR Code Scan</Button>
        <QrReader
          className='w-[100%] mt-[-50px]'
          scanDelay={500}
          onResult={(result, error) => {
            if (result) {
              handleResult(result?.getText())
            }
            if (error) {
              console.info(error)
            }
          }}
          constraints={{ facingMode: 'environment' }}
        />
        <div className='text-lg mt-[-50px] text-[#16A34A] font-medium'>
          <Label>Scanned Code: </Label>
          {data && <Textarea className='text-[16px]' value={data} />}
        </div>
      </div>
      <div className='basis-[30%]'>
        <Button className='w-full'>ORDER</Button>
        {error && <Button className='mt-[10px] bg-red-500 text-white hover:bg-red-500'>{error}</Button>}
        <div className='rounded-lg mt-[20px] w-full px-[20px] py-[30px] border-solid border-2 min-h-[500px] '>
          {order && (
            <div className='flex w-full h-full flex-col gap-2'>
              <Label>ID</Label>
              <Input className='text-[#16A34A]' value={order.id} />
              <Label>Status</Label>
              <Input className='text-[#16A34A]' value={order.status} />
              <Label>Name</Label>
              <Input className='text-[#16A34A]' value={order.name} />
              <Label>Email</Label>
              <Input className='text-[#16A34A]' value={order.email} />
              <Label>Vist date</Label>
              <Input className='text-[#16A34A]' value={order.visitDate.split('T')[0]} />
              <Label>Ticket</Label>
              {order.details.map((detail) => {
                return (
                  <Input className='mb-[5px] text-[#16A34A]' value={detail.quantity + ' x ' + detail.ticket.name} />
                )
              })}
              <div className='flex gap-10'>
                <Button className='flex-1 float-left bg-gray-500 hover:bg-red-500' onClick={() => clear()}>
                  Cancel
                </Button>
                {!error && (
                  <Button className='flex-1 float-right' onClick={() => confirm()}>
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Qrcode
