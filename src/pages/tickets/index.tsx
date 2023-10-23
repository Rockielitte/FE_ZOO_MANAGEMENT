import TicketCounter from '@/components/TicketCounter'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
const DemoPage = () => {
  const [date, setDate] = useState<Date>()
  const [order, setOrder] = useState({})
  return (
    <>
      <div className='flex flex-col lg:flex-row gap-4 h-screen w-screen justify-around items-center p-2 '>
        <div className='w-full lg:w-5/12 bg-[#30AF21] rounded-lg min-h-[200px] flex flex-col gap-4 justify-center py-4 px-4'>
          <p className='text-3xl text-white flex font-bold justify-center text-background font-ime'>Ticket Type</p>
          <div className='flex w-full gap-4 justify-between items-center'>
            <input type='checkbox' value='' className='w-5 h-5' />
            <div className='rounded-lg p-2 flex-1 bg-white text-black flex items-center px-4 gap-4'>
              <img src='/src/assets/logo.webp' alt='' className='bg-black w-16 rounded-full px-1 py-2' />
              <div className='flex flex-col gap-2 flex-1 p-2'>
                <p className='text-2xl '>Adult Ticket</p>
                <p className='  text-lg'>For people above 12 years old</p>
              </div>
              <p className='font-bold  text-3xl'>20$</p>
            </div>
            <TicketCounter />
          </div>
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
          <hr className='border-[#30AF21] ' />
          <div className='flex flex-col'>
            <div className='w-full flex'>
              <p className='flex-1 opacity-50'>Ticket</p>
              <p className='flex-1 text-center opacity-50'>Single price</p>
              <p className='flex-1 text-center opacity-50'>Quantity</p>
              <p className='flex-1 opacity-50 text-right'>Total </p>
            </div>
            <div className='w-full flex mt-3'>
              <p className='flex-1 font-bold '>ADULT</p>
              <p className='flex-1 text-center font-bold'>13000</p>
              <p className='flex-1 text-center font-bold'>10</p>
              <p className='flex-1 font-bold text-right'>130000 </p>
            </div>
            <div className='w-full flex mt-3'>
              <p className='flex-1 font-bold '>CHILD</p>
              <p className='flex-1 text-center font-bold'>10000</p>
              <p className='flex-1 text-center font-bold'>4</p>
              <p className='flex-1 font-bold text-right'>40000 </p>
            </div>
            <hr className='border-[#30AF21] ' />
            <div className='w-full flex mt-3'>
              <p className='flex-1 font-bold '></p>
              <p className='flex-1 text-center'></p>
              <p className='flex-1 text-center font-bold'>14</p>
              <p className='flex-1 text-right font-bold'>200000</p>
            </div>
          </div>
          <Button>Checkout</Button>
        </div>
      </div>
    </>
  )
}

export default DemoPage
