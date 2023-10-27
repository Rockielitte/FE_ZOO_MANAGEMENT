import { Editor } from '@/components/Editor'
import EditorOutput from '@/components/EditorOutpu'
import { Button } from '@/components/ui/button'
import { FC, useState } from 'react'
interface CreateNewProps {}

const CreateNew: FC<CreateNewProps> = () => {
  const [test, setTest] = useState()

  return (
    <div className='w-full h-full border rounded-md shadow-md flex flex-col flex-1 p-2 gap-2'>
      <div className='flex flex-col flex-1 h-full items-start justify-start space-y-5 p-10'>
        <div className='border-b w-full border-gray-200 pb-5'>
          <div className='space-y-0.5'>
            <h3 className=' leading-6 text-2xl font-bold tracking-tight'>Create New</h3>
            <p className='text-muted-foreground'>
              Unleashing the power of news to protect and celebrate our zoo's remarkable wildlife.
            </p>

            {/* <p className='ml-2 mt-1 truncate text-sm text-gray-500'>in r/1</p> */}
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
