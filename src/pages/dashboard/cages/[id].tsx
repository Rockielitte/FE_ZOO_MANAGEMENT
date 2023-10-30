import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdCreate
} from 'react-icons/md'
import cage from '@/test/cage.json'
import AreaTag from '@/components/AreaTag'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import CageTag from '@/components/CageTag'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CageAnimalTable from '@/components/CageAnimalTable'
import MealCage from '@/components/MealCage'
import { z } from 'zod'
import { useUserStore } from '@/stores'
import { useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Animal, Cage } from '@/types'
import { QueryClient, UseQueryResult, useMutation, useQuery } from 'react-query'
import { request } from '@/utils/apiCaller'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import useQueryCustom from '@/hooks/useQueryCustom'
import useMutationCustom from '@/hooks/useMutationCustom'
type Props = {}
const regexPattern = /^[A-Za-z][0-9]{4}$/
const formSchema = z.object({
  code: z.string().regex(regexPattern),
  areaId: z.coerce.number(),
  animalSpeciesId: z.coerce.number(),
  managedById: z.string().min(1),
  description: z.string().optional()
})
export type formSchemaType = z.infer<typeof formSchema>
const DetailCage = (props: Props) => {
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
        animalSpeciesId: data.animalSpecies.id,
        managedById: data.managedBy?.id,
        description: data.description
      }
    }
  }, [cage_data.data])
  useEffect(() => {
    if (cage_data.data) form.reset(defaultValues)
  }, [defaultValues])

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
          <CageAnimalTable cage_data={cage_data as UseQueryResult<Cage, unknown>} />
        </TabsContent>
        <TabsContent value='meals' className='w-full flex-1 overflow-auto'>
          {cage_data.isError ? (
            <Error />
          ) : !cage_data.isLoading ? (
            <MealCage
              form={form}
              formMutation={formMutation}
              fields={['code', 'areaId', 'animalSpeciesId', 'managedById', 'description']}
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
