import React from 'react'
import { Table } from '@tanstack/react-table'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { AiFillDelete } from 'react-icons/ai'
import { IoMdColorFilter } from 'react-icons/io'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Label } from '../ui/label'
import { DebouncedInput } from './Data-table'
type Props<TData> = {
  table: Table<TData>
}

export function Filter<TData>({ table }: Props<TData>) {
  const columnFiter = table.getAllColumns().filter((col) => {
    return col.getCanFilter()
  })

  return (
    <div className='flex flex-col  gap-4 p-4  w-screen max-w-sm h-sceen max-h-80 overflow-auto'>
      {columnFiter.map((col) => (
        <div key={col.id} className='w-full flex items-center justify-between gap-4'>
          <Label htmlFor={col.id} className='capitalize min-w-[100px]'>
            <Button className='w-full uppercase text-xs font-bold flex gap-2 p-1  items-center'>
              <IoMdColorFilter className='text-xl'></IoMdColorFilter>
              {col.id}
            </Button>
          </Label>
          <DebouncedInput
            value={(col.getFilterValue() ?? '') as string | number}
            onChange={(value) => {
              col.setFilterValue(value as string | number)
            }}
            id={col.id}
            className='flex-1 text-sm'
            placeholder={
              col.id == 'dob'
                ? `Format YY-MM-DD . . . (${col.getFacetedUniqueValues().size})`
                : `Seach your ${col.id} here . . . (${col.getFacetedUniqueValues().size})`
            }
          />
        </div>
      ))}
    </div>
  )
}

export default Filter
