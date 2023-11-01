import { dataSpecies } from '@/types'
import { Table } from '@tanstack/react-table'

import { Separator } from '@/components/ui/separator'
import { LandmarkIcon } from 'lucide-react'

import React from 'react'
import { Link } from 'react-router-dom'

const GridCage: React.FC<{
  data: Table<dataSpecies>
}> = ({ data }) => {
  return (
    <div className='grid grid-cols-2 gap-10 justify-center items-center p-7'>
      {data.getRowModel().rows.map((row) => {
        console.log('row cage: ', row.original)
        return (
          <Link to={`/dashboard/cages/${row.original.id}`}>
            <div className='box-content w-full min-h-[150px] border-4 rounded-[1rem] flex flex-col'>
              <div className='bg-slate-100 dark:bg-slate-800 p-4 flex justify-between gap-4'>
                <div className='flex justify-between gap-4'>
                  <div className='p-4 bg-white dark:bg-slate-600 flex justify-center items-center'>
                    <LandmarkIcon />
                  </div>
                  <div>
                    <h3 className='font-normal text-4xl '>{row.original.code}</h3>
                    <p className='font-extralight'>
                      Managed By:{' '}
                      {row.original.managedBy
                        ? row.original.managedBy?.fname + ' ' + row.original.managedBy?.lname
                        : 'unknown'}
                    </p>
                  </div>
                </div>
                <div className='p-4 justify-self-end'>{/* <LucideMoreHorizontal /> */}</div>
              </div>
              <Separator />
              <div className='truncate-4  p-7'>
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
