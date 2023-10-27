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
import { Area } from '@/types'
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
const regexPattern = /^[A-Z]\d{3}$/
type Props = {}
const formSchema = z.object({
  code: z.string().regex(regexPattern),
  name: z.string().min(1),
  location: z.string().min(1)
})
export type formSchemaType = z.infer<typeof formSchema>
export const columns: ColumnDef<Area>[] = [
  {
    accessorKey: 'id',
    filterFn: 'includesString',
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
  {
    accessorKey: 'code'
  },
  {
    accessorKey: 'name'
  },
  {
    accessorFn: ({ location }) => location,
    id: 'location'
  },

  {
    accessorKey: 'noAnimals'
  },
  {
    accessorKey: 'noCages'
  }
]
const index = (props: Props) => {
  const token = useUserStore((state) => state.user)?.token
  const queryClient = useQueryClient()
  const area_data = useQuery<AxiosResponse<Area[]>, unknown, Area[]>({
    queryKey: ['areas'],
    queryFn: () => {
      return request<Area[]>('/areas/', 'GET', {
        Authorization: `Bearer ${token} `
      })
    },
    onSuccess: (data) => {
      console.log(data, 'aerea')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
      }
    },
    select: (data) => {
      return data.data
    }
  })
  const formMutation = useMutation({
    mutationKey: ['areas'],
    mutationFn: (data: formSchemaType) => {
      return request<Area>(
        '/areas/',
        'POST',
        {
          Authorization: `Bearer ${token} `,
          Headers: { 'Content-Type': 'application/json' }
        },
        {},
        data
      )
    },
    onSuccess: (data) => {
      console.log(data.data)
      toast.success('Send sucessfully')
      form.reset({ code: '', name: '', location: '' })
      queryClient.invalidateQueries({ queryKey: ['areas'], exact: true })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message, 'dasklfj')
        toast.error(error.message)
      }
    }
  })
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  })

  return (
    <div className='w-full h-full shadow-2xl'>
      {area_data.isError ? (
        <Error />
      ) : !area_data.isLoading ? (
        <div className='w-full h-full p-2 overflow-auto border shadow-2xl rounded-sm'>
          <GridShow
            columns={columns}
            data={!area_data.data ? [] : (area_data.data as Area[])}
            GridBox={GridArea}
            form={{
              action: 'Create',
              title: 'Create new area',
              form,
              formMutation,
              fields: ['code', 'name', 'location']
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
