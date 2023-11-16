// @flow
import { User } from '@/types';
import * as React from 'react';
import Meat from '@/assets/meat.jpg'
import Grain from '@/assets/grain.jpg'
import Fruit from '@/assets/fruit.jpg'
import { Link } from 'react-router-dom';
import { EditSpecies } from '../../Species/components/UpdateSpecies';
import { buttonVariants } from '@/components/ui/button';
type Props = { id: number; name: string; type: string, unit: string, description: string; user: User }
export const FoodCard = (props: Props) => {
    let bgImage = Fruit
    if (props?.type === 'PROTEIN') {
        bgImage = Meat
    } else if (props?.type === 'GRAIN_AND_CEREAL') {
        bgImage = Grain
    }


    //const bgImage = Lin

    return (
        <div className={` species-img box-content h-full  border-4 rounded-[1rem] overflow-clip`}>
            <div className='h-[200px]'>
                <img src={bgImage} alt={props.name} className='h-full w-full object-fill saturate-50 brightness-125 ' />
            </div>

            <div className='flex justify-between h-fit p-3 '>
                {/* <p className='text-black font-extralight'>{props.id}</p> */}
                <div className='text-foreground my-4'>
                    <h4 className='font-normal truncate text-2xl'>Name: {props.name} | Unit: {props.unit}</h4>
                    <h5 className='font-normal truncate text-lg pt-3'>Type: {props.type}</h5>
                    <p className='font-extralight truncate-4 my-3'>{props.description}</p>
                </div>
                <div className='font-normal flex space-x-3 items-start p-4'>
                    <EditSpecies id={props.id} />
                </div>
            </div>
        </div>
    )
};