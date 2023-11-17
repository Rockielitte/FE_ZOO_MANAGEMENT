import { AnimalMealRecord } from '@/types'
import AnimalMealForm from './AnimalMealForm'
import { useParams } from 'react-router-dom'
type Props = {
  mealRecordItem: AnimalMealRecord
}
const AnimalMealDayForm = ({ mealRecordItem }: Props) => {
  const animalId = useParams().id
  return (
    <div className='w-full'>
      <div className='  rounded-md px-2 w-full    '>
        <div className='flex-1 h-full '>
          <AnimalMealForm
            isMealRecord={true}
            animalId={Number(animalId)}
            mealItem={mealRecordItem.meal}
            mealRecord={mealRecordItem}
            key={mealRecordItem.id}
          />
        </div>
      </div>
    </div>
  )
}

export default AnimalMealDayForm
