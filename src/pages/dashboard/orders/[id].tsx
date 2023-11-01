import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useEffect, useMemo } from 'react'
import { Order, OrderStatusEnum } from '@/types'
import { useParams } from 'react-router-dom'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
import useQueryCustom from '@/hooks/useQueryCustom'
import OrderForm from '@/components/OrderForm'
import useSideMutation from '@/hooks/useSideMutation'
const formSchema = z.object({
  id: z.string(),
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  total: z.coerce.number(),
  visitDate: z.date(),
  status: z.nativeEnum(OrderStatusEnum),
  details: z
    .object({
      quantity: z.coerce.number().min(0),
      ticketId: z.coerce.number().min(0),
      ticketName: z.string().optional(),
      price: z.coerce.number().min(0).optional()
    })
    .array()
})
export type FormSchemaType = z.infer<typeof formSchema>
const OrderDetail = () => {
  const id = useParams().id
  const order_data = useQueryCustom({
    query: `/orders/${id}`,
    queryKey: ['animals', String(id)],
    data: {} as Order,
    dataRes: {} as Order
  })

  const orderDataForm = useMemo(() => {
    if (order_data.data) {
      const data = order_data.data as Order
      const details = data.details.map((item) => ({
        quantity: item.quantity,
        ticketId: item.ticket.id,
        price: item.ticket.price,
        ticketName: item.ticket.name
      }))
      const order: FormSchemaType = {
        id: data.id,
        email: data.email,
        phone: data.phone,
        name: data.name,
        total: data.total,
        visitDate: new Date(data.visitDate),
        status: data.status,
        details: details
      }
      return order
    }
  }, [order_data.data])
  useEffect(() => {
    form.reset(orderDataForm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDataForm])
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: orderDataForm
  })
  const formMutation = useSideMutation({
    query: `/orders/${id}`,
    method: 'PUT',
    queryKey: ['orders', String(id)],
    returnType: {} as Order
  })
  return (
    <div className='w-full h-full'>
      {order_data.isError ? (
        <Error></Error>
      ) : !order_data.isLoading ? (
        <OrderForm
          form={form}
          formSideMutation={formMutation}
          fields={['id', 'name', 'email', 'phone', 'visitDate', 'status', 'total']}
          canEdit={['status']}
        ></OrderForm>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )
}

export default OrderDetail
