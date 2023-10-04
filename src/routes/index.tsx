import type { RouteObject } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import AuthGuard from './AuthGuard'
import GuestGuard from './GuestGuard'
import Loadable from './Loadable'
import { QueryClient } from 'react-query'
import Error from '@/pages/Error'
import { loaderLeaderBoard } from '../lib/loader'
import { createBrowserRouter } from 'react-router-dom'
// *  AUTHENTICATION PAGES
const Login = Loadable({ loader: () => import('../pages/authentication/Login') })
const Test = Loadable({ loader: () => import('../test') })

const Register = Loadable({ loader: () => import('../pages/authentication/Register') })

//  * HOME PAGE
const Home = Loadable({ loader: () => import('../pages/home/Home') })
const Staff = Loadable({ loader: () => import('../pages/dashboard/Staff') })

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10
    }
  }
})

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
      },
      {
        path: 'test',
        element: Test,
        loader: loaderLeaderBoard(queryClient)
      }
    ]
  },
  {
    path: '/',
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
    path: 'dashboard',
    element: <AuthGuard />,
    children: [
      {
        //private
        element: <MainLayout />,
        children: [
          { index: true, element: Home },
          { path: 'staffs', element: Staff },
          {
            path: '*',
            element: Home
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
]
const router = createBrowserRouter(routes)
export default router
