import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import z from 'zod'
import { Order, Ticket } from '@/types'
import axios, { AxiosResponse } from 'axios'
import { useUserStore } from '@/stores'
import { useQuery } from 'react-query'
import { request } from '@/utils/apiCaller'
import TicketItem from './TicketItem'
import OrderRow from './OrderRow'
import LoadingScreen from '@/components/Loading'
const DemoPage = () => {
  const [date, setDate] = useState<Date>()
  const [order, setOrder] = useState<Order>({
    email: '',
    phone: '',
    name: '',
    total: 0,
    visitDate: new Date(),
    details: []
  })
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const phoneRegex = /(84|0[35789])+([0-9]{8})\b/
  const formOrderDetailSchema = z.object({
    ticketId: z.number(),
    quantity: z.number().min(1).max(99)
  })
  const formOrderSchema = z.object({
    email: z.string().email(),
    phone: z.string().regex(phoneRegex),
    name: z.string().min(1),
    total: z.number(),
    visitDate: z.date().min(today),
    details: z.array(formOrderDetailSchema)
  })
  const token = useUserStore((state) => state.user)?.token
  const tickets = useQuery<AxiosResponse<Ticket[]>, unknown, Ticket[]>({
    queryKey: ['tickets'],
    queryFn: () => {
      return request<Ticket[]>('/tickets/', 'GET', {
        Authorization: `Bearer ${token} `
      })
    },
    onSuccess: (data) => {
      console.log(tickets)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
      }
    },
    select: (data) => {
      return data.data
    }
  })

  return (
    <>
      <div className='flex flex-col lg:flex-row gap-4 h-screen w-screen justify-around items-center p-2 '>
        <div className='w-full lg:w-5/12 bg-[#30AF21] rounded-lg min-h-[200px] flex flex-col gap-4 justify-center py-4 px-4'>
          <p className='text-3xl text-white flex font-bold justify-center text-background font-ime'>Ticket Type</p>
          {tickets.isLoading ? (
            <LoadingScreen />
          ) : (
            tickets.data?.map((ticket) => <TicketItem ticket={ticket} order={order} setOrder={setOrder} />)
          )}
        </div>
        <div
          className='w-full lg:w-5/12 rounded-md min-h-[600px] flex flex-col gap-4 p-2 px-6 py-4'
          style={{ backgroundColor: 'rgba(48, 175, 33, 0.13)' }}
        >
          <p className='text-xl text-primary flex font-bold justify-center mt-5 font-ime uppercase'>
            Order Information
          </p>
          <form action=''>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor='name'>Name:</label>
              <input
                className='rounded w-full py-1 outline-none p-2'
                type='text'
                id='name'
                name='name'
                placeholder='Name'
              />
            </div>
            <div className='w-full flex flex-col gap-2 my-5'>
              <label htmlFor='name'>Email:</label>
              <input
                className='rounded w-full py-1 outline-none p-2'
                type='email'
                id='name'
                name='email'
                placeholder='Email'
              />
            </div>
            <div className='w-full gap-2 my-5'>
              <label htmlFor='name'>Visit date:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </form>
          {order.details.length > 0 && <hr className='border-[#30AF21] mt-3' />}
          <div className='flex flex-col'>
            {order.details.length > 0 && (
              <div className='w-full flex mt-3'>
                <p className='flex-1 opacity-50'>Ticket</p>
                <p className='flex-1 text-center opacity-50'>Single price</p>
                <p className='flex-1 text-center opacity-50'>Quantity</p>
                <p className='flex-1 opacity-50 text-right'>Total </p>
              </div>
            )}
            {order.details.length > 0 && order.details.map((detail) => <OrderRow detail={detail} />)}
            {order.details.length > 0 && <hr className='border-[#30AF21] mt-3' />}
            {order.details.length > 0 && (
              <div className='w-full flex mt-3'>
                <p className='flex-1 font-bold '></p>
                <p className='flex-1 text-center'></p>
                <p className='flex-1 text-center font-bold'>
                  {Math.round(order.details.reduce((acc, detail) => acc + detail.quantity, 0))}
                </p>
                <p className='flex-1 text-right font-bold'>
                  {Math.round(order.details.reduce((acc, detail) => acc + detail.quantity * detail.ticketPrice, 0))}
                </p>
              </div>
            )}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-primary text-white' variant='outline'>
                Check out
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Confirm Order</DialogTitle>
                <DialogDescription>Click pay when you are done</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' readOnly />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='email' className='text-right'>
                    Email
                  </Label>
                  <Input id='username' defaultValue='@peduarte' className='col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='visit-date' className='text-right'>
                    Visit date
                  </Label>
                  <Input id='visit date' defaultValue='@peduarte' className='col-span-3' />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit'>Pay</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default DemoPage
