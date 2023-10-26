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
import { QueryClient, useMutation, useQuery } from 'react-query'
import { request } from '@/utils/apiCaller'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const token = useUserStore((state) => state.user)
  const cageId = useParams().id

  const cage_data = useQuery<AxiosResponse<Cage>, unknown, Cage>({
    queryKey: ['cages', cageId],
    queryFn: () => {
      return request<Cage>(`/cages/${cageId}`, 'GET', {
        Authorization: `Bearer ${token} `
      })
    },
    onSuccess: (data) => {
      console.log(data)
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
    mutationKey: ['cages', cageId],
    mutationFn: (data: formSchemaType) => {
      return request<Cage>(
        `/cages/${cageId}`,
        'PUT',
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

      // QueryClient.invalidateQueries({ queryKey: ['cages'], exact: true })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message, 'dasklfj')
        toast.error(error.message)
      }
    }
  })
  const defaultValues = useMemo(() => {
    if (cage_data.data)
      return {
        code: cage_data.data.code,
        areaId: cage_data.data.area?.id,
        animalSpeciesId: cage_data.data.animalSpecies.id,
        managedById: cage_data.data.managedBy?.id,
        description: cage_data.data.description
      }
  }, [cage_data.data])
  useEffect(() => {
    if (cage_data.data) form.reset(defaultValues)
  }, [defaultValues])
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  })
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
          <CageAnimalTable cage_data={cage_data} />
        </TabsContent>
        <TabsContent value='meals' className='w-full flex-1 overflow-auto'>
          <MealCage
            form={form}
            formMutation={formMutation}
            fields={['code', 'areaId', 'animalSpeciesId', 'managedById', 'description']}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DetailCage
