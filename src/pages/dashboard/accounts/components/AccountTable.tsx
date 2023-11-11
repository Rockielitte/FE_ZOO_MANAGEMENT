/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
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
  RowData
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DataTablePagination } from '@/components/testTable/Pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { BsFillCalendar2WeekFill } from 'react-icons/bs'
import { Calendar } from '@/components/ui/calendar'
import { SelectSingleEventHandler } from 'react-day-picker'
import { AiFillDelete } from 'react-icons/ai'
import { getFacetedUniqueValues } from '@tanstack/react-table'
import { getFacetedRowModel } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
import Filter from '@/components/testTable/Filter'
import { BiFilterAlt } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { request } from '@/utils/apiCaller'
import { useUserStore } from '@/stores'
import CreateAccount from './CreateAccount'
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pathName?: string
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
export const defaultColumn = <T extends object>(type?: string, options?: string[]): Partial<ColumnDef<T>> => ({
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue() as string
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)
    const [date, setDate] = useState<Date>(new Date(initialValue))

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }
    // If the initialValue is changed externally, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return type == 'input' ? (
      <Input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
    ) : type == 'select' ? (
      <Select
        onValueChange={(e) => {
          table.options.meta?.updateData(index, id, e)
        }}
        value={value}
      >
        <SelectTrigger className='w-fit border-none'>
          <SelectValue placeholder='Select' />
        </SelectTrigger>
        <SelectContent defaultValue={value}>
          {options?.map((option, index) => (
            <SelectItem className='' value={option} key={option}>
              <Badge
                className={clsx(
                  'px-2 py-1 min-w-[80px] text-center flex justify-center gap-1 items-center uppercase ',
                  index == 0 && 'bg-green-400 ',
                  index == 1 && 'bg-yellow-400',
                  index == 2 && 'bg-red-400',
                  index == 3 && 'bg-slate-400'
                )}
              >
                {/* {option == 'Male' ? (
          <BsGenderMale className='text-xl'></BsGenderMale>
        ) :option == 'Female' ? (
          <BsGenderFemale className='text-xl'></BsGenderFemale>
        ) : (
          <IoMaleFemale className='text-xl'></IoMaleFemale>
        )} */}
                {option}
              </Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : type == 'date' ? (
      <Popover
        onOpenChange={() => {
          table.options.meta?.updateData(index, id, date)
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-[190px] justify-start text-left font-normal  ', !date && 'text-muted-foreground')}
          >
            <BsFillCalendar2WeekFill className='mr-2 h-4 w-4' />
            {date ? <span className='text-ellipsis'>{format(date, 'PPP')}</span> : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar mode='single' selected={date} onSelect={setDate as SelectSingleEventHandler} initialFocus />
        </PopoverContent>
      </Popover>
    ) : (
      <span>{value as string}</span>
    )
  }
})
function useSkipper() {
  const shouldSkipRef = useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

export function AccountTable<TData, TValue>({ columns, data, pathName }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [autoResetPageIndex] = useSkipper()
  const [globalFilter, setGlobalFilter] = useState('')
  const [tableData, setTableData] = useState(data)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const path = useLocation().pathname
  const token = useUserStore((state) => state.user)
  const segmentEndpoint = useMemo(() => {
    if (path.includes('animals')) return { segment: 'animals' }
  }, [path])
  const prefetchId = useCallback(
    (id: number) => {
      if (Number.isInteger(id) && id >= 0 && segmentEndpoint?.segment)
        queryClient.prefetchQuery({
          queryKey: [`${segmentEndpoint.segment}`, id],
          queryFn: () => {
            return request(`/${segmentEndpoint?.segment}/${id}`, 'GET', {
              Authorization: `Bearer ${token} `
            })
          },
          staleTime: 3000
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [segmentEndpoint]
  )
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
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter
    },
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    // meta: {
    //   updateData: (rowIndex, columnId, value) => {
    //     // Skip page index reset until after next rerender
    //     skipAutoResetPageIndex()
    //     setTableData(
    //       (old) =>
    //         old?.map((row, index) => {
    //           if (index === rowIndex) {
    //             return {
    //               ...old[rowIndex]!,
    //               [columnId]: value
    //             }
    //           }
    //           return row
    //         })
    //     )
    //   }
    // },
    debugTable: true
  })

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            variant={'secondary'}
            className='flex items-center gap-1 hover:scale-110 transition-all text-red-600 border-red-300 border font-bold'
          >
            <AiFillDelete />
            <span>Delete</span>
          </Button>
        )}

        <CreateAccount />
      </div>
      {/* <div className='rounded-md border'></div> */}
      <div className='flex-1 overflow-auto  border rounded-md '>
        <Table className=''>
          <TableHeader className='sticky top-0 z-20'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=' bg-primary hover:bg-primary text-foreground'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-white '>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className='flex-1'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    navigate(pathName ? `${pathName}/${row.getValue('id')}` : `${row.getValue('id')}`)
                  }}
                  onMouseEnter={() => {
                    prefetchId(Number(row.getValue('id')))
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {<DataTablePagination table={table} />}
    </div>
  )
}
