/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from './ui/use-toast'
import '@/editor.css'
import { useCreateNew } from '@/hooks/useCreateNew'
// import EditorOutput from './EditorOutpu'
import LocalFile from '@/utils/api/LocalFile'

type FormData = z.infer<typeof PostValidator>

interface EditorProps {
  subredditId?: string
}

const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long'
    })
    .max(128, {
      message: 'Title must be less than 128 characters long'
    }),

  content: z.any(),
  status: z.any().optional()
})

export type PostCreationRequest = z.infer<typeof PostValidator>
export const Editor: React.FC<EditorProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: '',
      content: null
    }
  })
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { createNew } = useCreateNew()

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    // @ts-ignore
    const Header = (await import('@editorjs/header')).default
    // @ts-ignore
    const Quote = (await import('@editorjs/quote')).default
    // @ts-ignore
    const Embed = (await import('@editorjs/embed')).default
    // @ts-ignore
    const Table = (await import('@editorjs/table')).default
    // @ts-ignore
    const List = (await import('@editorjs/list')).default
    // @ts-ignore
    const Code = (await import('@editorjs/code')).default
    // @ts-ignore
    const LinkTool = (await import('@editorjs/link')).default
    // @ts-ignore
    const InlineCode = (await import('@editorjs/inline-code')).default
    // @ts-ignore
    const ImageTool = (await import('@editorjs/image')).default
    // @ts-ignore
    const Paragraph = (await import('@editorjs/paragraph')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        // holder: ,
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your news...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: { class: Header, inlineToolbar: true },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link'
            }
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing

                  const res = await LocalFile.uploadFile({ file: file })

                  return {
                    success: 1,
                    file: {
                      url: res
                    }
                  }
                }
              }
            }
          },
          paragraph: { class: Paragraph, inlineToolbar: true },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: { class: Table, inlineToolbar: true },
          embed: Embed,
          quote: { class: Quote, inlineToolbar: true }
        }
      })
    }
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast({
          title: 'Something went wrong.',
          description: (value as { message: string }).message,
          variant: 'destructive'
        })
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()

      setTimeout(() => {
        _titleRef?.current?.focus()
      }, 0)
    }

    if (isMounted) {
      init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()

    const payload: PostCreationRequest = {
      title: data.title,
      content: JSON.stringify(blocks)
    }

    createNew(payload)
  }

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register('title')

  return (
    <div className='w-full flex flex-1 flex-col items-center h-fit p-4 bg-zinc-50 dark:bg-slate-700 rounded-lg border border-zinc-200'>
      <form id='subreddit-post-form' className='w-full' onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
        <div className='prose w-full  prose-stone dark:prose-invert'>
          <TextareaAutosize
            ref={(e) => {
              titleRef(e)
              // @ts-ignore
              _titleRef.current = e
            }}
            {...rest}
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
          />
          <div id='editor' className='min-h-[400px] min-w-full' />
          <p className='text-sm text-gray-500'>
            Use <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>Tab</kbd> to open the command menu.
          </p>
        </div>
      </form>
    </div>
  )
}
