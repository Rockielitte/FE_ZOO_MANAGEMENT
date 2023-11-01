import { SpeciesCard } from '@/components/SpeciesCard'
import {
  ColumnDef,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  Table
} from '@tanstack/react-table'
import { SpeciesTablePagination } from './SpeciesPagination'
import { Input } from '@/components/ui/input'
import { CreateSpecies } from './CreateSpecies'

interface DataTableProps<TData, TValue, X> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  GridBox: React.FC<{ data: Table<TData> }>
}

export function SpeciesTable<TData, TValue, X>({ columns, data, GridBox }: DataTableProps<TData, TValue, X>) {
  const table = useReactTable({
    data,
    columns,
    state: {},
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true
  })

  return (
    <div className='h-full flex-1 flex flex-col'>
      {table.getColumn('name')?.id ? (
        <div className='flex items-center justify-between py-2 gap-2 space-y-4 '>
          <Input
            placeholder='Search...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          {table.getColumn('nation')?.id ?
            (<></>) : (<CreateSpecies />)}
        </div>
      ) : (
        <div className='flex items-center justify-start py-2 gap-2 space-y-4 '>
          <Input
            placeholder='Search...'
            value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('code')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />

        </div>
      )}

      <div className='flex-1 flex overflow-auto h-full'>
        {table.getRowModel().rows?.length ? (
          <div className='w-full h-full'>{<GridBox data={table} />}</div>
        ) : (
          <div className='text-center w-full h-full text-2xl'>No results.</div>
        )}
      </div>
      <div className='h-2' />
      <SpeciesTablePagination table={table} />
    </div>
  )
}
