import { useMemo } from 'react'
import { AiFillHome, AiFillSchedule, AiOutlineSchedule } from 'react-icons/ai'
import { GiCaveman, GiBirdCage, GiElephant, GiNestBirds } from 'react-icons/gi'
import { ImManWoman } from 'react-icons/im'
import { BsFillPinMapFill, BsTicketPerforated } from 'react-icons/bs'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
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
      },
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
