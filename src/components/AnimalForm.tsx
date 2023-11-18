import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Popover } from '@radix-ui/react-popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { RiSendPlaneLine } from 'react-icons/ri'
import { UseFormReturn, FieldValues, Path, SubmitHandler, PathValue } from 'react-hook-form'

import { useMemo, useState } from 'react'
import { AiOutlineCloudUpload, AiTwotoneDelete } from 'react-icons/ai'
import { BsImages, BsUpload } from 'react-icons/bs'
import Carousel from '@/components/Carousel'

import { AnimalGenderEnum, AnimalStatusEnum, RoleEnum } from '@/types'
import { UseMutationResult } from 'react-query'

import LoadingScreen from './Loading'

import { SelectSearch } from './SelectSearch'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useSideMutation from '@/hooks/useSideMutation'
import useCheckRole from '@/hooks/useCheckRole'
import axios from 'axios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import AnimalMeal from './AnimalMeal'

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
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()

  const [image, setImage] = useState<FileList>()
  const imageUrl = useMemo(() => {
    const length = image?.length
    const list = []
    if (length) {
      for (let i = 0; i < length; i++) {
        list.push(URL.createObjectURL(image[i] as Blob))
      }
    }
    return list
  }, [image])
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) setImage(e.target.files)
  }

  const imageMutation = useSideMutation({
    query: `/utils/upload-many`,
    queryKey: ['upload'],
    returnType: [''] as string[]
  })

  const handleSubmitImage: React.MouseEventHandler<HTMLButtonElement> = () => {
    const length = image?.length
    if (length) {
      const formData = new FormData()

      for (let i = 0; i < length; i++) {
        formData.append('files', image[i])
      }

      imageMutation.mutate(formData, {
        onSuccess: (data) => {
          const currentValue = [...(form.getValues('imageList' as Path<T>) || [])]
          const newValue = [...currentValue, ...data.data] as PathValue<T, Path<T>>
          form.setValue('imageList' as Path<T>, newValue), setImage(undefined)
        }
      })
    }
  }

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue
  } = form

  const onSubmit: SubmitHandler<T> = async (data) => {
    // const sendData = { ...data, dob: data.dob.toISOString().substring(0, 10) }
    formMutation.mutate(data, {
      onSuccess: () => {
        navigate(`${queryParams.get('redirect') || '/dashboard/animals'}`)
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response?.data?.data) {
          error.response.data.data.forEach(({ field, message }: { field: string; message: string }) =>
            form.setError(field as Path<T>, { type: 'focus', message })
          )
        }
      }
    })
  }
  const id = useParams().id

  const user = useCheckRole()
  return (
    <div className='w-full h-full border shadow-xl rounded-lg p-2 overflow-auto flex-col flex '>
      {formMutation.isLoading && <LoadingScreen label='submitting'></LoadingScreen>}
      <div className='z-20 text-white flex flex-col border-b-2  border-secondary shadow-lg font-ime bg-primary px-5 sm:-m-2 leading-tight rounded-md'>
        <span className='text-xl uppercase font-bold tracking-wider pt-1 font-ime min-h-[32px]'>
          {id == undefined ? 'Create animal' : 'Update animal'}
        </span>
        <span className='font-normal text-base min-h-[24px] tracking-wide'>
          {watch('name' as Path<T>) || 'Animal name'}
        </span>
      </div>
      <div className='flex-1 flex flex-col-reverse md:flex-row gap-2  sm:overflow-auto pt-4  sm:px-0 z-0'>
        <form className='w-full md:w-5/12 md:h-full relative flex flex-col  ' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full flex-1  md:border-r  flex flex-col sm:flex-row  justify-between flex-wrap gap-4 px-6 overflow-auto h-full py-2 '>
            {fields.map((item) => {
              let label = String(item).includes('Id')
                ? String(item).substring(0, String(item).length - 2)
                : String(item)
              if (item == 'weight' || item == 'height' || item == 'length') {
                label = item == 'weight' ? label + '(kg)' : label + '(m)'
              } else if (item == 'feedingGuide') {
                label = 'feeding guide'
              }
              return (
                item != 'images' && (
                  <div className='w-full  flex flex-col gap-2 relative ' key={item}>
                    <div className='flex w-full  justify-center  items-center gap-2 '>
                      <Label htmlFor={item} className='min-w-[100px] uppercase text-sm'>
                        {label}
                      </Label>
                      {item == 'description' || item == 'note' || item == 'feedingGuide' ? (
                        <Textarea
                          {...register(item)}
                          placeholder={`Type ${label} here . . .`}
                          id={item}
                          className='flex-1'
                          disabled={!(user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF))}
                        />
                      ) : item == 'dob' ? (
                        <Popover>
                          <PopoverTrigger
                            asChild
                            id={item}
                            disabled={!(user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF))}
                          >
                            <Button
                              id={item}
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal overflow-auto',
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
                              disabled={(date) => {
                                const today = new Date()
                                today.setHours(23, 59, 59, 0)
                                return date > today
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : item == 'gender' ? (
                        <Select
                          onValueChange={(value) => {
                            setValue(item, value as PathValue<T, Path<T>>, { shouldValidate: true })
                          }}
                          value={watch(item)}
                          defaultValue={watch(item)}
                          disabled={!(user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF))}
                        >
                          <SelectTrigger className='w-full capitalize' id={item}>
                            <SelectValue placeholder={`Select gender here . . .`} className='capitalize' />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(AnimalGenderEnum).map((item) => (
                              <SelectItem value={item} key={item} className='capitalize'>
                                {item.replace('_', ' ').toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : item == 'status' ? (
                        <Select
                          onValueChange={(value) => {
                            setValue(item, value as PathValue<T, Path<T>>, { shouldTouch: true })
                          }}
                          value={watch(item)}
                          defaultValue={getValues(item)}
                          disabled={!(user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF))}
                        >
                          <SelectTrigger className='w-full capitalize' id={item}>
                            <SelectValue placeholder={`Select status here . . .`} />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(AnimalStatusEnum).map((item) => (
                              <SelectItem value={item} key={item} className='capitalize'>
                                {item.replace('_', ' ').toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : item == 'speciesId' ? (
                        <div className='flex-1 relative h-10' id={item}>
                          {/* <div className='absolute inset-0  z-10 rounded-md cursor-not-allowed'></div> */}
                          <SelectSearch
                            query='animal-species'
                            form={form}
                            item={item}
                            disabled={!(user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF))}
                          />
                        </div>
                      ) : item == 'cageId' ? (
                        <div className='flex-1' id={item}>
                          <SelectSearch
                            query='cages'
                            form={form}
                            item={item}
                            disabled={!(user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF))}
                          />
                        </div>
                      ) : item == 'weight' || item == 'height' || item == 'length' ? (
                        <Input
                          type='number'
                          min={0}
                          id={item}
                          placeholder={`Type ${item} here . . .`}
                          step={0.01}
                          className='w-full'
                          {...register(item)}
                          disabled={!(user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF))}
                        />
                      ) : (
                        <Input
                          id={item}
                          placeholder={`Type ${item} here . . .`}
                          className='w-full'
                          {...register(item)}
                          disabled={!(user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF))}
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
                          <span className='font-medium'>Validation alert! </span>
                          {errors[item]?.message as string}
                        </div>
                      </div>
                    )}
                  </div>
                )
              )
            })}
          </div>
          {user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF) && (
            <Button type='submit' className=' mt-4' disabled={formMutation.isLoading}>
              <RiSendPlaneLine className='text-xl' />
              Submit
            </Button>
          )}
        </form>
        <div className='border-2 border-dashed my-2 block sm:hidden'></div>
        <Tabs defaultValue='image' className='flex-1  h-full flex-col flex  '>
          <TabsList className='w-fit'>
            <TabsTrigger
              value='image'
              className='uppercase  data-[state=active]:bg-primary data-[state=active]:text-white'
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              value='meals'
              className=' uppercase data-[state=active]:bg-primary data-[state=active]:text-white'
            >
              Meals
            </TabsTrigger>
          </TabsList>
          <TabsContent value='image' className='w-full flex-1 overflow-auto'>
            <div className='w-full h-full  px-2 flex flex-col gap-4 overflow-auto py-2'>
              <div className='flex items-center gap-1 text-xl font-bold'>
                <Button
                  className='flex-1 transition-all duration-500 flex items-center gap-2 '
                  variant={imageShow == 'images' ? 'default' : 'secondary'}
                  onClick={() => setImageShow('images')}
                >
                  <BsImages className='text-xl'></BsImages>
                  Images
                </Button>
                {user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF) && (
                  <Button
                    className='flex-1 transition-all duration-500  flex items-center gap-2'
                    variant={imageShow == 'post' ? 'default' : 'secondary'}
                    onClick={() => setImageShow('post')}
                  >
                    <AiOutlineCloudUpload className='text-xl' />
                    Upload
                  </Button>
                )}
              </div>

              <div className='h-[400px] md:h-4/5 sm:flex-1 overflow-auto md:px-6 md:w-4/5 md:m-auto w-full px-2  '>
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
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <div className='flex flex-col items-center justify-center relative  w-full h-52  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-500'>
                        {/* <img alt='' src={imageUrl} className='w-full h-full rounded-md object-contain' /> */}
                        <Carousel images={imageUrl as string[]} />
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
          </TabsContent>
          <TabsContent value='meals' className='w-full flex-1 overflow-auto'>
            <AnimalMeal></AnimalMeal>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AnimalForm
