import React from 'react'
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
import { CiLocationOn } from 'react-icons/ci'
import { TfiLocationPin } from 'react-icons/tfi'
type Area = {
  areaId: number
  location: string
  numberOfCages: number
  numberOfAnimals: number
}

const AreaTag = ({ area }: { area: Area }) => {
  const route = useNavigate()
  return (
    <div
      className='border-2 rounded-md shadow-lg flex flex-col hover:cursor-pointer opacity-80 hover:opacity-100 transition-all'
      onClick={() => {
        route(`${area.areaId}`)
      }}
    >
      <div className='px-4 py-2 flex items-center w-full gap-4 bg-secondary  border-primary rounded-md'>
        <TfiLocationPin className='text-4xl bg-primary rounded-full shadow-md p-2 text-white' />
        <div className='flex flex-1 flex-col'>
          <h1 className=' font-semibold uppercase'>Area {area.areaId}</h1>
          <span className='text-sm'>{area.location}</span>
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
              Edit area
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MdGridView className='text-2xl pr-2' />
              View details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex flex-col gap-2 font-light py-2 text-sm'>
        <div className='flex items-center justify-between px-4 py-1 b border-b'>
          <span>Number of cages</span>
          <span className=''>{area.numberOfCages}</span>
        </div>
        <div className='flex items-center justify-between px-4 py-1  '>
          <span>Number of animals</span>
          <span>{area.numberOfAnimals}</span>
        </div>
      </div>
    </div>
  )
}

export default AreaTag
