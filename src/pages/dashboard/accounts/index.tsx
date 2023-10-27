import { FC } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MdOutlineMore } from 'react-icons/md'
import CreateAccount from './components/CreateAccount'
import { useLoaderData } from 'react-router'
import { AccountGenderEnum, AccountType, User } from '@/types'

import Account from '@/utils/api/Account'
// import { AccountTable } from './components/AccountTable'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { FaGenderless } from 'react-icons/fa'
import { DataTable, defaultColumn } from '@/components/testTable/Data-table'

interface Accounts {}
// eslint-disable-next-line react-refresh/only-export-components
export const accountsGetAll = () => ({
  queryKey: ['accounts'],
  queryFn: async () => Account.getAllAccount()
})

const Accounts: FC<Accounts> = () => {
  const initData = useLoaderData() as User[]

  const columnsAccount: ColumnDef<AccountType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,

      cell: ({ row }) => <span>{parseInt(row.id) + 1}</span>
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,

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
      cell: defaultColumn<AccountType>('text').cell
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
      cell: defaultColumn<AccountType>('text').cell
    },

    {
      accessorKey: 'phone',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Phone Number' />,
      cell: defaultColumn<AccountType>('text').cell
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Gender' />,
      cell: ({ row, column }) => {
        const value: AccountGenderEnum = row.getValue(column.id)
        return (
          <Badge
            className={clsx(
              'px-2 py-1 w-fit text-center flex justify-center gap-1 items-center  ',
              value == AccountGenderEnum.MALE && 'bg-blue-400 ',
              value == AccountGenderEnum.FEMALE && 'bg-pink-400',

              value == AccountGenderEnum.OTHER && 'bg-slate-400'
            )}
          >
            {value == AccountGenderEnum.MALE ? (
              <BsGenderMale className='text-xl'></BsGenderMale>
            ) : value == AccountGenderEnum.FEMALE ? (
              <BsGenderFemale className='text-xl'></BsGenderFemale>
            ) : (
              <FaGenderless className='text-xl' />
            )}
            {value}
          </Badge>
        )
      }
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
      cell: defaultColumn<AccountType>('text').cell
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
      cell: defaultColumn<AccountType>('text').cell
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
    <section className='w-full  h-full flex flex-col shadow-2xl rounded-[0.5rem] border bg-background   '>
      {/* title of border here  */}
      <CreateAccount />
      {/* table here */}
      <div className='flex-1 overflow-auto p-5'>
        {initData && (
          <DataTable
            columns={columnsAccount}
            // !animal_data.data ? [] : (animal_data.data as Animal[])
            data={!initData ? [] : (initData as User[])}
          />
        )}
      </div>

      {/* border rounded here */}
    </section>
  )
}

export default Accounts
