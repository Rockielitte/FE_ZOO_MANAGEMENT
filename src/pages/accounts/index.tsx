import { DataTable, defaultColumn } from '@/components/testTable/Data-table'
import { FC } from 'react'

import ACCOUNTS from '@/test/ACCOUNT_DATA.json'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MdOutlineMore } from 'react-icons/md'
import CreateAccount from './components/CreateAccount'
import { useLoaderData } from 'react-router'
import { AccountType } from '@/types'
interface Accounts {}

const Accounts: FC<Accounts> = () => {
  const data = useLoaderData() as AccountType
  console.log('data account: ', data)

  const columnsAccount: ColumnDef<AccountType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{parseInt(row.id) + 1}</span>
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
      accessorKey: 'phoneNumber',
      header: 'Phone Number',
      cell: ({ row }) => <span>{row.getValue('phoneNumber')}</span>
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: ({ row }) => {
        return row.getValue('gender') == 'MALE' ? (
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
    <section className='w-full  h-full flex flex-col shadow-2xl rounded-[0.5rem] border bg-background   '>
      {/* title of border here  */}
      <CreateAccount />
      {/* table here */}
      <div className='flex-1 overflow-auto p-5'>
        <DataTable columns={columnsAccount} data={ACCOUNTS} />
      </div>

      {/* border rounded here */}
    </section>
  )
}

export default Accounts
