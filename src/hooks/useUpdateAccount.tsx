import { AccountFormValues } from '@/pages/dashboard/accounts/components/AccountForm'
import Account from '@/utils/api/Account'
import axios from 'axios'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface UseUpdateAccount {
  updateAccount: (data: AccountFormValues) => void
}

export const useUpdateAccount = <T extends FieldValues>(form: UseFormReturn<T>, id: string): UseUpdateAccount => {
  const client = useQueryClient()
  const navigate = useNavigate()
  const { mutateAsync: updateAccount } = useMutation({
    mutationFn: (data: AccountFormValues) => {
      return Account.updateAccount(data, id)
    },
    onSuccess: () => {
      toast.success('Update Successfully')

      client.invalidateQueries({
        queryKey: ['accounts', id, 'accountDetail']
      })
      navigate('/dashboard/accounts')
      window.location.reload()
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
    updateAccount
  }
}
