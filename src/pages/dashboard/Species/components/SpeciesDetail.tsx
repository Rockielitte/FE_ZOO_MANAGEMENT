/* eslint-disable react-refresh/only-export-components */
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AnimalSpecies from '@/utils/api/AnimalSpecies'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { SpeciesTable } from './SpeciesTable'
import GridAnimal from './GridAnimal'
import axios from 'axios'
import GridCage from './GridCage'
import { ColumnDef } from '@tanstack/react-table'
import { dataSpecies } from '@/types'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'
export interface IAppProps {}

export const speciesDetailQuery = (id?: string) => ({
  queryKey: ['species', 'detail', id],
  queryFn: async () => {
    const species = await AnimalSpecies.getById(id)
    if (!species) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found'
      })
    }
    return species
  }
})
export default function SpeciesDetail() {
  const columnsAnimal: ColumnDef<dataSpecies>[] = [
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

  const columnsCage: ColumnDef<dataSpecies>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{parseInt(row.id) + 1}</span>
    },
    {
      accessorKey: 'code',
      header: 'Code',

      cell: ({ row }) => (
        <div className='flex items-center space-x-2 '>
          <span>{row.getValue('code')}</span>
        </div>
      )
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <span>{row.getValue('description')}</span>
    }
  ]
  const { id } = useParams()
  const {
    data: cage_data,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['cages', 'speciesId', id],
    queryFn: () => {
      return AnimalSpecies.getCageBySpeciesId(id)
    },
    onSuccess: () => {},
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
      }
    },
    select: (data) => {
      return data
    }
  })
  console.log('cage_data: ', cage_data)
  const { data: species } = useQuery(speciesDetailQuery(id))
  console.log(species)
  return (
    <div className='w-full p-5 py-2 h-full flex  flex-col  shadow-2xl border rounded-[0.5rem]  '>
      <div className='p-5'>
        <h1 className='font-medium text-4xl'>{species.name}</h1>
        <p className='font-extralight'>{species.description}</p>
        <Separator />
      </div>

      <Tabs defaultValue='animal' className=' flex-1 flex-col flex overflow-auto'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='animal'>Animal {`(${species.animals.length})`}</TabsTrigger>
          <TabsTrigger value='cage'>Cage {`(${cage_data?.length ? cage_data?.length : `...`})`}</TabsTrigger>
        </TabsList>
        <TabsContent value='animal' className='w-full h-full flex-auto flex-col overflow-auto'>
          <SpeciesTable columns={columnsAnimal} data={species.animals} GridBox={GridAnimal} />
        </TabsContent>

        <TabsContent value='cage' className='w-full h-full flex-auto flex-col overflow-auto'>
          {isError ? (
            <Error />
          ) : !isLoading ? (
            <SpeciesTable columns={columnsCage} data={cage_data} GridBox={GridCage} />
          ) : (
            <LoadingScreen></LoadingScreen>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
