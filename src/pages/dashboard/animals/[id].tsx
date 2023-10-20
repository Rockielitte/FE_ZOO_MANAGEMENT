import { Button } from '@/components/ui/button'
import { Input, InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Popover } from '@radix-ui/react-popover'
import { CalendarIcon, Ghost } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { RiSendPlaneLine } from 'react-icons/ri'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { BsImages, BsUpload } from 'react-icons/bs'
import Carousel from '@/components/Carousel'
const animalSchema = z.object({
  name: z.string().min(1, { message: "This field can't be empty" }),
  species: z.string().min(1, { message: "This field can't be empty" }),
  cage: z.string().min(1, { message: "This field can't be empty" }),
  gender: z.enum(['Male', 'Female', 'Bisexual']),
  birthday: z.date().max(new Date(), { message: 'Please choose before current time' }),
  nation: z.string().min(1, { message: "This field can't be empty" }),
  description: z.string().optional(),
  note: z.string().optional(),
  images: z.string().array().optional()
})
type AnimalSchemaType = z.infer<typeof animalSchema>
const animal: AnimalSchemaType = {
  name: 'Lion',
  species: 'Lion',
  cage: 'A12',
  gender: 'Male',
  birthday: new Date('9/11/2022'),
  nation: 'Africa',
  description:
    'The lion is a large predator that belongs to the cat family. It is known for its majestic appearance, with a golden mane surrounding its head. Lions are primarily found in Africa and are known for their impressive hunting skills. They live in social groups called prides, consisting of multiple lionesses and a few male lions. Lions are carnivorous, feeding on a variety of prey animals such as wildebeests, zebras, and antelopes. They are powerful and agile hunters, capable of bringing down large animals. Lions have a lifespan of around 10 to 14 years in the wild. They are often regarded as a symbol of strength and royalty. However, due to habitat loss and poaching, lions are listed as a vulnerable species by conservation organizations.',
  note: 'Handle with caution',
  images: [
    'https://s28164.pcdn.co/files/African-Lion-0436-7843-600x400.jpg',
    'https://s28164.pcdn.co/files/African-Lion-Hasani-0003-9013-3-1280x720.jpg',
    'https://i2-prod.dailystar.co.uk/incoming/article29032374.ece/ALTERNATES/s615b/2_Worlds-loneliest-lion-loses-its-roar-after-being-left-alone-in-abandoned-zoo-for-5-years.jpg'
  ]
}
const AnimalDetail = () => {
  console.log('render')
  const [imageShow, setImageShow] = useState('images')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch
  } = useForm<AnimalSchemaType>({ resolver: zodResolver(animalSchema), defaultValues: animal })
  const onSubmit: SubmitHandler<AnimalSchemaType> = async (data) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-hidden'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }
  return (
    <div className='w-full h-full border shadow-xl rounded-lg p-2 overflow-auto flex-col flex '>
      <div className=' text-white flex flex-col border-b-2  border-secondary shadow-lg bg-primary px-5 sm:-m-2 leading-tight rounded-md'>
        <span className='text-xl uppercase font-bold tracking-wider pt-1 font-luck'>{animal.name}</span>
        <span className='font-normal text-base'>{animal.species}</span>
      </div>
      <div className='flex-1 flex flex-col-reverse sm:flex-row gap-2  sm:overflow-auto pt-4  sm:px-0'>
        <form className='w-full md:w-3/5 md:h-full relative  ' onSubmit={handleSubmit(onSubmit)}>
          <Button
            type='submit'
            className='absolute flex z-20 items-center gap-1 bottom-1 right-1 sm:right-3 sm:bottom-2 opacity-70  font-bold hover:opacity-100 hover:scale-110 transition-all'
            disabled={isSubmitting}
          >
            <RiSendPlaneLine className='text-xl' />
            Submit
          </Button>
          <div className='w-full  md:border-r  flex flex-col sm:flex-row  justify-between flex-wrap gap-7 px-6 overflow-auto h-full py-2 '>
            {Object.keys(animal).map(
              (item) =>
                item != 'images' && (
                  <div className='w-full  flex  relative ' key={item}>
                    <div className='flex w-full  justify-center  items-center gap-2'>
                      <Label htmlFor={item} className='min-w-[80px] capitalize text-base'>
                        {item}
                      </Label>

                      {item != 'description' && item != 'note' && item != 'gender' && item != 'birthday' ? (
                        <Input
                          type='text'
                          id={item}
                          placeholder={item}
                          className='w-full'
                          {...register(item as keyof AnimalSchemaType)}
                        />
                      ) : item != 'birthday' && item != 'gender' ? (
                        <Textarea
                          {...register(item as keyof AnimalSchemaType)}
                          placeholder='Type your content here ....'
                          id={item}
                          rows={5}
                          className='flex-1'
                        />
                      ) : item != 'birthday' ? (
                        <Select
                          onValueChange={(value) => {
                            setValue(item, value as 'Male' | 'Female' | 'Bisexual')
                          }}
                          defaultValue={getValues(item)}
                        >
                          <SelectTrigger className='w-full' id={item}>
                            <SelectValue placeholder={item} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='Male'>Male</SelectItem>
                            <SelectItem value='Female'>Female</SelectItem>
                            <SelectItem value='Bisexual'>Bisexual</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id={item}
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !watch(item) && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className='mr-2 h-4 w-4' />
                              {watch(item) ? format(watch(item), 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0'>
                            <Calendar
                              mode='single'
                              selected={watch(item)}
                              onSelect={(value) => {
                                setValue(item, value as Date, { shouldValidate: true })
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                    <span className='right-0 text-sm font-normal text-red-500 absolute -bottom-6'>
                      {errors[item as keyof AnimalSchemaType] && errors[item as keyof AnimalSchemaType]?.message}
                    </span>
                  </div>
                )
            )}
          </div>
        </form>
        <div className='border-2 border-dashed my-2 block sm:hidden'></div>
        <div className='w-full md:w-2/5 px-6 flex flex-col gap-4 overflow-auto py-2'>
          <div className='flex items-center gap-1 text-xl font-bold'>
            <Button
              className='flex-1 transition-all duration-500 flex items-center gap-2'
              variant={imageShow == 'images' ? 'default' : 'secondary'}
              onClick={() => setImageShow('images')}
            >
              <BsImages className='text-xl'></BsImages>
              Images
            </Button>
            <Button
              className='flex-1 transition-all duration-500  flex items-center gap-2'
              variant={imageShow == 'post' ? 'default' : 'secondary'}
              onClick={() => setImageShow('post')}
            >
              <AiOutlineCloudUpload className='text-xl' />
              Upload
            </Button>
          </div>
          <div className='h-[300px] sm:flex-1 overflow-auto '>
            {imageShow == 'images' ? (
              <div className='w-full h-full flex justify-center  gap-2 flex-col'>
                <div className='w-full  h-[200px]'>
                  <Carousel images={animal.images as string[]} />
                </div>
                <div>jkasedhf</div>
              </div>
            ) : (
              <div className='flex items-center flex-col justify-center w-full bg-background  h-full py-2'>
                <label
                  htmlFor='dropzone-file'
                  className='flex flex-col items-center justify-center w-full h-52  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-500'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      className='w-8 h-8 mb-4 '
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 16'
                    >
                      <path
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                      />
                    </svg>
                    <p className='mb-2 text-sm'>
                      <span className='font-semibold'>Click to upload</span> or drag and drop
                    </p>
                    <p className='text-xs '>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id='dropzone-file' type='file' className='hidden' />
                </label>
                <Button className='w-full mt-4 text-lg font-bold flex gap-2 transition-all hover:opacity-100 opacity-70'>
                  <BsUpload />
                  <span>Upload</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalDetail
