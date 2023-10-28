import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import React from 'react'
import { SpeciesForm } from './SpeciesForm'
import { Icons } from '@/components/Icon'
import { Button } from '@/components/ui/button'

type Props = {}

export const CreateSpecies = (props: Props) => {
  return (
    <Dialog>
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
        <SpeciesForm />
      </DialogContent>
    </Dialog>
  )
}
