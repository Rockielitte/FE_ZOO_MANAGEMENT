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
import { useUserStore } from '@/stores'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request, request as requestCall } from '@/utils/apiCaller'
import { Animal, AnimalGenderEnum, AnimalStatusEnum, Area, Cage } from '@/types'
import axios, { AxiosResponse } from 'axios'
import { FaGenderless } from 'react-icons/fa'
import LoadingScreen from '@/components/Loading'
import Error from '@/pages/Error'
import { GridShow } from '@/components/GridShow'
import CageTag from '@/components/CageTag'
import GridCage from '@/components/GridCage'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
const columns: ColumnDef<Cage>[] = [
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
    accessorFn: ({ description }) => description,
    id: 'infor'
  },

  {
    accessorFn: ({ animalSpecies }) => animalSpecies?.name,
    id: 'species'
  },
  {
    accessorFn: ({ managedBy }) => managedBy?.id,
    id: 'manageBy',
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
  {
    accessorFn: ({ managedBy }) => managedBy?.fname,
    id: 'manager'
  },
  {
    accessorFn: ({ animalSpecies }) => animalSpecies?.id,
    id: 'animalSpeciesId',
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
  {
    accessorFn: ({ animals }) => animals?.length || 0,
    id: 'animalNum',
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
  {
    accessorFn: ({ area }) => area?.id,
    id: 'areaId',
    enableGlobalFilter: false,
    enableColumnFilter: false
  }
]
const regexPattern = /^[A-Za-z][0-9]{4}$/
const formSchema = z.object({
  code: z.string().regex(regexPattern),
  areaId: z.coerce.number(),
  animalSpeciesId: z.coerce.number(),
  managedById: z.string().min(1),
  description: z.string().optional()
})
export type formSchemaType = z.infer<typeof formSchema>
export default function DemoPage() {
  const token = useUserStore((state) => state.user)?.token
  const queryClient = useQueryClient()
  const areaId = useParams().id
  const columns: ColumnDef<Cage>[] = useMemo(
    () => [
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
        accessorFn: ({ description }) => description,
        id: 'infor'
      },

      {
        accessorFn: ({ animalSpecies }) => animalSpecies?.name,
        id: 'species'
      },
      {
        accessorFn: ({ managedBy }) => managedBy?.id,
        id: 'manageBy',
        enableGlobalFilter: false,
        enableColumnFilter: false
      },
      {
        accessorFn: ({ managedBy }) => managedBy?.fname,
        id: 'manager',
        filterFn: 'includesString'
      },
      {
        accessorFn: ({ animalSpecies }) => animalSpecies?.id,
        id: 'animalSpeciesId',
        enableGlobalFilter: false,
        enableColumnFilter: false
      },
      {
        accessorFn: ({ animals }) => animals?.length || 0,
        id: 'animalNum',
        enableGlobalFilter: false,
        enableColumnFilter: false
      },
      {
        accessorFn: ({ area }) => area?.id || areaId,
        id: 'areaId',
        enableGlobalFilter: false,
        enableColumnFilter: false
      }
    ],
    [areaId]
  )

  const cage_data = useQuery<AxiosResponse<Area>, unknown, Cage[]>({
    queryKey: ['areas', 'cages', areaId],
    queryFn: () => {
      return requestCall<Area>(`/areas/${areaId}`, 'GET', {
        Authorization: `Bearer ${token} `
      })
    },
    onSuccess: (data) => {},
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
      }
    },
    select: (data) => {
      return data.data.cages
    }
  })
  const formMutation = useMutation({
    mutationKey: ['cages'],
    mutationFn: (data: formSchemaType) => {
      return request<Cage>(
        '/cages/',
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
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['areas', 'cages', areaId], exact: true })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message, 'dasklfj')
        toast.error(error.message)
      }
    }
  })
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      areaId: Number(areaId)
    }
  })
  return (
    <div className='w-full  h-full '>
      {cage_data.isError ? (
        <Error />
      ) : !cage_data.isLoading ? (
        <div className='w-full h-full p-2 overflow-auto border shadow-lg rounded-sm'>
          <GridShow
            columns={columns}
            data={!cage_data.data ? [] : (cage_data.data as Cage[])}
            GridBox={GridCage}
            form={{
              action: 'Create',
              title: 'Create new cage',
              form,
              formMutation,
              fields: ['code', 'areaId', 'animalSpeciesId', 'managedById', 'description']
            }}
          />
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}
