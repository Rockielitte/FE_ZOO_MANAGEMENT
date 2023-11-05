import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Popover } from '@radix-ui/react-popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { RiSendPlaneLine } from 'react-icons/ri'
import { UseFormReturn, FieldValues, Path, SubmitHandler, PathValue } from 'react-hook-form'
import { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { BsCart4, BsImages } from 'react-icons/bs'
import { OrderStatusEnum, User } from '@/types'
import { UseMutationResult } from 'react-query'
import { AxiosResponse } from 'axios'
import LoadingScreen from './Loading'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TicketOrderTag from './TicketOrderTag'
import TickerListOrder from './TickerListOrder'
import OrderTicketTag from './OrderTicketTag'
import { MdDeleteOutline } from 'react-icons/md'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'

interface OrderFormProps<T extends FieldValues, R> {
  form: UseFormReturn<T>
  formMutation?: UseMutationResult<unknown, unknown, T>
  formSideMutation?: UseMutationResult<AxiosResponse<R>, unknown, object, unknown>
  fields: Path<T>[]
  canEdit: Path<T>[]
  deleteFn?: UseMutationResult<AxiosResponse<R>, unknown, object, unknown>
}

const OrderForm = <T extends FieldValues, R>({
  deleteFn,
  form,
  formMutation,
  fields,
  canEdit,
  formSideMutation
}: OrderFormProps<T, R>) => {
  const [orderCart, setOrderCart] = useState<'tickets' | 'order'>('order')
  const location = useLocation()
  const id = useParams().id
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue
  } = form

  const onSubmit: SubmitHandler<T> = async (data) => {
    formMutation?.mutate(data, {
      onSuccess: () => {
        navigate(`${queryParams.get('redirect') || '/dashboard/orders/'}`)
      }
    })
    formSideMutation?.mutate(
      { status: data['status'] },
      {
        onSuccess: () => {
          navigate(`${queryParams.get('redirect') || '/dashboard/orders/'}`)
        }
      }
    )
  }
  const orderSum = (
    watch('details' as Path<T>) as {
      quantity: number
      ticketId: number
      price: number | undefined
      ticketName?: string | undefined
    }[]
  )?.reduce(
    (pre, next) => {
      return {
        ticketCount: pre.ticketCount + next.quantity,
        total: pre.total + (next.price ? next.price : 0) * next.quantity
      }
    },
    { ticketCount: 0, total: 0 }
  )
  return (
    <div className='w-full h-full border shadow-xl rounded-lg p-2 overflow-auto flex-col flex '>
      {(formMutation?.isLoading || formSideMutation?.isLoading || deleteFn?.isLoading) && (
        <LoadingScreen label='submitting'></LoadingScreen>
      )}
      <div className=' text-white flex flex-col border-b-2  border-secondary shadow-lg font-ime bg-primary px-5 sm:-m-2 leading-tight rounded-md relative'>
        <span className='text-xl uppercase font-bold tracking-wider pt-1 font-ime min-h-[32px]'>
          {watch('name' as Path<T>) || 'Customer name'}
        </span>
        <span className='font-normal text-base min-h-[24px] tracking-wide font-roboto'>
          {getValues('id' as Path<T>) || 'Order tickets'}
        </span>
        {id && (
          <div className='m-auto flex items-center gap-2 shadow-2xl absolute top-0 right-4 bottom-0 uppercase'>
            <AlertDialog>
              <AlertDialogTrigger>
                <MdDeleteOutline className='text-3xl  font-bold p-1 rounded-full bg-red-500 transition-all hover:scale-125 opacity-50 hover:opacity-100 cursor-pointer' />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className='p-0'>
                    <Button
                      variant={'destructive'}
                      className='w-full'
                      onClick={() => {
                        deleteFn &&
                          deleteFn.mutate(
                            {},
                            {
                              onSuccess(t) {
                                navigate(`${queryParams.get('redirect') || '/dashboard/orders/'}`)
                              }
                            }
                          )
                      }}
                    >
                      Continue
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      <div className='flex-1 flex flex-col-reverse sm:flex-row gap-2  sm:overflow-auto pt-4  sm:px-0'>
        <form className='w-full md:w-3/5 md:h-full relative  ' onSubmit={handleSubmit(onSubmit)}>
          <Button
            type='submit'
            className='absolute flex z-20 items-center gap-1 bottom-1 right-1 sm:right-3 sm:bottom-2 opacity-70  font-bold hover:opacity-100 hover:scale-110 transition-all'
          >
            <RiSendPlaneLine className='text-xl' />
            Submit
          </Button>

          <div className='w-full  md:border-r  flex flex-col  gap-4 px-6 overflow-auto h-full py-2 '>
            {fields.map((item) => {
              const label = String(item).includes('Id')
                ? String(item).substring(0, String(item).length - 2)
                : String(item)
              return (
                <div className='w-full  flex flex-col gap-2 relative ' key={item}>
                  <div className='flex w-full  justify-center  items-center gap-2 '>
                    <Label htmlFor={item} className='min-w-[80px] capitalize text-base'>
                      {label}
                    </Label>
                    {item == 'visitDate' ? (
                      <Popover>
                        <PopoverTrigger asChild id={item} disabled={canEdit.indexOf(item) < 0}>
                          <Button
                            id={item}
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !watch(item) && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {watch(item) ? format(watch(item), 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <Calendar
                            mode='single'
                            selected={watch(item)}
                            onSelect={(value) => {
                              setValue(item, value as PathValue<T, Path<T>>, { shouldValidate: true })
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    ) : item == 'status' ? (
                      <Select
                        onValueChange={(value) => {
                          setValue(item, value as PathValue<T, Path<T>>)
                        }}
                        value={watch(item)}
                        defaultValue={watch(item)}
                        disabled={canEdit.indexOf(item) < 0}
                      >
                        <SelectTrigger className='w-full' id={item}>
                          <SelectValue placeholder={`Select gender here . . .`} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(OrderStatusEnum).map((item) => (
                            <SelectItem value={item} key={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : item == 'details' ? (
                      <Input
                        disabled={canEdit.indexOf(item) < 0}
                        id={item}
                        placeholder={`Type ${item} here . . .`}
                        className='w-full'
                        value={`You chose ${orderSum.ticketCount || 0} tickets costed $${orderSum.total} in total!`}
                      />
                    ) : (
                      <Input
                        disabled={canEdit.indexOf(item) < 0}
                        id={item}
                        placeholder={`Type ${item} here . . .`}
                        className='w-full'
                        {...register(item)}
                      />
                    )}
                  </div>
                  {errors[item]?.message && (
                    <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 ' role='alert'>
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
                        <span className='font-medium'>Danger alert!</span>
                        {errors[item]?.message as string}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </form>
        <div className='border-2 border-dashed my-2 block sm:hidden'></div>
        <div className='w-full md:w-2/5 px-6 flex flex-col gap-4 overflow-auto py-2'>
          <div className='flex items-center gap-1 text-xl font-bold'>
            <Button
              className='flex-1 transition-all duration-500 flex items-center gap-2'
              variant={orderCart == 'tickets' ? 'default' : 'secondary'}
              onClick={() => setOrderCart('tickets')}
              disabled={id != undefined}
            >
              <BsImages className='text-xl'></BsImages>
              Ticket list
            </Button>
            <Button
              className='flex-1 transition-all duration-500  flex items-center gap-2'
              variant={orderCart == 'order' ? 'default' : 'secondary'}
              onClick={() => setOrderCart('order')}
            >
              <AiOutlineCloudUpload className='text-xl' />
              Order Detail
            </Button>
          </div>

          <div className='h-[300px] sm:flex-1 overflow-auto '>
            {orderCart == 'order' ? (
              <div className='w-full h-full'>
                {(
                  getValues('details' as Path<T>) as {
                    quantity: number
                    ticketId: number
                    price: number | undefined
                    ticketName?: string | undefined
                  }[]
                )?.length ? (
                  <div className='h-full flex w-full flex-col gap-2'>
                    <div className='flex-1 flex w-full gap-2 overflow-auto flex-col '>
                      {(
                        watch('details' as Path<T>) as {
                          quantity: number
                          ticketId: number
                          price: number | undefined
                          ticketName?: string | undefined
                        }[]
                      )?.map((item) =>
                        id == undefined ? (
                          <OrderTicketTag
                            key={item.ticketId}
                            ticket={{
                              id: item.ticketId,
                              name: item.ticketName as string,
                              price: item.price as number,
                              description: '',
                              createdBy: {} as User
                            }}
                            form={form}
                          />
                        ) : (
                          <TicketOrderTag {...item} key={item.ticketId} />
                        )
                      )}
                    </div>
                    <div className='flex justify-between px-5 py-2 border  rounded-md bg-primary shadow-xl text-white  '>
                      <span>
                        Amounts: <span className='uppercase font-medium text-xl'>{orderSum?.ticketCount || 0}</span>
                      </span>
                      <span>
                        Total:{' '}
                        <span className='uppercase font-medium text-xl'>
                          ${getValues('total' as Path<T>) || orderSum.total || 0}
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-full h-full rounded-xl bg-secondary shadow-lg border gap-2 flex flex-col justify-center items-center'>
                      <BsCart4 className='text-8xl'></BsCart4>
                      <span className='uppercase font-bold'>No ticket order</span>
                      <p className='text-sm font-light'>
                        Move to <span className='underline font-bold'>TICKET LIST</span> to visit our zoo
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='w-full h-full relative'>
                <TickerListOrder form={form} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderForm
