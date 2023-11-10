import News from '@/utils/api/New'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { NewType } from '@/types'

interface UseUpdateNew {
  updateNew: (data: NewType) => void
}

export const useUpdateNewStatus = (): UseUpdateNew => {
  const client = useQueryClient()
  const navigae = useNavigate()

  const { mutateAsync: updateNew } = useMutation({
    mutationFn: async ({ title, content, status, id }: NewType) => {
      console.log('status: ' + status)
      let newStatus
      if (status == 'HIDDEN') {
        newStatus = 'PUBLISHED'
      } else {
        newStatus = 'HIDDEN'
      }
      const payload = { id, title, content, status: newStatus }
      const { data } = await News.updateNew(payload, id)
      return data
    },
    onError: () => {
      toast.error('Failed')
    },
    onSuccess: () => {
      // form.re
      navigae('/dashboard/news')

      toast.success('Update Successfully')
      client.invalidateQueries(['news'])
      // window.location.reload()
    }
  })
  return {
    updateNew
  }
}
