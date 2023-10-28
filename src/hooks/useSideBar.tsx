import { useMemo } from 'react'
import { AiFillHome, AiFillSchedule, AiOutlineSchedule, AiOutlineMenuFold } from 'react-icons/ai'
import { GiCaveman, GiBirdCage, GiElephant, GiNestBirds } from 'react-icons/gi'
import { ImManWoman } from 'react-icons/im'
import { BsFillPinMapFill } from 'react-icons/bs'
import { Icons } from '@/components/Icon'
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
        href: 'accounts'
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
      },
      {
        name: 'News',
        Icon: Icons.NewsPaper,
        href: 'news'
      },
      {
        name: 'My News',
        Icon: Icons.BookUser,
        href: 'my-news'
      },
      {
        name: 'Create New',
        Icon: AiOutlineMenuFold,
        href: 'news/create'
      }
    ],
    []
  )
  return routeList
}

export default useSideBar
