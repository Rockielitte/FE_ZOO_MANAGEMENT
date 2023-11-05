import useAuth from '@/hooks/useAuth'
import { User } from '@/types'

import type { FC, ReactNode } from 'react'

import { Navigate, Outlet, useLocation } from 'react-router-dom'

// import PropTypes from 'prop-types'
// import useAuth from '../hooks/useAuth'
// import Login from '../pages/authentication/Login'

interface AuthGuardProps {
  children?: ReactNode
  allowedRoles: string[]
}

const AuthGuard: FC<AuthGuardProps> = ({ allowedRoles }) => {
  const { isAdmin, getUser } = useAuth()
  const isUserAdmin: boolean = isAdmin()
  const user: User | null = getUser()
  const location = useLocation()
  //   const [requestedLocation, setRequestedLocation] = useState<string | null>('/login')
  // console.log(location)

  console.log('isUserAdmin: ' + isUserAdmin)

  return allowedRoles.find((role) => user?.role.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  )
}

export default AuthGuard
