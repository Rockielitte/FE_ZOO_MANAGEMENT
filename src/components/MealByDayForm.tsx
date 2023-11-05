import { FeedStatusEnum, MealReCord } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, SubmitHandler, Path } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { AiTwotoneSave } from 'react-icons/ai'

import useSideMutation from '@/hooks/useSideMutation'

import { Skeleton } from './ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Props = {
  mealItem?: MealReCord
}
const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
const formSchema = z.object({
  time: z.string().regex(regex).length(5),
  food: z.string().min(1),
  status: z.nativeEnum(FeedStatusEnum)
})
type formSchemaType = z.infer<typeof formSchema>
const MealByDateForm: React.FC<Props> = ({ mealItem }) => {
  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
    getValues,
    setValue
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: mealItem?.time?.substring(11, 16) || '00:00',
      food: mealItem?.food || 'worl',
      status: mealItem?.status
    }
  })
  const formMutation = useSideMutation({
    query: `/meal-records/${mealItem?.id}`,
    queryKey: ['meal-records', String(mealItem?.id)],
    returnType: {} as MealReCord,
    method: 'PUT'
  })

  const submitHandler: SubmitHandler<formSchemaType> = async (data) => {
    console.log('asdkfj', data)

    formMutation.mutate(
      {
        status: data.status
      },
      {
        onSuccess: () => {
          reset(data)
        }
      }
    )
  }
  // React.useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
  //   }
  // }, [isSubmitSuccessful, reset])

  return (
    <div className='w-full'>
      <div className='flex justify-items-center items-center gap-2 uppercase text-center text-sm  rounded-lg '>
        {formMutation.isLoading ? (
          <Skeleton className='w-full h-14' />
        ) : (
          <div className='w-full  '>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className='flex justify-items-center font-bold items-center gap-2 uppercase text-center text-sm border p-2 rounded-lg shadow-lg'>
                <div className='w-3/12'>
                  <Input placeholder='HH:MM' {...register('time')} readOnly />
                </div>
                <div className='flex-1 font-light'>
                  <Input placeholder='Foods for feed' {...register('food')} readOnly />
                </div>
                <Select
                  defaultValue={getValues('status')}
                  // value={getValues('status')}
                  onValueChange={(value) => {
                    setValue('status', value as FeedStatusEnum, { shouldDirty: true })
                  }}
                >
                  <SelectTrigger className='w-3/12 capitalize '>
                    <SelectValue placeholder='Status' className='capitalize' />
                  </SelectTrigger>
                  <SelectContent className='w-full z-20 '>
                    {Object.keys(FeedStatusEnum).map((item) => {
                      return (
                        <SelectItem value={String(item)} key={item} className='capitalize'>
                          {item.replace('_', '  ').toLocaleLowerCase()}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                {isDirty && (
                  <Button className=' flex items-center text-xs gap-1' type='submit'>
                    <AiTwotoneSave className={'text-xl'} />
                    Save
                  </Button>
                )}
              </div>
            </form>

            {(['time', 'food', 'status'] as Path<formSchemaType>[]).map((item) => (
              <div className='w-full '>
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
      </div>
    </div>
  )
}

export default MealByDateForm
