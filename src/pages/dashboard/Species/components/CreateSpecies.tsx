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
      <DialogTrigger>
        {' '}
        <Button variant='default' className='flex items-center gap-1 hover:scale-110 transition-all ml-auto'>
          <Icons.PlusCircleIcon className='mr-2' />
          Create Animal Species
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Animal Species</DialogTitle>
          <DialogDescription>some description ...</DialogDescription>
        </DialogHeader>
        <SpeciesForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
