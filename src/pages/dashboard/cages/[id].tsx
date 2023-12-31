import { useEffect, useMemo } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CageAnimalTable from '@/components/CageAnimalTable'
import MealCage from '@/components/MealCage'
import { z } from 'zod'
import { useParams } from 'react-router-dom'
import { Cage } from '@/types'
import { UseQueryResult } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import useQueryCustom from '@/hooks/useQueryCustom'
import useMutationCustom from '@/hooks/useMutationCustom'
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
const DetailCage = () => {
  const cageId = useParams().id
  const cage_data = useQueryCustom({
    query: `/cages/${cageId}`,
    queryKey: ['cages', String(cageId)],
    data: {} as Cage,
    dataRes: {} as Cage
  })
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  })
  const formMutation = useMutationCustom({
    query: `/cages/${cageId}`,
    queryKey: ['cages', String(cageId)],
    form: form,
    data: {} as Cage,
    method: 'PUT'
  })

  const defaultValues = useMemo(() => {
    if (cage_data.data) {
      const data = cage_data.data as Cage
      return {
        code: data.code,
        areaId: data.area?.id,
        name: data.name,
        capacity: data.capacity,
        managedById: data.managedBy?.id,
        description: data.description,
        managerName: data.managedBy?.email
      }
    }
  }, [cage_data.data])
  useEffect(() => {
    if (cage_data.data) form.reset(defaultValues)
  }, [cage_data.data, defaultValues, form])

  return (
    <div className='w-full h-full rounded-md  flex flex-col p-1 gap-2'>
      <Tabs defaultValue='animals' className='w-full  h-full flex-col flex  '>
        <TabsList className='w-fit'>
          <TabsTrigger
            value='animals'
            className='uppercase  data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            Animals
          </TabsTrigger>
          <TabsTrigger
            value='meals'
            className=' uppercase data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            Infor&meals
          </TabsTrigger>
        </TabsList>
        <TabsContent value='animals' className='w-full flex-1 overflow-auto'>
          <CageAnimalTable cage_data={cage_data as UseQueryResult<Cage, unknown>} cageId={cageId as string} />
        </TabsContent>
        <TabsContent value='meals' className='w-full flex-1 overflow-auto'>
          {cage_data.isError ? (
            <Error />
          ) : !cage_data.isLoading ? (
            <MealCage
              form={form}
              formMutation={formMutation}
              fields={['name', 'code', 'areaId', 'capacity', 'managedById', 'description']}
            />
          ) : (
            <LoadingScreen></LoadingScreen>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DetailCage
