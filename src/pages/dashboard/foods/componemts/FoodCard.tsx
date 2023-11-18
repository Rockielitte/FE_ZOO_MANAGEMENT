// @flow
import { User } from '@/types'
import Meat from '@/assets/meat.jpg'
import Grain from '@/assets/grain.jpg'
import Fruit from '@/assets/fruit.jpg'
import { UpdateFood } from './UpdateFood'
type Props = { id: number; name: string; type: string; unit: string; description: string; user: User }
export const FoodCard = (props: Props) => {
    let bgImage = Fruit
    let typeFood = 'Fruit And Vegetable'
    if (props?.type === 'PROTEIN') {
        bgImage = Meat
        typeFood = 'Protein'
    } else if (props?.type === 'GRAIN_AND_CEREAL') {
        bgImage = Grain
        typeFood = 'Grain And Cereal'
    }

    //const bgImage = Lin

    return (
        <div
            className={`flex flex-col  rounded-md species-img box-content h-full  border-2 shadow-lg  overflow-clip w-full`}
        >
            <div className='h-[200px] w-full'>
                <img
                    src={bgImage}
                    alt={props.name}
                    className='h-full w-full object-cover rounded-lg overflow-hidden saturate-50 brightness-125 '
                />
            </div>

            <div className='flex flex-col gap-2 w-full flex-1 bg-secondary items-start justify-between border-t-4 border-dashed p-3  '>
                {/* <p className='text-black font-extralight'>{props.id}</p> */}
                <div className='gap-2 text-foreground my-4 flex-1 flex flex-col '>
                    <h4 className='font-bold truncate text-lg uppercase'>
                        Name: {props.name} | Unit: {props.unit}
                    </h4>
                    <h5 className='font-normal truncate text-sm uppercase '>Type: {typeFood}</h5>
                    <p className='text-xs truncate-4 '>{props.description}</p>
                </div>
                <div className='w-4/12 font-normal flex items-start '>
                    <UpdateFood id={props.id} />
                </div>
            </div>
        </div>
    )
}
