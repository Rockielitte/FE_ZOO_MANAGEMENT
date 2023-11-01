import { FC } from 'react'
import { Icons } from './Icon'
import { Theme } from 'react-toastify'

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const theme = localStorage.getItem('vite-ui-theme') as Theme

  return (
    <footer className='flex-none py-14'>
      <div className='mx-auto max-w-[77%] flex flex-col items-center justify-between md:flex-row'>
        <div className='flex items-center justify-between'>
          {theme == 'light' ? <Icons.darkLogo className='h-16 w-auto' /> : <Icons.whiteLogo className='h-16 w-auto' />}
          <p className='text-2xl font-bold  text-foreground'>The Zoo</p>
        </div>

        <p className='mt-6 text-base  text-foreground md:mt-0'>Copyright © DeceptiConf, LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
