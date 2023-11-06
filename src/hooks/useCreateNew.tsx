import { PostCreationRequest } from '@/components/Editor'

import News from '@/utils/api/New'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
interface UseCreateNew {
  createNew: (data: PostCreationRequest) => void
}

export const useCreateNew = (): UseCreateNew => {
  const client = useQueryClient()
  const navigae = useNavigate()
  const { mutateAsync: createNew } = useMutation({
    mutationFn: async ({ title, content }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content }
      const { data } = await News.createNew(payload)
      return data
    },
    onError: () => {
      toast.error('Failed')
    },
    onSuccess: () => {
      client.invalidateQueries(['news'])
      toast.success('create successfully')

      // form.re
      navigae('/dashboard/news')
    }
  })
  return {
    createNew
  }
}
