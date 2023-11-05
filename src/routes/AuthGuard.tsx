import { User } from '@/types'

import type { FC, ReactNode } from 'react'

import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'

interface AuthGuardProps {
  children?: ReactNode
  allowedRoles: string[]
}

const AuthGuard: FC<AuthGuardProps> = ({ allowedRoles }) => {
  const location = useLocation()
  const { data } = useRouteLoaderData('dashboard') as { data: User }

  console.log('role: ' + data.role)

  return allowedRoles.includes(data.role) ? (
    <Outlet />
  ) : (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  )
}

export default AuthGuard
