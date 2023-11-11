import TicketCounter from '@/components/TicketCounter'
import { OrderBeforeSaving, Ticket } from '@/types'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Icons } from '@/components/Icon'
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
  order: OrderBeforeSaving
  setOrder: React.Dispatch<React.SetStateAction<OrderBeforeSaving>>
}> = ({ ticket, order, setOrder, form }) => {
  return (
    <div key={ticket.id} className='flex w-full gap-4 justify-between items-center mb-4'>
      <div className='rounded-lg p-2 flex-1 bg-white text-black flex items-center px-4 gap-4'>
        <Icons.darkLogo className='w-24 ' />
        <div className='flex flex-col gap-2 flex-1 p-4'>
          <p className='xl:text-2xl text-lg font-bold '>{ticket.name} </p>
          <p className='  xl:text-lg text-md  '>{ticket.description}</p>
        </div>
        <p className='font-bold  xl:text-3xl text-lg'>{ticket.price} VND</p>
      </div>
      <TicketCounter form={form} order={order} setOrder={setOrder} ticket={ticket} />
    </div>
  )
}

export default TicketItem
