import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdCreate
} from 'react-icons/md'
import Areas from '@/test/AreaTest.json'
import AreaTag from '@/components/AreaTag'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
type Props = {}

const index = (props: Props) => {
  return (
    <div className='w-full h-full border rounded-md shadow-md flex flex-col p-2 gap-2'>
      <div className='flex justify-between gap-2'>
        <Input type='text' placeholder='Search your area or location here . . . ' className='tracking-wide' />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type='submit'
              className=' text-white flex  items-center gap-1 opacity-90  font-bold hover:opacity-100 hover:scale-110 transition-all'
            >
              <MdCreate className='text-xl' />
              Create
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='uppercase pb-2'>Create new area</DialogTitle>
              <DialogDescription>
                Fill all below form fields to complete this proccess. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Username
                </Label>
                <Input id='username' defaultValue='@peduarte' className='col-span-3' />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className='flex-1 md:grid-cols-2 w-full  grid grid-cols-1 overflow-auto gap-8 '>
        {Areas.map((item) => (
          <AreaTag key={item.areaId} area={item} />
        ))}
      </div>
      <div className='justify-end flex'>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex'>
            <span className='sr-only'>Go to first page</span>
            <MdKeyboardDoubleArrowLeft className='h-4 w-4' />
          </Button>
          <Button variant='outline' className='h-8 w-8 p-0'>
            <span className='sr-only'>Go to previous page</span>
            <MdChevronLeft className='h-4 w-4' />
          </Button>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Button variant='outline' className='h-8 w-8 p-0' key={index}>
              <span className='sr-only'>Page {item}</span>
              {item}
            </Button>
          ))}
          <Button variant='outline' className='h-8 w-8 p-0'>
            <span className='sr-only'>Go to next page</span>
            <MdChevronRight className='h-4 w-4' />
          </Button>
          <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex'>
            <span className='sr-only'>Go to last page</span>
            <MdKeyboardDoubleArrowRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default index
