import { Area } from '@/types'
import { Table } from '@tanstack/react-table'
import React from 'react'
import AreaTag from './AreaTag'

const GridArea: React.FC<{
  data: Table<Area>
}> = ({ data }) => {
  return (
    <div className='md:grid-cols-2 w-full  grid grid-cols-1 overflow-auto gap-8 '>
      {data.getRowModel().rows.map((row) => (
        <AreaTag row={row} key={row.getValue('id')} />
      ))}
    </div>
  )
}

export default GridArea
