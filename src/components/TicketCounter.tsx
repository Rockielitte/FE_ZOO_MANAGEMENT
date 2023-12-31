import { OrderBeforeSaving, OrderDetailBeforeSaving, Ticket } from '@/types'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const TicketCounter: React.FC<{
  form: UseFormReturn<{
    name: string
    details: {
      ticketId: number
      quantity: number
    }[]
    email: string
    phone: string
    visitDate: Date
  }>
  order: OrderBeforeSaving
  setOrder: React.Dispatch<React.SetStateAction<OrderBeforeSaving>>
  ticket: Ticket
}> = ({ order, setOrder, ticket, form }) => {
  const [value, setValue] = useState(0)
  const deleteOrderDetail = (details: OrderDetailBeforeSaving[]): OrderDetailBeforeSaving[] => {
    return details.filter((detail) => detail.ticketId != ticket.id)
  }
  const addOrderDetail = (details: OrderDetailBeforeSaving[], quantity: number): OrderDetailBeforeSaving[] => {
    return [...details, { ticketId: ticket.id, quantity: quantity, ticketName: ticket.name, ticketPrice: ticket.price }]
  }
  const modifyOrderDetailQuantity = (
    details: OrderDetailBeforeSaving[],
    quantity: number
  ): OrderDetailBeforeSaving[] => {
    return details.map((detail) => {
      if (detail.ticketId == ticket.id) {
        return { ...detail, quantity: quantity }
      }
      return detail
    })
  }
  const handleDecrement = () => {
    const findOrderDetail = order.details.find((detail) => detail.ticketId == ticket.id)
    const newOrder: OrderBeforeSaving = { ...order }
    if (findOrderDetail) {
      if (findOrderDetail.quantity == 1) {
        newOrder.details = deleteOrderDetail(newOrder.details)
      } else {
        newOrder.details = modifyOrderDetailQuantity(newOrder.details, findOrderDetail.quantity - 1)
      }
      setOrder(newOrder)
      form.setValue('details', newOrder.details)
      form.trigger('details')
    }
    if (value > 0) setValue(value - 1)
  }

  const handleIncrement = () => {
    const findOrderDetail = order.details.find((detail) => detail.ticketId == ticket.id)
    const newOrder: OrderBeforeSaving = { ...order }
    if (!findOrderDetail) {
      newOrder.details = addOrderDetail(order.details, 1)
    } else {
      newOrder.details = modifyOrderDetailQuantity(newOrder.details, findOrderDetail.quantity + 1)
    }
    form.setValue('details', newOrder.details)
    form.trigger('details')
    setOrder(newOrder)
    setValue(value + 1)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findOrderDetail = order.details.find((detail) => detail.ticketId == ticket.id)
    const newOrder: OrderBeforeSaving = { ...order }
    if (!e.target.value || e.target.valueAsNumber == 0) {
      setValue(0)
      if (findOrderDetail) newOrder.details = deleteOrderDetail(newOrder.details)
    }
    // else if (e.target.valueAsNumber > 99) {
    //     setValue(99)
    //     if (findOrderDetail) {
    //       newOrder.details = modifyOrderDetailQuantity(newOrder.details, 99)
    //     } else {
    //       newOrder.details = addOrderDetail(order.details, 99)
    //     }
    //   }
    else {
      if (findOrderDetail) {
        newOrder.details = modifyOrderDetailQuantity(newOrder.details, e.target.valueAsNumber)
      } else {
        newOrder.details = addOrderDetail(order.details, e.target.valueAsNumber)
      }
      setValue(e.target.valueAsNumber)
    }
    form.setValue('details', newOrder.details)
    form.trigger('details')
    setOrder(newOrder)
  }

  return (
    <div className='flex gap-2 '>
      <p className=' text-xl cursor-pointer' onClick={() => handleDecrement()}>
        -
      </p>
      <input
        value={value}
        type='number'
        onChange={handleOnChange}
        onKeyDown={(e) => {
          if (e.key === '.') {
            e.preventDefault()
          }
        }}
        className='text-black text-center text-xl place-content-between rounded outline-none place-self-center w-[30px] h-[30px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      />
      <p className=' text-xl cursor-pointer' onClick={() => handleIncrement()}>
        +
      </p>
    </div>
  )
}

export default TicketCounter
