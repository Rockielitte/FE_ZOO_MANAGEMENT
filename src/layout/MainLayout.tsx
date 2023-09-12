import type { FC, ReactNode } from 'react'

import { Outlet } from 'react-router-dom'

interface MainLayoutProps {
  children?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <div className='bg-slate-700'>{children || <Outlet />}</div>
}

export default MainLayout
