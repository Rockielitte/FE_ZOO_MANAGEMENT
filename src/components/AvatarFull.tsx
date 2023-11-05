import { AiFillCaretDown } from 'react-icons/ai'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useLogout } from '@/hooks/useLogout'
import { Link, useRouteLoaderData } from 'react-router-dom'
import { User } from '@/types'

const AvatarFull = () => {
  const { data } = useRouteLoaderData('dashboard') as { data: User }

  const { logout } = useLogout()
  return (
    <div className='flex gap-2 items-center w-full h-full'>
      <Avatar className='hidden xsm:block'>
        <AvatarImage src={data?.avt} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='flex gap-2 items-center '>
        <span className='hidden md:block text-base font-medium'>{data?.fname + ' ' + data?.lname}</span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AiFillCaretDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-[250px] relative -left-[15px] top-[20px] '>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={`/dashboard/accounts/${data?.id}`}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                logout()
              }}
              className={'hover:bg-red-500 hover:text-white'}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default AvatarFull
