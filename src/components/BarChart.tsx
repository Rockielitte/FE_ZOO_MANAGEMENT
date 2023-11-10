import { SaleOverallStatistics } from '@/types'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type Props = {
  data: SaleOverallStatistics[] | undefined
  width?: number
  height?: number
}

export default function SaleBarChart({ data }: Props) {
  if (data?.length === 0) {
    return <div className='flex items-center justify-center p-10'>No data available.</div> // Render a message when data is empty
  }
  return (
    <ResponsiveContainer width={'99%'} height={'99%'}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
        <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
        <Tooltip />
        <Legend />
        <Bar yAxisId='left' dataKey='totalMoney' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />
        <Bar
          yAxisId='right'
          dataKey='totalTicket'
          fill='#82ca9d'
          activeBar={<Rectangle fill='gold' stroke='purple' />}
        />
        {/* <Bar dataKey='amt' fill='#82ca9s' activeBar={<Rectangle fill='gold' stroke='red' />} /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}
