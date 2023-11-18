import { AnimalMeal, AnimalMealRecord, FeedStatusEnum } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm, SubmitHandler, Path, FieldErrors } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { AiTwotoneDelete, AiTwotoneSave } from 'react-icons/ai'
import useSideMutation from '@/hooks/useSideMutation'
import { useQueryClient } from 'react-query'
import { Skeleton } from './ui/skeleton'
import { GiCancel } from 'react-icons/gi'
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import axios from 'axios'
import { SelectSearch } from './SelectSearch'
import { IoCreate } from 'react-icons/io5'
import AddNewFood from './ui/AddNewFood'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Props = {
  mealItem?: AnimalMeal
  animalId: number
  createFn?: React.Dispatch<React.SetStateAction<boolean>>
  method?: string
  isMealRecord?: boolean
  mealRecord?: AnimalMealRecord
}
const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
// const regexNotSpaceFirst = /^(?:[^ ]|$)/
const formSchema = z.object({
  time: z.string().regex(regex, 'Time is invalid format, ex: 08:21').length(5),
  id: z.coerce.number().min(0),
  status: z.nativeEnum(FeedStatusEnum),
  details: z
    .object({
      id: z.coerce.number().min(0),
      amount: z.coerce.number().min(0.0001, 'Amount should be larger than 0'),
      foodId: z.coerce.number().min(1)
    })
    .array()
    .min(1, 'Add at least one food to complete this process')
})
type formSchemaType = z.infer<typeof formSchema>
const AnimalMealForm = ({ mealItem, animalId, createFn, method, isMealRecord = false, mealRecord }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: mealItem?.time.substring(11, 16),
      details: mealItem?.details.map((item) => {
        const newItem = {
          ...item,
          foodId: item.food?.id
        }
        delete newItem.food
        return newItem
      }),
      id: mealItem?.id,
      status: mealRecord?.status || FeedStatusEnum.NOT_FEED
    }
  })
  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
    setError,
    reset
  } = form
  const handleDeleteFood = (index: number) => {
    const newDetails = [...form.getValues('details')]
    newDetails.splice(index, 1)
    form.setValue('details', newDetails, {
      shouldDirty: true,
      shouldValidate: true
    })
  }
  const formMutation = useSideMutation({
    query: isMealRecord ? `/meal-records/${mealRecord?.id}` : `/meals/${method == 'create' ? '' : mealItem?.id}`,
    queryKey: ['meals', String(mealItem?.id)],
    returnType: {} as AnimalMeal,
    method: method == 'create' ? 'POST' : 'PUT'
  })
  const formMutationDel = useSideMutation({
    query: `/meals/${mealItem?.id}`,
    queryKey: ['meals', String(mealItem?.id)],
    returnType: {} as AnimalMeal,
    method: 'DELETE'
  })
  const handleDelete = () => {
    if (method != 'create')
      formMutationDel.mutate(
        {},
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['meals', String(animalId)], { exact: true })
          }
        }
      )
    else {
      createFn && createFn(false)
    }
  }
  const submitHandler: SubmitHandler<formSchemaType> = async (data) => {
    console.log('save ne')

    const time = new Date().toISOString()
    const newTime = time.slice(0, 11) + data.time + ':23.769670Z'
    const body = { ...data, time: newTime, animalId: animalId }
    formMutation.mutate(body, {
      onSuccess: () => {
        reset(data)
        queryClient.invalidateQueries(['meals', String(animalId)], { exact: true })
        createFn && createFn(false)
        if (isMealRecord) queryClient.invalidateQueries(['meal-records', String(animalId)])
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response?.data?.data) {
          error.response.data.data.forEach(({ field, message }: { field: string; message: string }) =>
            setError(field as Path<formSchemaType>, { type: 'focus', message })
          )
        }
      }
    })
  }
  const [showCreate, setShowCreate] = useState(false)
  return (
    <>
      {/* {formMutation.isLoading || formMutationDel.isLoading ? ( */}
      {formMutation.isLoading ? (
        <Skeleton className='w-full h-14 ' />
      ) : (
        <div className='w-full py-2 px-2 shadow-xl '>
          <AccordionItem value={String(mealItem?.id)} className='w-full border-b-4 border-dashed border-primary '>
            <form onSubmit={handleSubmit(submitHandler)} className='w-full'>
              <div className='flex justify-items-center font-bold items-center gap-2 uppercase text-center text-sm border p-2 rounded-lg shadow-xl'>
                <div className='w-3/12'>
                  <Input placeholder='HH:MM' {...register('time')} readOnly={isMealRecord} />
                </div>
                <div className='flex-1 font-light'>
                  <AccordionTrigger className='w-full text-center flex justify-center gap-2 text-xs uppercase no-underline'>
                    {form.getValues('details').length} foods
                  </AccordionTrigger>
                </div>
                {isDirty && (
                  <Button className=' flex items-center text-xs gap-1' type='submit' variant={'outline'}>
                    <AiTwotoneSave className={'text-xl'} />
                    Save
                  </Button>
                )}
                {!isMealRecord ? (
                  <Button
                    className=' flex items-center text-xs gap-1'
                    variant={method == 'create' ? 'outline' : 'destructive'}
                    type='button'
                    onClick={handleDelete}
                  >
                    {method !== 'create' ? (
                      <AiTwotoneDelete className={'text-xl'} />
                    ) : (
                      <GiCancel className={'text-xl'} />
                    )}

                    {method == 'create' ? 'Cancel' : 'Delete'}
                  </Button>
                ) : (
                  <Select
                    defaultValue={FeedStatusEnum.NOT_FEED}
                    value={form.watch('status')}
                    onValueChange={(value) => {
                      form.setValue('status', value as FeedStatusEnum, {
                        shouldDirty: true
                      })
                    }}
                  >
                    <SelectTrigger className='w-4/12'>
                      <SelectValue placeholder='Feeding status' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(FeedStatusEnum).map((item) => (
                        <SelectItem value={item} key={item} className='uppercase'>
                          {item.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <AccordionContent className='w-full bg-secondary p-2 shadow-lg rounded-lg my-2 flex flex-col gap-2 overflow-visible '>
                {!isMealRecord && (
                  <Button
                    className=' flex items-center text-xs gap-1 text-white w-full'
                    variant={'default'}
                    type='button'
                    onClick={() => {
                      setShowCreate(true)
                    }}
                  >
                    {<IoCreate className={'text-xl '} />}
                    Add foods
                  </Button>
                )}
                {showCreate && (
                  <div>
                    <AddNewFood form={form} closeFuntion={setShowCreate}></AddNewFood>
                  </div>
                )}
                {form.getValues('details') &&
                  form.getValues('details').map((item, index) => {
                    return (
                      <div className='w-full flex gap-2 items-center'>
                        <div className='flex-1 relative '>
                          {isMealRecord && <div className='absolute inset-0 z-20 cursor-not-allowed'></div>}
                          <SelectSearch
                            form={form}
                            query={`foods`}
                            item='details'
                            value={String(item.foodId)}
                            indexKey={index}
                            itemObject={item}
                            // disabled={isMealRecord}
                          ></SelectSearch>
                        </div>
                        <div className='w-3/12'>
                          <Input
                            readOnly={isMealRecord}
                            type='number'
                            step={0.01}
                            min={0.01}
                            placeholder='Quantiy of food'
                            value={item.amount}
                            onChange={(e) => {
                              const newDetails = [...form.getValues('details')]
                              newDetails[index] = { ...item, amount: Number(e.target.value) }
                              form.setValue('details', newDetails, {
                                shouldDirty: true
                              })
                            }}
                          />
                        </div>
                        {!isMealRecord && (
                          <Button
                            className=' flex items-center text-xs gap-1'
                            variant={method == 'create' ? 'outline' : 'destructive'}
                            type='button'
                            onClick={() => {
                              handleDeleteFood(index)
                            }}
                          >
                            {method !== 'create' ? (
                              <AiTwotoneDelete className={'text-xl'} />
                            ) : (
                              <GiCancel className={'text-xl'} />
                            )}
                          </Button>
                        )}
                      </div>
                    )
                  })}
              </AccordionContent>
            </form>
          </AccordionItem>
          {['time', 'details'].map((item) => {
            item = item as keyof FieldErrors<formSchemaType>
            return (
              <div className='w-full h-full'>
                {errors[item as keyof FieldErrors<formSchemaType>] && (
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
                      {errors[item as keyof FieldErrors<formSchemaType>]?.message as string}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default AnimalMealForm
