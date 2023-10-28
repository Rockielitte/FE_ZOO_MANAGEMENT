import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  RowData,
  Row,
  Table
} from '@tanstack/react-table'

import { ReactComponentElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { BsFillCalendar2WeekFill } from 'react-icons/bs'

import { SelectSingleEventHandler } from 'react-day-picker'
import { AiFillDelete } from 'react-icons/ai'
import { getFacetedUniqueValues } from '@tanstack/react-table'
import { getFacetedRowModel } from '@tanstack/react-table'

import clsx from 'clsx'

import { BiFilterAlt } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoMdCreate } from 'react-icons/io'

import { useQueryClient } from 'react-query'
import { request } from '@/utils/apiCaller'
import { useUserStore } from '@/stores'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import Filter from './testTable/Filter'
import { DataTablePagination } from './testTable/Pagination'
import ModalForm, { PropsFormModal } from './ModalForm'
import { FieldValues } from 'react-hook-form'

type DataTableProps<TData, TValue, X, T extends FieldValues> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  GridBox: React.FC<{ data: Table<TData> }>
  form?: PropsFormModal<X, T>
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}
export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value != initialValue) onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}

export function GridShow<TData, TValue, X, T extends FieldValues>({
  columns,
  data,
  GridBox,
  form
}: DataTableProps<TData, TValue, X, T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [tableData, setTableData] = useState(data)
  const navigate = useNavigate()
  useEffect(() => {
    setTableData(data)
  }, [data])
  const table = useReactTable({
    data: tableData,
    columns,
    // defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,

      globalFilter
    },

    // Provide our updateData function to our table meta
    debugTable: true
  })
  // console.log(isLoading, 'loadie')

  return (
    <div className='w-full h-full flex flex-col '>
      <div className='flex items-center py-2 gap-2 '>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className='max-w-md'
          placeholder='Search all columns...'
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={'outline'} className='flex gap-2 items-center'>
              <BiFilterAlt /> More filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='backdrop-blur-xl bg-transparent border-transparent shadow-lg py-3'>
            <Filter table={table} />
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='ml-auto transition-all'>{form && <ModalForm {...form} />}</div>
      </div>

      <div className='flex-1 overflow-auto border rounded-md '>
        <div className='flex-1 w-full h-full p-1'>
          {table.getRowModel().rows?.length ? (
            <div className='w-full h-full'>{<GridBox data={table} />}</div>
          ) : (
            <div className='h-24 text-center w-full'>No results.</div>
          )}
        </div>
      </div>
      {<DataTablePagination table={table} />}
    </div>
  )
}
