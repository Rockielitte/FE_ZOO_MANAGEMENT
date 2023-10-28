import { Cage } from '@/types'
import { Table } from '@tanstack/react-table'
import React from 'react'
import CageTag from './CageTag'

const GridCage: React.FC<{
  data: Table<Cage>
}> = ({ data }) => {
  return (
    <div className='md:grid-cols-2 w-full  grid grid-cols-1 overflow-auto gap-8 '>
      {data.getRowModel().rows.map((row) => (
        <CageTag row={row} />
      ))}
    </div>
  )
}

export default GridCage
