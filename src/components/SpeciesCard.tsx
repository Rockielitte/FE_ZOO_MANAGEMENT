import { User } from '@/types'
import { buttonVariants } from './ui/button'
import { EditSpecies } from '@/pages/dashboard/Species/components/UpdateSpecies'
import { Link } from 'react-router-dom'
import Lin from '@/assets/image14.png'

type Props = { id: number; name: string; description: string; image: string; user: User }

export const SpeciesCard = (props: Props) => {
  const bgImage = props?.image ? props?.image : Lin

  // !props?.image ? "http://service.zoomanagement.online/utils/files?fileName=pass.jpg" :
  return (
    <div className={` species-img  h-full  border-2  overflow-clip shadow-xl rounded-lg`}>
      <div className='h-[200px]'>
        <img src={bgImage} alt={props.name} className='h-full w-full object-cover  saturate-50 brightness-125 ' />
      </div>

      <div className='flex justify-between flex-col h-fit  bg-secondary p-2 rounded-md   '>
        {/* <p className='text-black font-extralight'>{props.id}</p> */}
        <div className='text-foreground my-4  rounded-sm'>
          <h3 className=' truncate text-2xl font-bold'>{props.name}</h3>
          <p className=' truncate-4 my-3 text-sm'>{props.description}</p>
        </div>
        <div className='font-normal flex space-x-3'>
          <Link to={`/dashboard/animal_species/${props.id}`} className={buttonVariants({ variant: 'outline' })}>
            View
          </Link>
          {props.user?.role === 'ADMIN' ? <EditSpecies id={props.id} /> : <></>}
        </div>
      </div>
    </div>
  )
}
