import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SpeciesForm } from './SpeciesForm'
import { Button, buttonVariants } from '@/components/ui/button'
import AnimalSpecies from '@/utils/api/AnimalSpecies'
import { useState, useEffect } from 'react'
import { Species } from '@/types'

type Props = { id: number }

export const EditSpecies = (props: Props) => {
  const [species, setSpecies] = useState<Species>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await AnimalSpecies.getById(props.id.toString())

      setSpecies(response)
    }

    fetchMyAPI()
  }, [open, props.id])
  return (
    species && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className={buttonVariants({ variant: 'default' })}>Edit</Button>
        </DialogTrigger>
        <DialogContent className='max-h-[80%] overflow-auto'>
          <DialogHeader>
            <DialogTitle>Update Animal Species</DialogTitle>
            <DialogDescription>Fill below form's fields to finish this process. </DialogDescription>
          </DialogHeader>
          <SpeciesForm setOpen={setOpen} id={species.id} species={species} />
        </DialogContent>
      </Dialog>
    )
  )
}
