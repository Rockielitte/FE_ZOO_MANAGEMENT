import { FieldErrors, FieldValues, Path, PathValue, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { SelectSearch } from '../SelectSearch'
import { Input } from './input'
import { Button } from './button'
import { AiTwotoneDelete, AiTwotoneSave } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>
  method?: string
  closeFuntion: (a: boolean) => void
}

const formSchema = z.object({
  id: z.coerce.number(),
  amount: z.coerce.number().min(0.0001, 'Amount should be larger than 0'),
  foodId: z.coerce
    .number({
      invalid_type_error: 'Food is required'
    })
    .min(1)
})
type formSchemaType = z.infer<typeof formSchema>
const AddNewFood = <T extends FieldValues>({ form: bigForm, method = 'create', closeFuntion }: Props<T>) => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0
    }
  })
  const {
    register,
    formState: { isDirty, errors },
    handleSubmit
  } = form
  const submitHandler: SubmitHandler<formSchemaType> = (value) => {
    const newDetails = [...bigForm.getValues('details' as Path<T>)]
    newDetails.push(value)
    console.log(newDetails)
    bigForm.setValue('details' as Path<T>, newDetails as PathValue<T, Path<T>>, {
      shouldDirty: true
    })
    closeFuntion(false)
  }
  return (
    <div className='w-full'>
      <form className='w-full'>
        <div className='w-full flex gap-2 items-center bg-primary p-2 rounded-md shadow-lg'>
          <div className='flex-1 font-light'>
            <SelectSearch form={form} query={`foods`} item='foodId'></SelectSearch>
          </div>
          <div className='w-3/12'>
            <Input
              type='number'
              step={0.01}
              min={0.01}
              placeholder='Quantiy of food'
              {...register('amount')}
              // value={item.amount}
              // onChange={(e) => {
              //   const newDetails = [...form.getValues('details')]
              //   newDetails[index] = { ...item, amount: Number(e.target.value) }
              //   form.setValue('details', newDetails, {
              //     shouldDirty: true
              //   })
              // }}
            />
          </div>
          {isDirty && (
            <Button
              className=' flex items-center text-xs gap-1'
              type='button'
              onClick={handleSubmit(submitHandler)}
              variant={'outline'}
            >
              <AiTwotoneSave className={'text-xl'} />
              Save
            </Button>
          )}
          <Button
            className=' flex items-center text-xs gap-1'
            variant={method == 'create' ? 'outline' : 'destructive'}
            type='button'
            onClick={() => {
              closeFuntion(false)
            }}
          >
            {method !== 'create' ? <AiTwotoneDelete className={'text-xl'} /> : <GiCancel className={'text-xl'} />}

            {method == 'create' ? 'Cancel' : 'Delete'}
          </Button>
        </div>
      </form>
      {['amount', 'foodId'].map((item) => {
        item = item as keyof FieldErrors<formSchemaType>
        return (
          <div className='w-full h-full mt-2'>
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
  )
}

export default AddNewFood
