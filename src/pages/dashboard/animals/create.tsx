import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Animal, AnimalGenderEnum, AnimalStatusEnum } from '@/types'
import AnimalForm from '@/components/AnimalForm'
import useMutationCustom from '@/hooks/useMutationCustom'
import { useLocation } from 'react-router-dom'
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

const AnimalCreate = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const cageId = queryParams.get('cageId')
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: AnimalStatusEnum.HEALTHY,
      cageId: cageId ? Number(cageId) : undefined
    }
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
    </div>
  )
}

export default AnimalCreate
