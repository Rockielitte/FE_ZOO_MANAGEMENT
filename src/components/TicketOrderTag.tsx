import logo from '@/assets/logo/white.svg'
type Props = {
  quantity: number
  ticketId: number
  price: number | undefined
  ticketName?: string | undefined
}

const TicketOrderTag = ({ quantity, price, ticketName }: Props) => {
  return (
    <div className='w-full flex gap-4 p-4 shadow-lg  rounded-md items-center border-dashed border-2'>
      <img alt='' src={logo} className='w-2/12 h-auto p-2  rounded-md  bg-primary shadow-2xl border' />
      <div className='flex-1 flex flex-col justify-between font-normal gap-2'>
        <span className='font-medium '>Ticket for {ticketName}</span>
        <span className='text-sm'>Quantity: {quantity}</span>
      </div>
      <div className='text-xl font-semibold'>
        {(price || 0 * quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </div>
    </div>
  )
}

export default TicketOrderTag
