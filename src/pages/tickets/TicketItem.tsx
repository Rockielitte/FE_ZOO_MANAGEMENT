import TicketCounter from '@/components/TicketCounter'
import { Order, Ticket } from '@/types'
import React from 'react'

const TicketItem: React.FC<{ ticket: Ticket; order: Order; setOrder: React.Dispatch<React.SetStateAction<Order>> }> = ({
  ticket,
  order,
  setOrder
}) => {
  return (
    <div key={ticket.id} className='flex w-full gap-4 justify-between items-center'>
      <input type='checkbox' value='' className='w-5 h-5' />
      <div className='rounded-lg p-2 flex-1 bg-white text-black flex items-center px-4 gap-4'>
        <img src='/src/assets/logo.webp' alt='' className='bg-black w-16 rounded-full px-1 py-2' />
        <div className='flex flex-col gap-2 flex-1 p-2'>
          <p className='text-2xl '>{ticket.name} Ticket</p>
          <p className='  text-lg'>{ticket.description}</p>
        </div>
        <p className='font-bold  text-3xl'>{ticket.price}$</p>
      </div>
      <TicketCounter order={order} setOrder={setOrder} ticket={ticket} />
    </div>
  )
}

export default TicketItem
