import { useState, type FC, type ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../assets/logo.webp'
import useSideBar from '@/hooks/useSideBar'
import clsx from 'clsx'
import Search from '@/components/Search'
import { AiOutlineMenu } from 'react-icons/ai'
import { useTransition, animated } from '@react-spring/web'
interface MainLayoutProps {
  children?: ReactNode
}
const smSize = 640
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const routeList = useSideBar()
  const [isShow, setIsShow] = useState(true)
  const transitions = useTransition(isShow, {
    from: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 }
  })
  return (
    <div className='w-screen h-screen flex relative font-roboto  '>
      {transitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className='min-w-[300px] h-full shadow-md border-r-2 absolute inset-0  backdrop-blur-md  z-50 sm:block sm:relative '
            >
              <div className='w-5/6 sm:w-full bg-background h-full flex flex-col'>
                <h1 className='p-4 bg-background flex gap-2 items-center shadow-md   '>
                  <img
                    src={logo}
                    className='w-10 sm:w-16 transition-all  object-contain bg-clip-padding bg-black py-1 px-0.5 sm:p-1 sm:py-2 rounded-full shadow-md'
                  />
                  <span className='font-luck text-2xl sm:text-4xl '>ZooCam</span>
                  {item && (
                    <span
                      className='text-xl sm:text-4xl   pr-3 cursor-pointer sm:hidden flex-1 flex justify-end '
                      onClick={() => {
                        setIsShow(!isShow)
                      }}
                    >
                      <AiOutlineMenu />
                    </span>
                  )}
                </h1>
                <div className='flex flex-col  py-2 px-2 pl-4 flex-1 overflow-y-auto overflow-x-hidden'>
                  {routeList.map((route) => (
                    <NavLink
                      key={route.name}
                      to={route.href}
                      className={({ isActive }) => {
                        return clsx(
                          '  border-l-4  rounded-sm transition-all duration-500 ease-out hover:bg-slate-300 dark:hover:text-black hover:scale-110',
                          isActive
                            ? 'shadow-lg  border-l-secondary-foreground bg-primary  text-secondary '
                            : 'border-l-transparent '
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
      <div className='flex flex-col w-full h-full p-2 md:p-4 transition-all duration-300 ease-linear'>
        <div className=' pb-6 flex gap-2 items-center w-full '>
          <span
            className='text-xl sm:text-4xl block  sm:pr-3 pr-1 cursor-pointer'
            onClick={() => {
              setIsShow(!isShow)
            }}
          >
            <AiOutlineMenu />
          </span>
          <div className='flex-1'>
            <Search />
          </div>
        </div>
        <div className='flex-1 overflow-auto '>{children || <Outlet />}</div>
      </div>
    </div>
  )
}

export default MainLayout
