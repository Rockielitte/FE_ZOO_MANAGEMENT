import { toast } from 'react-toastify'

import { AccountFormValues } from '@/pages/dashboard/accounts/components/AccountForm'
import Account from '@/utils/api/Account'
import axios from 'axios'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

interface UseCreateAccount {
  createAccount: (data: AccountFormValues) => void
}

export const useCreateAccount = <T extends FieldValues>(
  form: UseFormReturn<T>,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
): UseCreateAccount => {
  const client = useQueryClient()

  const { mutateAsync: createAccount } = useMutation({
    mutationFn: (data: AccountFormValues) => {
      return Account.createAccount(data)
    },
    onSuccess: () => {
      toast.success('create successfully')

      client.invalidateQueries(['accounts'])
      // window.location.reload()
      setOpenDialog(false)
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
    createAccount
  }
}
