import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { OrderFormValues } from '.'
import MyOrder from '@/utils/api/MyOrder'
import { OrderBeforeSaving } from '@/types'
import Payment from '@/utils/api/Payment'
import { Icons } from '@/components/Icon'
import { PiPaypalLogoBold } from 'react-icons/pi'
const today = new Date()
today.setHours(0, 0, 0, 0)
const OrderForm: React.FC<{
  form: UseFormReturn<{
    name: string
    details: {
      ticketId: number
      quantity: number
    }[]
    email: string
    phone: string
    visitDate: Date
  }>
  order: OrderBeforeSaving
  setOrder: React.Dispatch<React.SetStateAction<OrderBeforeSaving>>
}> = ({ order, setOrder, form }) => {
  const [formData, setFormData] = useState<OrderFormValues>({
    email: '',
    phone: '',
    name: '',
    visitDate: new Date(),
    details: []
  })

  async function onSubmit(data: OrderFormValues) {
    const total = order.details.reduce((total, detail) => total + detail.quantity * detail.ticketPrice, 0)
    const { name, email, phone, visitDate } = data
    setOrder({ ...order, name, email, phone, visitDate, total })
    setFormData(data)
  }
  const [loading, setLoading] = useState<boolean>(false)
  async function createOrderHandler() {
    setLoading(true)
    const response = await MyOrder.createOrder(formData)
    localStorage.setItem('order', JSON.stringify(response.data))

    if (response.status == 200 && typeof response.data == 'object') {
      const url = (await Payment.createPaymentURL(JSON.parse(localStorage.getItem('order') as string).id))
        .data as string
      setLoading(false)
      localStorage.setItem('order', JSON.stringify({ ...response.data, url }))

      window.location.href = url
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 text-foreground'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <Label className='text-white'>Name</Label>
              <FormControl>
                <Input placeholder='Your Name' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage className='capitalize px-2 text-lg text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <Label className='text-white'>Email</Label>
              <FormControl>
                <Input placeholder='Your Email' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage className='capitalize px-2 text-lg text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <Label className='text-white'>Phone</Label>
              <FormControl>
                <Input placeholder='Your phone' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage className='capitalize px-2 text-lg text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='visitDate'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <Label className='text-white'>Visit date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < today}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className='capitalize px-1 text-lg text-red-400' />
            </FormItem>
          )}
        />
        <br />
        {!form.formState.isValid ? (
          <Button className='w-full text-white uppercase text-xl font-bold flex gap-2 items-center' type='submit'>
            <PiPaypalLogoBold />
            Check out
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type='submit'
                className='w-full text-white uppercase text-xl font-bold flex gap-2 items-center'
                variant='outline'
              >
                <PiPaypalLogoBold />
                Check out
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:min-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Confirm Order</DialogTitle>
                <DialogDescription>Click pay when you are done</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input id='name' defaultValue={form.getValues('name')} className='col-span-3' readOnly />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='email' className='text-right'>
                    Email
                  </Label>
                  <Input id='email' defaultValue={form.getValues('email')} className='col-span-3' readOnly />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='phone' className='text-right'>
                    Phone
                  </Label>
                  <Input id='phone' defaultValue={form.getValues('phone')} className='col-span-3' readOnly />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='visitDate' className='text-right'>
                    Visit date
                  </Label>
                  <Input
                    id='visitDate'
                    defaultValue={format(order.visitDate, 'yyyy/MM/dd')}
                    className='col-span-3'
                    readOnly
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='details' className='text-right'>
                    Details
                  </Label>
                </div>
                {order.details.map((detail) => (
                  <div className='grid grid-cols-5'>
                    <p></p>
                    <p className='font-bold col-span-2'>
                      {detail.quantity} x {detail.ticketName}
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
                    {Math.round(order.total).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => createOrderHandler()} type='button' disabled={loading}>
                  {loading ? <Icons.loadingSpin className='mr-2 h-4 w-4 animate-spin' /> : 'Pay'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <FormField
          control={form.control}
          name='details'
          render={() => (
            <FormItem className='mb-3'>
              <FormMessage className='capitalize px-2 text-lg text-red-400' />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default OrderForm
