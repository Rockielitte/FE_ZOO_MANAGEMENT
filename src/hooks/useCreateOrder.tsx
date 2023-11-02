// import { toast } from '@/components/ui/use-toast'
// import { OrderFormValues } from '@/pages/tickets'
// import MyOrder from '@/utils/api/MyOrder'

// import axios from 'axios'
// import { useMutation, useQueryClient } from 'react-query'
// interface UseCreateOrder {
//   createOrder: (data: OrderFormValues) => void
//   form?: unknown
// }

// export const useCreateOrder = (form: unknown): UseCreateOrder => {
//   const client = useQueryClient()

//   const { mutateAsync: createOrder } = useMutation({
//     mutationFn: (data: OrderFormValues) => {
//       return MyOrder.createOrder(data)
//     },
//     onSuccess: (data) => {
//       toast({
//         title: 'Create Order successfully. Your order information: ',
//         description: (
//           <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
//             <code className='text-white'>{JSON.stringify(data.data, null, 2)}</code>
//           </pre>
//         )
//       })
//       client.invalidateQueries(['orders'])
//     },
//     onError: (error) => {
//       if (axios.isAxiosError(error)) {
//         error.response?.data.data.forEach(({ field, message }) => form.setError(field, { type: 'focus', message }))
//       }
//       toast({
//         variant: 'destructive',
//         title: 'Uh oh! Something went wrong.',
//         description: error?.response?.data.message
//       })
//     }
//   })

//   return {
//     createOrder: createOrder
//   }
// }
