import { FC, Key } from 'react'
// import { useQuery } from 'react-query'
// import { get } from '../utils/apiCaller'
import { useLoaderData } from 'react-router-dom'

const TestComponent: FC = () => {
  const data: any = useLoaderData()

  console.log('data: ', data)

  return (
    <div>
      hi
      {data.map((el: { name: string | null | undefined }, id: Key | null | undefined) => (
        <p key={id}> {el.name}</p>
      ))}
    </div>
  )
}

export default TestComponent
