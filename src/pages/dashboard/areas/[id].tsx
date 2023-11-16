// import { Payment, columns } from '@/components/testTable/columns'

import { ColumnDef } from '@tanstack/react-table'
import { Area, Cage } from '@/types'

import LoadingScreen from '@/components/Loading'
import Error from '@/pages/Error'
import { GridShow } from '@/components/GridShow'

import GridCage from '@/components/GridCage'
import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import useQueryCustom from '@/hooks/useQueryCustom'
import useMutationCustom from '@/hooks/useMutationCustom'
// import useCheckRole from '@/hooks/useCheckRole'
// const columns: ColumnDef<Cage>[] = [
//   {
//     accessorKey: 'id',
//     filterFn: 'includesString',
//     enableGlobalFilter: false,
//     enableColumnFilter: false
//   },
//   {
//     accessorKey: 'code'
//   },
//   {
//     accessorFn: ({ description }) => description,
//     id: 'infor'
//   },

//   {
//     accessorFn: ({ animalSpecies }) => animalSpecies?.name,
//     id: 'species'
//   },
//   {
//     accessorFn: ({ managedBy }) => managedBy?.id,
//     id: 'manageBy',
//     enableGlobalFilter: false,
//     enableColumnFilter: false
//   },
//   {
//     accessorFn: ({ managedBy }) => managedBy?.fname,
//     id: 'manager'
//   },
//   {
//     accessorFn: ({ animalSpecies }) => animalSpecies?.id,
//     id: 'animalSpeciesId',
//     enableGlobalFilter: false,
//     enableColumnFilter: false
//   },
//   {
//     accessorFn: ({ animals }) => animals?.length || 0,
//     id: 'animalNum',
//     enableGlobalFilter: false,
//     enableColumnFilter: false
//   },
//   {
//     accessorFn: ({ area }) => area?.id,
//     id: 'areaId',
//     enableGlobalFilter: false,
//     enableColumnFilter: false
//   }
// ]
// const regexPattern = /^[A-Za-z][0-9]{4}$/
const regexPattern = /^[A-Za-z][0-9]{4}$/
const regexNotSpaceFirst = /^(?:[^ ]|$)/
const formSchema = z.object({
  code: z
    .string()
    .regex(regexPattern, 'Code should be followed format A0000')
    .regex(regexNotSpaceFirst, 'First character is not a space'),
  areaId: z.coerce.number({
    invalid_type_error: 'Area is required'
  }),
  capacity: z.coerce.number().min(1, 'Capacity should be larger than or equal to 1'),
  // animalSpeciesId: z.coerce.number(),
  name: z.string().min(1, 'Name is required').regex(regexNotSpaceFirst, 'First character is not a space'),
  managedById: z.string().optional(),
  description: z.string().regex(regexNotSpaceFirst, 'First character is not a space').optional()
})
export type formSchemaType = z.infer<typeof formSchema>
export default function DemoPage() {
  const areaId = useParams().id
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      areaId: Number(areaId)
    }
  })
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
        accessorKey: 'name'
      },
      {
        accessorKey: 'capacity'
      },
      {
        accessorFn: ({ description }) => description,
        id: 'infor'
      },

      // {
      //   accessorFn: ({ animalSpecies }) => animalSpecies.name,
      //   id: 'species'
      // },
      {
        accessorFn: ({ managedBy }) => managedBy?.id,
        id: 'manageBy',
        enableGlobalFilter: false,
        enableColumnFilter: false
      },
      {
        accessorFn: ({ managedBy }) => managedBy?.email,
        id: 'manager',
        filterFn: 'includesString'
      },
      // {
      //   accessorFn: ({ animalSpecies }) => animalSpecies.id,
      //   id: 'animalSpeciesId',
      //   enableGlobalFilter: false,
      //   enableColumnFilter: false
      // },
      {
        accessorFn: ({ animals }) => animals?.length,
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
    ],
    [areaId]
  )
  const cage_data = useQueryCustom({
    query: `/areas/${areaId}`,
    queryKey: ['areas', 'cages', String(areaId)],
    data: {} as Area,
    dataRes: {} as Area
  })
  const formMutation = useMutationCustom({
    query: '/cages/',
    queryKey: ['cages'],
    form: form,
    invalidQuery: ['areas', 'cages', String(areaId)],
    reset: true,
    data: {} as Cage
  })
  // const user = useCheckRole()
  return (
    <div className='w-full  h-full '>
      {cage_data.isError ? (
        <Error />
      ) : !cage_data.isLoading ? (
        <div className='w-full h-full p-2 overflow-auto border shadow-lg rounded-sm'>
          <GridShow
            columns={columns}
            data={!cage_data.data ? [] : ((cage_data.data as Area).cages as Cage[])}
            GridBox={GridCage}
            form={{
              action: 'Create',
              title: 'Create new cage',
              form,
              formMutation,
              fields: ['name', 'code', 'areaId', 'capacity', 'managedById', 'description']
            }}
            // canCreate={user.role && user.role == RoleEnum.ADMIN}
          />
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}
