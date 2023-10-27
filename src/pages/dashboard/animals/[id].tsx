import { Button } from '@/components/ui/button'
import { Input, InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Popover } from '@radix-ui/react-popover'
import { CalendarIcon, Ghost } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { RiSendPlaneLine } from 'react-icons/ri'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { useEffect, useMemo, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { BsImages, BsUpload } from 'react-icons/bs'
import Carousel from '@/components/Carousel'
import { useUserStore } from '@/stores'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Animal, AnimalGenderEnum, AnimalStatusEnum } from '@/types'
import { request } from '@/utils/apiCaller'
import { useMutation, useQuery } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import AnimalForm from '@/components/AnimalForm'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import { toast } from 'react-toastify'
import { queryClient } from '@/routes'
const formSchema = z.object({
  name: z.string().min(1, { message: "This field can't be empty" }),
  speciesId: z.coerce.number(),
  cageId: z.coerce.number(),
  gender: z.nativeEnum(AnimalGenderEnum),
  status: z.nativeEnum(AnimalStatusEnum),
  dob: z.date().max(new Date(), { message: 'Please choose before current time' }),
  nation: z.string().min(1, { message: "This field can't be empty" }),
  description: z
    .string()
    .max(255, {
      message: "Description can't be exccess 255 characters"
    })
    .optional(),
  note: z
    .string()
    .max(255, {
      message: "Note can't be exccess 255 characters"
    })
    .optional(),
  imageList: z.string().array().optional()
})
export type FormSchemaType = z.infer<typeof formSchema>
const AnimalDetail = () => {
  const token = useUserStore((state) => state.user)?.token
  const id = useParams().id
  const animal_data = useQuery<AxiosResponse<Animal>, unknown, Animal>({
    queryKey: ['animals', id],
    queryFn: () => {
      return request<Animal>(`/animals/${id}`, 'GET', {
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
      return data.data
    }
  })
  const animalDataForm = useMemo(() => {
    if (animal_data.data) {
      const animal: FormSchemaType = {
        name: animal_data.data.name,
        speciesId: animal_data.data.species.id,
        cageId: animal_data.data.cage.id,
        gender: animal_data.data.gender,
        status: animal_data.data.status,
        dob: new Date(animal_data.data.dob),
        nation: animal_data.data.nation,
        description: animal_data.data.description,
        note: animal_data.data.note,
        imageList: animal_data.data.imageList
      }
      return animal
    }
  }, [animal_data.data])
  useEffect(() => {
    console.log(animalDataForm, 'kkk')

    form.reset(animalDataForm)
  }, [animalDataForm])

  const formMutation = useMutation({
    mutationKey: ['animals', id],
    mutationFn: (data: FormSchemaType) => {
      // const dataForm = { ...data, dob: data.dob.toISOString().substring(0, 10) }
      return request<Animal>(
        `/animals/${id}`,
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
      queryClient.invalidateQueries({ queryKey: ['animals'], exact: true })
      queryClient.invalidateQueries({ queryKey: ['animals', id], exact: true })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message, 'dasklfj')
        toast.error(error.message)
      }
    }
  })
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: animalDataForm
  })
  return (
    <div className='w-full h-full'>
      {animal_data.isError ? (
        <Error></Error>
      ) : !animal_data.isLoading ? (
        <AnimalForm
          form={form}
          formMutation={formMutation}
          fields={['name', 'cageId', 'speciesId', 'gender', 'status', 'dob', 'nation', 'description', 'note']}
        ></AnimalForm>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}

export default AnimalDetail
