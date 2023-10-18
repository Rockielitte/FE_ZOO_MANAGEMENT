import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'
import { SpeciesForm } from "./SpeciesForm"

type Props = {}

export const CreateSpecies = (props: Props) => {
    return (
        <Dialog>
            <DialogTrigger>Create Animal Species</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Animal Species</DialogTitle>
                    <DialogDescription>
                        some description ...
                    </DialogDescription>
                </DialogHeader>
                <SpeciesForm />
            </DialogContent>
        </Dialog>

    )
}  