/* eslint-disable react-hooks/rules-of-hooks */
import { Area } from '@/types'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GridShow } from '@/components/GridShow'
import { ColumnDef } from '@tanstack/react-table'
import GridArea from '@/components/GridArea'
import useQueryCustom from '@/hooks/useQueryCustom'
import useMutationCustom from '@/hooks/useMutationCustom'

const formSchema = z.object({
  // code: z.string().regex(regexPattern),
  code: z.string().min(3),

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
const index = () => {
  const area_data = useQueryCustom({ query: '/areas/', queryKey: ['areas'], data: {} as Area })
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  })
  const formMutation = useMutationCustom({
    query: '/areas/',
    queryKey: ['areas'],
    form: form,
    invalidQuery: ['areas'],
    resetData: { code: '', name: '', location: '' },
    data: {} as Area
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
