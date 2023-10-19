// import { Payment, columns } from '@/components/testTable/columns'
import { DataTable, defaultColumn } from '@/components/testTable/Data-table'
import { DataTableColumnHeader } from '@/components/testTable/TableHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import animalData from '@/test/animal_data.json'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import clsx from 'clsx'
import { AiFillEdit } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { MdOutlineMore } from 'react-icons/md'
import { IoMaleFemale } from 'react-icons/io5'
import { format } from 'date-fns'
type DataType = (typeof animalData)[0]
const columns: ColumnDef<DataType>[] = [
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
    cell: defaultColumn<DataType>('text').cell,
    filterFn: 'includesString'
  },
  {
    accessorFn: ({ avatar }) => ({ avatar }),
    id: 'avatar',
    header: 'Avatar',
    cell: ({ row, column }) => {
      // console.log(row.getValue);
      const value: { avatar: string } = row.getValue(column.id)
      return (
        <Avatar>
          <AvatarImage src={value.avatar} />
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
    cell: defaultColumn<DataType>('text').cell
  },
  {
    accessorKey: 'species',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Species' />,
    cell: defaultColumn<DataType>('text').cell
  },

  {
    accessorKey: 'nation',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Nation' />,
    cell: defaultColumn<DataType>('text').cell
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Gender' />,
    cell: ({ row, column }) => (
      <Badge
        className={clsx(
          'px-2 py-1 min-w-[70px] text-center flex justify-center gap-1 items-center  ',
          row.getValue(column.id) == 'Male' && 'bg-blue-400 ',
          row.getValue(column.id) == 'Female' && 'bg-pink-400',
          row.getValue(column.id) == 'Bisexsual' && 'bg-slate-400'
        )}
      >
        {row.getValue(column.id) == 'Male' ? (
          <BsGenderMale className='text-xl'></BsGenderMale>
        ) : row.getValue(column.id) == 'Female' ? (
          <BsGenderFemale className='text-xl'></BsGenderFemale>
        ) : (
          <IoMaleFemale className='text-xl'></IoMaleFemale>
        )}
        {row.getValue(column.id)}
      </Badge>
    ),
    enableSorting: false,
    filterFn: 'equalsString'
  },
  {
    accessorKey: 'birthday',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Birthday' />,
    cell: ({ row, column }) => {
      const date = new Date(row.getValue(column.id))
      return date ? <span className='text-ellipsis'>{format(date, 'PPP')}</span> : <span>N/A</span>
    }
  },

  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: defaultColumn<DataType>('select', ['Good', 'Problem', 'Died']).cell
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
  // const data = getData()

  return (
    <div className='w-full p-2  py-2 h-full shadow-2xl border rounded-md '>
      <DataTable columns={columns} data={animalData} />
    </div>
  )
}
