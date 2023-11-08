import AnimalPieChart from '@/components/AnimalPieChart'
import { Icons } from '@/components/Icon'
import useQueryCustom from '@/hooks/useQueryCustom'
import { OverallStatistics, SaleOverallStatistics, SaleStatistics, ZooStatistics } from '@/types'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, eachDayOfInterval, endOfWeek, format, getYear, startOfWeek } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import Error from '../Error'
import LoadingScreen from '@/components/Loading'
import { toast } from '@/components/ui/use-toast'
import SaleBarChart from '@/components/BarChart'
const options = [
  { type: 'WEEK', value: 'Week' },
  { type: 'MONTH', value: 'Month' },
  { type: 'YEAR', value: 'Year' }
]
const Dashboard = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30)
  })
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30)
  })
  const [type, setSelectType] = useState('YEAR')
  const fetch_statistics = useQueryCustom({
    query: '/dashboard/zoo-statistics',
    queryKey: ['zoos-statistics'],
    data: {} as ZooStatistics
  })

  function QueryParam(type: string, startDate?: Date | undefined, endDate?: Date | undefined) {
    let queryParams = ''
    // Construct the base URL for your API
    if (!startDate) {
      // Handle the case when startDate is undefined
      toast({ variant: 'destructive', title: 'startDate is undefined' })
      return ''
    }

    // Adding 1 because getMonth returns zero-based index
    const year = getYear(startDate)
    // Construct the query parameters based on the selected type

    if (type === 'DAY') {
      queryParams = `/dashboard/sale-report?startDate=${startDate.toISOString()}&endDate=${endDate?.toISOString()}&type=${type}`
    } else if (type === 'MONTH') {
      queryParams = `/dashboard/sale-report?&year=${year}&type=${type}`
    } else if (type === 'YEAR') {
      queryParams = `/dashboard/sale-report?year=${year}&type=${type}`
    }

    // Make the Fetch API request
    return queryParams
  }
  const sale_statistics = useQueryCustom({
    query: QueryParam(type, range?.from, range?.to),
    queryKey: ['sale-statistics', type, range?.from?.toISOString() as string],
    data: {} as ZooStatistics
  })
  const saleData = sale_statistics.data as SaleStatistics
  const overallData = saleData?.overallStatistics as OverallStatistics[]
  // const ticketDistributionData = saleData?.ticketDistribution as TicketStatistic[]

  function handleDayClick() {
    console.log('selectedDays: ' + date)
    setRange({ from: date?.from, to: date?.to })
  }

  function handleDayMouseEnter(day: Date) {
    // const month = day.getMonth()
    const selectedWeek = getWeek(day)
    setDate({ from: selectedWeek.from, to: selectedWeek.to })
  }

  function handleDayMouseLeave() {
    // setDate({ from: new Date(), to: new Date() })
  }

  const getWeek = useMemo(() => {
    return (day: Date) => {
      const start = startOfWeek(day)
      const end = endOfWeek(day)

      return { from: start, to: end, DataWeek: eachDayOfInterval({ start, end }) }
    }
  }, [])
  const ZooStatistics = fetch_statistics.data as ZooStatistics
  const dataAnimal = [
    {
      name: 'Healthy',
      value: ZooStatistics?.totalAnimal - ZooStatistics?.totalAnimalSick - ZooStatistics?.totalAnimalInDanger
    },
    { name: 'Sick', value: ZooStatistics?.totalAnimalSick },
    { name: 'In danger', value: ZooStatistics?.totalAnimalInDanger }

    //   { name: 'Group D', value: 200 }
  ]

  function useGenerateStatistic(data: OverallStatistics[]) {
    if (data?.length === 0 || data == undefined) {
      return []
    }
    const generateItem = (item: OverallStatistics) => {
      const { totalMoney, totalTicket, date, month, year } = item
      if (type === 'DAY') {
        const dateFormate = new Date(date)
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' }

        return {
          totalMoney: totalMoney,
          totalTicket: totalTicket,
          name: dateFormate.toLocaleDateString('en-GB', options)
        }
      } else if (type === 'YEAR') {
        return { totalMoney: totalMoney, totalTicket: totalTicket, name: year }
      } else if (type === 'MONTH') {
        return { totalMoney: totalMoney, totalTicket: totalTicket, name: month }
      }
    }

    const newArray = data?.map(generateItem)

    return newArray as SaleOverallStatistics[]
  }

  const statistics = useGenerateStatistic(overallData)
  console.log(`newMonth: ${statistics[0]?.name}`)

  ///////////////////////////////WeekPicker////////////////////////////////////////////////////

  const handleChange = (value: string) => {
    setSelectType(value)
  }
  return (
    <section className='w-full  h-full flex flex-col shadow-2xl rounded-[0.5rem] border bg-background'>
      {fetch_statistics.isError || sale_statistics.isError ? (
        <Error />
      ) : !fetch_statistics.isLoading || !sale_statistics.isLoading ? (
        <div className='flex-1 overflow-auto p-5'>
          <div className=' flex items-center flex-col justify-center border w-fit p-5 rounded-[0.5rem] shadow-md'>
            <div className='flex items-start justify-between  gap-14'>
              <div className=''>
                <p className=' text-muted-foreground'>Animal Statistics</p>
                <h1>{ZooStatistics?.totalAnimal}</h1>
              </div>
              <Link to='/dashboard/animal' className='flex items-center text-muted-foreground text-sm justify-between '>
                View All <Icons.ArrowRight className='text-sm' />
              </Link>
            </div>

            <AnimalPieChart data={dataAnimal} width={250} height={250} />
          </div>
          <div className='barChart flex flex-1 items-end  justify-center p-5'>
            <Select
              value={type?.toString()}
              onValueChange={(value) => {
                handleChange(value)
              }}
            >
              <SelectTrigger className='pr-1.5 focus:ring-0'>
                {type != '' ? capitalizeFirstLetter(type) : 'Select Type'}
              </SelectTrigger>
              <SelectContent position='popper'>
                <ScrollArea className='h-80'>
                  {options.map((option, id: number) => (
                    <SelectItem key={`${option.value}-${id}`} value={option.type?.toString() ?? ''}>
                      {option.value}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
            <div className={cn('grid gap-2')}>
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
                    mode='range'
                    defaultMonth={date?.from}
                    captionLayout='dropdown-buttons'
                    selected={date}
                    disabled={(date) => date > new Date() || date < new Date('1800-01-01')}
                    onDayClick={handleDayClick}
                    onDayMouseEnter={handleDayMouseEnter}
                    onDayMouseLeave={handleDayMouseLeave}
                    fromYear={1800}
                    toYear={2050}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <SaleBarChart data={statistics} />
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </section>
  )
}

export default Dashboard
