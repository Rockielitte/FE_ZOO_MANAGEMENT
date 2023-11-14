import { OrderDetailBeforeSaving } from '@/types'
import React from 'react'
const OrderRow: React.FC<{ detail: OrderDetailBeforeSaving }> = ({ detail }) => {
  return (
    <div className='w-full flex mt-3 text-slate-300'>
      <p className='flex-1 font-bold '>{detail.ticketName}</p>
      <p className='flex-1 text-center font-bold'>
        {detail.ticketPrice.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND'
        })}
      </p>
      <p className='flex-1 text-center font-bold'>{detail.quantity}</p>
      <p className='flex-1 font-bold text-right'>
        {Math.round(detail.quantity * detail.ticketPrice).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND'
        })}
      </p>
    </div>
  )
}

export default OrderRow
