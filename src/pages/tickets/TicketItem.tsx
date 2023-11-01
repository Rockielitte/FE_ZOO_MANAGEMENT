import TicketCounter from '@/components/TicketCounter'
import { Order, Ticket } from '@/types'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

const TicketItem: React.FC<{
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
  ticket: Ticket
  order: Order
  setOrder: React.Dispatch<React.SetStateAction<Order>>
}> = ({ ticket, order, setOrder, form }) => {
  return (
    <div key={ticket.id} className='flex w-full gap-4 justify-between items-center'>
      <input type='checkbox' value='' className='w-5 h-5' />
      <div className='rounded-lg p-2 flex-1 bg-white text-black flex items-center px-4 gap-4'>
        <img src='/src/assets/logo.webp' alt='' className='bg-black w-16 rounded-full px-1 py-2' />
        <div className='flex flex-col gap-2 flex-1 p-2'>
          <p className='xl:text-2xl text-lg font-bold'>{ticket.name} Ticket</p>
          <p className='  xl:text-lg text-md'>{ticket.description}</p>
        </div>
        <p className='font-bold  xl:text-3xl text-lg'>{ticket.price}$</p>
      </div>
      <TicketCounter form={form} order={order} setOrder={setOrder} ticket={ticket} />
    </div>
  )
}

export default TicketItem
