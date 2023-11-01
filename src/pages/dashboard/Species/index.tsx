import { SpeciesTable } from './components/SpeciesTable'
import { ColumnDef } from '@tanstack/react-table'
import { Species, dataSpecies } from '@/types'
import GridSpecies from './components/GridSpecies'
import useQueryCustom from '@/hooks/useQueryCustom'
import Error from '@/pages/Error'
import LoadingScreen from '@/components/Loading'

export default function Species() {

  const columnsSpecies: ColumnDef<dataSpecies>[] = [
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
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => <span>{row.getValue('image')}</span>
    }
  ]
  const animal_species_data = useQueryCustom({ query: '/animal-species/', queryKey: ['animal-species'], data: {} as Species })
  console.log("species: ", animal_species_data.data)

  return (
    <div className='w-full p-2  py-2 h-full shadow-2xl border rounded-md '>
      {animal_species_data.isError ? (
        <Error />
      ) : !animal_species_data.isLoading ? (
        <SpeciesTable columns={columnsSpecies} data={!animal_species_data.data ? [] : (animal_species_data.data.reverse() as Species[])} GridBox={GridSpecies} />
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </div>
  )

}
