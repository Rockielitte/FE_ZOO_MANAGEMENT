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
import useMutationCustom from '@/hooks/useMutationCustom'
const formSchema = z.object({
  name: z.string().min(1, { message: "This field can't be empty" }),
  speciesId: z.coerce.number().min(1),
  cageId: z.coerce.number().min(1),
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
  imageList: z.string().array().optional().default([])
})
export type FormSchemaType = z.infer<typeof formSchema>
const AnimalCreate = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema)
  })
  const formMutation = useMutationCustom({
    query: `/animals/`,
    queryKey: ['animals', 'create'],
    form: form,
    data: {} as Animal
  })
  return (
    <div className='w-full h-full'>
      <AnimalForm
        form={form}
        formMutation={formMutation}
        fields={['name', 'cageId', 'speciesId', 'gender', 'status', 'dob', 'nation', 'description', 'note']}
      ></AnimalForm>
    </div>
  )
}

export default AnimalCreate
