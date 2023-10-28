import { dataSpecies } from '@/types'
import { Table } from '@tanstack/react-table'
import { EyeIcon } from 'lucide-react'
import Lin from '@/assets/image14.png';
import React from 'react'


const GridAnimal: React.FC<{
    data: Table<dataSpecies>
}> = ({ data }) => {
    return (
        <div className='w-full  flex flex-col flex-1 gap-1 items-start align-top p-2'>
            {data.getRowModel().rows.map(row => {
                console.log("row animal: ", row.original)
                return <div className='w-full flex justify-start align-middle border-2 rounded-[0.5rem] gap-2 overflow-hidden'>

                    <img className='max-h-[150px] min-w-[200px] object-cover' src={Lin} alt='' />

                    <div className='p-6'>
                        <h3 className='font-normal text-4xl flex items-center gap-3'>{row.original.name} <EyeIcon /></h3>
                        <p className='truncate-4  pt-2'>{row.original.description}</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default GridAnimal
