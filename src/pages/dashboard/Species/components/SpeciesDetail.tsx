/* eslint-disable react-refresh/only-export-components */
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AnimalSpecies from '@/utils/api/AnimalSpecies'
import { useParams, useRouteLoaderData } from 'react-router-dom'
import { useQuery } from 'react-query'
import { SpeciesTable } from './SpeciesTable'
import GridAnimal from './GridAnimal'
import axios from 'axios'
import GridCage from './GridCage'
import { ColumnDef } from '@tanstack/react-table'
import { Animal, Cage, User } from '@/types'
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
  const { data: user } = useRouteLoaderData('dashboard') as { data: User }

  const columnsAnimal: ColumnDef<Animal>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{parseInt(row.id) + 1}</span>
    },
    {
      accessorKey: 'name',
      header: 'Name',

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
      accessorKey: 'imageList',
      header: 'imageList',
      cell: ({ row }) => <span>{row.getValue('imageList')}</span>
    },
    {
      accessorKey: 'nation',
      header: 'Nation',
      cell: ({ row }) => <span>{row.getValue('nation')}</span>
    }
  ]

  const columnsCage: ColumnDef<Cage>[] = [
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

  const { data: species } = useQuery(speciesDetailQuery(id))

  return (
    <div className='w-full p-4 py-2 h-full flex  flex-col  shadow-2xl border rounded-[0.5rem]  '>
      <div className=''>
        <h1 className='font-bold text-3xl py-2'>{species.name}</h1>
        <p className='font-sm'>{species.description}</p>
        <Separator className='my-2' />
      </div>
      <Tabs defaultValue='animal' className=' flex-1 flex-col flex overflow-auto '>
        <TabsList className='flex gap-2 w-fit'>
          <TabsTrigger
            value='animal'
            className='uppercase  data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            Animal {`(${species.animals.length})`}
          </TabsTrigger>
          <TabsTrigger
            value='cage'
            className='uppercase  data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            Cage {`(${cage_data?.length ? cage_data?.length : `...`})`}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='animal' className='w-full h-full flex-auto flex-col overflow-auto '>
          <SpeciesTable columns={columnsAnimal} data={species.animals} GridBox={GridAnimal} user={user} />
        </TabsContent>

        <TabsContent value='cage' className='w-full h-full flex-auto flex-col overflow-auto'>
          {isError ? (
            <Error />
          ) : !isLoading ? (
            <SpeciesTable columns={columnsCage} data={cage_data} GridBox={GridCage} user={user} />
          ) : (
            <LoadingScreen></LoadingScreen>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
