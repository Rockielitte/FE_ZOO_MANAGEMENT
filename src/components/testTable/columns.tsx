import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { DataTableColumnHeader } from './TableHeader'

import { defaultColumn } from './Data-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <span>{row.getValue('status')}</span>
  },
  {
    accessorKey: 'email',
    // header: ({ column }) => {
    //   return (
    //     <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    //       Email
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </Button>
    //   )
    // }
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: defaultColumn<Payment>().cell
  }
]
