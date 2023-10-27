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
import { Button, buttonVariants } from "@/components/ui/button"
import AnimalSpecies from "@/utils/api/AnimalSpecies"
import { useState, useEffect } from "react"

type Props = {id: number}

export const EditSpecies = (props: Props) => {
    const [species, setSpecies] = useState()
     useEffect( () => {
        async function fetchMyAPI() {
            let response = await  AnimalSpecies.getById(props.id.toString())
            console.log(response)
            setSpecies(response)
          }
      
          fetchMyAPI()
    },[])
    return (
        species && <Dialog>
            <DialogTrigger><Button className={buttonVariants({ variant: "default" })}>Edit</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Animal Species</DialogTitle>
                    <DialogDescription>
                        some description ...
                    </DialogDescription>
                </DialogHeader>
                <SpeciesForm id = {species.id} species={species}/>
            </DialogContent>
        </Dialog>

    )
}  