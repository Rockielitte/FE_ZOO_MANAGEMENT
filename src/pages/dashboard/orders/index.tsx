// import { Payment, columns } from '@/components/testTable/columns'
import { DataTable } from '@/components/testTable/Data-table'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
import { AiFillEdit, AiOutlineCheck } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { MdOutlineMore, MdPendingActions } from 'react-icons/md'
import { format } from 'date-fns'
import LoadingScreen from '@/components/Loading'
import Error from '@/pages/Error'
import useQueryCustom from '@/hooks/useQueryCustom'
import { GiCancel } from 'react-icons/gi'
import { GrStatusDisabled } from 'react-icons/gr'
import { Order, OrderStatusEnum } from '@/types'
const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className='border-white'
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        onClick={(e) => {
          e.stopPropagation()
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ column, row }) => {
      return String(row.getValue(column.id)).substring(0, 8)
    },
    filterFn: 'includesString'
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Phone' />
  },
  {
    accessorKey: 'visitDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Visit Date' />,
    cell: ({ row, column }) => {
      const date = new Date(row.getValue(column.id))
      return date ? <span className='text-ellipsis'>{format(date, 'PPP')}</span> : <span>N/A</span>
    }
  },
  {
    accessorKey: 'total',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Total' />
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row, column }) => {
      const value: OrderStatusEnum = row.getValue(column.id)
      return (
        <Badge
          className={clsx(
            'px-2 py-1 min-w-[70px] text-center flex justify-center gap-1 items-center  ',
            value == OrderStatusEnum.DONE && 'bg-green-400 ',
            value == OrderStatusEnum.PENDING && 'bg-orange-400',
            value == OrderStatusEnum.CANCELLED && 'bg-slate-400'
          )}
        >
          {value == OrderStatusEnum.DONE ? (
            <AiOutlineCheck className='text-xl'></AiOutlineCheck>
          ) : value == OrderStatusEnum.PENDING ? (
            <MdPendingActions className='text-xl'></MdPendingActions>
          ) : value == OrderStatusEnum.CANCELLED ? (
            <GiCancel className='text-xl'></GiCancel>
          ) : (
            <GrStatusDisabled className='text-xl' />
          )}
          {value}
        </Badge>
      )
    },
    enableSorting: false,
    filterFn: 'equalsString'
  },

  {
    id: 'action',
    header: 'Action',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdOutlineMore className='text-xl hover:scale-150 transition-all' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <AiFillEdit></AiFillEdit>Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BiDetail></BiDetail>View details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableHiding: false,
    enableSorting: false
  }
]

export default function DemoPage() {
  const order_data = useQueryCustom({ query: '/orders/', queryKey: ['orders'], data: {} as Order })
  return (
    <div className='w-full p-2  py-2 h-full shadow-2xl border rounded-md '>
      {order_data.isError ? (
        <Error />
      ) : !order_data.isLoading ? (
        <DataTable columns={columns} data={!order_data.data ? [] : (order_data.data as Order[])} />
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}
