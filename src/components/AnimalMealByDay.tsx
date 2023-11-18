import useQueryCustom from '@/hooks/useQueryCustom'

import { useParams } from 'react-router-dom'
import { AnimalMealRecord } from '@/types'
import Error from '@/pages/Error'
import LoadingScreen from './Loading'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { MdEdit, MdOutlineNoMeals } from 'react-icons/md'

import { Accordion } from './ui/accordion'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import _ from 'lodash'

import AnimalMealDayForm from './AnimalMealDayForm'
const MealAnimalByDay = () => {
  const animalId = useParams().id
  const [date, setDate] = useState(new Date())

  const meals = useQueryCustom({
    query: `/meal-records/?animalId=${animalId}&date=${
      date?.toLocaleString('sv').replace(' ', 'T') ? date?.toLocaleString('sv').replace(' ', 'T') + '.027293Z' : ''
    }`,
    queryKey: ['meal-records', String(animalId), date?.toUTCString().substring(0, 16) || ''],
    data: {} as AnimalMealRecord
  })
  const [sortedData, setSortedData] = useState(meals.data)
  useEffect(() => {
    if (meals.data) {
      const data = _.sortBy(meals.data, [
        function (o) {
          const temp = o as AnimalMealRecord
          return temp?.meal?.time
        }
      ]) as AnimalMealRecord[]
      setSortedData(data)
    }
  }, [meals.data])
  return (
    <div className='w-full h-full relative  overflow-auto flex flex-col gap-2'>
      <div className='w-full '>
        <Popover>
          <PopoverTrigger asChild id={date?.toLocaleString('sv').replace(' ', 'T') || 'date'}>
            <Button
              variant={'outline'}
              className={cn('w-full justify-start text-left font-normal', date && 'text-muted-foreground')}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={(value) => {
                setDate(value as Date)
              }}
              disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex justify-items-center items-center font-extrabold  gap-2 uppercase text-center text-sm border p-2 rounded-lg shadow-xl'>
        <div className='w-2/12'>Time</div>
        <div className='flex-1'>Details</div>
        <Button className='text-white flex items-center text-xs gap-1 ml-auto w-2/12 uppercase'>
          <MdEdit className={'text-xl'} />
          Feeding
        </Button>
      </div>
      <div className='  flex flex-col py-2  rounded-lg   gap-2 flex-1 overflow-auto relative  '>
        {meals.isError ? (
          <Error />
        ) : meals.isLoading ? (
          <LoadingScreen />
        ) : (
          <Accordion type='single' collapsible className='w-full flex flex-col h-full  '>
            <div className='h-full  flex flex-col w-full'>
              {(sortedData as AnimalMealRecord[])?.length ? (
                (sortedData as AnimalMealRecord[]).map((item) => {
                  return <AnimalMealDayForm mealRecordItem={item} key={item.id} />
                })
              ) : (
                <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
                  <MdOutlineNoMeals className={'text-6xl'} />
                  No meal planned !
                </div>
              )}
            </div>
          </Accordion>
        )}
      </div>
    </div>
  )
}

export default MealAnimalByDay
