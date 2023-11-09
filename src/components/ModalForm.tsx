import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { MdCreate } from 'react-icons/md'
import { Button } from './ui/button'
import { FieldValues, Path, PathValue, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { UseMutationResult, useQueryClient } from 'react-query'
import { Label } from 'flowbite-react'
import { Input } from './ui/input'
import LoadingScreen from './Loading'
import { AxiosError } from 'axios'
import { SelectSearch } from './SelectSearch'
import { DebouncedInput } from './GridShow'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { TicketStatusEnum } from '@/types'

export type PropsFormModal<X, T extends FieldValues> = {
  form: UseFormReturn<T>
  formMutation: UseMutationResult<X, unknown, T, unknown>
  action?: string
  Trigger?: React.ReactNode
  title: string
  fields: Path<T>[]
  invalidQuery?: string[]
}

const ModalForm = <X, T extends FieldValues>({
  form,
  formMutation,
  action,
  title,
  fields,
  Trigger,
  invalidQuery
}: PropsFormModal<X, T>) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const onSubmit: SubmitHandler<T> = async (data) => {
    console.log('reload ne')

    console.log('submit data')
    formMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false),
          invalidQuery &&
            queryClient.invalidateQueries(invalidQuery, {
              exact: true
            })
      },
      onSettled: () => {
        setTimeout(() => {
          formMutation.reset()
        }, 2000)
      }
    })
    console.log(data)
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues
  } = form
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {action ? (
          <Button
            type='submit'
            className='uppercase text-white flex  items-center gap-1 opacity-90  font-bold hover:opacity-100 hover:scale-110 transition-all'
          >
            <>
              <MdCreate className='text-xl ' />
              {action}
            </>
          </Button>
        ) : Trigger ? (
          <button className='flex items-center w-full'>{Trigger}</button>
        ) : (
          <MdCreate className='text-xl ' />
        )}
      </DialogTrigger>
      <DialogContent className='max-h-[400px]  shadow-xl border-secondary flex flex-col gap-1'>
        {formMutation.isLoading && <LoadingScreen label='Submitting'></LoadingScreen>}
        <DialogHeader>
          <DialogTitle className='uppercase pb-2'>{title}</DialogTitle>
          <DialogDescription>
            Fill below form fields to complete this proccess. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 overflow-auto flex flex-col gap-1 '>
          <div className='grid gap-4 py-4 w-full h-full flex-1 overflow-auto px-2'>
            {fields.map((item) => {
              const label = String(item).includes('Id')
                ? String(item).substring(0, String(item).length - 2)
                : String(item)
              switch (item) {
                case 'status': {
                  return (
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor={item} className='text-right capitalize'>
                        {label}
                      </Label>
                      <div className='col-span-3 h-10'>
                        <Select
                          onValueChange={(value) => {
                            setValue(item, value as PathValue<T, Path<T>>)
                          }}
                          value={watch(item)}
                          defaultValue={getValues(item)}
                        >
                          <SelectTrigger className='w-full capitalize' id={item}>
                            <SelectValue placeholder={`Select status here . . .`} />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(TicketStatusEnum).map((item) => (
                              <SelectItem value={item} key={item} className='capitalize'>
                                {item.replace('_', ' ').toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
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
                  )
                }
                case 'areaId':
                  return (
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor={item} className='text-right capitalize'>
                        {label}
                      </Label>
                      <div className='col-span-3 h-10'>
                        <SelectSearch form={form} query='areas' item={item} />
                      </div>
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
                  )
                case 'managedById':
                  return (
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor={item} className='text-right capitalize'>
                        {label}
                      </Label>
                      <div className='col-span-3 h-10'>
                        <SelectSearch form={form} query='accounts/?role=TRAINER' item={item} />
                      </div>
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
                  )
                case 'animalSpeciesId':
                  return (
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor={item} className='text-right capitalize'>
                        {label}
                      </Label>
                      <div className='col-span-3 h-10'>
                        <SelectSearch form={form} query='animal-species' item={item} />
                      </div>
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
                  )
                case 'location':
                  return (
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor={item} className='text-right capitalize'>
                        {'Description'}
                      </Label>
                      <Input
                        id={item}
                        className='col-span-3'
                        placeholder={`Type description here . . .`}
                        {...register(item)}
                      />

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
                  )
                case 'price':
                  return (
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor={item} className='text-right capitalize'>
                        {label}
                      </Label>
                      <DebouncedInput
                        id={item}
                        className='col-span-3'
                        placeholder={`Type price here . . .`}
                        {...register(item)}
                        value={
                          watch(item)
                            ? Number(watch(item)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            : ''
                        }
                        onChange={(value) => {
                          setValue(
                            item,
                            isNaN(Number(value))
                              ? (0 as PathValue<T, Path<T>>)
                              : (Number(value) as PathValue<T, Path<T>>)
                          )
                        }}
                        // debounce={200}
                      />

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
                  )
                default:
                  return (
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor={item} className='text-right capitalize'>
                        {label}
                      </Label>
                      <Input
                        id={item}
                        className='col-span-3'
                        placeholder={`Type ${item} here . . .`}
                        {...register(item)}
                      />

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
                  )
              }
            })}
          </div>
          {formMutation.isError && (
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
                <span className='font-medium px-2'>Response alert! </span>
                {(formMutation.error as AxiosError<{ message: string }>).response?.data?.message}.
              </div>
            </div>
          )}
          <DialogFooter className=''>
            <Button
              type='submit'
              disabled={isSubmitting}
              onClick={() => {
                console.log('click ne'), handleSubmit(onSubmit)
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalForm
