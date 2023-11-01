import useQueryCustom from '@/hooks/useQueryCustom'
import Error from '@/pages/Error'
import { Ticket } from '@/types'
import LoadingScreen from './Loading'
import { TbTicketOff } from 'react-icons/tb'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import OrderTicketTag from './OrderTicketTag'
type Props<T extends FieldValues> = {
  form: UseFormReturn<T>
}
const TickerListOrder = <T extends FieldValues>({ form }: Props<T>) => {
  const ticket_data = useQueryCustom({ query: '/tickets/', queryKey: ['tickets'], data: {} as Ticket })
  return (
    <div className='w-full h-full shadow-2xl'>
      {ticket_data.isError ? (
        <Error />
      ) : !ticket_data.isLoading ? (
        <div className='w-full h-full  overflow-auto  shadow-2xl rounded-sm'>
          {(ticket_data.data as Ticket) ? (
            <div className='flex flex-col gap-2 overflow-auto'>
              {(ticket_data.data as Ticket[]).map((item) => (
                <OrderTicketTag key={item.id} ticket={item} form={form} />
              ))}
            </div>
          ) : (
            <div className='w-full h-full flex justify-center items-center'>
              <div className='w-full h-full rounded-xl bg-secondary shadow-lg border gap-2 flex flex-col justify-center items-center'>
                <TbTicketOff className='text-8xl'></TbTicketOff>
                <span className='uppercase font-bold'>No ticket found</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}

export default TickerListOrder
