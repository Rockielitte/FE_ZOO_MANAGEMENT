import { useMemo } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { GiBirdCage, GiCaveman, GiElephant, GiNestBirds } from 'react-icons/gi'
import { ImManWoman } from 'react-icons/im'
import { LuSalad } from "react-icons/lu";
import { BsFillPinMapFill, BsTicketPerforated } from 'react-icons/bs'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { Icons } from '@/components/Icon'

import { useRouteLoaderData } from 'react-router-dom'
import { User } from '@/types'
const useSideBar = () => {
  const { data } = useRouteLoaderData('dashboard') as { data: User }
  const routeList = useMemo(
    () => [
      {
        name: 'Dashboard',
        Icon: AiFillHome,
        href: ''
      },

      // {
      //   name: 'Zoo trainer',
      //   Icon: GiCaveman,
      //   href: 'staffs'
      // },
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
      },
      {
        name: 'Food',
        Icon: LuSalad,
        href: 'foods'
      },
    ],
    []
  )

  const routeListStaff = useMemo(
    () => [
      {
        name: 'Dashboard',
        Icon: AiFillHome,
        href: ''
      },

      {
        name: 'Zoo trainer',
        Icon: GiCaveman,
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
      },
      {
        name: 'News',
        Icon: Icons.NewsPaper,
        href: 'news'
      },
      {
        name: 'Food',
        Icon: LuSalad,
        href: 'foods'
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
      // {
      //   name: 'Ticket',
      //   Icon: BsTicketPerforated,
      //   href: 'tickets'
      // },,
      {
        name: 'Order',
        Icon: LiaFileInvoiceDollarSolid,
        href: 'orders'
      }
    ],
    []
  )
  const routeListTrainer = useMemo(
    () => [
      {
        name: 'Dashboard',
        Icon: AiFillHome,
        href: ''
      },

      {
        name: 'Animal',
        Icon: GiElephant,
        href: 'animals'
      },

      {
        name: 'Cage',
        Icon: GiBirdCage,
        href: 'cages'
      }
    ],
    []
  )
  if (data.role === 'STAFF') {
    return routeListStaff
  }
  if (data.role === 'TRAINER') {
    return routeListTrainer
  }
  return routeList
}

export default useSideBar
