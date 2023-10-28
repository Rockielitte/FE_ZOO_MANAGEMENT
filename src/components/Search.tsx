import AvatarFull from './AvatarFull'

import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { useTheme } from './theme-provider'

const Search = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className='px-2 lg:px-6 py-2 rounded-md shadow-lg flex items-center border gap-4'>
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
        <AvatarFull />
      </div>
    </div>
  )
}

export default Search
