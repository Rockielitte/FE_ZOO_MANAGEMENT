import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { BsThreeDots, BsTicketPerforated } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import ModalForm from './ModalForm'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Row } from '@tanstack/react-table'
import useMutationCustom from '@/hooks/useMutationCustom'
import { Ticket } from '@/types'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0)
})
export type formSchemaType = z.infer<typeof formSchema>
const TicketTag: React.FC<{ row: Row<Ticket> }> = ({ row }) => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: row.getValue('description'),
      name: row.getValue('name'),
      price: row.getValue('price')
    }
  })
  const formMutation = useMutationCustom({
    query: `/tickets/${row.getValue('id')}`,
    queryKey: ['tickets', row.getValue('id')],
    form: form,
    invalidQuery: ['tickets'],
    data: {} as Ticket,
    method: 'PUT'
  })

  return (
    <div
      className='border-2 rounded-md shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all'
      //   onClick={() => {
      //     route(`${row.getValue('id')}`)
      //   }}
    >
      <div className='px-4 py-2 flex items-center w-full gap-4 bg-secondary  border-primary rounded-md'>
        <BsTicketPerforated className='text-4xl bg-primary rounded-full shadow-md p-2 text-white' />
        <div className='flex flex-1 flex-col'>
          <h1 className=' font-semibold uppercase'>Ticket: {row.getValue('name')}</h1>
          <span className='text-sm'>{row.getValue('id')}</span>
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
                title='Edit ticket'
                form={form}
                formMutation={formMutation}
                fields={['name', 'price', 'description']}
                Trigger={
                  <>
                    <AiFillEdit className='text-2xl pr-2' />
                    Edit ticket
                  </>
                }
              />
            </div>

            <DropdownMenuItem>
              <MdDelete className='text-2xl pr-2' />
              Delete ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex flex-col gap-2 font-light py-2 text-sm'>
        <div className='flex items-center gap-2 px-4 py-1 b border-b'>
          <span>Description:</span>
          <span className=''>{row.getValue('description')}</span>
        </div>
        <div className='flex items-center gap-2 px-4 py-1  '>
          <span>Price:</span>
          <span>{row.getValue('price')}</span>
        </div>
      </div>
    </div>
  )
}

export default TicketTag
