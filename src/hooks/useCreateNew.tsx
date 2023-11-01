import { PostCreationRequest } from '@/components/Editor'
import { toast } from '@/components/ui/use-toast'
import News from '@/utils/api/New'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
interface UseCreateNew {
  createNew: (data: PostCreationRequest) => void
}

export const useCreateNew = (): UseCreateNew => {
  const client = useQueryClient()
  const navigae = useNavigate()
  const { mutate: createNew } = useMutation({
    mutationKey: ['createNew'],
    mutationFn: async ({ title, content }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content }
      const { data } = await News.createNew(payload)
      return data
    },
    onError: () => {
      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not published. Please try again.',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      client.invalidateQueries(['news', 'newDetail'])

      // form.re
      navigae('/dashboard/news')

      // client.invalidateQueries(['newDetail'])
      return toast({
        description: 'Your post has been published.'
      })
    }
  })
  return {
    createNew
  }
}
