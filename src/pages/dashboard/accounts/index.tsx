import { FC } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MdOutlineMore } from 'react-icons/md'
import CreateAccount from './components/CreateAccount'
import { useLoaderData } from 'react-router'
import { AccountType } from '@/types'
import { useQuery, useQueryClient } from 'react-query'
import Account from '@/utils/api/Account'
import { AccountTable } from './components/AccountTable'
import { Link } from 'react-router-dom'

interface Accounts {}

const Accounts: FC<Accounts> = () => {
  const queryClient = useQueryClient()
  const initData = useLoaderData() as AccountType
  const { data } = useQuery({
    queryKey: ['account'],
    queryFn: Account.getAllAccount,
    // initialData: initData,
    staleTime: 10000
    // initialDataUpdatedAt: () => queryClient.getQueryState(['account'])?.dataUpdatedAt
  })

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
      accessorFn: ({ avt, fname, lname }) => {
        return (
          <div className='flex items-center space-x-2 '>
            <Avatar>
              <AvatarImage src={avt} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{fname + ' ' + lname}</span>
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
      accessorKey: 'phone',
      header: 'Phone Number',
      cell: ({ row }) => <span>{row.getValue('phone')}</span>
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
              <Link to='/dashboard/accounts/0ac03da8-9d62-484a-b58b-ca78f3c0e3a2'>
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
    <section className='w-full  h-full flex flex-col shadow-2xl rounded-[0.5rem] border bg-background   '>
      {/* title of border here  */}
      <CreateAccount />
      {/* table here */}
      <div className='flex-1 overflow-auto p-5'>
        {data && (
          <AccountTable
            columns={columnsAccount}
            data={data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
          />
        )}
      </div>

      {/* border rounded here */}
    </section>
  )
}

export default Accounts
