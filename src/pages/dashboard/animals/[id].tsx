import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useEffect, useMemo } from 'react'
// import { useUserStore } from '@/stores'
import { Animal, AnimalGenderEnum, AnimalStatusEnum } from '@/types'
import { useParams } from 'react-router-dom'
import AnimalForm from '@/components/AnimalForm'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import useQueryCustom from '@/hooks/useQueryCustom'
import useMutationCustom from '@/hooks/useMutationCustom'
const regexNotSpaceFirst = /^(?:[^ ]|$)/
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field can't be empty" })
    .regex(regexNotSpaceFirst, 'First character is not a space'),
  speciesId: z.coerce
    .number({
      invalid_type_error: 'Species is required'
    })
    .min(1),
  cageId: z.coerce.number().optional(),
  gender: z.nativeEnum(AnimalGenderEnum),
  status: z.nativeEnum(AnimalStatusEnum),
  dob: z.date().max(new Date(), { message: 'Please choose before current time' }),
  nation: z
    .string()
    .min(1, { message: "This field can't be empty" })
    .regex(regexNotSpaceFirst, 'First character is not a space'),
  weight: z.coerce.number().min(0).optional(),
  height: z.coerce.number().min(0).max(10).optional(),
  length: z.coerce.number().min(0).optional(),
  description: z
    .string()
    .regex(regexNotSpaceFirst, 'First character is not a space')
    .max(255, {
      message: "Description can't be exccess 255 characters"
    })
    .optional(),
  note: z
    .string()
    .regex(regexNotSpaceFirst, 'First character is not a space')
    .max(255, {
      message: "Note can't be exccess 255 characters"
    })

    .optional(),
  imageList: z.string().array().optional().default([]),
  feedingGuide: z
    .string()
    .regex(regexNotSpaceFirst, 'First character is not a space')
    .max(255, {
      message: "Note can't be exccess 255 characters"
    })

    .optional()
})
export type FormSchemaType = z.infer<typeof formSchema>
const AnimalDetail = () => {
  const id = useParams().id
  const animal_data = useQueryCustom({
    query: `/animals/${id}`,
    queryKey: ['animals', String(id)],
    data: {} as Animal,
    dataRes: {} as Animal
  })

  const animalDataForm = useMemo(() => {
    if (animal_data.data) {
      const data = animal_data.data as Animal
      const animal: FormSchemaType = {
        name: data.name,
        speciesId: data.species.id,
        cageId: data.cage?.id,
        gender: data.gender,
        status: data.status,
        dob: new Date(data.dob),
        nation: data.nation,
        description: data.description,
        note: data.note,
        imageList: data.imageList,
        weight: data.weight || undefined,
        height: data.height || undefined,
        length: data.length || undefined,
        feedingGuide: data.feedingGuide || undefined
      }
      return animal
    }
  }, [animal_data.data])
  useEffect(() => {
    form.reset(animalDataForm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalDataForm])
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: animalDataForm
  })
  const formMutation = useMutationCustom({
    query: `/animals/${id}`,
    method: 'PUT',
    queryKey: ['animals', String(id)],
    form: form,
    data: {} as Animal
  })
  return (
    <div className='w-full h-full'>
      {animal_data.isError ? (
        <Error></Error>
      ) : !animal_data.isLoading ? (
        <AnimalForm
          form={form}
          formMutation={formMutation}
          fields={[
            'name',
            'speciesId',
            'cageId',
            'gender',
            'status',
            'dob',
            'nation',
            'weight',
            'height',
            'length',
            'description',
            'note',
            'feedingGuide'
          ]}
        ></AnimalForm>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}

export default AnimalDetail
