// @flow
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { ColumnDef, Table, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { SpeciesTablePagination } from '../../Species/components/SpeciesPagination';
import { CreateFood } from './CreateFood';
interface DataTableProps<TData, TValue, _X, _Y> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    GridBox: React.FC<{ data: Table<TData>; user: User }>
    user: User
}
export default function FoodTable<TData, TValue, X, Y>({
    columns,
    data,
    GridBox,
    user
}: DataTableProps<TData, TValue, X, Y>) {
    const table = useReactTable({
        data,
        columns,
        state: {},
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
        //
        // debugTable: true
    })
    return (
        <div className='h-full flex-1 flex flex-col'>

            <div className='flex items-center justify-between py-2 gap-2 space-y-4 '>
                <Input
                    placeholder='Search...'
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className='max-w-sm'
                />
                <CreateFood />

            </div>


            <div className='flex-1 flex overflow-auto h-full'>
                {table.getRowModel().rows?.length ? (
                    <div className='w-full h-full'>{<GridBox data={table} user={user} />}</div>
                ) : (
                    <div className='text-center w-full h-full text-2xl'>No results.</div>
                )}
            </div>
            <div className='h-2' />
            <SpeciesTablePagination table={table} />
        </div>
    );
};