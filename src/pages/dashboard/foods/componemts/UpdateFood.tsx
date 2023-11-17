import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { food } from '@/types'
import { Food } from '@/utils/api/Food'
import { FoodForm } from './FoodForm'

type Props = { id: number }

export const UpdateFood = (props: Props) => {
    const [food, setFood] = useState<food>()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function fetchMyAPI() {
            const response = await Food.getById(props.id.toString())

            setFood(response)
        }

        fetchMyAPI()
    }, [open, props.id])
    return (
        food && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button className={buttonVariants({ variant: 'default' })}>Update</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Animal Species</DialogTitle>
                        <DialogDescription>some description ...</DialogDescription>
                    </DialogHeader>
                    <FoodForm setOpen={setOpen} id={food.id} foods={food} />
                </DialogContent>
            </Dialog>
        )
    )
}
