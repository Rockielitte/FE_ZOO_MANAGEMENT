import useQueryCustom from '@/hooks/useQueryCustom'

import { useParams } from 'react-router-dom'
import { CageMeal } from '@/types'
import Error from '@/pages/Error'
import LoadingScreen from './Loading'
import MealForm from './MealForm'
import { useState } from 'react'
import { Button } from './ui/button'
import { MdCreate, MdOutlineNoMeals } from 'react-icons/md'

const MealStrategy = () => {
  const cageId = useParams().id
  const meals = useQueryCustom({
    query: `/cage-meals/?cageId=${cageId}`,
    queryKey: ['cage-meals', String(cageId)],
    data: {} as CageMeal
  })
  const [newForm, setnewForm] = useState(false)
  return (
    <div className='w-full h-full  relative overflow-auto'>
      {meals.isError ? (
        <Error />
      ) : meals.isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div
            className=' h-full flex flex-col py-2  rounded-lg   overflow-auto gap-2
  '
          >
            <div className='flex justify-items-center items-center font-extrabold  gap-2 uppercase text-center text-sm border p-2 rounded-lg shadow-xl'>
              <div className='w-2/12'>Time</div>
              <div className='flex-1'>Food</div>
              <Button
                className='text-white flex items-center text-xs gap-1 ml-auto w-2/12'
                type='submit'
                onClick={() => {
                  setnewForm(true)
                }}
              >
                <MdCreate className={'text-xl'} />
                Add
              </Button>
            </div>
            <div className='shadow-lg bg-primary rounded-xl  '>
              {newForm && (
                <MealForm
                  cageId={Number(cageId)}
                  mealItem={
                    {
                      food: '',
                      time: new Date().toISOString()
                    } as CageMeal
                  }
                  key={'create'}
                  method={'create'}
                  createFn={setnewForm}
                />
              )}
            </div>

            <div className='flex-1  overflow-auto'>
              <>
                {(meals.data as CageMeal[]).length ? (
                  (meals.data as CageMeal[]).map((item) => (
                    <MealForm cageId={Number(cageId)} mealItem={item} key={item.id} />
                  ))
                ) : (
                  <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
                    <MdOutlineNoMeals className={'text-6xl'} />
                    No schedule planned !
                  </div>
                )}
              </>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MealStrategy
