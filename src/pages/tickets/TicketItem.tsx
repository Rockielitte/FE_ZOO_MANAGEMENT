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
    <div
      key={ticket.id}
      className='flex w-full gap-4 justify-between items-center shadow-lg border b border-foreground rounded-lg  bg-background text-foreground p-3'
    >
      <div className='w-2/12 bg-primary rounded-lg h-full border-x-2 border-dashed'>
        <Icons.whiteLogo className='w-full h-full object-cover' />
      </div>
      <div className='flex flex-col gap-1 flex-1'>
        <p className='xl:text-2xl text-lg font-bold truncate'>{ticket.name} </p>
        <p className='  text-sm text-muted-foreground truncate-4'>{ticket.description}</p>
        <TicketCounter form={form} order={order} setOrder={setOrder} ticket={ticket} />
      </div>
      <p className='font-bold '>
        {ticket.price.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND'
        })}
      </p>
    </div>
  )
}

export default TicketItem
