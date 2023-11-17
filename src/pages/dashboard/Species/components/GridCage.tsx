import { Cage } from '@/types'
import { Table } from '@tanstack/react-table'

import { Separator } from '@/components/ui/separator'
import { LandmarkIcon } from 'lucide-react'

import React from 'react'
import { Link } from 'react-router-dom'

const GridCage: React.FC<{
  data: Table<Cage>
}> = ({ data }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pr-2'>
      {data.getRowModel().rows.map((row) => {
        return (
          <Link to={`/dashboard/cages/${row.original.id}`}>
            <div className='box-content w-full min-h-[150px] border-2 rounded-lg shadow-xl flex flex-col'>
              <div className='bg-secondary p-4 flex justify-between gap-4'>
                <div className='flex justify-between gap-4 items-center'>
                  <LandmarkIcon className='p-2 bg-primary rounded-full  w-12 h-12 shadow-lg text-white' />
                  <div className='flex flex-col gap-2 items-start'>
                    <h3 className='font-bold text-2xl '>{row.original.code}</h3>
                    <h3 className='font-medium text-lg '>{row.original.name}</h3>
                    <p className='font-base text-sm'>
                      Managed By:{' '}
                      {row.original.managedBy
                        ? row.original.managedBy?.fname + ' ' + row.original.managedBy?.lname
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className='p-4 justify-self-end'>{/* <LucideMoreHorizontal /> */}</div>
              </div>
              <Separator />
              <div className='truncate-4  p-4'>
                <p>{row.original.description}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default GridCage
