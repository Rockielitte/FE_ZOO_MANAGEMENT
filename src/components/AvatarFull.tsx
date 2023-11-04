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
import useAuthStore from '@/stores/authStore'
import { useLogout } from '@/hooks/useLogout'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

const AvatarFull = () => {
  const { user } = useAuthStore()
  const { logout } = useLogout()
  return (
    <div className='flex gap-2 items-center w-full h-full'>
      <Avatar className='hidden xsm:block'>
        <AvatarImage src={user?.avt} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='flex gap-2 items-center '>
        <span className='hidden md:block text-base font-medium'>{user?.fname + ' ' + user?.lname}</span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AiFillCaretDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-[250px] relative -left-[15px] top-[20px] '>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                logout()
              }}
              className={cn(buttonVariants({ variant: 'destructive' }) + 'w-full')}
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
