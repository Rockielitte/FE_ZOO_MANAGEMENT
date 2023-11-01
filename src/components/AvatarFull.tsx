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

const AvatarFull = () => {
  return (
    <div className='flex gap-2 items-center w-full h-full'>
      <Avatar className='hidden xsm:block'>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='flex gap-2 items-center '>
        <span className='hidden md:block text-base font-medium'>Zooname</span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AiFillCaretDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-[250px] relative -left-[15px] top-[20px] '>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default AvatarFull
