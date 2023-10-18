import type { FC, ReactNode } from 'react'

import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
interface HomeLayoutProps {
  children?: ReactNode
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className=''>
      <NavBar />

      {children || <Outlet />}

      <Footer />
    </div>
  )
}

export default HomeLayout
