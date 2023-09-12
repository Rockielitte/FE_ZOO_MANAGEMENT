import type { RouteObject } from 'react-router'
import MainLayout from '../layout/MainLayout'
import AuthGuard from './AuthGuard'
import GuestGuard from './GuestGuard'
import Loadable from './Loadable'

// *  AUTHENTICATION PAGES
const Login = Loadable({ loader: () => import('../pages/authentication/Login') })
const Register = Loadable({ loader: () => import('../pages/authentication/Register') })

//  * HOME PAGE
const Home = Loadable({ loader: () => import('../pages/home/Home') })

const routes: RouteObject[] = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: <GuestGuard>{Login}</GuestGuard>
      },
      {
        path: 'register',
        element: <GuestGuard>{Register}</GuestGuard>
      }
    ]
  },

  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <AuthGuard>{Home}</AuthGuard>
      }
    ]
  }
]

export default routes
