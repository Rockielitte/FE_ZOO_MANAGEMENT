import { Editor } from '@/components/Editor'

import { Button } from '@/components/ui/button'
import { FC } from 'react'
interface CreateNewProps {}

const CreateNew: FC<CreateNewProps> = () => {
  return (
    <div className='w-full h-full border rounded-md shadow-md flex flex-col flex-1 p-2 gap-2 pt-6 px-3'>
      <div className='flex flex-col flex-1 h-full items-start justify-start space-y-5 '>
        <div className='border-b w-full border-gray-200 pb-5'>
          <div className='space-y-0.5'>
            <h3 className=' leading-6 text-2xl font-bold tracking-tight uppercase pb-2'>Create News</h3>
            <p className='text-muted-foreground'>
              Unleashing the power of news to protect and celebrate our zoo's remarkable wildlife.
            </p>
          </div>
        </div>

        {/* form */}
        <div className='min-w-full  overflow-auto'>
          <Editor />
        </div>
        {/* {test && <EditorOutput content={test} />} */}
        <div className='w-full flex justify-end'>
          <Button type='submit' className='w-full' form='subreddit-post-form'>
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateNew
