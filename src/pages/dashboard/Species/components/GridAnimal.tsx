import { Animal } from '@/types'
import { Table } from '@tanstack/react-table'
import { EyeIcon } from 'lucide-react'
import Lin from '@/assets/image14.png'
import React from 'react'
import { Link } from 'react-router-dom'

const GridAnimal: React.FC<{
  data: Table<Animal>
}> = ({ data }) => {
  const addDefaultImg = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = ev.target as HTMLImageElement
    target.src = Lin
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pr-2'>
      {data.getRowModel().rows.map((row) => {
        return (
          <div className='w-full shadow-md flex justify-start align-middle border-2 rounded-[0.5rem] gap-2 overflow-hidden '>
            <img
              className='h-full w-4/12 object-cover border-r-4 border-dashed border-black'
              src={`${row.original?.imageList[0]}`}
              onError={addDefaultImg}
              alt=''
            />

            <div className='p-4'>
              <Link to={`/dashboard/animals/${row.original.id}`}>
                <h3 className='font-bold text-2xl flex items-center gap-3 uppercase'>
                  {row.original.name} <EyeIcon className='text-5xl text-primary' />
                </h3>
              </Link>
              <p className='  pt-2 text-sm'>{row.original.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GridAnimal
