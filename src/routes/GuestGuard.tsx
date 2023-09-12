import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'
// import PropTypes from 'prop-types'

interface GuestGuardProps {
  children?: ReactNode
}

const GuestGuard: FC<GuestGuardProps> = () => {
  //   const { isAuthenticated } = useAuth()

  //   if (isAuthenticated) {
  //     return <Navigate to='/' />
  //   }

  return <>{<Outlet />}</>
}

// GuestGuard.propTypes = {
//   children: PropTypes.node
// }

export default GuestGuard
