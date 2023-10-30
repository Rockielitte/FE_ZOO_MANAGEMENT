import { Ticket } from '@/types'
import { Table } from '@tanstack/react-table'
import React from 'react'

import TicketTag from './TicketTag'

const GridTicket: React.FC<{
  data: Table<Ticket>
}> = ({ data }) => {
  return (
    <div className='md:grid-cols-2 w-full  grid grid-cols-1 overflow-auto gap-8 '>
      {data.getRowModel().rows.map((row) => (
        <TicketTag row={row} key={row.getValue('id')} />
      ))}
    </div>
  )
}

export default GridTicket
