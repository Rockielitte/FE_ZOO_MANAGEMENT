// import { Payment, columns } from '@/components/testTable/columns'
import { DataTable, defaultColumn } from '@/components/testTable/Data-table'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
import { AiFillEdit } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { MdOutlineMore } from 'react-icons/md'
import { IoMaleFemale } from 'react-icons/io5'
import { format } from 'date-fns'
import { Animal, AnimalGenderEnum, AnimalStatusEnum, RoleEnum } from '@/types'
import { FaGenderless } from 'react-icons/fa'
import LoadingScreen from '@/components/Loading'
import Error from '@/pages/Error'
import useQueryCustom from '@/hooks/useQueryCustom'
import useCheckRole from '@/hooks/useCheckRole'
const columns: ColumnDef<Animal>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       className='border-white'
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       onClick={(e) => {
  //         e.stopPropagation()
  //       }}
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: defaultColumn<Animal>('text').cell,
    filterFn: 'includesString'
  },
  {
    accessorFn: ({ imageList }) => imageList[0],
    id: 'avatar',
    header: 'Avatar',
    cell: ({ row, column }) => {
      const value: string = row.getValue(column.id)
      return (
        <Avatar>
          <AvatarImage src={value} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )
    },
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: defaultColumn<Animal>('text').cell
  },
  {
    accessorFn: ({ species }) => species.name,
    id: 'Species',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Species' />,
    cell: defaultColumn<Animal>('text').cell
  },
  {
    accessorFn: ({ nation }) => nation,
    id: 'Nation',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Nation' />,
    cell: defaultColumn<Animal>('text').cell
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Gender' />,
    cell: ({ row, column }) => {
      const value: AnimalGenderEnum = row.getValue(column.id)
      return (
        <Badge
          className={clsx(
            'px-2 py-1 min-w-[70px] text-center flex justify-center gap-1 items-center  ',
            value == AnimalGenderEnum.MALE && 'bg-blue-400 ',
            value == AnimalGenderEnum.FEMALE && 'bg-pink-400',
            value == AnimalGenderEnum.HERMAPHRODITE && 'bg-orange-400',
            value == AnimalGenderEnum.ASEXUAL && 'bg-slate-400'
          )}
        >
          {value == AnimalGenderEnum.MALE ? (
            <BsGenderMale className='text-xl'></BsGenderMale>
          ) : value == AnimalGenderEnum.FEMALE ? (
            <BsGenderFemale className='text-xl'></BsGenderFemale>
          ) : value == AnimalGenderEnum.HERMAPHRODITE ? (
            <IoMaleFemale className='text-xl'></IoMaleFemale>
          ) : (
            <FaGenderless className='text-xl' />
          )}
          {value}
        </Badge>
      )
    },
    enableSorting: false,
    filterFn: 'equalsString'
  },
  {
    accessorKey: 'dob',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Birthday' />,
    cell: ({ row, column }) => {
      const date = new Date(row.getValue(column.id))
      return date ? <span className='text-ellipsis'>{format(date, 'PPP')}</span> : <span>N/A</span>
    }
  },

  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row, column }) => {
      const value: AnimalStatusEnum = row.getValue(column.id)

      return (
        <Badge
          className={clsx(
            'px-2 py-1 min-w-[70px] text-center flex justify-center gap-1 items-center  ',
            value == AnimalStatusEnum.HEALTHY && 'bg-green-400 hover:bg-green-200 ',
            value == AnimalStatusEnum.SICK && 'bg-yellow-400 hover:bg-yellow-200 ',
            value == AnimalStatusEnum.IN_DANGER && 'bg-red-400 hover:bg-red-200',
            value == AnimalStatusEnum.DEAD && 'bg-slate-400 hover:bg-slate-200 '
          )}
        >
          {value == AnimalStatusEnum.HEALTHY && 'Healthy'}
          {value == AnimalStatusEnum.SICK && 'Sick'}
          {value == AnimalStatusEnum.IN_DANGER && 'In danger'}
          {value == AnimalStatusEnum.DEAD && 'Dead'}
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
  const animal_data = useQueryCustom({ query: '/animals/', queryKey: ['animals'], data: {} as Animal })
  const user = useCheckRole()

  return (
    <div className='w-full p-2  py-2 h-full shadow-2xl border rounded-md '>
      {animal_data.isError ? (
        <Error />
      ) : !animal_data.isLoading ? (
        <DataTable
          columns={columns}
          data={!animal_data.data ? [] : (animal_data.data as Animal[])}
          canCreate={user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF)}
        />
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}
