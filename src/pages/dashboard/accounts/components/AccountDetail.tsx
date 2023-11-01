/* eslint-disable react-refresh/only-export-components */
import { Separator } from '@/components/ui/separator'
import { Button, buttonVariants } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import Account from '@/utils/api/Account'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLoaderData, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { loaderAccountDetail } from '@/lib/loader/AccountsLoader'
import { useUpdateAccount } from '@/hooks/useUpdateAccount'
import LocalFile from '@/utils/api/LocalFile'
// const MAX_IMAGE_SIZE = 5242880 // 5 MB
// const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
interface AccountDetailProps {}
const roles = [
  { label: 'Staff', value: 'STAFF' },
  { label: 'Zoo Trainer', value: 'TRAINER' }
] as const
const genders = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' }
] as const
const accountFormSchema = z.object({
  email: z.string().email(),
  fname: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.'
    })
    .max(100, {
      message: 'Name must not be longer than 30 characters.'
    }),
  lname: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.'
    })
    .max(100, {
      message: 'Name must not be longer than 30 characters.'
    }),
  phone: z
    .string()
    .regex(/^(\+84|0)(3[2-9]|5[2689]|7[06789]|8[1-689]|9[0-9])[0-9]{7}$/, 'your phone number is invalid'),
  role: z.string({
    required_error: 'Please select a role.'
  }),
  gender: z.string({
    required_error: 'Please select a gender.'
  }),
  avt: z.string({
    required_error: 'Please select a avt.'
  }),
  status: z.string()
  // avt: z
  //   .custom<FileList>((val) => val instanceof FileList, 'Required')
  //   .refine((files) => files.length > 0, `Required`)
  //   .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
  //   .refine(
  //     (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
  //     `Each file size should be less than 5 MB.`
  //   )
  //   .refine(
  //     (files) => Array.from(files).every((file) => ALLOWED_IMAGE_TYPES.includes(file.type)),
  //     'Only these types are allowed .jpg, .jpeg, .png and .webp'
  //   )
})
export const accountDetailQuery = (slug?: string) => ({
  queryKey: ['accounts', 'accountDetail', slug],
  queryFn: async () => Account.getAccountDetail(slug as string)
})

export type AccountFormValues = z.infer<typeof accountFormSchema>

const AccountDetail: FC<AccountDetailProps> = () => {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loaderAccountDetail>>>
  const { id } = useParams()
  // ⬇️ useQuery as per usual
  const { data: accountDetail } = useQuery({
    ...accountDetailQuery(id),
    initialData
  })
  const [preview, setPreview] = useState(accountDetail?.avt)

  const defaultValues: Partial<AccountFormValues> = {
    email: accountDetail.email || '',
    fname: accountDetail.fname || '',
    lname: accountDetail.lname || '',
    phone: accountDetail.phone || '',
    role: accountDetail.role || '',
    gender: accountDetail.gender || '',
    avt: accountDetail?.avt || '',
    status: 'ACTIVE'
  }
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultValues
  })

  const { updateAccount } = useUpdateAccount(form, id as string)
  async function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer()

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image))

    const files = dataTransfer.files
    const displayUrl = await LocalFile.uploadFile({ file: files[0] })
    // const displayUrl = URL.createObjectURL(event.target.files![0])
    console.log(displayUrl)

    return { files, displayUrl }
  }
  async function onSubmit(data: AccountFormValues) {
    console.log('updated!:' + data)
    updateAccount(data)
  }

  return (
    <section className='w-full  h-full flex flex-col shadow-inner rounded-[0.5rem] border bg-background  overflow-auto'>
      <div className='p-10'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Account</h2>
          <p className='text-muted-foreground'>View your Account Information</p>
        </div>
        <Separator className='my-6' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2   flex-row-reverse'>
              <div className=' flex items-center justify-start flex-col space-y-4'>
                <Avatar className='w-60 h-60'>
                  <AvatarImage src={preview} />
                  <AvatarFallback>Unknown</AvatarFallback>
                </Avatar>
                <FormItem>
                  <FormLabel>
                    <p className={cn(buttonVariants({ variant: 'default' }))}>upload</p>
                  </FormLabel>
                  <FormControl>
                    <input
                      type='file'
                      accept='image/*'
                      hidden
                      onChange={async (event) => {
                        const { displayUrl } = await getImageData(event)
                        console.log('displayUrl ' + displayUrl)
                        setPreview(displayUrl)
                        form.setValue('avt', displayUrl as string)
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>

                <p className='font-semibold leading-none text-lg tracking-tight'>
                  {accountDetail.fname + ' ' + accountDetail.lname}
                </p>
                <p className='text-sm text-muted-foreground'>Role: {accountDetail.role.toLowerCase()}</p>
              </div>
              <div className='space-y-8'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Your email' autoComplete='off' {...field} />
                      </FormControl>
                      <FormDescription>This is the email that will be displayed on your profile .</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name='fname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Your name' {...field} />
                        </FormControl>
                        <FormDescription>This is the name that will be displayed on your profile.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Your name' {...field} />
                        </FormControl>
                        <FormDescription>This is the name that will be displayed on your profile.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input placeholder='Your phone number' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the phone number that will be displayed on your profile.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Role</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn('justify-between', !field.value && 'text-muted-foreground')}
                              >
                                {field.value ? roles.find((role) => role.value === field.value)?.label : 'Select role'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className=' p-0'>
                            <Command>
                              {/* <CommandEmpty>No language found.</CommandEmpty> */}
                              <CommandGroup>
                                {roles.map((role) => (
                                  <CommandItem
                                    value={role.label}
                                    key={role.value}
                                    onSelect={() => {
                                      form.setValue('role', role.value)
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        role.value === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    {role.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription>This is the role that will be used in the system.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='gender'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Gender</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(' justify-between', !field.value && 'text-muted-foreground')}
                              >
                                {field.value
                                  ? genders.find((gender) => gender.value === field.value)?.label
                                  : 'Select Gender'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className=' p-0'>
                            <Command>
                              {/* <CommandEmpty>No language found.</CommandEmpty> */}
                              <CommandGroup>
                                {genders.map((gender) => (
                                  <CommandItem
                                    value={gender.label}
                                    key={gender.value}
                                    onSelect={() => {
                                      form.setValue('gender', gender.value)
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        gender.value === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    {gender.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription>This is the gender that will be used in the system.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='text-end'>
                  <Button type='submit'>Save</Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default AccountDetail
