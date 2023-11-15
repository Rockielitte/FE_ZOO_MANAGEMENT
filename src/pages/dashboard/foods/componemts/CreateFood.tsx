// @flow
import { Icons } from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import * as React from 'react';
import { FoodForm } from './FoodForm';

export function CreateFood() {
    const [open, setOpen] = React.useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger style={{ margin: '0px' }}>
                {' '}
                <Button variant='default' className='flex items-center gap-1 hover:scale-105 transition-all ml-auto  '>
                    <Icons.PlusCircleIcon className='mr-2' />
                    Create New Food
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Food</DialogTitle>
                    <DialogDescription>some description ...</DialogDescription>
                </DialogHeader>
                <FoodForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
};                                              