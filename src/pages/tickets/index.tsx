import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import BgBlog from '@/assets/background/SWP.png'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import z from 'zod'
import { ExistOrder, OrderBeforeSaving, Ticket } from '@/types'
import axios, { AxiosResponse } from 'axios'
import { useUserStore } from '@/stores'
import { useQuery } from 'react-query'
import { request } from '@/utils/apiCaller'
import TicketItem from './TicketItem'
import OrderRow from './OrderRow'
import LoadingScreen from '@/components/Loading'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import OrderForm from './OrderForm'
import MyOrder from '@/utils/api/MyOrder'
import Payment from '@/utils/api/Payment'

const today = new Date()
today.setHours(0, 0, 0, 0)
const phoneRegex = /(84|0[35789])+([0-9]{8})\b/
const formOrderDetailSchema = z.object({
  ticketId: z.number(),
  quantity: z.number().min(1)
})
const formOrderSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email'
    })
    .email({
      message: 'Invalid email'
    }),
  phone: z
    .string({
      required_error: 'Please enter your phone'
    })
    .regex(phoneRegex, 'your phone number is invalid'),
  name: z
    .string({
      required_error: 'Please enter your name'
    })
    .min(3, {
      message: 'Name must be at least 3 characters.'
    })
    .max(100, {
      message: 'Name must not be longer than 30 characters.'
    }),
  visitDate: z
    .date({
      required_error: 'Please enter visit date'
    })
    .min(today, {
      message: 'Visit date must be today or in the future'
    }),
  details: z.array(formOrderDetailSchema).refine((val) => val.length > 0, {
    message: 'Please choose at least one ticket'
  })
})
export type OrderFormValues = z.infer<typeof formOrderSchema>

const DemoPage = () => {
  const existOrderString: string | null = localStorage.getItem('order')
  const existOrder: ExistOrder = existOrderString ? JSON.parse(existOrderString) : null
  if (existOrder) {
    existOrder.createdAt = new Date(existOrder.createdAt)
    existOrder.visitDate = new Date(existOrder.visitDate)
  }
  const [showDialog, setShowDialog] = useState(false)
  useEffect(() => {
    async function checkOrderExist() {
      if (!existOrder) return
      if (existOrder.createdAt.getTime() < new Date().getTime() - 15 * 60 * 1000) {
        await MyOrder.deleteOrder(existOrder.id)
        localStorage.removeItem('order')
      } else {
        setShowDialog(true)
      }
    }
    checkOrderExist()
  }, [])
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formOrderSchema),
    defaultValues: {
      email: '',
      phone: '',
      name: '',
      details: []
    }
  })

  const cancelOrder = async () => {
    await MyOrder.deleteOrder(existOrder.id)
    localStorage.removeItem('order')
    setShowDialog(false)
  }

  const token = useUserStore((state) => state.user)?.token
  const [order, setOrder] = useState<OrderBeforeSaving>({
    email: '',
    phone: '',
    name: '',
    total: 0,
    visitDate: new Date(),
    details: []
  })
  const tickets = useQuery<AxiosResponse<Ticket[]>, unknown, Ticket[]>({
    queryKey: ['tickets'],
    queryFn: () => {
      return request<Ticket[]>('/tickets/?status=ACTIVE', 'GET', {
        Authorization: `Bearer ${token} `
      })
    },
    onSuccess: () => {},
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
      }
    },
    select: (data) => {
      return data.data
    }
  })

  async function processToPaymentUrl() {
    const url = (await Payment.createPaymentURL(JSON.parse(localStorage.getItem('order') as string).id)).data as string

    window.location.href = url
  }

  return (
    <div className='w-full relative '>
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className='sm:min-w-[425px]'>
            <DialogHeader>
              <DialogTitle>
                Order <span className='text-[#30AF21]'>{existOrder.id}</span> is unpaid
              </DialogTitle>
              <DialogDescription>Click pay when you are done</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' defaultValue={existOrder.name} className='col-span-3' readOnly />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='email' className='text-right'>
                  Email
                </Label>
                <Input id='email' defaultValue={existOrder.email} className='col-span-3' readOnly />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='phone' className='text-right'>
                  Phone
                </Label>
                <Input id='phone' defaultValue={existOrder.phone} className='col-span-3' readOnly />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='visitDate' className='text-right'>
                  Visit date
                </Label>
                <Input
                  id='visitDate'
                  defaultValue={format(existOrder.visitDate, 'yyyy/MM/dd')}
                  className='col-span-3'
                  readOnly
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='details' className='text-right'>
                  Details
                </Label>
              </div>
              {existOrder.details.map((detail) => (
                <div className='grid grid-cols-5'>
                  <p></p>
                  <p className='font-bold col-span-2'>
                    {detail.quantity} x {detail.ticket.name}
                  </p>
                  <p className='font-bold text-right'>
                    {Math.round(detail.quantity * detail.ticketPrice).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </p>
                </div>
              ))}
              <hr className='border-[#30AF21]' />
              <div className='grid grid-cols-5'>
                <p className='col-span-3'></p>
                <p className='font-bold text-right'>
                  {Math.round(existOrder.total).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </p>
              </div>
            </div>
            <DialogFooter>
              <div className='flex justify-between w-full'>
                <Button
                  onClick={() => cancelOrder()}
                  type='submit'
                  className='text-black bg-[#e6e3e3] hover:bg-[#e6e3e3]'
                >
                  Cancel
                </Button>
                <Button onClick={() => processToPaymentUrl()} type='submit'>
                  Pay
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <div className='relative z-4 flex w-full min-h-screen  backdrop-blur-lg'>
        <img src={BgBlog} alt='background' className='fixed bg-repeat-y z-2 object-cover min-h-full  ' />
        <div className=' relative w-full  z-10 mt-32 min-h-screen  '>
          <div className='sm:px-8 mt-20 min-h-screen '>
            <div className=' w-full flex  xsm:flex-col lg:flex-row lg:px-8 justify-center xsm:items-center lg:items-start gap-10 pb-8'>
              {/* ticket list here  */}
              <div className='border-4 border-double border-white w-fit lg:w-5/12 bg-[#052e16]  h-[600px] rounded-xl shadow-2xl flex flex-col gap-4 justify-center mb-5  py-4  px-4'>
                <p className='text-3xl text-white flex font-bold justify-center text-background font-ime'>
                  Ticket Type
                </p>

                <div className='flex-1 px-2  w-full flex flex-col overflow-auto gap-4'>
                  {tickets.isLoading ? (
                    <LoadingScreen />
                  ) : tickets.data?.length == 0 ? (
                    <div> data is empty</div>
                  ) : (
                    tickets.data?.map((ticket) => (
                      <TicketItem form={form} ticket={ticket} order={order} setOrder={setOrder} />
                    ))
                  )}
                </div>
              </div>
              {/* ticket list here  */}

              {/* Order   here  */}
              <div className='w-full  h-[600px] overflow-auto lg:w-5/12 rounded-xl text-white border-4 border-double relative   border-white bg-[#052e16] flex flex-col gap-4 '>
                <p className='text-3xl text-white flex font-bold justify-center text-background font-ime sticky top-0 backdrop-blur-xl p-2 py-4'>
                  Order Information
                </p>
                <OrderForm form={form} order={order} setOrder={setOrder} />

                {order.details.length > 0 && <hr className='border-[#30AF21] mt-3' />}
                <div className='flex flex-col flex-1 p-2 px-4'>
                  {order.details.length > 0 && (
                    <div className='w-full flex mt-3 text-slate-300'>
                      <p className='flex-1 opacity-50'>Ticket</p>
                      <p className='flex-1 text-center opacity-50'>Single price</p>
                      <p className='flex-1 text-center opacity-50'>Quantity</p>
                      <p className='flex-1 opacity-50 text-right'>Total </p>
                    </div>
                  )}
                  {order.details.length > 0 && (
                    <div className='h-40 w-full overflow-auto p-2'>
                      {' '}
                      {order.details.map((detail) => (
                        <OrderRow detail={detail} />
                      ))}
                    </div>
                  )}
                  {order.details.length > 0 && <hr className='border-[#30AF21] mt-3' />}
                  {order.details.length > 0 && (
                    <div className='w-full flex mt-3 text-slate-300'>
                      <p className='flex-1 font-bold '></p>
                      <p className='flex-1 text-center'></p>
                      <p className='flex-1 text-center font-bold'>
                        {Math.round(order.details.reduce((acc, detail) => acc + detail.quantity, 0))}
                      </p>
                      <p className='flex-1 text-right font-bold'>
                        {Math.round(
                          order.details.reduce((acc, detail) => acc + detail.quantity * detail.ticketPrice, 0)
                        ).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Order   here  */}
            </div>
          </div>
        </div>
      </div>
      )
    </div>
  )
}

export default DemoPage
