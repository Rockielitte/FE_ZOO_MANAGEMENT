import React, { useState } from 'react'
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
import { Badge } from './ui/badge'
import { GiBirdCage } from 'react-icons/gi'
import { Row } from '@tanstack/react-table'
import { Cage } from '@/types'
import { useUserStore } from '@/stores'
import { useMutation, useQueryClient } from 'react-query'
import { z } from 'zod'
import { request } from '@/utils/apiCaller'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ModalForm from './ModalForm'
const regexPattern = /^[A-Za-z][0-9]{4}$/
const formSchema = z.object({
  code: z.string().regex(regexPattern),
  areaId: z.coerce.number(),
  animalSpeciesId: z.coerce.number(),
  managedById: z.string().min(1),
  description: z.string().optional()
})
export type formSchemaType = z.infer<typeof formSchema>
const CageTag: React.FC<{ row: Row<Cage> }> = ({ row }) => {
  const queryClient = useQueryClient()
  const route = useNavigate()
  const token = useUserStore((state) => state.user)?.token
  const formMutation = useMutation({
    mutationKey: ['cages'],
    mutationFn: (data: formSchemaType) => {
      return request<Cage>(
        `/cages/${row.getValue('id')}`,
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
      queryClient.invalidateQueries({ queryKey: ['cages'], exact: true })
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
      areaId: row.getValue('areaId'),
      animalSpeciesId: row.getValue('animalSpeciesId'),
      managedById: row.getValue('manageBy'),
      description: row.getValue('infor')
    }
  })
  return (
    <div
      className='border-2 rounded-md shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all'
      onClick={() => {
        route(`/dashboard/cages/${row.getValue('id')}`)
      }}
    >
      <div className='px-4 py-2 flex items-center w-full gap-4 bg-secondary  border-primary rounded-md'>
        <GiBirdCage className='text-4xl bg-primary rounded-full shadow-md p-2 text-white' />
        <div className='flex flex-1 flex-col'>
          <h1 className='text-md tracking-wide font-extrabold uppercase'>
            <span>Cage </span> {row.getValue('code')}
          </h1>
          <span className='text-sm'>Species: {row.getValue('species')}</span>
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
                title='Edit cage'
                form={form}
                formMutation={formMutation}
                fields={['code', 'areaId', 'animalSpeciesId', 'managedById', 'description']}
                Trigger={
                  <>
                    <AiFillEdit className='text-2xl pr-2' />
                    Edit cage
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
      <div className='flex flex-col  font-light py-2 text-sm'>
        <div className='flex items-center justify-between px-4 py-1 b border-b font-normal'>
          <span>Number of animals:</span>
          <span className='px-2 text-md rounded-full border-2 bg-primary text-white'>
            {row.getValue('animalNum') || '0'}
          </span>
        </div>
        <div className='flex items-center justify-between px-4 py-1 text-sm  '>
          <span>{row.getValue('infor')}</span>
        </div>
      </div>
    </div>
  )
}

export default CageTag
