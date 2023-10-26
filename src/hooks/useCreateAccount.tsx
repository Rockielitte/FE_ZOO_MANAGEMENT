import { toast } from '@/components/ui/use-toast'
import { AccountFormValues } from '@/pages/dashboard/accounts/components/AccountForm'
import Account from '@/utils/api/Account'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
interface UseCreateAccount {
  createAccount: (data: AccountFormValues) => void
  form?: any
}

export const useCreateAccount = (
  form,
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
      client.invalidateQueries(['account'])
      setOpenDialog(false)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        error.response.data.data.forEach(({ field, message }) => form.setError(field, { type: 'focus', message }))
      }
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response.data.message
      })
    }
  })

  return {
    createAccount
  }
}
