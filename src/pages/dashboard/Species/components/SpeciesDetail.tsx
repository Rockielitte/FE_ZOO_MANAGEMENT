import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as React from 'react';
import Lin from '@/assets/lin.jpg';
import { EyeIcon } from 'lucide-react'
import AnimalSpecies from '@/utils/api/AnimalSpecies';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { LandmarkIcon } from 'lucide-react';
import { LucideMoreHorizontal } from 'lucide-react';

export interface IAppProps {
}
export const animalList = [{ id: 1, name: 'meow', description: 'asdfg.....', image: Lin },
{ id: 2, name: 'meow', description: 'asdfg.....', image: Lin },
{ id: 3, name: 'meow', description: 'asdfg.....', image: Lin },
{ id: 4, name: 'meow', description: 'asdfg.....', image: Lin }]

export const cageList = [{ id: 1, code: 'A1000', description: 'asdfg.....' },
{ id: 2, code: 'A2000', description: 'asdfg.....' },
{ id: 3, code: 'A3000', description: 'asdfg.....' },
{ id: 4, code: 'A4000', description: 'asdfg.....' }]

export const speciesDetailQuery = (id: string) => ({
    queryKey: ['species', 'detail', id],
    queryFn: async () => {
        const species = await AnimalSpecies.getById(id)
        if (!species) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return species
    },
})
export default function SpeciesDetail(props: IAppProps) {
    const { id } = useParams()
    const { data: species } = useQuery(speciesDetailQuery(id))
    console.log(species)
    return (
        <div className='w-full p-5 py-2 h-full shadow-2xl border rounded-[0.5rem] overflow-auto '>

            <div className='p-5'>
                <h1 className='font-medium text-4xl'>{species.name}</h1>
                <p className='font-extralight'>{species.description}</p>
                <Separator />
            </div>

            <div className='p-5 flex flex-col gap-5'>
                <Input
                    placeholder='Filter emails...'
                    // value="Animal Species..."
                    //   onChange={(event) => {
                    //     let newData = species.filter((el) => {
                    //       if (el.name.includes(event.target.value) ) {
                    //         return el;
                    //       }
                    //     })
                    //     console.log(newData)
                    //     console.log(event.target.value)
                    //     if(event.target.value.length == 0){setSpecies([...data.data])}
                    //     else{
                    //       setSpecies(newData);
                    //     }
                    //   }
                    //   }
                    className='max-w-sm'
                />
                <Tabs defaultValue="animal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="animal">Animal</TabsTrigger>
                        <TabsTrigger value="cage">Cage</TabsTrigger>
                    </TabsList>
                    <TabsContent value="animal">
                        {species.animalList.length == 0 ? <p>The List is Empty</p> : species.animalList.map((animal) => {
                            return <div className='flex justify-start align-middle border-2 rounded-[0.5rem] gap-3 overflow-hidden'>
                                <div className=''>
                                    <img width='300px' height='200px' src={animal.image} alt='' />
                                </div>
                                <div className='p-6'>
                                    <h3 className='font-normal text-4xl flex items-center gap-3'>{animal.name} <EyeIcon /></h3>
                                    <p className='truncate w-[50rem] pt-2'>{animal.description}</p>
                                </div>
                            </div>
                        })}
                    </TabsContent>

                    <TabsContent value="cage">
                        <div className='grid grid-cols-2 gap-10 justify-center items-center p-7'>
                            {species.cageList.length == 0 ? <p>The cage list is empty</p> : species.cageList.map((cage) => {
                                return <div className='box-content w-full min-h-[150px] border-4 rounded-[1rem] flex flex-col'>

                                    <div className='bg-slate-100 dark:bg-slate-800 p-4 flex justify-between gap-4'>
                                        <div className='flex justify-between gap-4'>
                                            <div className='p-4 bg-white dark:bg-slate-600 flex justify-center items-center'><LandmarkIcon /></div>
                                            <div>
                                                <h3 className='font-normal text-4xl '>{cage.code}</h3>
                                                <p className="font-extralight">Cage for {species.name}</p>
                                            </div>
                                        </div>
                                        <div className='p-4 justify-self-end'><LucideMoreHorizontal /></div>
                                    </div>
                                    <Separator />
                                    <div className='p-4'>
                                        <p>{cage.description}</p>
                                    </div>

                                </div>

                            })}
                        </div>


                    </TabsContent>
                </Tabs>
            </div>

        </div>
    );
}
