import { Button, buttonVariants } from '@/components/ui/button';
import * as React from 'react';
import { SpeciesCard } from '@/components/SpeciesCard';
import { Input } from '@/components/ui/input';
import { CreateSpecies } from './components/CreateSpecies';
import { useLoaderData } from 'react-router-dom';

export interface IAppProps {
}
export default function Species(props: IAppProps) {
  const data = useLoaderData()
  console.log(data)
  const [species, setSpecies] = React.useState([...data.data])
  return (
    <div className='w-full p-3 py-2 h-full shadow-2xl border rounded-[0.5rem] '>
      <div className='flex items-center py-2 gap-2 justify-between space-y-2'>
        <Input
          placeholder='Filter emails...'
          // value="Animal Species..."
          onChange={(event) => {
            let newData = species.filter((el) => {
              if (el.name.includes(event.target.value) ) {
                return el;
              }
            })
            console.log(newData)
            console.log(event.target.value)
            if(event.target.value.length == 0){setSpecies([...data.data])}
            else{
              setSpecies(newData);
            }
          }
          }
          className='max-w-sm'
        />
        <CreateSpecies />
      </div>

      <div className='flex flex-wrap justify-center overflow-auto'>
        {species.map((el) => {
          return <SpeciesCard key={el.id} id={el.id} name={el.name} description={el.description} image={el.image} />
        })}
      </div>

    </div>
  );
}

{/* <br />

      <div className='flex justify-start align-middle border-2 rounded-[0.5rem] gap-3 overflow-hidden'>
        <div className=''>
          <img width='300px' height='200px' src={Lin} alt='' />
        </div>
        <div className='p-6'>
          <h3 className='font-normal text-4xl flex items-center gap-3'>Animal Name <EyeIcon /></h3>
          <p className='truncate w-[50rem] pt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet facilisis urna. Vestibulum ornare et orci ac consectetur. Praesent id diam at tellus lacinia consequat.
            Quisque in enim velit. Nunc tempus est feugiat dolor bibendum faucibus. </p>
        </div>
      </div> */}