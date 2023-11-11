import { useState, type FC, type ReactNode, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '../assets/logo/white.svg'
import logoBlack from '../assets/logo/dark.svg'
import useSideBar from '@/hooks/useSideBar'
import clsx from 'clsx'
import Search from '@/components/Search'
import { AiOutlineMenu } from 'react-icons/ai'
import { useTransition, animated } from '@react-spring/web'
import { BreadcrumbDemo } from '@/components/Appbreadcrumb'
import { useWindowDimensions } from '@/hooks/useWindowDimensions'
import { useTheme } from '@/components/theme-provider'

interface MainLayoutProps {
  children?: ReactNode
}
const smSize = 768
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const routeList = useSideBar()
  const { width } = useWindowDimensions()
  console.log(width, 'kdkkd')
  const [isShow, setIsShow] = useState(true)
  const transitions = useTransition(isShow, {
    from: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' }
  })
  const { theme } = useTheme()
  const url = useLocation().pathname
  useEffect(() => {
    if (width < 900) {
      setIsShow(false)
    }
  }, [width])
  return (
    <div className='w-screen h-screen  flex relative font-roboto  '>
      {transitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className='min-w-[280px] h-full shadow-md border-r-2 absolute inset-0  backdrop-blur-md  z-50 sm:block md:relative '
            >
              <div className='w-5/6 md:w-full bg-background h-full flex flex-col'>
                <div className='p-4  bg-background flex gap-2 items-center shadow-md justify-center text-primary'>
                  <img
                    alt='logo'
                    src={theme == 'dark' ? logo : logoBlack}
                    className='w-10 sm:w-20 transition-all  object-contain bg-clip-padding  py-1 px-0.5 sm:p-1 sm:py-2 '
                  />
                  <span className='font-luck text-2xl md:text-5xl  '>TheZoo</span>
                  {item && (
                    <span
                      className='text-xl sm:text-4xl   pr-3 cursor-pointer md:hidden flex-1 flex justify-end '
                      onClick={() => {
                        setIsShow(!isShow)
                      }}
                    >
                      <AiOutlineMenu />
                    </span>
                  )}
                </div>
                <div className='flex flex-col  py-2 px-2 pl-4 flex-1 overflow-y-auto overflow-x-hidden'>
                  {routeList.slice(0, 1).map((route) => (
                    <Link
                      key={route.name}
                      to={route.href}
                      className={clsx(
                        '  border-l-4  rounded-sm transition-all duration-500 ease-out hover:bg-slate-300 dark:hover:text-black hover:scale-110',
                        url == '/dashboard'
                          ? 'shadow-lg  border-l-secondary-foreground bg-primary  text-secondary '
                          : 'border-l-transparent '
                      )}
                    >
                      <div
                        className=' flex gap-2 items-center  p-4 '
                        onClick={() => {
                          if (window.innerWidth < smSize) {
                            setIsShow(false)
                          }
                        }}
                      >
                        <span className='text-xl font-extralight'>
                          <route.Icon />
                        </span>
                        <span className='text-base font-medium '>{route.name}</span>
                      </div>
                    </Link>
                  ))}
                  {routeList.slice(1).map((route) => (
                    <NavLink
                      key={route.name}
                      to={route.href}
                      className={({ isActive }) => {
                        return clsx(
                          '  border-l-4  rounded-sm transition-all duration-500 ease-out hover:bg-slate-300 dark:hover:text-black hover:scale-110',
                          route.href != '' && isActive
                            ? 'shadow-lg  border-l-secondary-foreground bg-primary  text-secondary '
                            : 'border-l-transparent ',
                          route.href == '' && url == '/dashboard'
                            ? 'shadow-lg  border-l-secondary-foreground bg-primary  text-secondary '
                            : 'border-l-transparent '
                          // isActive && url != '/dashboard'
                          //   ? 'shadow-lg  border-l-secondary-foreground bg-primary  text-secondary '
                          //   : 'border-l-transparent '
                        )
                      }}
                    >
                      <div
                        className=' flex gap-2 items-center  p-4 '
                        onClick={() => {
                          if (window.innerWidth < smSize) {
                            setIsShow(false)
                          }
                        }}
                      >
                        <span className='text-xl font-extralight'>
                          <route.Icon />
                        </span>
                        <span className='text-base font-medium '>{route.name}</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </animated.div>
          )
      )}
      <div className='flex flex-col w-full h-full p-2 md:p-4 transition-all duration-300 ease-linear overflow-auto'>
        <div className=' pb-6 flex gap-2 items-center w-full  justify-between'>
          <span className='text-xl sm:text-4xl   sm:pr-3 pr-1 cursor-pointer flex gap-4 items-center '>
            <AiOutlineMenu
              onClick={() => {
                setIsShow(!isShow)
              }}
            />
            <div className='hidden sm:block'>
              <BreadcrumbDemo />
            </div>
          </span>
          <div className=''>
            <Search />
          </div>
        </div>
        <div className='flex-1 overflow-auto w-full relative'>{children || <Outlet />}</div>
      </div>
    </div>
  )
}

export default MainLayout
