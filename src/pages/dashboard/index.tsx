import AnimalPieChart from '@/components/AnimalPieChart'
import { Icons } from '@/components/Icon'
import useQueryCustom from '@/hooks/useQueryCustom'
import {
  AnimalStatusStatistics,
  NewType,
  OverallStatistics,
  SaleOverallStatistics,
  SaleStatistics,
  SpeciesStatistics,
  TicketStatistic,
  ZooStatistics
} from '@/types'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { capitalizeFirstLetter, cn, getDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import Error from '../Error'
import LoadingScreen from '@/components/Loading'
import { toast } from '@/components/ui/use-toast'
import SaleBarChart from '@/components/BarChart'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import SpeciesPieChart from '@/components/SpeciesPieChart'
import ModalConfirmUpdate from './news/components/ModalUpdateStatus'
// import useCheckRole from '@/hooks/useCheckRole'
const options = [
  { type: 'DAY', value: 'Day' },
  { type: 'MONTH', value: 'Month' },
  { type: 'YEAR', value: 'Year' }
]
const Dashboard = () => {
  // const user = useCheckRole()
  const minYear = 1800
  const maxYear = 2023
  const new_data = useQueryCustom<NewType, []>({
    query: '/news/?status=HIDDEN',
    queryKey: ['newGuests'],
    data: {} as NewType
  })
  const BlogData = new_data.data as NewType[]
  const years = []
  for (let i = minYear; i <= maxYear; i++) {
    years.push(i)
  }
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30)
  })
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30)
  })
  const [yearRange, setYearRange] = useState({
    from: new Date().getFullYear().toString(),
    to: new Date().getFullYear().toString()
  })
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
  const [newUpdate, setNewUpdate] = useState<NewType | string>('')

  const [yearOfMonth, setYearOfMonth] = useState('2023')
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
    // const year = getYear(startDate)
    // Construct the query parameters based on the selected type

    if (type === 'DAY') {
      queryParams = `/dashboard/sale-report?startDate=${startDate.toISOString()}&endDate=${endDate?.toISOString()}&type=${type}`
    } else if (type === 'MONTH') {
      queryParams = `/dashboard/sale-report?&year=${yearOfMonth}&type=${type}`
    } else if (type === 'YEAR') {
      queryParams = `/dashboard/sale-report?startYear=${yearRange.from}&endYear=${yearRange.to}&type=${type}`
    }

    // Make the Fetch API request
    return queryParams
  }
  const sale_statistics = useQueryCustom({
    query: QueryParam(type, range?.from, range?.to),
    queryKey: [
      'sale-statistics',
      type,
      range?.from?.toISOString() as string,
      yearRange?.from,
      yearRange?.to,
      yearOfMonth
    ],
    data: {} as ZooStatistics
  })
  const saleData = sale_statistics.data as SaleStatistics
  const overallData = saleData?.overallStatistics as OverallStatistics[]
  const ticketDistributionData = saleData?.ticketDistribution as TicketStatistic[]

  function handleDayClick() {
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

  function useGenerateSpeciesStatistic(data: SpeciesStatistics[]) {
    if (data?.length === 0 || data == undefined) {
      return []
    }
    const generateItem = (item: SpeciesStatistics) => {
      const { totalAnimal, speciesName } = item

      return { name: speciesName, value: totalAnimal }
    }

    const newArray = data?.map(generateItem)

    return newArray as AnimalStatusStatistics[]
  }

  function useGenerateTicketDistribution(data: TicketStatistic[]) {
    if (data?.length === 0 || data == undefined) {
      return []
    }
    const generateItem = (item: TicketStatistic) => {
      const { ticketName, money } = item

      return { name: ticketName, value: money }
    }

    const newArray = data?.map(generateItem)

    return newArray as AnimalStatusStatistics[]
  }

  const speciesStatic = useGenerateSpeciesStatistic(ZooStatistics?.animalSpeciesStatistics)
  const ticketStatistics = useGenerateTicketDistribution(ticketDistributionData)

  ///////////////////////////////WeekPicker////////////////////////////////////////////////////

  const handleChange = (value: string) => {
    setSelectType(value)
  }
  const handleYearStartChange = (value: string) => {
    setYearRange({ ...yearRange, from: value })
  }
  const handleYearEndChange = (value: string) => {
    setYearRange({ ...yearRange, to: value })
  }
  const handleYearOfMonthEndChange = (value: string) => {
    setYearOfMonth(value)
  }

  return (
    <section className='w-full  h-full flex flex-col shadow-2xl rounded-[0.5rem] border bg-background'>
      {fetch_statistics.isError || sale_statistics.isError ? (
        <Error />
      ) : !fetch_statistics.isLoading || !sale_statistics.isLoading ? (
        <div className='flex-1 overflow-auto p-5 flex flex-col gap-4 h-full'>
          <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            <div className='border-2 border-gray-200 rounded-[1rem] shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all p-3'>
              <div className='flex items-center justify-between gap-3 bg-green-100 rounded-xl shadow-lg p-2'>
                <div className='p-3 border-2 border-slate-200  bg-primary text-white shadow-lg w-fit rounded-[0.5rem]'>
                  <Icons.Home />
                </div>
                <Link
                  to='/dashboard/cages'
                  className='flex items-center  text-sm justify-between text-primary font-semibold '
                >
                  View All <Icons.ArrowRight className='text-sm' />
                </Link>
              </div>
              <div className='p-2 py-4 text-md font-bold uppercase bg-secondary border-2  mt-2 rounded-lg '>
                <h3>Cages</h3>
                <h2>{ZooStatistics?.totalCage}</h2>
              </div>
            </div>

            <div className='border-2 border-gray-200 rounded-[1rem] shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all p-3'>
              <div className='flex items-center justify-between gap-3 bg-green-100 rounded-xl shadow-lg p-2'>
                <div className='p-3 border-2 border-slate-200   w-fit rounded-[0.5rem] bg-primary text-white shadow-lg'>
                  <Icons.MayIn />
                </div>
                <Link
                  to='/dashboard/areas'
                  className='flex items-center  text-sm justify-between  text-primary font-semibold '
                >
                  View All <Icons.ArrowRight className='text-sm' />
                </Link>
              </div>
              <div className='p-2 py-4 text-md font-bold uppercase border-2  mt-2 rounded-lg bg-secondary'>
                <h3>Areas</h3>
                <h2>{ZooStatistics?.totalArea}</h2>
              </div>
            </div>

            <div className='border-2 border-gray-200 rounded-[1rem] shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all p-3'>
              <div className='flex items-center justify-between gap-3 bg-green-100 rounded-xl shadow-lg p-2'>
                <div className='p-3 border-2 border-slate-200   w-fit rounded-[0.5rem] bg-primary text-white shadow-lg'>
                  <Icons.NewsPaper />
                </div>
                <Link
                  to='/dashboard/news'
                  className='flex items-center text-primary font-semibold text-sm justify-between '
                >
                  View All <Icons.ArrowRight className='text-sm' />
                </Link>
              </div>
              <div className='p-2 py-4 text-md font-bold uppercase border-2  mt-2 rounded-lg bg-secondary'>
                <h3>Total News</h3>
                <h2>{ZooStatistics?.totalNewsPublished}</h2>
              </div>
            </div>
            <div className='border-2 border-gray-200 rounded-[1rem] shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all p-3 '>
              <div className='flex items-center justify-between gap-3 bg-green-100 rounded-xl shadow-lg p-2'>
                <div className='flex gap-5 items-center justify-center'>
                  <div className='p-3 border-2 border-slate-200   w-fit rounded-[0.5rem] bg-primary text-white shadow-lg'>
                    <Icons.User2 />
                  </div>
                </div>
                <Link
                  to='/dashboard/accounts'
                  className='flex items-center text-primary font-semibold text-sm justify-between '
                >
                  View All <Icons.ArrowRight className='text-sm' />
                </Link>
              </div>
              {/* flex items-center gap-4 sm:justify-between sm:flex-row xsm:flex-col xsm:justify-start */}
              <div className='w-full flex gap-2 overflow-auto border-2  mt-2 rounded-lg bg-secondary '>
                <div className='flex-1 p-2 py-4 text-md font-bold uppercase'>
                  <h3>Staff</h3>
                  <h2>{ZooStatistics?.totalStaff}</h2>
                </div>
                <Separator orientation='vertical' className='xsm:hidden justify-self-center sm:flex' />
                <div className='flex-1 p-2 py-4 text-md font-bold uppercase'>
                  <h3>Trainer</h3>
                  <h2>{ZooStatistics?.totalTrainer}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* 
            pie chart here 
            grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3
            */}
          <div className='grid  lg:grid-cols-3 grid-cols-1  gap-4   h-fit w-full '>
            {/* 
            News chart here */}
            <div className='row-span-4 col-span-2 flex items-center justify-center min-w-full h-full rounded '>
              <div className=' border w-full h-full p-5 rounded-[0.5rem] shadow-md border-gray-200'>
                <div className='flex items-start justify-between  gap-14 bg-green-100 rounded-xl shadow-lg p-4 opacity-80 hover:opacity-100'>
                  <div className='text-primary font-bold uppercase '>
                    <p className=''>Unpublished news</p>
                    <h1>{BlogData?.length}</h1>
                  </div>
                  <Link
                    to='/dashboard/news'
                    className='flex items-center  text-sm justify-between  text-primary font-bold'
                  >
                    View All News
                    <Icons.ArrowRight className='text-sm' />
                  </Link>
                </div>
                <div className='mt-3 w-full  text-xs h-fit'>
                  {' '}
                  {new_data.isError ? (
                    <Error />
                  ) : !new_data.isLoading ? (
                    BlogData.length == 0 ? (
                      <div>No data available </div>
                    ) : (
                      BlogData.map((el: NewType, id: number) => {
                        return (
                          <article className=' mb-4 w-full overflow-auto' key={id}>
                            <time
                              className=' hidden md:block relative z-10 order-first  items-center text-sm text-zinc-400 dark:text-zinc-500'
                              dateTime={getDate(el?.postedAt)}
                            >
                              {getDate(el?.postedAt)}
                            </time>
                            <div className='   flex flex-col  items-start'>
                              <div className='flex items-start flex-col border rounded-[0.5rem] p-4  gap-4 w-full'>
                                <div className=''>
                                  <h2 className='text-base font-semibold tracking-tight w-1/2 line-clamp-2  text-zinc-800  dark:text-zinc-100'>
                                    {/* <div className='absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl'></div> */}
                                    <Link to={`/dashboard/news/${el.id}`}>
                                      {/* <span className='absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl'></span> */}
                                      <div className='relative z-10 '>{el.title}</div>
                                    </Link>
                                  </h2>
                                  <p className=' z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
                                    {!el?.author ? 'Unknown' : el.author.email}
                                  </p>
                                </div>
                                <div
                                  aria-hidden='true'
                                  onClick={() => {
                                    setNewUpdate(el)
                                    setShowDeleteDialog(true)
                                  }}
                                  className=' z-10 flex items-start  text-sm  text-primary hover:bg-green-200 uppercase font-semibold rounded-sm duration-100 transition-all cursor-pointer p-2'
                                >
                                  Publish
                                </div>
                              </div>

                              <time
                                className='md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5'
                                dateTime={getDate(el?.postedAt)}
                              >
                                <span className='absolute inset-y-0 left-0 flex items-center' aria-hidden='true'>
                                  <span className='h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500'></span>
                                </span>
                                <span className='ml-3'>{getDate(el?.postedAt)}</span>
                              </time>
                            </div>
                          </article>
                        )
                      })
                    )
                  ) : (
                    <LoadingScreen></LoadingScreen>
                  )}
                </div>
              </div>
            </div>

            {/* 
            pie chart here 
            grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3
            */}
            <div className='flex flex-col h-[370px] md:row-span-2  lg:row-span-2   col-span-2 border md:col-span-1 lg:col-span-1 overflow-auto    min-h-full rounded-[0.5rem] shadow-md  p-4  border-gray-200 '>
              <div className='flex items-start justify-between  gap-14 bg-green-100 rounded-xl shadow-lg p-4 opacity-80 hover:opacity-100 '>
                <div className='font-bold text-primary uppercase'>
                  <p className=' '>Animal Statistics</p>
                  <h1 className='font-medium '>{ZooStatistics?.totalAnimal}</h1>
                </div>
                <Link
                  to='/dashboard/animals'
                  className='flex items-center text-sm justify-between font-bold text-primary'
                >
                  View All <Icons.ArrowRight className='text-sm' />
                </Link>
              </div>
              <div className='mt-3 w-full flex-1 text-xs'>
                <AnimalPieChart data={dataAnimal} width={400} height={300} />
              </div>
            </div>

            {/* 
            pie chart here */}
            <div className=' flex flex-col h-[370px] md:row-span-2  lg:row-span-2   col-span-2 border md:col-span-1 lg:col-span-1  min-h-full rounded-[0.5rem] shadow-md  p-4  border-gray-200 '>
              <div className='flex flex-col w-full h-full mx-auto'>
                <div className='flex items-start justify-between  gap-14 bg-green-100 rounded-xl shadow-lg p-4 opacity-80 hover:opacity-100'>
                  <div className='font-semibold text-primary uppercase'>
                    <p className=' '>Species Statistics</p>
                    <h1 className='font-medium '>{speciesStatic.length}</h1>
                  </div>
                  <Link
                    to='/dashboard/animal_species'
                    className='flex items-center t text-sm justify-between text-primary font-bold '
                  >
                    View All <Icons.ArrowRight className='text-sm' />
                  </Link>
                </div>
                <div className='mt-3 w-full flex-1 text-xs'>
                  <SpeciesPieChart data={speciesStatic} width={400} height={300} />
                </div>
              </div>
            </div>
          </div>

          <div className='grid  lg:grid-cols-3 md:grid-cols-1  gap-4 w-full h-full'>
            {/* 
            Bar chart here */}
            <div className=' lg:col-span-2 col-span-1 block  rounded-[0.5rem]'>
              <div className='h-full   p-5 rounded-[0.5rem] border shadow-md border-gray-200 flex  flex-col w-full'>
                <div className='flex items-start justify-between  gap-14  bg-green-100 rounded-xl shadow-lg p-4 opacity-80 hover:opacity-100'>
                  <div className='font-bold text-primary uppercase'>
                    <p className=' '>Revenue Statistic</p>
                    {/* <h1 className='text-gray-700 font-medium'>{ZooStatistics?.totalAnimal}</h1> */}
                  </div>
                  <Link
                    to='/dashboard/orders'
                    className='flex items-center  text-sm justify-between text-primary font-bold '
                  >
                    View Orders <Icons.ArrowRight className='text-sm' />
                  </Link>
                </div>
                <div className=' flex sm:items-end gap-4 sm:flex-row flex-col items-start sm:justify-between p-5'>
                  <div className={cn('flex gap-2 items-center justify-between')}>
                    <Label>Type: </Label>
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
                        {options.map((option, id: number) => (
                          <SelectItem key={`${option.value}-${id}`} value={option.type?.toString() ?? ''}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {type == 'YEAR' ? (
                    <div className={cn('flex flex-col sm:flex-row items-center gap-2 justify-between ')}>
                      <div className='flex sm:items-center  gap-2 '>
                        <Label>Start Year: </Label>
                        <Select
                          value={yearRange.from}
                          onValueChange={(value) => {
                            handleYearStartChange(value)
                          }}
                        >
                          <SelectTrigger className=' focus:ring-0'>
                            {' '}
                            {yearRange.from != '' ? yearRange.from : 'Select Start Year'}
                          </SelectTrigger>
                          <SelectContent position='popper'>
                            <ScrollArea className='h-80'>
                              {years.map((option, id: number) => (
                                <SelectItem key={`${option}-${id}`} value={option?.toString() ?? ''}>
                                  {option}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Label>End Year: </Label>
                        <Select
                          value={yearRange.to}
                          onValueChange={(value) => {
                            handleYearEndChange(value)
                          }}
                        >
                          <SelectTrigger className='pr-1.5 focus:ring-0'>
                            {' '}
                            {yearRange.to != '' ? yearRange.to : 'Select End Year'}
                          </SelectTrigger>
                          <SelectContent position='popper'>
                            <ScrollArea className='h-80'>
                              {years.map((option, id: number) => (
                                <SelectItem key={`${option}-${id}`} value={option?.toString() ?? ''}>
                                  {option}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : type === 'MONTH' ? (
                    <div className={cn('grid gap-2')}>
                      <Label>Year: </Label>

                      <Select
                        value={yearOfMonth}
                        onValueChange={(value) => {
                          handleYearOfMonthEndChange(value)
                        }}
                      >
                        <SelectTrigger className='pr-1.5 focus:ring-0'>
                          {' '}
                          {yearOfMonth != '' ? yearOfMonth : 'Select Year'}
                        </SelectTrigger>
                        <SelectContent position='popper'>
                          <ScrollArea className='h-80'>
                            {years.map((option, id: number) => (
                              <SelectItem key={`${option}-${id}`} value={option?.toString() ?? ''}>
                                {option}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className={cn('grid gap-2')}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id='date'
                            variant={'outline'}
                            className={cn(
                              'w-[260px] justify-start text-left font-normal',
                              !date && 'text-muted-foreground'
                            )}
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
                  )}
                </div>
                <div className='mt-3 w-full h-[22rem] text-xs '>
                  <SaleBarChart data={statistics} />
                </div>
              </div>
            </div>
            {/* 
               ticket distribution here */}
            <div className='flex row-span-1   border  flex-col border-gray-200 p-5 rounded-[0.5rem] shadow-md '>
              <div className='flex   flex-col'>
                <div className='flex items-start justify-between  gap-14  bg-green-100 rounded-xl shadow-lg p-4 opacity-80 hover:opacity-100 '>
                  <div className='text-primary uppercase font-bold'>
                    <p className=' '>Ticket Distribution</p>
                    <h1 className=' font-medium '>{ticketDistributionData?.length}</h1>
                  </div>
                  <Link
                    to='/dashboard/animals'
                    className='flex items-center  text-sm justify-between text-primary font-bold '
                  >
                    View All <Icons.ArrowRight className='text-sm' />
                  </Link>
                </div>
                <div className='mt-3 w-full  h-[22rem] text-xs'>
                  <SpeciesPieChart data={ticketStatistics} width={400} height={300} />
                </div>
              </div>
            </div>
          </div>
          <ModalConfirmUpdate
            newUpdate={newUpdate}
            showDeleteDialog={showDeleteDialog}
            setShowDeleteDialog={setShowDeleteDialog}
          />
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </section>
  )
}

export default Dashboard
