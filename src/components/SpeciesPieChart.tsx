import { AnimalStatusStatistics } from '@/types'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#1DDD8D', '#D1F765', '#DB4E66', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: {
  cx: string
  cy: string
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
type Props = {
  data: AnimalStatusStatistics[]
  width: number
  height: number
}
export default function SpeciesPieChart({ data, width, height }: Props) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={width} height={height} className='flex items-center justify-center'>
        <Pie
          data={data}
          cx={'50%'}
          cy={'45%'}
          label={renderCustomizedLabel}
          labelLine={false}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
{
  /* /*{ <Pie
        data={data}
        cx='50%'
        cy='50%'
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill='#8884d8'
        dataKey='value'
      >
        {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))} */
}

//     <Cell key={`cell-${1}`} fill={COLORS[1 % COLORS.length]} />
//     {/* <Cell key={`cell-${2}`} fill={COLORS[2 % COLORS.length]} />
//     <Cell key={`cell-${3}`} fill={COLORS[3 % COLORS.length]} /> */}
//   </Pie> */} */}
