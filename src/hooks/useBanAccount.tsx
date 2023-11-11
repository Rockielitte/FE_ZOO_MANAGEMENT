import Account from '@/utils/api/Account'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
interface BanAccount {
  status: string
  id: string
}

interface UseBanAccount {
  banAccount: (data: BanAccount) => void
}

export const useBanAccount = (): UseBanAccount => {
  const client = useQueryClient()
  const navigate = useNavigate()
  const { mutateAsync: banAccount } = useMutation({
    mutationFn: (data: BanAccount) => {
      return Account.banAccount(data.status, data.id)
    },
    onSuccess: (data) => {
      client.invalidateQueries(['accounts'])

      if (data.data.status == 'ACTIVE') {
        toast.success('Active successful!')
      } else {
        toast.success('Banned!')
      }

      navigate('/dashboard/accounts')
      // window.location.reload()
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error('Failed')
      }
    }
  })

  return {
    banAccount
  }
}
