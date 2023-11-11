import { SpeciesCard } from '@/components/SpeciesCard'
import { User, dataSpecies } from '@/types'
import { Table } from '@tanstack/react-table'
import React from 'react'

const GridSpecies: React.FC<{
  data: Table<dataSpecies>
  user: User
}> = ({ data, user }) => {
  return (
    <div className='grid grid-cols-1 gap-x-4 gap-y-7 lg:grid-cols-3 p-4'>
      {data.getRowModel().rows.map((row) => {
        return (
          <SpeciesCard
            key={row.original.id}
            id={row.original.id}
            name={row.original.name}
            description={row.original.description}
            image={row.original.image}
            user={user}
          />
        )
      })}
    </div>
  )
}

export default GridSpecies
