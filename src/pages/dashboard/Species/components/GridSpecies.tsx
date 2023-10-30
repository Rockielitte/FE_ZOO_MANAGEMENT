import { SpeciesCard } from '@/components/SpeciesCard'
import { dataSpecies } from '@/types'
import { Table } from '@tanstack/react-table'
import React from 'react'

const GridSpecies: React.FC<{
    data: Table<dataSpecies>
}> = ({ data }) => {
    return (
        <div className='grid grid-cols-1 gap-x-4 gap-y-7 lg:grid-cols-3 p-4'>
            {data.getRowModel().rows.map(row => {
                console.log("row: ", row.original)
                return <SpeciesCard key={row.original.id} id={row.original.id} name={row.original.name} description={row.original.description} image={row.original.image} />
            })}
        </div>
    )
}

export default GridSpecies