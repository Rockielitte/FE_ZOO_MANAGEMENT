import { OrderDetail } from '@/types'
import React from 'react'
const OrderRow: React.FC<{ detail: OrderDetail }> = ({ detail }) => {
  return (
    <div className='w-full flex mt-3'>
      <p className='flex-1 font-bold '>{detail.ticketName}</p>
      <p className='flex-1 text-center font-bold'>{detail.ticketPrice}</p>
      <p className='flex-1 text-center font-bold'>{detail.quantity}</p>
      <p className='flex-1 font-bold text-right'>{Math.round(detail.quantity * detail.ticketPrice)}$ </p>
    </div>
  )
}

export default OrderRow
