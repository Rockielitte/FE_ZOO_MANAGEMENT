import type { RouteObject } from 'react-router'
// import MainLayout from '../layouts/MainLayout'
import AuthGuard from './AuthGuard'
import GuestGuard from './GuestGuard'
import Loadable from './Loadable'
import { QueryClient } from 'react-query'
import Error from '@/pages/Error'
import { loaderLeaderBoard } from '../lib/loader'
import { createBrowserRouter } from 'react-router-dom'
import HomeLayout from '@/layouts/HomeLayout'
import MainLayout from '@/layouts/MainLayout'
import { loaderAllAccount } from '@/lib/loader/AccountsLoader'
// *  AUTHENTICATION PAGES
const Login = Loadable({ loader: () => import('../pages/authentication/Login') })
const Test = Loadable({ loader: () => import('../test') })
const Animal = Loadable({ loader: () => import('../pages/dashboard/animals/index') })
const AnimalDetail = Loadable({ loader: () => import('../pages/dashboard/animals/[id]') })
const AnimalCreate = Loadable({ loader: () => import('../pages/dashboard/animals/create') })
const Area = Loadable({ loader: () => import('../pages/dashboard/areas/index') })
const AreaDetail = Loadable({ loader: () => import('../pages/dashboard/areas/[id]') })
const AccountDetail = Loadable({ loader: () => import('../pages/accounts/components/AccountDetail') })
const Cage = Loadable({ loader: () => import('../pages/dashboard/cages/index') })
const CageDetail = Loadable({ loader: () => import('../pages/dashboard/cages/[id]') })
const Species = Loadable({ loader: () => import('../pages/dashboard/animal_species/index') })
const SpeciesDetail = Loadable({ loader: () => import('../pages/dashboard/animal_species/[id]') })

//  * HOME PAGE
const Home = Loadable({ loader: () => import('../pages/home/Home') })
const Staff = Loadable({ loader: () => import('../pages/dashboard/Staff') })
const Accounts = Loadable({ loader: () => import('../pages/accounts/index') })
const Ticket = Loadable({ loader: () => import('../pages/tickets/index') })

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
    element: <HomeLayout />,
    children: [
      {
        //private
        element: <AuthGuard />,
        children: [{ index: true, element: Home }]
      }
    ]
  },

  {
    path: 'price_tickets',
    // element: <HomeLayout />,
    children: [
      {
        children: [{ index: true, element: Ticket }]
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
          // { path: 'staffs', element: Staff },

          {
            path: 'staffs',
            children: [
              { index: true, element: Accounts, loader: loaderAllAccount(queryClient) },
              {
                path: ':id',
                element: AccountDetail
                // loader: loaderAllAccount(queryClient)
              }
            ]
          },

          {
            path: 'animals',
            children: [
              { index: true, element: Animal },
              { path: 'create', element: AnimalCreate },
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
            path: 'cages',
            children: [
              { index: true, element: Cage },
              { path: ':id', element: CageDetail }
            ]
          },
          {
            path: 'animal_species',
            children: [
              { index: true, element: Species },
              { path: ':id', element: SpeciesDetail }
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
