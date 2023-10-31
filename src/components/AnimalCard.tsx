import * as React from 'react'
import Lin from '@/assets/image14.png'
import { EyeIcon } from 'lucide-react'

export interface IAppProps {}

export default function AnimalCard(props: IAppProps) {
  return (
    <div className='flex justify-start align-middle border-2 rounded-[0.5rem] gap-3 overflow-hidden'>
      <div className=''>
        <img width='300px' height='200px' src={Lin} alt='' />
      </div>
      <div className='p-6'>
        <h3 className='font-normal text-4xl flex items-center gap-3'>
          Animal Name <EyeIcon />
        </h3>
        <p className='truncate w-[50rem] pt-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet facilisis urna. Vestibulum ornare et orci
          ac consectetur. Praesent id diam at tellus lacinia consequat. Quisque in enim velit. Nunc tempus est feugiat
          dolor bibendum faucibus.{' '}
        </p>
      </div>
    </div>
  )
}
