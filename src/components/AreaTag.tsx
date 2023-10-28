import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { MdGridView } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { CiLocationOn } from 'react-icons/ci'
import { TfiLocationPin } from 'react-icons/tfi'
import { Area, Cage } from '@/types'
import ModalForm from './ModalForm'
import { useMutation, useQueryClient } from 'react-query'
import { z } from 'zod'
import { request } from '@/utils/apiCaller'
import { useUserStore } from '@/stores'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@radix-ui/react-dialog'
import { Row } from '@tanstack/react-table'
const regexPattern = /^[A-Z]\d{3}$/
const formSchema = z.object({
  code: z.string().regex(regexPattern),
  name: z.string().min(1),
  location: z.string().min(1)
})
export type formSchemaType = z.infer<typeof formSchema>
const AreaTag: React.FC<{ row: Row<Area> }> = ({ row }) => {
  const route = useNavigate()
  const queryClient = useQueryClient()
  const token = useUserStore((state) => state.user)?.token
  const formMutation = useMutation({
    mutationKey: ['areas', row.getValue('id')],
    mutationFn: (data: formSchemaType) => {
      return request<Area>(
        `/areas/${row.getValue('id')}`,
        'PUT',
        {
          Authorization: `Bearer ${token} `,
          Headers: { 'Content-Type': 'application/json' }
        },
        {},
        data
      )
    },
    onSuccess: (data) => {
      console.log(data.data)
      toast.success('Send sucessfully')
      queryClient.invalidateQueries({ queryKey: ['areas'], exact: true })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message, 'dasklfj')
        toast.error(error.message)
      }
    }
  })
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: row.getValue('code'),
      name: row.getValue('name'),
      location: row.getValue('location')
    }
  })

  return (
    <div
      className='border-2 rounded-md shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all'
      onClick={() => {
        route(`${row.getValue('id')}`)
      }}
    >
      <div className='px-4 py-2 flex items-center w-full gap-4 bg-secondary  border-primary rounded-md'>
        <TfiLocationPin className='text-4xl bg-primary rounded-full shadow-md p-2 text-white' />
        <div className='flex flex-1 flex-col'>
          <h1 className=' font-semibold uppercase'>Area {row.getValue('code')}</h1>
          <span className='text-sm'>{row.getValue('location')}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDots className='text-2xl font-bold text-primary ' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-[200px] relative right-[20px] '>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div
              className='w-full hover:bg-secondary p-2 text-sm'
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <ModalForm
                title='Edit area'
                form={form}
                formMutation={formMutation}
                fields={['code', 'name', 'location']}
                Trigger={
                  <>
                    <AiFillEdit className='text-2xl pr-2' />
                    Edit area
                  </>
                }
              />
            </div>

            <DropdownMenuItem>
              <MdGridView className='text-2xl pr-2' />
              View details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex flex-col gap-2 font-light py-2 text-sm'>
        <div className='flex items-center justify-between px-4 py-1 b border-b'>
          <span>Number of cages</span>
          <span className=''>{row.getValue('noCages')}</span>
        </div>
        <div className='flex items-center justify-between px-4 py-1  '>
          <span>Number of animals</span>
          <span>{row.getValue('noAnimals')}</span>
        </div>
      </div>
    </div>
  )
}

export default AreaTag
