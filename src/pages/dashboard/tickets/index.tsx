import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdCreate
} from 'react-icons/md'
import Areas from '@/test/AreaTest.json'
import AreaTag from '@/components/AreaTag'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useUserStore } from '@/stores'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Area, Ticket } from '@/types'
import { request } from '@/utils/apiCaller'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Toast } from '@/components/ui/toast'
import ModalForm from '@/components/ModalForm'
import { GridShow } from '@/components/GridShow'
import { ColumnDef } from '@tanstack/react-table'
import GridArea from '@/components/GridArea'
import GridTicket from '@/components/GridTicket'
import useQueryCustom from '@/hooks/useQueryCustom'
import useMutationCustom from '@/hooks/useMutationCustom'
const regexPattern = /^[A-Z]\d{3}$/
type Props = {}
const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0)
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
  }
]
const index = (props: Props) => {
  const ticket_data = useQueryCustom({ query: '/tickets/', queryKey: ['tickets'], data: {} as Ticket })
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0
    }
  })

  const formMutation = useMutationCustom({
    query: '/tickets/',
    queryKey: ['tickets'],
    form: form,
    invalidQuery: ['tickets'],
    resetData: { description: '', name: '', price: Number(undefined) },
    data: {} as Ticket
  })

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
          />
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}

export default index
