import { Outlet, Navigate } from 'react-router-dom'

type Props = {
  roles: String[]
}

const AuthCheck = ({ roles }: Props) => {
  return false ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default AuthCheck
