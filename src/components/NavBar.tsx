import { FC, useEffect, useState } from 'react'
import { Icons } from './Icon'
import { Link } from 'react-router-dom'
import useScrollListener from '@/hooks/useScrollListener'
import clsx from 'clsx'
import { useTheme } from './theme-provider'
import { Switch } from './ui/switch'
import { Label } from './ui/label'

interface NavBarProps {}
const menuContent = [
  {
    id: 1,
    title: 'Home',
    href: '/'
  },
  {
    id: 2,
    title: 'Buy Ticket',
    href: '/price_tickets'
  },
  // {
  //   id: 3,
  //   title: 'Our Zoo',
  //   href: '/about'
  // },
  {
    id: 4,
    title: 'Blog',
    href: '/blogs'
  }
]
const NavBar: FC<NavBarProps> = () => {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(true)
  const [navClassList, setNavClassList] = useState<string[]>([])
  // const scrollLimit = 200 // Set your desired scroll limit here
  const scroll = useScrollListener()

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = []

    if (scroll.y > 150 && scroll.y - scroll.lastY > 0) {
      _classList.push('nav-bar--hidden')
      setOpen(false)
    }

    setNavClassList(_classList)
  }, [scroll.y, scroll.lastY])

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 h-fit  border-b border-zinc-300 z-[10] py-2 bg backdrop-blur-lg' +
          ` ${navClassList.join(' ')}`
      )}
      style={{
        transition: 'transform 0.5s ease-in-out'
      }}
    >
      <nav className='mx-auto  flex max-w-7xl items-center justify-between p-6 lg:px-8 ' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link to='/' className='-m-1.5 p-1.5 flex items-center justify-between'>
            <span className='sr-only'>Your Company</span>
            {/* <img  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600' alt='' /> */}

            <Icons.whiteLogo className='h-16 w-auto' />

            <p className='hidden text-white text-xl font-bold md:block'>Zoo</p>
          </Link>
        </div>
        {/* burger */}
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md transition-colors hover:bg-gray-50 hover:text-slate-700   text-white'
            onClick={() => {
              setOpen(!open)
            }}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='h-12 w-12 '
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
          </button>
        </div>
        {/* burger */}

        <div className='hidden lg:flex lg:gap-x-12'>
          {menuContent.map((el) => (
            <Link to={el.href} key={el.id}>
              <span className='text-white   font-semibold lg:text-lg sm:text-sm'>{el.title}</span>
            </Link>
          ))}
          <Link to='/#about' className='text-white font-semibold lg:text-lg sm:text-sm'>
            About
          </Link>
          {/* <a href='/#ticket' className='text-foreground font-semibold lg:text-lg sm:text-sm'>
            Ticket
          </a> */}
          <a href='/#contact' className='text-white font-semibold lg:text-lg sm:text-sm'>
            Contact
          </a>
        </div>
        {/* <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900'>
            Log in <span aria-hidden='true'>&rarr;</span>
          </a>
        </div> */}
      </nav>
      {/* <!-- Mobile menu, show/hide based on menu open state. --> */}

      <div className='lg:hidden ' role='dialog' aria-modal='true'>
        {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
        {open && (
          <>
            <div className='fixed inset-0 z-10'></div>
            <div className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto transition-transform bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
              <div className='flex items-center justify-between'>
                <a href='#' className='-m-1.5 p-1.5'>
                  <span className='sr-only'>Your Company</span>
                  <Icons.darkLogo className='h-16 w-auto' />
                </a>
                <button
                  type='button'
                  className='-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-red-700 duration-150'
                  onClick={() => {
                    setOpen(!open)
                  }}
                >
                  <span className='sr-only'>Close menu</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              <div className='mt-6 flow-root'>
                <div className='-my-6 divide-y divide-gray-500/10'>
                  <div className='space-y-2 py-6'>
                    {menuContent.map((el) => (
                      <Link to={el.href} key={el.id}>
                        <span className='-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50  font-semibold lg:text-lg sm:text-sm'>
                          {el.title}
                        </span>
                      </Link>
                    ))}
                    <Link
                      to='/#about'
                      className='-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50  font-semibold lg:text-lg sm:text-sm'
                    >
                      About
                    </Link>
                    {/* <a href='/#ticket' className='text-foreground font-semibold lg:text-lg sm:text-sm'>
            Ticket
          </a> */}
                    <a
                      href='/#contact'
                      className='-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50  font-semibold lg:text-lg sm:text-sm'
                    >
                      Contact
                    </a>
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
                  </div>
                  {/* <div className='py-6'>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Log in
                </a>
              </div> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default NavBar
