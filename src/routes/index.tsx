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
const Animal = Loadable({ loader: () => import('../pages/dashboard/animals/index') })
const AnimalDetail = Loadable({ loader: () => import('../pages/dashboard/animals/[id]') })
const Area = Loadable({ loader: () => import('../pages/dashboard/areas/index') })
const AreaDetail = Loadable({ loader: () => import('../pages/dashboard/areas/[id]') })
// const Register = Loadable({ loader: () => import('../pages/authentication/Register') })

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
            path: 'animals',
            children: [
              { index: true, element: Animal },
              { path: ':id', element: AnimalDetail }
            ]
          },
          {
            path: 'areas',
            children: [
              { index: true, element: Area },
              { path: ':id', element: AreaDetail }
            ]
          },
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
