import { useUserStore } from '@/stores'
import { request } from '@/utils/apiCaller'
import axios from 'axios'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
type Props<T, X extends FieldValues> = {
  queryKey: string[]
  query: string
  data: T
  method?: string
  form: UseFormReturn<X>
  resetData?: X
  invalidQuery?: string[]
  reset?: boolean
}
const useMutationCustom = <T, X extends FieldValues>({
  query,
  queryKey,
  method = 'POST',
  form,
  resetData,
  invalidQuery,
  reset
}: Props<T, X>) => {
  const token = useUserStore((state) => state.user)?.token
  const queryClient = useQueryClient()
  const formMutation = useMutation({
    mutationKey: queryKey,
    mutationFn: (data: X) => {
      return request<T>(
        query,
        method,
        {
          Authorization: `Bearer ${token} `,
          Headers: { 'Content-Type': 'application/json' }
        },
        {},
        data as object
      )
    },
    onSuccess: () => {
      toast.success('Send sucessfully')
      if (resetData) {
        form.reset(resetData)
      }
      if (reset) {
        form.reset()
      }
      if (invalidQuery) {
        queryClient.invalidateQueries({ queryKey: invalidQuery, exact: true })
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        // console.log(error)

        toast.error(error.response?.data?.message || error.message)
      }
    }
  })
  return formMutation
}

export default useMutationCustom
