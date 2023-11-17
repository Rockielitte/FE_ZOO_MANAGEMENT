// @flow
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import useMutationCustom from '@/hooks/useMutationCustom';
import { cn } from '@/lib/utils';
import { food } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';
import { Path, useForm } from 'react-hook-form';
import { z } from 'zod';
const typeFood = [
    { label: 'Protein', value: 'PROTEIN' },
    { label: 'Grain And Cereal', value: 'GRAIN_AND_CEREAL' },
    { label: 'Fruit And Vegetable', value: 'FRUIT_AND_VEGETABLE' }
] as const
interface Food {
    id?: number
    foods?: food
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const foodFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Name must be at least 2 characters.'
        })
        .max(30, {
            message: 'Name must not be longer than 30 characters.'
        }),
    type: z
        .string()
        .min(2, {
            message: 'Type must be at least 2 characters.'
        })
        .max(100, {
            message: 'Type must not be longer than 100 characters.'
        }),
    unit: z
        .string()
        .min(2, {
            message: 'Unit must be at least 2 characters.'
        })
        .max(30, {
            message: 'Unit must not be longer than 30 characters.'
        }),

    description: z.string().max(1000, {
        message: 'Description must not be longer than 1000 characters.'
    })
})

export type FoodFormValue = z.infer<typeof foodFormSchema>
export function FoodForm(props: Food) {
    const form = useForm<FoodFormValue>({
        resolver: zodResolver(foodFormSchema),
        defaultValues: props.foods
    })


    const createMutation = useMutationCustom({
        query: `/foods/`,
        queryKey: ['foods', 'create'],
        form: form,
        invalidQuery: ['foods'],
        data: {} as Food
    })
    const updateMutation = useMutationCustom({
        query: `/foods/${props.id}`,
        queryKey: ['foods', String(props.id)],
        form: form,
        invalidQuery: ['foods'],
        data: {} as Food,
        method: 'PUT'
    })

    async function onSubmit(data: FoodFormValue) {
        if (props.id) {
            updateMutation.mutate(data, {
                onSuccess: () => {
                    props.setOpen(false)
                    form.reset(props.foods)
                    // toast({
                    //   variant: 'success',
                    //   title: 'Update Successfull'
                    // })
                },
                onError: (data) => {
                    if (axios.isAxiosError(data) && data.response) {
                        data.response.data.data.forEach(({ field, message }: { field: Path<FoodFormValue>; message: string }) =>
                            form.setError(field, { type: 'focus', message })
                        )
                    }
                }
            })
        } else {
            createMutation.mutate(data, {
                onSuccess: () => {
                    props.setOpen(false)

                    // toast({
                    //   variant: 'success',
                    //   title: 'Create Successfull'
                    // })
                },
                onError: (data) => {
                    if (axios.isAxiosError(data) && data.response) {
                        data.response.data.data.forEach(({ field, message }: { field: Path<FoodFormValue>; message: string }) =>
                            form.setError(field, { type: 'focus', message })
                        )
                    }
                }
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-1 flex-row-reverse '>

                    <div className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Name' {...field} />
                                    </FormControl>
                                    <FormDescription>This is the name of food.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Type</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant='outline'
                                                    role='combobox'
                                                    className={cn(' justify-between', !field.value && 'text-muted-foreground')}
                                                >
                                                    {field.value
                                                        ? typeFood.find((type) => type.value === field.value)?.label
                                                        : 'Select Type'}
                                                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className=' p-0'>
                                            <Command>
                                                {/* <CommandEmpty>No language found.</CommandEmpty> */}
                                                <CommandGroup>
                                                    {typeFood.map((type) => (
                                                        <CommandItem
                                                            value={type.label}
                                                            key={type.value}
                                                            onSelect={() => {
                                                                form.setValue('type', type.value)
                                                            }}
                                                        >
                                                            <CheckIcon
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    type.value === field.value ? 'opacity-100' : 'opacity-0'
                                                                )}
                                                            />
                                                            {type.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>This is the type of food</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='unit'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Unit' {...field} />
                                    </FormControl>
                                    <FormDescription>This is the unit of food.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Type your message here.' {...field} />
                                    </FormControl>
                                    <FormDescription>This is the description of food.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <DialogFooter>
                            <Button type='submit'>Submit</Button>
                        </DialogFooter>
                    </div>
                </div>
            </form>
        </Form>
    );
};