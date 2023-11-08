import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn, isInWeekRange } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function CalendarDateRangePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20)
  })
  const [hovered, setHovered] = React.useState<Date | null>(null)
  const [value, setValue] = React.useState<Date | null>(null)

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn('w-[260px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='end'>
          <Calendar
            initialFocus
            onDayBlur={(date) => {
              const isHovered = isInWeekRange(date, hovered)
              const isSelected = isInWeekRange(date, value)
              const isInRange = isHovered || isSelected
              return {
                onMouseEnter: () => setHovered(date),
                onMouseLeave: () => setHovered(null),
                inRange: isInRange,
                firstInRange: isInRange && date.getDay() === 1,
                lastInRange: isInRange && date.getDay() === 0,
                selected: isSelected,
                onClick: () => setValue(date)
              }
            }}
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            // onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
