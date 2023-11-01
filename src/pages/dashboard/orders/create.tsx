import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Order } from '@/types'
import useMutationCustom from '@/hooks/useMutationCustom'
import OrderForm from '@/components/OrderForm'
const formSchema = z.object({
  email: z.string().min(1),
  phone: z.string().min(1),
  name: z.string().min(1),
  visitDate: z.date(),
  details: z
    .object({
      quantity: z.coerce.number().min(0),
      ticketId: z.coerce.number().min(0),
      ticketName: z.string().optional(),
      price: z.coerce.number().min(0).optional()
    })
    .array()
    .min(1)
})
export type FormSchemaType = z.infer<typeof formSchema>
const OrderCreate = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      phone: '',
      name: '',
      visitDate: new Date(),
      details: []
    }
  })
  const formMutation = useMutationCustom({
    query: `/orders/`,
    method: 'POST',
    queryKey: ['orders'],
    form: form,
    reset: true,
    data: {} as Order
  })
  return (
    <div className='w-full h-full'>
      <OrderForm
        form={form}
        formMutation={formMutation}
        fields={['name', 'email', 'phone', 'visitDate', 'details']}
        canEdit={['name', 'email', 'phone', 'visitDate', 'details']}
      ></OrderForm>
    </div>
  )
}

export default OrderCreate
