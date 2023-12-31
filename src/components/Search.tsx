import AvatarFull from './AvatarFull'

import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { useTheme } from './theme-provider'
import { IoQrCodeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import useCheckRole from '@/hooks/useCheckRole'
import { RoleEnum } from '@/types'

const Search = () => {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const user = useCheckRole()
  return (
    <div className='px-2 lg:px-6 py-2 rounded-md shadow-lg flex items-center border gap-4'>
      {user?.role && user.role != RoleEnum.TRAINER && (
        <div className='flex items-center space-x-2 ' onClick={() => navigate('qrcode')}>
          <IoQrCodeOutline className='text-2xl cursor-pointer text-primary' />
          <Label htmlFor='scan' className='capitalize'>
            Scan
          </Label>
        </div>
      )}
      <div className='flex items-center space-x-2 '>
        <Switch
          id='airplane-mode'
          onClick={() => setTheme('light' == theme ? 'dark' : 'light')}
          checked={theme == 'dark'}
        />
        <Label
          htmlFor='airplane-mode'
          className='capitalize'
          onClick={() => setTheme('light' == theme ? 'dark' : 'light')}
        >
          {theme + ' mode'}
        </Label>
      </div>
      <div className='pl-4 border-l-2'>
        <AvatarFull profile={user.profile} />
      </div>
    </div>
  )
}

export default Search
