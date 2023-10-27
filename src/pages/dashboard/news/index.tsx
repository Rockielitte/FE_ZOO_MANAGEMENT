import { DataTable, defaultColumn } from '@/components/testTable/Data-table'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NewType } from '@/types'
import New from '@/utils/api/New'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { MdOutlineMore } from 'react-icons/md'
import { Link, useLoaderData } from 'react-router-dom'

// eslint-disable-next-line react-refresh/only-export-components
export const newsGetAll = () => ({
  queryKey: ['news'],
  queryFn: async () => New.getAllNew()
})

const News = () => {
  const initData = useLoaderData() as NewType[]

  const columnsAccount: ColumnDef<NewType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,

      cell: ({ row }) => <span>{parseInt(row.id) + 1}</span>
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
      cell: defaultColumn<NewType>('text').cell
    },
    {
      accessorKey: 'author',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Author' />,
      cell: defaultColumn<NewType>('text').cell
    },
    {
      accessorKey: 'postedAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Posted At' />,
      cell: ({ row, column }) => {
        const date = new Date(row.getValue(column.id))
        return date ? <span className='text-ellipsis'>{format(date, 'PPP')}</span> : <span>N/A</span>
      }
    },

    {
      id: 'action',

      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MdOutlineMore className='text-xl hover:scale-150 transition-all' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link to={`/dashboard/accounts/${row.original.id}`}>
                <DropdownMenuItem>View Info</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Update Role</DropdownMenuItem>
              <DropdownMenuItem>View News</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      enableHiding: false,
      enableSorting: false
    }
  ]
  return (
    <div className='w-full h-full border rounded-md shadow-md flex flex-col p-2 gap-2'>
      {' '}
      <div className='flex-1 overflow-auto p-5'>
        {initData && (
          <DataTable
            columns={columnsAccount}
            // !animal_data.data ? [] : (animal_data.data as Animal[])
            data={!initData.length ? [] : (initData as NewType[])}
          />
        )}
      </div>
    </div>
  )
}

export default News
