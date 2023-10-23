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

import { toast } from '@/components/ui/use-toast'
import { useMemo, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { BsImages, BsUpload } from 'react-icons/bs'
import Carousel from '@/components/Carousel'
import { useUserStore } from '@/stores'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Animal, AnimalGenderEnum } from '@/types'
import { request } from '@/utils/apiCaller'
import { useQuery } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import AnimalForm, { AnimalSchemaType } from '@/components/AnimalForm'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'

const AnimalDetail = () => {
  const token = useUserStore((state) => state.user)
  const id = useParams().id
  const animal_data = useQuery<AxiosResponse<Animal>, unknown, Animal>({
    queryKey: ['dashboad', 'animal', Number(id)],
    queryFn: () => {
      return request<Animal>(`/animal/${id}`, 'GET', {
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
      const animal: AnimalSchemaType = {
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

  return (
    <div className='w-full h-full'>
      {animal_data.isError && <Error></Error>}
      {!animal_data.isLoading && animalDataForm != undefined ? (
        <AnimalForm animal_data={animalDataForm as AnimalSchemaType}></AnimalForm>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}

export default AnimalDetail
