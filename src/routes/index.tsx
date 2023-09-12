import type { RouteObject } from 'react-router'
import MainLayout from '../layouts/MainLayout'
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
    //public
    path: 'authentication',
    element: <GuestGuard />,
    children: [
      {
        path: 'login',
        element: Login
      },
      {
        path: 'register',
        element: Register
      }
    ]
  },
  {
    path: '/home',
    element: <MainLayout />,
    children: [
      {
        //private
        element: <AuthGuard />,
        children: [{ index: true, element: Home }]
      }
    ]
  },
  {
    path: '*',
    element: '404'
  }
]

export default routes
