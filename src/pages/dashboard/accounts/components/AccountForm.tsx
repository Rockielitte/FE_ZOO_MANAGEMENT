import { Button } from '@/components/ui/button'
import { useCreateAccount } from '@/hooks/useCreateAccount'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FC } from 'react'

export type AccountProps = {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}
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
    .min(2, {
      message: 'First name must be at least 2 characters.'
    })
    .max(100, {
      message: 'Last name must not be longer than 30 characters.'
    }),
  lname: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
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
  })
})

export type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  email: '',
  fname: '',
  lname: '',
  phone: ''
  // role: '',
  // gender: ''
}

export const AccountForm: FC<AccountProps> = ({ setOpenDialog }) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultValues
  })

  const { createAccount } = useCreateAccount(form, setOpenDialog)

  async function onSubmit(data: AccountFormValues) {
    createAccount(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
        <div className='flex items-center justify-center gap-3'>
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
              <FormDescription>This is the phone number that will be displayed on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-center gap-3'>
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
                        className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? roles.find((role) => role.value === field.value)?.label : 'Select role'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
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
                              className={cn('mr-2 h-4 w-4', role.value === field.value ? 'opacity-100' : 'opacity-0')}
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
                        className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? genders.find((gender) => gender.value === field.value)?.label : 'Select Gender'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
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
                              className={cn('mr-2 h-4 w-4', gender.value === field.value ? 'opacity-100' : 'opacity-0')}
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

        <DialogFooter>
          <Button type='submit'>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
