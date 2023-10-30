import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as React from 'react'
import Lin from '@/assets/image14.png'
import { EyeIcon } from 'lucide-react'
import AnimalSpecies from '@/utils/api/AnimalSpecies'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { LandmarkIcon } from 'lucide-react'
import { LucideMoreHorizontal } from 'lucide-react'
import { SpeciesTable } from './SpeciesTable'
import GridAnimal from './GridAnimal'
import axios from 'axios'
import GridCage from './GridCage'
export interface IAppProps {}
export const animalList = [
  { id: 1, name: 'meow', description: 'asdfg.....', image: Lin },
  { id: 2, name: 'meow', description: 'asdfg.....', image: Lin },
  { id: 3, name: 'meow', description: 'asdfg.....', image: Lin },
  { id: 4, name: 'meow', description: 'asdfg.....', image: Lin }
]

export const cageList = [
  { id: 1, code: 'A1000', description: 'asdfg.....' },
  { id: 2, code: 'A2000', description: 'asdfg.....' },
  { id: 3, code: 'A3000', description: 'asdfg.....' },
  { id: 4, code: 'A4000', description: 'asdfg.....' }
]

export const speciesDetailQuery = (id: string) => ({
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
export default function SpeciesDetail(props: IAppProps) {
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
  const { data: cage_data } = useQuery({
    queryKey: ['cages', 'speciesId', id],
    queryFn: () => {
      return AnimalSpecies.getCageBySpeciesId(id)
    },
    onSuccess: (data) => {},
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
          <TabsTrigger value='animal'>Animal</TabsTrigger>
          <TabsTrigger value='cage'>Cage</TabsTrigger>
        </TabsList>
        <TabsContent value='animal' className='w-full h-full flex-auto flex-col overflow-auto'>
          <SpeciesTable columns={columnsAnimal} data={species.animals} GridBox={GridAnimal} />
        </TabsContent>

        <TabsContent value='cage' className='w-full h-full flex-auto flex-col overflow-auto'>
          <SpeciesTable columns={columnsCage} data={cage_data} GridBox={GridCage} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
