// import { Payment, columns } from '@/components/testTable/columns'
import { DataTable, defaultColumn } from '@/components/testTable/Data-table'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import mockData from '@/test/MOCK_DATA.json'
import { CiCircleMore } from 'react-icons/ci'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { MdOutlineMore } from 'react-icons/md'
// function getData(): Payment[] {
//   // Fetch data from your API here.
//   return [
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'g@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'e@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'x@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com'
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'n@example.com'
//     }
//     // ...
//   ]
// }
type DataType = (typeof mockData)[0]
const columnHelper = createColumnHelper<DataType>()
const arayColumns = ['avatar', 'id', 'first_name', 'last_name', 'email', 'gender', 'birthday']

const columns: ColumnDef<DataType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className='border-foreground'
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
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span>{row.getValue('id')}</span>
  },
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.getValue('avatar')} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />
  },
  {
    accessorKey: 'birthday',
    header: 'Birthday',
    cell: defaultColumn<DataType>('date', ['.com', '.fpt.vn']).cell
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: defaultColumn<DataType>('select', ['M', 'F']).cell
  },
  {
    id: 'action',
    header: 'Action',
    cell: (props) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdOutlineMore className='text-xl hover:scale-150 transition-all' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableHiding: false,
    enableSorting: false
  }
]

export default function DemoPage() {
  // const data = getData()

  return (
    <div className='w-full p-2  py-2 h-full shadow-2xl border'>
      <DataTable columns={columns} data={mockData} />
    </div>
  )
}
