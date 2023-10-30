import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Animal, AnimalGenderEnum, AnimalStatusEnum } from '@/types'
import AnimalForm from '@/components/AnimalForm'
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
