import { Button, buttonVariants } from '@/components/ui/button'
import * as React from 'react'
import { SpeciesCard } from '@/components/SpeciesCard'
import { Input } from '@/components/ui/input'
import { CreateSpecies } from './components/CreateSpecies'
import { useLoaderData } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import AnimalSpecies from '@/utils/api/AnimalSpecies'
import { useEffect } from 'react'
import { SpeciesTable } from './components/SpeciesTable'
import { ColumnDef } from '@tanstack/react-table'
import { Species, dataSpecies } from '@/types'
import GridSpecies from './components/GridSpecies'

export default function Species() {
  const data = useLoaderData() as Species[]
  //console.log(data)
  const queryClient = useQueryClient()
  //const [species, setSpecies] = React.useState([...data.data])
  //const [page, setPage] = React.useState(0)
  // const { status, data, error, isFetching, isPreviousData } = useQuery({
  //   queryKey: ['species', page],
  //   queryFn: () => AnimalSpecies.getAllSpecies(page),
  //   keepPreviousData: true,
  //   staleTime: 5000,
  // })
  console.log(data)
  const columnsSpecies: ColumnDef<dataSpecies>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{parseInt(row.id) + 1}</span>
    },
    {
      accessorKey: 'name',
      header: 'Name',
      // accessorFn: ({ avt, fname, lname }) => {
      //   return (
      //     <div className='flex items-center space-x-2 '>
      //       <Avatar>
      //         <AvatarImage src={avt} />
      //         <AvatarFallback>CN</AvatarFallback>
      //       </Avatar>
      //       <span>{fname + ' ' + lname}</span>
      //     </div>
      //   )
      // },
      cell: ({ row }) => (
        <div className='flex items-center space-x-2 '>
          <span>{row.getValue('name')}</span>
        </div>
      )
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <span>{row.getValue('description')}</span>
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => <span>{row.getValue('image')}</span>
    }
  ]
  // useEffect(() => {
  //   if (!isPreviousData && data?.hasMore) {
  //     queryClient.prefetchQuery({
  //       queryKey: ['species', page + 1],
  //       queryFn: () => AnimalSpecies.getAllSpecies(page + 1)
  //     })
  //   }
  // }, [data, isPreviousData, page, queryClient])
  return (
    <div className='flex w-full p-3 py-2 h-full shadow-2xl border rounded-[0.5rem]'>
      <SpeciesTable columns={columnsSpecies} data={data.data as Species[]} GridBox={GridSpecies} />

      {/* <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old))
        }}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button> */}
    </div>
  )
}
