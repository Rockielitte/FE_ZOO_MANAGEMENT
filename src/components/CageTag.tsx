import React, { useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { MdGridView } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import { GiBirdCage } from 'react-icons/gi'
type cage = {
  cageID: number
  species: string
  numberOfAnimals: number
  description: string
}

const CageTag = ({ cage }: { cage: cage }) => {
  const route = useNavigate()
  return (
    <div
      className='border-2 rounded-md shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all'
      //   onClick={() => {
      //     route(`/dashboard/areas/${cage.cageID}`)
      //   }}
    >
      <div className='px-4 py-2 flex items-center w-full gap-4 bg-secondary  border-primary rounded-md'>
        <GiBirdCage className='text-4xl bg-primary rounded-full shadow-md p-2 text-white' />
        <div className='flex flex-1 flex-col'>
          <h1 className='text-md tracking-wide font-extrabold uppercase'>
            <span>Cage </span> {cage.cageID}
          </h1>
          <span className='text-sm'>Species: {cage.species}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDots className='text-2xl font-bold text-primary ' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-[200px] relative right-[20px] '>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <AiFillEdit className='text-2xl pr-2' />
              Edit cage
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MdGridView className='text-2xl pr-2' />
              View details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex flex-col  font-light py-2 text-sm'>
        <div className='flex items-center justify-between px-4 py-1 b border-b font-normal'>
          <span>Number of animals:</span>
          <span className='px-2 text-xl rounded-full border-2 bg-primary text-white'>{cage.numberOfAnimals}</span>
        </div>
        <div className='flex items-center justify-between px-4 py-1  '>
          <span>{cage.description}</span>
        </div>
      </div>
    </div>
  )
}

export default CageTag
