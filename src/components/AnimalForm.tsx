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
import { UseFormReturn, FieldValues, Path, SubmitHandler, WatchObserver, PathValue } from 'react-hook-form'
import * as z from 'zod'

import { useMemo, useState } from 'react'
import { AiOutlineCloudUpload, AiTwotoneDelete } from 'react-icons/ai'
import { BsImages, BsUpload } from 'react-icons/bs'
import Carousel from '@/components/Carousel'

import { AnimalGenderEnum, AnimalStatusEnum } from '@/types'
import { UseMutationResult, useMutation } from 'react-query'

import { useUserStore } from '@/stores'
import axios from 'axios'
import { toast } from 'react-toastify'
import { request } from '@/utils/apiCaller'
import LoadingScreen from './Loading'
import { SelectMap } from './SelectMap'
import { SelectSearch } from './SelectSearch'

interface AnimalFormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  formMutation: UseMutationResult<unknown, unknown, T>
  // fields: {
  //   field:Path<T>
  //   type: 'date' | 'select' | 'input' | 'view' | 'meta'|"file"|"none"
  //   options?: {
  //     selectEnum: string[]
  //   }
  // }[]
  fields: Path<T>[]
}

const AnimalForm = <T extends FieldValues>({ form, formMutation, fields }: AnimalFormProps<T>) => {
  const [imageShow, setImageShow] = useState('images')
  const [image, setImage] = useState<File>()
  const imageUrl = useMemo(() => image && URL.createObjectURL(image as Blob), [image])
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) setImage(e.target.files[0])
  }
  const token = useUserStore((state) => state.user)?.token
  const imageMutation = useMutation({
    mutationKey: ['upload'],
    mutationFn: (data: File) => {
      const formData = new FormData()
      formData.append('file', data)
      return request<string>(
        `/upload`,
        'POST',
        {
          Authorization: `Bearer ${token} `,
          Headers: { 'Content-Type': 'application/json' }
        },
        {},
        formData
      )
    },
    onSuccess: (data) => {
      const currentValue = [...(form.getValues('imageList' as Path<T>) || [])]
      const newValue = [...currentValue, data.data] as PathValue<T, Path<T>>
      console.log(newValue, 'kkkkk')

      form.setValue('imageList' as Path<T>, newValue)
      toast.success('Send sucessfully')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.message)
      }
    }
  })
  const handleSubmitImage: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (image) imageMutation.mutate(image)
  }
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue
  } = form
  console.log('reder form')

  const onSubmit: SubmitHandler<T> = async (data) => {
    // const sendData = { ...data, dob: data.dob.toISOString().substring(0, 10) }
    formMutation.mutate(data)
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-hidden'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // })
  }
  return (
    <div className='w-full h-full border shadow-xl rounded-lg p-2 overflow-auto flex-col flex '>
      {formMutation.isLoading && <LoadingScreen label='submitting'></LoadingScreen>}
      <div className=' text-white flex flex-col border-b-2  border-secondary shadow-lg font-ime bg-primary px-5 sm:-m-2 leading-tight rounded-md'>
        <span className='text-xl uppercase font-bold tracking-wider pt-1 font-ime min-h-[32px]'>
          {watch('name' as Path<T>) || 'Create animal'}
        </span>
        <span className='font-normal text-base min-h-[24px] tracking-wide'>
          {watch('speciesId' as Path<T>) || 'Spiecies'}
        </span>
      </div>
      <div className='flex-1 flex flex-col-reverse sm:flex-row gap-2  sm:overflow-auto pt-4  sm:px-0'>
        <form className='w-full md:w-3/5 md:h-full relative  ' onSubmit={handleSubmit(onSubmit)}>
          <Button
            type='submit'
            className='absolute flex z-20 items-center gap-1 bottom-1 right-1 sm:right-3 sm:bottom-2 opacity-70  font-bold hover:opacity-100 hover:scale-110 transition-all'
            disabled={formMutation.isLoading}
          >
            <RiSendPlaneLine className='text-xl' />
            Submit
          </Button>
          <div className='w-full  md:border-r  flex flex-col sm:flex-row  justify-between flex-wrap gap-4 px-6 overflow-auto h-full py-2 '>
            {fields.map(
              (item) =>
                item != 'images' && (
                  <div className='w-full  flex flex-col gap-2 relative ' key={item}>
                    <div className='flex w-full  justify-center  items-center gap-2 '>
                      <Label htmlFor={item} className='min-w-[80px] capitalize text-base'>
                        {item}
                      </Label>
                      {item == 'description' || item == 'note' ? (
                        <Textarea
                          {...register(item)}
                          placeholder='Type content here . . .'
                          id={item}
                          className='flex-1'
                        />
                      ) : item == 'dob' ? (
                        <Popover>
                          <PopoverTrigger asChild id={item}>
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
                                setValue(item, value as PathValue<T, Path<T>>, { shouldValidate: true })
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      ) : item == 'gender' ? (
                        <Select
                          onValueChange={(value) => {
                            setValue(item, value as PathValue<T, Path<T>>)
                          }}
                          value={watch(item)}
                          defaultValue={watch(item)}
                        >
                          <SelectTrigger className='w-full' id={item}>
                            <SelectValue placeholder={`Select gender here . . .`} />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(AnimalGenderEnum).map((item) => (
                              <SelectItem value={item} key={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : item == 'status' ? (
                        <Select
                          onValueChange={(value) => {
                            setValue(item, value as PathValue<T, Path<T>>)
                          }}
                          value={watch(item)}
                          defaultValue={getValues(item)}
                        >
                          <SelectTrigger className='w-full' id={item}>
                            <SelectValue placeholder={`Select status here . . .`} />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(AnimalStatusEnum).map((item) => (
                              <SelectItem value={item} key={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : item == 'speciesId' ? (
                        <div className='flex-1' id={item}>
                          <SelectSearch query='animal-species' form={form} item={item} />
                        </div>
                      ) : item == 'cageId' ? (
                        <div className='flex-1' id={item}>
                          <SelectSearch query='cages' form={form} item={item} />
                        </div>
                      ) : (
                        <Input
                          id={item}
                          placeholder={`Type ${item} here . . .`}
                          className='w-full'
                          {...register(item)}
                        />
                      )}
                    </div>
                    {errors[item]?.message && (
                      <div
                        className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 '
                        role='alert'
                      >
                        <svg
                          className='flex-shrink-0 inline w-4 h-4 mr-3'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                        </svg>
                        <span className='sr-only'>Info</span>
                        <div>
                          <span className='font-medium'>Danger alert!</span>
                          {errors[item]?.message as string}
                        </div>
                      </div>
                    )}
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
                  <Carousel images={getValues('imageList' as Path<T>) as string[]} />
                </div>
              </div>
            ) : (
              <div className='flex items-center flex-col justify-center w-full bg-background relative h-full py-2'>
                {imageMutation.isLoading && <LoadingScreen label='uploading'></LoadingScreen>}
                {!image ? (
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
                    <input
                      id='dropzone-file'
                      type='file'
                      accept='image/jpeg, image/png, image/gif'
                      className='hidden'
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className='flex flex-col items-center justify-center relative  w-full h-52  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-500'>
                    <img src={imageUrl} className='w-full h-full rounded-md object-contain' />
                    <AiTwotoneDelete
                      className='text-2xl transition-all hover:scale-125 opacity-50 hover:opacity-100 p-1 rounded-full bg-slate-100 absolute text-red-600 top-2 right-2'
                      onClick={() => {
                        setImage(undefined)
                      }}
                    />
                  </div>
                )}
                <Button
                  disabled={formMutation.isLoading}
                  onClick={handleSubmitImage}
                  className='w-full mt-4 text-lg font-bold flex gap-2 transition-all hover:opacity-100 opacity-70'
                >
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

export default AnimalForm
