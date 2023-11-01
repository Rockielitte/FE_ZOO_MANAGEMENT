import { OrderFormValues } from '@/pages/tickets'
import MyOrder from '@/utils/api/MyOrder'

import axios from 'axios'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
interface UseCreateOrder {
  createOrder: (data: OrderFormValues) => void
}

export const useCreateOrder = <T extends FieldValues>(form: UseFormReturn<T>): UseCreateOrder => {
  const client = useQueryClient()

  const { mutateAsync: createOrder } = useMutation({
    mutationFn: (data: OrderFormValues) => {
      return MyOrder.createOrder(data)
    },
    onSuccess: () => {
      toast.success('create successfully')
      client.invalidateQueries(['orders'])
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        error.response.data.data.forEach(({ field, message }: { field: string; message: string }) =>
          form.setError(field as Path<T>, { type: 'focus', message })
        )
        toast.error('Failed')
      }
    }
  })

  return {
    createOrder: createOrder
  }
}
