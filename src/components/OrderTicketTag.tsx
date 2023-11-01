import { useState } from 'react'
import logo from '@/assets/logo/white.svg'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { Ticket } from '@/types'
import _ from 'lodash'
import { Input } from './ui/input'
import { Label } from './ui/label'
type Props<T extends FieldValues> = {
  form: UseFormReturn<T>
  ticket: Ticket
}

const OrderTicketTag = <T extends FieldValues>({ form, ticket }: Props<T>) => {
  const [count, setCount] = useState(() => {
    const detail =
      (form?.getValues('details' as Path<T>) as {
        quantity: number
        ticketId: number
        price: number | undefined
        ticketName: string | undefined
      }[]) || []
    const ticketInfor = _.find(detail, { ticketId: ticket.id })
    if (ticketInfor) return ticketInfor.quantity
    return 0
  })
  return (
    <div className='w-full flex gap-4 p-4 shadow-lg  rounded-md items-center border-dashed border-2 '>
      <img alt='' src={logo} className='w-2/12 h-auto p-2  rounded-md  bg-primary shadow-2xl border' />
      <div className='flex-1 flex flex-col justify-between font-normal gap-2'>
        <span className='font-medium '>Ticket for {ticket.name}</span>
        <div className='flex gap-2 items-center'>
          <Label htmlFor='amount'>Amount:</Label>
          <Input
            className='px-2 w-20 h-6'
            placeholder='amount'
            type='number'
            min={0}
            value={count}
            onChange={(e) => {
              const count = Number(e.target.value) >= 0 ? Number(e.target.value) : 0
              setCount(count)
              const currentdetail =
                (form?.getValues('details' as Path<T>) as {
                  quantity: number
                  ticketId: number
                  price?: number
                  ticketName?: string
                }[]) || []
              let newDetail: typeof currentdetail = []
              const index = _.findIndex(currentdetail, { ticketId: ticket.id })
              console.log(index, 'idex ne')

              if (index >= 0) {
                if (count == 0) {
                  currentdetail.splice(index, 1)
                  newDetail = [...currentdetail]
                } else {
                  currentdetail.splice(index, 1, {
                    ticketId: ticket.id,
                    quantity: count,
                    ticketName: ticket.name,
                    price: ticket.price
                  })
                  newDetail = [...currentdetail]
                }
              } else {
                currentdetail.push({
                  ticketId: ticket.id,
                  quantity: count,
                  ticketName: ticket.name,
                  price: ticket.price
                })
                newDetail = [...currentdetail]
              }
              console.log(newDetail, 'new detail ne')

              form?.setValue('details' as Path<T>, newDetail as PathValue<T, Path<T>>, {
                shouldValidate: true
              })
            }}
            id='amount'
          />
        </div>
      </div>
      <div className='text-xl font-semibold'>${count * ticket.price}</div>
    </div>
  )
}

export default OrderTicketTag
