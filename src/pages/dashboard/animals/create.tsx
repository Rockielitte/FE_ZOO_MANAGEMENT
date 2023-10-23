import AnimalForm, { AnimalSchemaType } from '@/components/AnimalForm'
import { useUserStore } from '@/stores'
import { AnimalGenderEnum, AnimalStatusEnum } from '@/types'
import { useMemo } from 'react'

const AnimalCreate = () => {
  const token = useUserStore((state) => state.user)

  //   const animal_data = useQuery<AxiosResponse<Animal>, unknown, Animal>({
  //     queryKey: ['dashboad', 'animal', Number(id)],
  //     queryFn: () => {
  //       return request<Animal>(`/animal/${id}`, 'GET', {
  //         Authorization: `Bearer ${token} `
  //       })
  //     },
  //     onSuccess: (data) => {},
  //     onError: (error) => {
  //       if (axios.isAxiosError(error)) {
  //         console.log(error.message)
  //       }
  //     },
  //     select: (data) => {
  //       return data.data
  //     }
  //   })
  const animalDataForm = {
    name: '',
    speciesId: Number(''),
    cageId: Number(''),
    gender: AnimalGenderEnum.MALE,
    status: AnimalStatusEnum.HEALTHY,
    dob: new Date(),
    nation: '',
    description: '',
    note: '',
    imageList: []
  }
  return (
    <div className='w-full h-full'>
      <AnimalForm></AnimalForm>
    </div>
  )
}

export default AnimalCreate
