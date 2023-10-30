import { ColumnDef } from '@tanstack/react-table'
import { useUserStore } from '@/stores'
import { useQueryClient } from 'react-query'
import { Cage } from '@/types'
import LoadingScreen from '@/components/Loading'
import Error from '@/pages/Error'
import { GridShow } from '@/components/GridShow'
import GridCage from '@/components/GridCage'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useQueryCustom from '@/hooks/useQueryCustom'
import useMutationCustom from '@/hooks/useMutationCustom'
export const columns: ColumnDef<Cage>[] = [
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
    accessorFn: ({ animalSpecies }) => animalSpecies.name,
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
    accessorFn: ({ animalSpecies }) => animalSpecies.id,
    id: 'animalSpeciesId',
    enableGlobalFilter: false,
    enableColumnFilter: false
  },
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
  const cage_data = useQueryCustom({ query: '/cages/', queryKey: ['cages'], data: {} as Cage })
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  })
  const formMutation = useMutationCustom({
    query: '/cages/',
    queryKey: ['cages'],
    form: form,
    invalidQuery: ['cages'],
    resetData: { code: '', animalSpeciesId: 0, areaId: 0, description: '', managedById: '' },
    data: {} as Cage
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
