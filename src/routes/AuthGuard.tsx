import type { FC, ReactNode } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

// import PropTypes from 'prop-types'
// import useAuth from '../hooks/useAuth'
// import Login from '../pages/authentication/Login'

interface AuthGuardProps {
  children?: ReactNode
}

const AuthGuard: FC<AuthGuardProps> = () => {
  //   const auth = useAuth() as any
  const location = useLocation()
  //   const [requestedLocation, setRequestedLocation] = useState<string | null>('/login')
  console.log(location)

  //   if (location.pathname !== requestedLocation) {
  //     //   setRequestedLocation(location.pathname)
  //     return <Login />
  //   }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  // if (location.pathname == '/login') {
  //   console.log('run')

  //   // setRequestedLocation(null)
  //   return <Navigate to={'/home'} replace />
  // }

  return <Outlet />
}

export default AuthGuard
