import { PostCreationRequest } from '@/components/Editor'
import News from '@/utils/api/New'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

interface UseUpdateNew {
  updateNew: (data: PostCreationRequest) => void
}

export const useUpdateNew = (): UseUpdateNew => {
  const client = useQueryClient()
  const navigae = useNavigate()
  const id = useParams().id

  const { mutateAsync: updateNew } = useMutation({
    mutationFn: async ({ title, content }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content }
      const { data } = await News.updateNew(payload, id as string)
      return data
    },
    onError: () => {
      toast.success('Failed')
    },
    onSuccess: () => {
      client.invalidateQueries(['news', 'newDetail'])

      // form.re
      navigae('/dashboard/news')

      // client.invalidateQueries(['newDetail'])
      toast.success('Update Successfully')
      window.location.reload()
    }
  })
  return {
    updateNew
  }
}
