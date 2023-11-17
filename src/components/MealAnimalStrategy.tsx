import useQueryCustom from '@/hooks/useQueryCustom'

import { useParams } from 'react-router-dom'
import { AnimalMeal } from '@/types'
import Error from '@/pages/Error'
import LoadingScreen from './Loading'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { MdCreate, MdOutlineNoMeals } from 'react-icons/md'
import AnimalMealForm from './AnimalMealForm'
import { Accordion } from './ui/accordion'
import _ from 'lodash'
const MealAnimalStrategy = () => {
  const animalId = useParams().id
  const meals = useQueryCustom({
    query: `/meals/?animalId=${animalId}`,
    queryKey: ['meals', String(animalId)],
    data: {} as AnimalMeal
  })
  const [sortedData, setSortedData] = useState(meals.data)
  useEffect(() => {
    if (meals.data) {
      const data = _.sortBy(meals.data, ['time']) as AnimalMeal[]
      setSortedData(data)
    }
  }, [meals.data])

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
              <div className='flex-1'>Details</div>
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
            <Accordion type='single' collapsible className='w-full flex-1 overflow-auto flex flex-col '>
              {newForm && (
                <div className='bg-primary-foreground border-4 rounded-md border-primary px-2  '>
                  <AnimalMealForm
                    createFn={setnewForm}
                    method='create'
                    animalId={Number(animalId)}
                    mealItem={{
                      id: 0,
                      time: new Date().toISOString(),
                      details: []
                    }}
                    key={'create'}
                  />
                </div>
              )}
              <div className='flex-1 h-full  overflow-auto'>
                <>
                  {(sortedData as AnimalMeal[])?.length ? (
                    (sortedData as AnimalMeal[]).map((item) => (
                      <AnimalMealForm animalId={Number(animalId)} mealItem={item} key={item.id} />
                    ))
                  ) : !newForm ? (
                    <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
                      <MdOutlineNoMeals className={'text-6xl'} />
                      No schedule planned !
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              </div>
            </Accordion>
          </div>
        </>
      )}
    </div>
  )
}

export default MealAnimalStrategy
