import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { EditSpecies } from '@/pages/dashboard/Species/components/UpdateSpecies'
import { Link } from 'react-router-dom'

type Props = { id: number; name: string; description: string; image: string }

export const SpeciesCard = (props: Props) => {
  return (
    <div className='species-img bg-[url(@/assets/image14.png)] bg-center bg-cover box-content  min-h-[200px] p-4 border-4 rounded-[1rem]'>
      <div className='flex justify-between flex-col h-full p-3'>
        <p className='text-white font-extralight'>{props.id}</p>
        <div className='text-white my-4'>
          <h3 className='font-normal text-4xl'>{props.name}</h3>
          <p className='font-extralight truncate-4 my-3'>{props.description}</p>
        </div>
        <div className='font-normal flex space-x-3'>
          <Link to={`/dashboard/animal_species/${props.id}`} className={buttonVariants({ variant: 'secondary' })}>
            View
          </Link>
          <EditSpecies id={props.id} />
        </div>
      </div>
    </div>
  )
}
