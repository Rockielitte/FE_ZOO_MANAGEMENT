import { Button, buttonVariants } from '@/components/ui/button';
import * as React from 'react';
import { SpeciesCard } from '@/components/SpeciesCard';
import { Input } from '@/components/ui/input';
import { CreateSpecies } from './components/CreateSpecies';
import { useLoaderData } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import AnimalSpecies from '@/utils/api/AnimalSpecies';
import { useEffect } from 'react';
import { SpeciesTable } from './components/SpeciesTable';
import { ColumnDef } from '@tanstack/react-table';
import { dataSpecies } from '@/types';
import GridSpecies from './components/GridSpecies';

export interface IAppProps {
}
export default function Species(props: IAppProps) {
  const data = useLoaderData()
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
    },

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
     
        <SpeciesTable columns={columnsSpecies} data={data.data} GridBox={GridSpecies} />
   
      

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
  );
}

{/* <br />

      <div className='flex justify-start align-middle border-2 rounded-[0.5rem] gap-3 overflow-hidden'>
        <div className=''>
          <img width='300px' height='200px' src={Lin} alt='' />
        </div>
        <div className='p-6'>
          <h3 className='font-normal text-4xl flex items-center gap-3'>Animal Name <EyeIcon /></h3>
          <p className='truncate w-[50rem] pt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet facilisis urna. Vestibulum ornare et orci ac consectetur. Praesent id diam at tellus lacinia consequat.
            Quisque in enim velit. Nunc tempus est feugiat dolor bibendum faucibus. </p>
        </div>
      </div> */}