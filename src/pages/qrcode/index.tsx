import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Order, OrderStatusEnum } from '@/types'
import MyOrder from '@/utils/api/MyOrder'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { toast } from 'react-toastify'
import bg from '@/assets/background/FullBg.png'
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
    <div
      className='w-screen h-screen flex items-center bg-cover  overflow-auto p-2'
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      <div className=' p-8 w-full h-full items-center flex gap-8   lg:gap-20 flex-col lg:flex-row lg:justify-around'>
        <div className='flex flex-col lg:w-1/2 gap-2 w-full h-full items-center justify-between backdrop-blur-md   border-4 border-white shadow-xl p-2 rounded-lg'>
          <Button className='w-full uppercase text-xl text-white'>QR Code Scan</Button>

          <QrReader
            className='w-3/5 h-auto object-cover'
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

          <div className='text-lg text-black p-2 rounded-md shadow-lg font-medium bg-primary w-full'>
            <Label className='uppercase text-white '>Scanned Code: </Label>
            {data && <Textarea className='text-[16px]' value={data} />}
          </div>
        </div>
        <div className='lg:w-1/2 w-full border-4 border-white shadow-xl p-2 rounded-lg backdrop-blur-md'>
          <Button className='w-full uppercase text-xl text-white'>ORDER</Button>
          {error && <Button className='mt-[10px] bg-red-500 text-white hover:bg-red-500 uppercase'>{error}</Button>}
          <div className='rounded-lg mt-[20px] w-full px-[20px] py-[30px] border-solid border-2 min-h-[500px] '>
            {order && (
              <div className=' lg:flex w-full h-full flex-col gap-2 text-white'>
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
    </div>
  )
}

export default Qrcode
