import { User } from '@/types'

import { type FC, type ReactNode } from 'react'

import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'

interface AuthGuardProps {
  children?: ReactNode
  allowedRoles: string[]
}

const AuthGuard: FC<AuthGuardProps> = ({ allowedRoles, children }) => {
  const location = useLocation()
  const { data } = useRouteLoaderData('dashboard') as { data: User }

  return allowedRoles.includes(data.role) ? (
    <Outlet /> || { children }
  ) : (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  )
}

export default AuthGuard
