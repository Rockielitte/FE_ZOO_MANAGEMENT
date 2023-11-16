import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Order, RoleEnum } from '@/types'
import useMutationCustom from '@/hooks/useMutationCustom'
import OrderForm from '@/components/OrderForm'
import useCheckRole from '@/hooks/useCheckRole'
const regexNotSpaceFirst = /^(?:[^ ]|$)/
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const phoneRegex = /^0\d{8,10}$/
const formSchema = z.object({
  email: z
    .string()
    .min(1)
    .regex(regexNotSpaceFirst, 'First character is not a space')
    .regex(emailRegex, 'Email is in invaild format'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(regexNotSpaceFirst, 'First character is not a space')
    .regex(phoneRegex, 'Phone is in invalid Vietnamese format'),
  name: z.string().min(1).regex(regexNotSpaceFirst, 'First character is not a space'),
  visitDate: z.date(),
  details: z
    .object({
      quantity: z.coerce.number().min(0),
      ticketId: z.coerce.number().min(0),
      ticketName: z.string().optional(),
      price: z.coerce.number().min(0).optional()
    })
    .array()
    .min(1, 'Please choose at least 1 ticket to finish your ordering')
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
  const user = useCheckRole()
  return (
    <div className='w-full h-full'>
      <OrderForm
        form={form}
        formMutation={formMutation}
        fields={['name', 'email', 'phone', 'visitDate', 'details']}
        canEdit={['name', 'email', 'phone', 'visitDate', 'details']}
        canAuth={user && user?.role == RoleEnum.ADMIN}
      ></OrderForm>
    </div>
  )
}

export default OrderCreate
