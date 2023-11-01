import { toast } from '@/components/ui/use-toast'
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
    onSuccess: (data) => {
      toast({
        title: 'Create Account successfully Your account information: ',

        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data.data, null, 2)}</code>
          </pre>
        )
      })

      client.invalidateQueries(['accounts'])
      // window.location.reload()
      setOpenDialog(false)
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        error.response.data.data.forEach(({ field, message }: { field: string; message: string }) =>
          form.setError(field as Path<T>, { type: 'focus', message })
        )
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.message
        })
      }
    }
  })

  return {
    createAccount
  }
}
