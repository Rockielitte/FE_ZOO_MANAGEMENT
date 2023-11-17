// import { SpeciesCard } from '@/components/SpeciesCard'
import { User, food } from '@/types'
import { Table } from '@tanstack/react-table'
// import Lin from '@/assets/image14.png'
import React from 'react'
import { FoodCard } from './FoodCard'

const GridFood: React.FC<{
  data: Table<food>
  user: User
}> = ({ data, user }) => {
  console.log('data: ', data)
  return (
    <div className='grid grid-cols-1 gap-x-4 gap-y-7 lg:grid-cols-4 p-4'>
      {data.getRowModel().rows.map((row) => {
        return (
          <FoodCard
            key={row.original.id}
            id={row.original.id}
            name={row.original.name}
            type={row.original.type}
            unit={row.original.unit}
            description={row.original.description}
            user={user}
          />
        )
      })}
      {/* {data.map((row) => {
                return (
                    <FoodCard
                        key={row.id}
                        id={row.id}
                        name={row.name}
                        type={row.type}
                        unit={row.unit}
                        description={row.description}
                        image={Lin}
                        user={user}
                    />
                )
            })} */}
    </div>
  )
}

export default GridFood
