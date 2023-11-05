import { useMemo } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { GiBirdCage, GiCaveman, GiElephant, GiNestBirds } from 'react-icons/gi'
import { ImManWoman } from 'react-icons/im'
import { BsFillPinMapFill, BsTicketPerforated } from 'react-icons/bs'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
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
        href: 'staffs'
      },
      {
        name: 'Account',
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
      // {
      //   name: 'My News',
      //   Icon: Icons.BookUser,
      //   href: 'my-news'
      // },
      // {
      //   name: 'Create New',
      //   Icon: AiOutlineMenuFold,
      //   href: 'news/create'
      // },
      {
        name: 'Ticket',
        Icon: BsTicketPerforated,
        href: 'tickets'
      },
      {
        name: 'Order',
        Icon: LiaFileInvoiceDollarSolid,
        href: 'orders'
      }
    ],
    []
  )
  return routeList
}

export default useSideBar
