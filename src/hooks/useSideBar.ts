import { useMemo } from 'react'
import { AiFillHome, AiFillSchedule, AiOutlineSchedule } from 'react-icons/ai'
import { GiCaveman, GiBirdCage, GiElephant, GiNestBirds } from 'react-icons/gi'
import { ImManWoman } from 'react-icons/im'
import { BsFillPinMapFill } from 'react-icons/bs'

const useSideBar = () => {
  const routeList = useMemo(
    () => [
      {
        name: 'Dashboard',
        Icon: AiFillHome,
        href: 'index'
      },
      {
        name: 'Zoo trainer',
        Icon: GiCaveman,
        href: 'zoo_trainers'
      },
      {
        name: 'Staff',
        Icon: ImManWoman,
        href: 'staffs'
      },
      {
        name: 'Animal',
        Icon: GiElephant,
        href: 'animals'
      },
      {
        name: 'Animal species',
        Icon: GiNestBirds,
        href: 'animal_species'
      },
      {
        name: 'Cage',
        Icon: GiBirdCage,
        href: 'cages'
      },
      {
        name: 'Area',
        Icon: BsFillPinMapFill,
        href: 'areas'
      }
      // {
      //   name: 'Meal schedule',
      //   Icon: AiFillSchedule,
      //   href: 'meal_schedule'
      // }
    ],
    []
  )
  return routeList
}

export default useSideBar
