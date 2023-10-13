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
import { Payment } from './columns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '../ui/button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DataTablePagination } from './Pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { BsFillCalendar2WeekFill } from 'react-icons/bs'
import { Calendar } from '../ui/calendar'
import { SelectSingleEventHandler } from 'react-day-picker'
import { AiFillDelete } from 'react-icons/ai'
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
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
          console.log()
          table.options.meta?.updateData(index, id, e)
        }}
        value={value}
      >
        <SelectTrigger className='w-fit'>
          <SelectValue placeholder='Select' />
        </SelectTrigger>
        <SelectContent defaultValue={value}>
          {options?.map((option) => (
            <SelectItem className='w-fit' value={option}>
              <span className='capitalize'>{option}</span>
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

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const [tableData, setTableData] = useState(data)
  console.log(tableData, 'rerder')

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
    state: {
      sorting,
      columnFilters,
      rowSelection
    },
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value
              }
            }
            return row
          })
        )
      }
    },
    debugTable: true
  })

  return (
    <div className=' flex flex-col space-y-4'>
      <div className='flex items-center'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button variant={'destructive'} className='flex items-center gap-1 hover:scale-110 transition-all'>
            <AiFillDelete />
            <span>Delete</span>
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              View
            </Button>
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
      </div>

      <div className='rounded-md border'>
        <Table className=''>
          <TableHeader className=''>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=' '>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-foreground '>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
      <DataTablePagination table={table} />
    </div>
  )
}
