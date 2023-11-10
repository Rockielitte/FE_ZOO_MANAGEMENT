import { User } from '@/types';
import { buttonVariants } from './ui/button'
import { EditSpecies } from '@/pages/dashboard/Species/components/UpdateSpecies'
import { Link } from 'react-router-dom';
import Lin from '@/assets/image14.png'



type Props = { id: number; name: string; description: string; image: string, user: User }

export const SpeciesCard = (props: Props) => {
  console.log("user role: " + props?.image);
  const bgImage = props?.image ? props?.image : Lin
  console.log("image: " + bgImage);
  // !props?.image ? "http://service.zoomanagement.online/utils/files?fileName=pass.jpg" : 
  return (


    <div className={` species-img box-content h-full  border-4 rounded-[1rem] overflow-clip`}>
      <div className='h-[200px]'>
        <img src={bgImage} alt={props.name} className='h-full w-full object-cover  saturate-50 brightness-125 ' />
      </div>

      <div className='flex justify-between flex-col h-fit p-3 '>
        {/* <p className='text-black font-extralight'>{props.id}</p> */}
        <div className='text-black my-4'>
          <h3 className='font-normal truncate text-4xl'>{props.name}</h3>
          <p className='font-extralight truncate-4 my-3'>{props.description}</p>
        </div>
        <div className='font-normal flex space-x-3'>
          <Link to={`/dashboard/animal_species/${props.id}`} className={buttonVariants({ variant: 'secondary' })}>
            View
          </Link>
          {props.user?.role === 'ADMIN' ? (<EditSpecies id={props.id} />) : (<></>)}

        </div>
      </div>
    </div>
  )
}
