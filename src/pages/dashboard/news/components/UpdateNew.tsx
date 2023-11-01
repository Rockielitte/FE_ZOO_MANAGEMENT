import { EditorUpdate } from '@/components/EditorUpdate'
import LoadingScreen from '@/components/Loading'

import { Button } from '@/components/ui/button'
import useQueryCustom from '@/hooks/useQueryCustom'
import Error from '@/pages/Error'
import { NewType } from '@/types'
import { useParams } from 'react-router-dom'

const UpdateNew = () => {
  const id = useParams().id
  const new_data = useQueryCustom({
    query: `/news/${id}`,
    queryKey: ['news', String(id)],
    data: {} as NewType,
    dataRes: {} as NewType
  })
  const data = new_data.data as NewType
  return (
    <>
      {new_data.isError ? (
        <Error></Error>
      ) : !new_data.isLoading ? (
        <div className='w-full h-full border rounded-md shadow-md flex flex-col flex-1 p-2 gap-2'>
          <div className='flex flex-col flex-1 h-full items-start justify-start space-y-5 p-10'>
            <div className='border-b w-full border-gray-200 pb-5'>
              <div className='space-y-0.5'>
                <h3 className=' leading-6 text-2xl font-bold tracking-tight'>Update New</h3>
                <p className='text-muted-foreground'>
                  Unleashing the power of news to protect and celebrate our zoo's remarkable wildlife.
                </p>
              </div>
            </div>

            {/* form */}
            <div className='min-w-full  overflow-auto'>
              <EditorUpdate data={data} />
            </div>
            {/* {test && <EditorOutput content={test} />} */}
            <div className='w-full flex justify-end'>
              <Button type='submit' className='w-full' form='subreddit-post-form'>
                Update
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </>
  )
}

export default UpdateNew
