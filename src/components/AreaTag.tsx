import React from 'react'
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
import { TfiLocationPin } from 'react-icons/tfi'
import { Area, RoleEnum } from '@/types'
import ModalForm from './ModalForm'
import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Row } from '@tanstack/react-table'
import useMutationCustom from '@/hooks/useMutationCustom'
import useCheckRole from '@/hooks/useCheckRole'
const regexPattern = /^[A-Z]\d{3}$/
const formSchema = z.object({
  code: z.string().regex(regexPattern),
  name: z.string().min(1),
  location: z.string().min(1)
})
export type formSchemaType = z.infer<typeof formSchema>
const AreaTag: React.FC<{ row: Row<Area> }> = ({ row }) => {
  const route = useNavigate()
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: row.getValue('code'),
      name: row.getValue('name'),
      location: row.getValue('location')
    }
  })
  const formMutation = useMutationCustom({
    query: `/areas/${row.getValue('id')}`,
    queryKey: ['areas', row.getValue('id')],
    form: form,
    invalidQuery: ['areas'],
    data: {} as Area,
    method: 'PUT'
  })
  const user = useCheckRole()
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
          <h1 className=' font-semibold uppercase text-base '>Area {row.getValue('code')}</h1>
          <span className='text-sm'>{row.getValue('location')}</span>
        </div>
        {user.role && user.role == RoleEnum.ADMIN && (
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
        )}
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
