/* eslint-disable react-hooks/rules-of-hooks */
import { RoleEnum, Ticket, TicketStatusEnum } from '@/types'

import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GridShow } from '@/components/GridShow'
import { ColumnDef } from '@tanstack/react-table'
import GridTicket from '@/components/GridTicket'
import useQueryCustom from '@/hooks/useQueryCustom'
import useMutationCustom from '@/hooks/useMutationCustom'
import useCheckRole from '@/hooks/useCheckRole'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0),
  status: z.nativeEnum(TicketStatusEnum)
})
export type formSchemaType = z.infer<typeof formSchema>
export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'id',
    filterFn: 'includesString',
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
  {
    accessorKey: 'description'
  },
  {
    accessorKey: 'name'
  },
  {
    accessorKey: 'price',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'status',
    filterFn: 'includesString'
  }
]
const index = () => {
  const ticket_data = useQueryCustom({ query: '/tickets/', queryKey: ['tickets'], data: {} as Ticket })
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
      status: TicketStatusEnum.INACTIVE
    }
  })

  const formMutation = useMutationCustom({
    query: '/tickets/',
    queryKey: ['tickets'],
    form: form,
    invalidQuery: ['tickets'],
    resetData: { description: '', name: '', price: Number(undefined), status: TicketStatusEnum.ACTIVE },
    data: {} as Ticket
  })
  const user = useCheckRole()
  return (
    <div className='w-full h-full shadow-2xl'>
      {ticket_data.isError ? (
        <Error />
      ) : !ticket_data.isLoading ? (
        <div className='w-full h-full p-2 overflow-auto border shadow-2xl rounded-sm'>
          <GridShow
            columns={columns}
            data={!ticket_data.data ? [] : (ticket_data.data as Ticket[])}
            GridBox={GridTicket}
            form={{
              action: 'Create',
              title: 'Create new ticket',
              form,
              formMutation,
              fields: ['name', 'price', 'description']
            }}
            canCreate={user && user?.role == RoleEnum.ADMIN}
          />
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}

export default index
