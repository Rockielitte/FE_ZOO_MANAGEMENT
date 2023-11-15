import { FC } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MdOutlineMore } from 'react-icons/md'
import { AccountGenderEnum, AccountStatusEnum, AccountType, User } from '@/types'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
// import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { FaGenderless } from 'react-icons/fa'
import { defaultColumn } from '@/components/testTable/Data-table'
import { AccountTable } from './components/AccountTable'
import useQueryCustom from '@/hooks/useQueryCustom'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import { useBanAccount } from '@/hooks/useBanAccount'
import { Icons } from '@/components/Icon'

interface Accounts {}
// eslint-disable-next-line react-refresh/only-export-components

const Accounts: FC<Accounts> = () => {
  const accounts_data = useQueryCustom({ query: '/accounts/', queryKey: ['accounts'], data: {} as AccountType })
  const { banAccount } = useBanAccount()
  const columnsAccount: ColumnDef<User>[] = [
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
      cell: defaultColumn<User>('text').cell
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
      cell: defaultColumn<User>('text').cell
    },

    {
      accessorKey: 'phone',
      header: 'Phone Number',
      cell: defaultColumn<User>('text').cell
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Gender' />,
      cell: ({ row, column }) => {
        const value: AccountGenderEnum = row.getValue(column.id)
        return (
          <Badge
            className={clsx(
              'px-2 py-1 w-full text-center flex justify-center gap-1 items-center  ',
              value == AccountGenderEnum.MALE && 'bg-blue-400 ',
              value == AccountGenderEnum.FEMALE && 'bg-pink-400',

              value == AccountGenderEnum.OTHER && 'bg-slate-400'
            )}
          >
            {value}
          </Badge>
        )
      }
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
      cell: defaultColumn<User>('text').cell
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
      cell: ({ row, column }) => {
        const value: AccountStatusEnum = row.getValue(column.id)
        return (
          <Badge
            className={clsx(
              'px-2 py-1 w-fit text-center flex justify-center gap-1 items-center  ',
              value == AccountStatusEnum.ACTIVE && 'bg-green-400 ',
              value == AccountStatusEnum.INACTIVE && 'bg-red-400'
            )}
          >
            {value == AccountStatusEnum.ACTIVE ? (
              <Icons.CircleDot className='text-xl'></Icons.CircleDot>
            ) : value == AccountStatusEnum.INACTIVE ? (
              <Icons.BanIcon className='text-xl'></Icons.BanIcon>
            ) : (
              <FaGenderless className='text-xl' />
            )}
            {value}
          </Badge>
        )
      }
    },
    {
      id: 'action',
      accessorFn: ({ status }) => status,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MdOutlineMore className='text-xl hover:scale-150 transition-all' />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Link to={`/dashboard/accounts/${row.original.id}`}>
                <DropdownMenuItem>View Info</DropdownMenuItem>
              </Link>

              {row.original.status == 'ACTIVE' && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    banAccount({ status: 'INACTIVE', id: row.original.id })
                  }}
                >
                  Ban
                </DropdownMenuItem>
              )}
              {row.original.status == 'INACTIVE' && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    banAccount({ status: 'ACTIVE', id: row.original.id })
                  }}
                >
                  Active
                </DropdownMenuItem>
              )}
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
      {/* table here */}
      {accounts_data.isError ? (
        <Error />
      ) : !accounts_data.isLoading ? (
        <div className='flex-1 overflow-auto p-2'>
          <AccountTable columns={columnsAccount} data={!accounts_data.data ? [] : (accounts_data.data as User[])} />
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
      {/* border rounded here */}
    </section>
  )
}

export default Accounts
