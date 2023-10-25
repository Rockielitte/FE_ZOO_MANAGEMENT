import { Order, OrderDetail, Ticket } from '@/types'
import { useState } from 'react'

const TicketCounter: React.FC<{
  order: Order
  setOrder: React.Dispatch<React.SetStateAction<Order>>
  ticket: Ticket
}> = ({ order, setOrder, ticket }) => {
  const [value, setValue] = useState(0)
  const deleteOrderDetail = (details: OrderDetail[]): OrderDetail[] => {
    return details.filter((detail) => detail.ticketId != ticket.id)
  }
  const addOrderDetail = (details: OrderDetail[], quantity: number): OrderDetail[] => {
    return [...details, { ticketId: ticket.id, quantity: quantity, ticketName: ticket.name, ticketPrice: ticket.price }]
  }
  const modifyOrderDetalQuantity = (details: OrderDetail[], quantity: number): OrderDetail[] => {
    return details.map((detail) => {
      if (detail.ticketId == ticket.id) {
        return { ...detail, quantity: quantity }
      }
      return detail
    })
  }
  const handleDecrement = () => {
    const findOrderDetail = order.details.find((detail) => detail.ticketId == ticket.id)
    const newOrder: Order = { ...order }
    if (findOrderDetail) {
      if (findOrderDetail.quantity == 1) {
        newOrder.details = deleteOrderDetail(newOrder.details)
      } else {
        newOrder.details = modifyOrderDetalQuantity(newOrder.details, findOrderDetail.quantity - 1)
      }
      setOrder(newOrder)
    }
    if (value > 0) setValue(value - 1)
  }

  const handleIncrement = () => {
    const findOrderDetail = order.details.find((detail) => detail.ticketId == ticket.id)
    const newOrder: Order = { ...order }
    if (!findOrderDetail) {
      newOrder.details = addOrderDetail(order.details, 1)
    } else {
      newOrder.details = modifyOrderDetalQuantity(
        newOrder.details,
        findOrderDetail.quantity + 1 > 99 ? 99 : findOrderDetail.quantity + 1
      )
    }
    setOrder(newOrder)
    if (value >= 99) setValue(99)
    else setValue(value + 1)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findOrderDetail = order.details.find((detail) => detail.ticketId == ticket.id)
    const newOrder: Order = { ...order }
    if (!e.target.value || e.target.valueAsNumber == 0) {
      setValue(0)
      if (findOrderDetail) newOrder.details = deleteOrderDetail(newOrder.details)
    } else if (e.target.valueAsNumber > 99) {
      setValue(99)
      if (findOrderDetail) {
        newOrder.details = modifyOrderDetalQuantity(newOrder.details, 99)
      } else {
        newOrder.details = addOrderDetail(order.details, 99)
      }
    } else {
      if (findOrderDetail) {
        newOrder.details = modifyOrderDetalQuantity(newOrder.details, e.target.valueAsNumber)
      } else {
        newOrder.details = addOrderDetail(order.details, e.target.valueAsNumber)
      }
      setValue(e.target.valueAsNumber)
    }
    setOrder(newOrder)
  }

  return (
    <div className='flex gap-2 '>
      <p className=' text-[30px] cursor-pointer' onClick={() => handleDecrement()}>
        -
      </p>
      <input
        value={value}
        type='number'
        onChange={handleOnChange}
        className='text-black text-center text-2xl place-content-between rounded outline-none place-self-center w-[30px] h-[30px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      />
      <p className=' text-[30px] cursor-pointer' onClick={() => handleIncrement()}>
        +
      </p>
    </div>
  )
}

export default TicketCounter
