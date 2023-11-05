import { FieldValues, Path, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { UseMutationResult, useQueryClient } from 'react-query'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { AxiosError } from 'axios'
import { Button } from './ui/button'
import CageMealTabe from './CageMealTabe'
import { SelectSearch } from './SelectSearch'
import LoadingScreen from './Loading'

type Props<X, T extends FieldValues> = {
  form: UseFormReturn<T>
  formMutation: UseMutationResult<X, unknown, T, unknown>
  fields: Path<T>[]
}

const MealCage = <X, T extends FieldValues>({ form, formMutation, fields }: Props<X, T>) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = form
  const queryClient = useQueryClient()
  const onSubmit: SubmitHandler<T> = async (data) => {
    console.log('submit data', data)
    formMutation.mutate(data, {
      onSettled: () => {
        setTimeout(() => {
          formMutation.reset()
        }, 2000)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['cages'], {
          exact: true
        })
      }
    })
    console.log(data)
  }
  return (
    <div className='border w-full h-full rounded-xl shadow-md p-2 flex flex-col-reverse md:flex-row  gap-2 overflow-auto'>
      <div className='md:h-full w-full md:w-1/2  border p-2 shadow-xl rounded-lg relative'>
        {formMutation.isLoading && <LoadingScreen label='Submitting' />}
        <form onSubmit={handleSubmit(onSubmit)} className='overflow-auto flex flex-col gap-1 w-full h-full '>
          <div className='flex flex-col gap-4 py-4 w-full flex-1 overflow-auto px-2'>
            {fields.map((item) => {
              const label = String(item).includes('Id')
                ? String(item).substring(0, String(item).length - 2)
                : String(item)
              switch (item) {
                case 'areaId':
                  return (
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor={item} className='text-right capitalize'>
                        {label}
                      </Label>
                      <div className='col-span-3' id={item}>
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
                      <div className='col-span-3 h-10' id={item}>
                        <SelectSearch form={form} query='accounts' item={item} />
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
                      <div className='col-span-3 h-10' id={item}>
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

          <Button
            type='submit'
            disabled={isSubmitting}
            onClick={() => {
              console.log('click ne'), handleSubmit(onSubmit)
            }}
          >
            Submit
          </Button>
        </form>
      </div>
      <div className='md:h-full md:w-1/2 w-full p-2 shadow-2xl border rounded-lg '>
        <div className='flex w-full md:h-full flex-col gap-2 '>
          <CageMealTabe />
        </div>
      </div>
    </div>
  )
}

export default MealCage
