import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import format from 'date-fns/format'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import useMutationCustom from '@/hooks/useMutationCustom'
import { useParams } from 'react-router-dom'
import useQueryCustom from '@/hooks/useQueryCustom'
import { MealReCord } from '@/types'
import Error from '@/pages/Error'
import LoadingScreen from './Loading'
import MealByDateForm from './MealByDayForm'
import { MdOutlineNoMeals } from 'react-icons/md'

const MealByDay = () => {
  const cageId = useParams().id
  const [date, setDate] = useState(new Date())

  const meals = useQueryCustom({
    query: `/meal-records/?cageId=${cageId}&date=${
      date?.toLocaleString('sv').replace(' ', 'T') ? date?.toLocaleString('sv').replace(' ', 'T') + '.027293Z' : ''
    }`,
    queryKey: ['meal-records', String(cageId), date?.toUTCString().substring(0, 16) || ''],
    data: {} as MealReCord
  })
  return (
    <div className='w-full h-full relative overflow-auto flex flex-col gap-2'>
      <div className='w-full'>
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
      <div className='flex justify-items-center font-extrabold  gap-2 uppercase text-center text-sm border p-2 rounded-lg shadow-xl'>
        <div className='w-2/12'>Time</div>
        <div className='flex-1'>Food</div>
        <div className='w-3/12'>Status</div>
      </div>
      <div
        className='  flex flex-col py-2  rounded-lg   gap-2 flex-1
 '
      >
        {meals.isError ? (
          <Error />
        ) : meals.isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <div className='flex-1  overflow-auto flex flex-col w-full'>
              <>
                {(meals.data as MealReCord[]).length ? (
                  (meals.data as MealReCord[]).map((item) => <MealByDateForm mealItem={item} key={item.id} />)
                ) : (
                  <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
                    <MdOutlineNoMeals className={'text-6xl'} />
                    No meal planned !
                  </div>
                )}
              </>
            </div>
          </>
        )}{' '}
      </div>
    </div>
  )
}

export default MealByDay
