import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SpeciesForm } from './SpeciesForm'
import { Icons } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const CreateSpecies = () => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger style={{ margin: '0px' }}>
        <Button variant='default' className='w-fit flex items-center gap-1 hover:scale-105 transition-all ml-auto  '>
          <Icons.PlusCircleIcon className='mr-2' />
          <span className='uppercase'>Create species</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[80%] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Create New Animal Species</DialogTitle>
          <DialogDescription>Fill below form's fields to finish process</DialogDescription>
        </DialogHeader>
        <SpeciesForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
