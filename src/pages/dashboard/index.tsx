import AnimalPieChart from '@/components/AnimalPieChart'
import Example from '@/components/BarChart'
import { Icons } from '@/components/Icon'
import useQueryCustom from '@/hooks/useQueryCustom'
import { ZooStatistics } from '@/types'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const fetch_statistics = useQueryCustom({
    query: '/dashboard/zoo-statistics',
    queryKey: ['zoos-statistics'],
    data: {} as ZooStatistics
  })
  const ZooStatistics = fetch_statistics.data as ZooStatistics
  const data = [
    {
      name: 'Healthy',
      value: ZooStatistics?.totalAnimal - ZooStatistics?.totalAnimalSick - ZooStatistics?.totalAnimalInDanger
    },
    { name: 'Sick', value: ZooStatistics?.totalAnimalSick },
    { name: 'In danger', value: ZooStatistics?.totalAnimalInDanger }

    //   { name: 'Group D', value: 200 }
  ]
  return (
    <section className='w-full  h-full flex flex-col shadow-2xl rounded-[0.5rem] border bg-background'>
      <div className='flex-1 overflow-auto p-5'>
        <div className=' flex items-center flex-col justify-center border w-fit p-5 rounded-[0.5rem] shadow-md'>
          <div className='flex items-start justify-between  gap-14'>
            <div className=''>
              <p className=' text-muted-foreground'>Animal Statistics</p>
              <h1>1000</h1>
            </div>
            <Link to='/dashboard/animal' className='flex items-center text-muted-foreground text-sm justify-between '>
              View All <Icons.ArrowRight className='text-sm' />
            </Link>
          </div>

          <AnimalPieChart data={data} width={250} height={250} />
        </div>

        <Example />
      </div>
    </section>
  )
}

export default Dashboard
