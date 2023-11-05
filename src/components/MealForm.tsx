import { CageMeal } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, SubmitHandler, Path } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { AiTwotoneDelete, AiTwotoneSave } from 'react-icons/ai'
import useMutationCustom from '@/hooks/useMutationCustom'
import useSideMutation from '@/hooks/useSideMutation'
import { AxiosError } from 'axios'
import { useQueryClient } from 'react-query'
import { Skeleton } from './ui/skeleton'
import { GiCancel } from 'react-icons/gi'

type Props = {
  mealItem?: CageMeal
  cageId: number
  createFn?: React.Dispatch<React.SetStateAction<boolean>>
  method?: string
}
const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
const formSchema = z.object({
  time: z.string().regex(regex).length(5),
  food: z.string().min(1),
  cageId: z.number()
})
type formSchemaType = z.infer<typeof formSchema>
const MealForm = ({ mealItem, cageId, createFn, method }: Props) => {
  const queryClient = useQueryClient()
  const {
    register,
    formState: { isDirty, errors, isSubmitSuccessful },
    handleSubmit,
    reset,
    getValues
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: mealItem?.time.substring(11, 16),
      food: mealItem?.food,
      cageId: cageId
    }
  })
  const formMutation = useSideMutation({
    query: `/cage-meals/${method == 'create' ? '' : mealItem?.id}`,
    queryKey: ['cage-meals', String(mealItem?.id)],
    returnType: {} as CageMeal,
    method: method == 'create' ? 'POST' : 'PUT'
  })
  const formMutationDel = useSideMutation({
    query: `/cage-meals/${mealItem?.id}`,
    queryKey: ['cage-meals', String(mealItem?.id)],
    returnType: {} as CageMeal,
    method: 'DELETE'
  })
  const handleDelete = () => {
    if (method != 'create')
      formMutationDel.mutate(
        {},
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['cage-meals', String(cageId)], { exact: true })
          }
        }
      )
    else {
      createFn && createFn(false)
    }
  }
  const submitHandler: SubmitHandler<formSchemaType> = async (data) => {
    const time = new Date().toISOString()
    const newTime = time.slice(0, 11) + data.time + ':23.769670Z'
    const body = { ...data, time: newTime }
    formMutation.mutate(body, {
      onSuccess: () => {
        reset(data)

        if (method == 'create') {
          queryClient.invalidateQueries(['cage-meals', String(cageId)], { exact: true })
          createFn && createFn(false)
        }
      }
    })
  }
  return (
    <>
      {formMutation.isLoading || formMutationDel.isLoading ? (
        <Skeleton className='w-full h-14' />
      ) : (
        <div className='w-full '>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='flex justify-items-center font-bold items-center gap-2 uppercase text-center text-sm border p-2 rounded-lg shadow-xl'
          >
            <div className='w-3/12'>
              <Input placeholder='HH:MM' {...register('time')} />
            </div>
            <div className='flex-1 font-light'>
              <Input placeholder='Foods for feed' {...register('food')} />
            </div>
            {isDirty && (
              <Button className=' flex items-center text-xs gap-1' type='submit' variant={'outline'}>
                <AiTwotoneSave className={'text-xl'} />
                Save
              </Button>
            )}
            <Button
              className=' flex items-center text-xs gap-1'
              variant={method == 'create' ? 'outline' : 'destructive'}
              type='button'
              onClick={handleDelete}
            >
              {method !== 'create' ? <AiTwotoneDelete className={'text-xl'} /> : <GiCancel className={'text-xl'} />}

              {method == 'create' ? 'Cancel' : 'Delete'}
            </Button>
          </form>
          {(['time', 'food'] as Path<formSchemaType>[]).map((item) => (
            <div className='w-full h-full'>
              {errors[item] && (
                <div
                  className='col-span-4 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 '
                  role='alert'
                >
                  <svg
                    className='flex-shrink-0 inline w-4 h-4 mr-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                  </svg>
                  <span className='sr-only'>Info</span>
                  <div>
                    <span className='font-medium'>Validation alert! </span>
                    {errors[item]?.message as string}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default MealForm
