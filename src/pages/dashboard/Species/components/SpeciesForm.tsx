import { zodResolver } from '@hookform/resolvers/zod'
import { Path, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
// import AnimalSpecies from '@/utils/api/AnimalSpecies'
import { DialogFooter } from '@/components/ui/dialog'
import { dataSpecies } from '@/types'
// import { useQueryClient } from 'react-query'
import useMutationCustom from '@/hooks/useMutationCustom'
import axios from 'axios'
// import { useLocation, useNavigate } from 'react-router-dom'

interface Species {
  id?: number
  species?: dataSpecies
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const animalSpeciesFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.'
    }),

  description: z.string().max(255, {
    message: 'Description must not be longer than 255 characters.'
  }),

  image: z.string().max(255, {
    message: 'Image must not be longer than 255 characters.'
  })
})

export type SpeciesFormValue = z.infer<typeof animalSpeciesFormSchema>

// This can come from your database or API.
// const defaultValues: Partial<SpeciesFormValue> = {
//   name: 'Species name',
//   description: 'asdfghj',
//   image: 'images/img.jpg'
// }

export function SpeciesForm(props: Species) {
  const form = useForm<SpeciesFormValue>({
    resolver: zodResolver(animalSpeciesFormSchema),
    defaultValues: props.species
  })
  // const location = useLocation()
  // const queryParams = new URLSearchParams(location.search)
  // const navigate = useNavigate()
  const createMutation = useMutationCustom({
    query: `/animal-species/`,
    queryKey: ['animal-species', 'create'],
    form: form,
    invalidQuery: ['animal-species'],
    data: {} as Species
  })
  const updateMutation = useMutationCustom({
    query: `/animal-species/${props.id}`,
    queryKey: ['animal-species', String(props.id)],
    form: form,
    invalidQuery: ['animal-species'],
    data: {} as Species,
    method: 'PUT'
  })
  // const client = useQueryClient()

  async function onSubmit(data: SpeciesFormValue) {
    if (props.id) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          props.setOpen(false)

          toast({
            title: 'Update Successfull',
            description: (
              <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
              </pre>
            )
          })
        },
        onError: (data) => {
          if (axios.isAxiosError(data) && data.response) {
            data.response.data.data.forEach(({ field, message }: { field: Path<SpeciesFormValue>; message: string }) =>
              form.setError(field, { type: 'focus', message })
            )
          }
        }
      })
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          props.setOpen(false)

          toast({
            title: 'Create Successfull',
            description: (
              <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
              </pre>
            )
          })
        },
        onError: (data) => {
          if (axios.isAxiosError(data) && data.response) {
            data.response.data.data.forEach(({ field, message }: { field: Path<SpeciesFormValue>; message: string }) =>
              form.setError(field, { type: 'focus', message })
            )
          }
        }
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Species name' {...field} />
              </FormControl>
              <FormDescription>This is the name that will be displayed on species profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Type your message here.' {...field} />
              </FormControl>
              <FormDescription>This is the description that will be displayed on species profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input id='picture' type='file' {...field} value={undefined} />
              </FormControl>
              <FormDescription>This is the image that will be displayed on species profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type='submit'>Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
