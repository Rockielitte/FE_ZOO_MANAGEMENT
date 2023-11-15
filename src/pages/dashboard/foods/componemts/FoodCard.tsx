// @flow
import { User } from '@/types';
import * as React from 'react';
import Lin from '@/assets/image14.png'
import { Link } from 'react-router-dom';
import { EditSpecies } from '../../Species/components/UpdateSpecies';
import { buttonVariants } from '@/components/ui/button';
type Props = { id: number; name: string; type: string, unit: string, description: string; image: string; user: User }
export const FoodCard = (props: Props) => {
    //const bgImage = props?.image ? props?.image : Lin

    const bgImage = Lin

    return (
        <div className={` species-img box-content h-full  border-4 rounded-[1rem] overflow-clip`}>
            <div className='h-[200px]'>
                <img src={bgImage} alt={props.name} className='h-full w-full object-cover  saturate-50 brightness-125 ' />
            </div>

            <div className='flex justify-between flex-col h-fit p-3 '>
                {/* <p className='text-black font-extralight'>{props.id}</p> */}
                <div className='text-foreground my-4'>
                    <h4 className='font-normal truncate text-3xl '>{props.name} | type: {props.type} | unit: {props.unit}</h4>
                    <p className='font-extralight truncate-4 my-3'>{props.description}</p>
                </div>
                <div className='font-normal flex space-x-3'>
                    <Link to={`/dashboard/animal_species/${props.id}`} className={buttonVariants({ variant: 'secondary' })}>
                        View
                    </Link>
                    <EditSpecies id={props.id} />
                </div>
            </div>
        </div>
    )
};