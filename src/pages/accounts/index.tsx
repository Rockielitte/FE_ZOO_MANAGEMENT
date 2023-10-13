import { DataTable, defaultColumn } from '@/components/testTable/Data-table'
import { FC } from 'react'
import mockData from '@/test/MOCK_DATA.json'
import ACCOUNTS from '@/test/ACCOUNT_DATA.json'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MdOutlineMore } from 'react-icons/md'
import { Separator } from '@/components/ui/separator'
interface Accounts {}
type DataType = (typeof mockData)[0]
type AccountType = (typeof ACCOUNTS)[0]

const Accounts: FC<Accounts> = () => {
  const columnsAccount: ColumnDef<AccountType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{row.getValue('id')}</span>
    },
    {
      accessorKey: 'name',
      header: 'Name',
      accessorFn: ({ avatar, name }) => {
        return (
          <div className='flex items-center space-x-2 '>
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        )
      },
      cell: ({ row }) => (
        <div className='flex items-center space-x-2 '>
          {/* <Avatar>
            <AvatarImage src={row.getValue('avatar')} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <span>{row.getValue('name')}</span>
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
      cell: ({ row }) => <span>{row.getValue('email')}</span>
    },

    {
      accessorKey: 'phone',
      header: 'Phone Number',
      cell: ({ row }) => <span>{row.getValue('phone')}</span>
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: ({ row }) => {
        return row.getValue('gender') == 'Male' ? (
          <span className='p-1 rounded-[0.5rem] bg-blue-200 border-blue-400 border-2 text-blue-700 '>
            {row.getValue('gender')}
          </span>
        ) : (
          <span className='p-1 rounded-[0.5rem] bg-red-200 border-red-400 border-2 text-red-700 '>
            {row.getValue('gender')}
          </span>
        )
      }
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => <span>{row.getValue('role')}</span>
    },
    {
      id: 'action',

      cell: (props) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MdOutlineMore className='text-xl hover:scale-150 transition-all' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
    <section className='w-full p-10'>
      {/* border rounded here */}
      <div className='overflow-hidden rounded-[0.5rem] border bg-background   shadow-inner'>
        <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
          {/* title of border here  */}
          <div className='flex items-start justify-between space-y-2 flex-col'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
              <p className='text-muted-foreground'>Here's a list of your tasks for this month!</p>
            </div>
            <Separator className='' />
          </div>
          <DataTable columns={columnsAccount} data={ACCOUNTS} />
        </div>
      </div>
    </section>
  )
}

export default Accounts