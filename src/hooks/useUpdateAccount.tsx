import { toast } from '@/components/ui/use-toast'
import { AccountFormValues } from '@/pages/dashboard/accounts/components/AccountForm'
import Account from '@/utils/api/Account'
import axios from 'axios'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
interface UseUpdateAccount {
  updateAccount: (data: AccountFormValues) => void
}

export const useUpdateAccount = <T extends FieldValues>(form: UseFormReturn<T>, id: string): UseUpdateAccount => {
  const client = useQueryClient()

  const { mutateAsync: updateAccount } = useMutation({
    mutationFn: (data: AccountFormValues) => {
      return Account.updateAccount(data, id)
    },
    onSuccess: (data) => {
      toast({
        title: 'Update Account successfully Your account information: ',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data.data, null, 2)}</code>
          </pre>
        )
      })
      client.invalidateQueries({
        queryKey: ['accounts', id, 'accountDetail']
      })
      window.location.reload()
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
    updateAccount
  }
}
