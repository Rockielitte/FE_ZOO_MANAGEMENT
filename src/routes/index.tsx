/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from 'react-router'
import AuthGuard from './AuthGuard'
import GuestGuard from './GuestGuard'
import Loadable from './Loadable'
import { QueryClient } from 'react-query'
import Error from '@/pages/Error'
import { createBrowserRouter } from 'react-router-dom'
import { loaderSpecies } from '@/lib/loader/loaderSpecies'
import { loaderSpeciesDetail } from '@/lib/loader/loaderSpecies'
import HomeLayout from '@/layouts/HomeLayout'
import MainLayout from '@/layouts/MainLayout'
import { loaderAccountDetail, loaderAllAccount } from '@/lib/loader/AccountsLoader'
import { loaderAllNews, loaderNewDetail } from '@/lib/loader/NewsLoader'

// *  AUTHENTICATION PAGES
const Login = Loadable({ loader: () => import('../pages/authentication/Login') })
const Animal = Loadable({ loader: () => import('../pages/dashboard/animals/index') })
const AnimalDetail = Loadable({ loader: () => import('../pages/dashboard/animals/[id]') })
const AnimalCreate = Loadable({ loader: () => import('../pages/dashboard/animals/create') })
const AccountDetail = Loadable({ loader: () => import('../pages/dashboard/accounts/components/AccountDetail') })
const Area = Loadable({ loader: () => import('../pages/dashboard/areas/index') })
const AreaDetail = Loadable({ loader: () => import('../pages/dashboard/areas/[id]') })

const Cage = Loadable({ loader: () => import('../pages/dashboard/cages/index') })
const CageDetail = Loadable({ loader: () => import('../pages/dashboard/cages/[id]') })
const News = Loadable({ loader: () => import('../pages/dashboard/news/index') })
const CreateNew = Loadable({ loader: () => import('../pages/dashboard/news/components/CreateNew') })
const NewDetail = Loadable({ loader: () => import('../pages/dashboard/news/components/NewDetail') })
const Blogs = Loadable({ loader: () => import('../pages/home/Blogs/index') })
const BlogDetail = Loadable({ loader: () => import('../pages/home/Blogs/[id]') })

// const Register = Loadable({ loader: () => import('../pages/authentication/Register') })

const Ticket = Loadable({ loader: () => import('../pages/dashboard/tickets/index') })
//  * HOME PAGE
const Home = Loadable({ loader: () => import('../pages/home/Home') })

const Species = Loadable({ loader: () => import('../pages/dashboard/Species/index') })
const SpeciesDetail = Loadable({ loader: () => import('../pages/dashboard/Species/components/SpeciesDetail') })

const Accounts = Loadable({ loader: () => import('../pages/dashboard/accounts/index') })

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000
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
      }
    ]
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: Home },
      {
        path: 'blogs',
        children: [
          { index: true, element: Blogs },
          { path: ':id', element: BlogDetail }
        ]
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
            path: 'accounts',
            children: [
              { index: true, element: Accounts, loader: loaderAllAccount(queryClient) },
              {
                path: ':id',
                element: AccountDetail,
                loader: loaderAccountDetail(queryClient)
              }
            ]
          },

          {
            path: 'news',
            children: [
              { index: true, element: News, loader: loaderAllNews(queryClient) },
              {
                path: 'create',
                element: CreateNew
                // loader: loaderAccountDetail(queryClient)
              },
              {
                path: ':id',
                element: NewDetail,
                loader: loaderNewDetail(queryClient)
              }
            ]
          },
          {
            path: 'animal_species',
            element: Species,
            loader: loaderSpecies(queryClient)
          },
          { path: 'animal_species/:id', element: SpeciesDetail, loader: loaderSpeciesDetail(queryClient) },
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
            path: 'tickets',
            children: [{ index: true, element: Ticket }]
          },
          // {
          //   path: 'animal_species',
          //   children: [
          //     { index: true, element: Species },
          //     { path: ':id', element: SpeciesDetail }
          //   ]
          // },
          // {
          //   path: 'meal_schedule',
          //   children: [{ index: true, element: Meal_schedule }]
          // },
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
