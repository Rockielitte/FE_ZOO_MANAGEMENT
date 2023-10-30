/* eslint-disable @typescript-eslint/ban-ts-comment */
// import CustomCodeRenderer from '@/components/renderers/CustomCodeRenderer'
// import CustomImageRenderer from '@/components/renderers/CustomImageRenderer'
import { FC } from 'react'
import Output from 'editorjs-react-renderer'

interface EditorOutputProps {
  content: object
}

// const renderers = {
//   image: CustomImageRenderer,
//   code: CustomCodeRenderer
// }

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem'
  }
}

const EditorOutput: FC<EditorOutputProps> = ({ content }: EditorOutputProps) => {
  return <Output style={style} className='text-sm' data={content} />
}

export default EditorOutput
