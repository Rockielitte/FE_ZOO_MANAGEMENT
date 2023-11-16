// @flow
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useMutationCustom from '@/hooks/useMutationCustom';
import { cn } from '@/lib/utils';
import { FoodTypeEnum, food } from '@/types';
import LocalFile from '@/utils/api/LocalFile';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as React from 'react';
import { Path, useForm } from 'react-hook-form';
import { z } from 'zod';

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
        invalidQuery: ['animal-species'],
        data: {} as Food
    })
    const updateMutation = useMutationCustom({
        query: `/foods/${props.id}`,
        queryKey: ['foods', String(props.id)],
        form: form,
        invalidQuery: ['animal-species'],
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
                                        <Input placeholder='Food name' {...field} />
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
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Type' {...field} />
                                    </FormControl>
                                    <FormDescription>This is the type of food.</FormDescription>
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