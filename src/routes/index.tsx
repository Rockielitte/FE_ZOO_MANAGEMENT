/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from 'react-router'
import AuthGuard from './AuthGuard'
import GuestGuard from './GuestGuard'
import Loadable from './Loadable'
import { QueryClient } from 'react-query'
import Error from '@/pages/Error'
import { createBrowserRouter } from 'react-router-dom'
import { loaderSpeciesDetail } from '@/lib/loader/loaderSpecies'
import HomeLayout from '@/layouts/HomeLayout'
import MainLayout from '@/layouts/MainLayout'
import { loaderAccountDetail, GetInfoUser } from '@/lib/loader/AccountsLoader'
import { loaderNewDetail } from '@/lib/loader/NewsLoader'
import Qrcode from '@/pages/qrcode'

// *  AUTHENTICATION PAGES
const Login = Loadable({ loader: () => import('../pages/authentication/Login') })
const Animal = Loadable({ loader: () => import('../pages/dashboard/animals/index') })
const AnimalDetail = Loadable({ loader: () => import('../pages/dashboard/animals/[id]') })
const AnimalCreate = Loadable({ loader: () => import('../pages/dashboard/animals/create') })
const AccountDetail = Loadable({ loader: () => import('../pages/dashboard/accounts/components/AccountDetail') })
const TrainerDetail = Loadable({ loader: () => import('../pages/dashboard/staff/components/AccountDetail') })

const Area = Loadable({ loader: () => import('../pages/dashboard/areas/index') })
const AreaDetail = Loadable({ loader: () => import('../pages/dashboard/areas/[id]') })

const Cage = Loadable({ loader: () => import('../pages/dashboard/cages/index') })
const CageDetail = Loadable({ loader: () => import('../pages/dashboard/cages/[id]') })
const News = Loadable({ loader: () => import('../pages/dashboard/news/index') })
const CreateNew = Loadable({ loader: () => import('../pages/dashboard/news/components/CreateNew') })
const NewDetail = Loadable({ loader: () => import('../pages/dashboard/news/components/NewDetail') })
const UpdateNew = Loadable({ loader: () => import('../pages/dashboard/news/components/UpdateNew') })
const Dashboard = Loadable({ loader: () => import('../pages/dashboard/index') })
const Blogs = Loadable({ loader: () => import('../pages/home/Blogs/index') })
const BlogDetail = Loadable({ loader: () => import('../pages/home/Blogs/[id]') })

const Error403 = Loadable({ loader: () => import('../pages/403') })

const Ticket = Loadable({ loader: () => import('../pages/dashboard/tickets/index') })
const Order = Loadable({ loader: () => import('../pages/dashboard/orders/index') })
const OrderDetail = Loadable({ loader: () => import('../pages/dashboard/orders/[id]') })
const OrderCreate = Loadable({ loader: () => import('../pages/dashboard/orders/create') })
//  * HOME PAGE
const Home = Loadable({ loader: () => import('../pages/home/Home') })
const TicketOrder = Loadable({ loader: () => import('../pages/tickets/index') })
const SuccessOrderNotification = Loadable({ loader: () => import('../pages/tickets/SuccessNoti') })

const Species = Loadable({ loader: () => import('../pages/dashboard/Species/index') })
const SpeciesDetail = Loadable({ loader: () => import('../pages/dashboard/Species/components/SpeciesDetail') })

const Accounts = Loadable({ loader: () => import('../pages/dashboard/accounts/index') })
const Staffs = Loadable({ loader: () => import('../pages/dashboard/staff/index') })

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
      // { path: 'price_tickets', element: TicketOrder },
      {
        path: 'blogs',
        children: [
          { index: true, element: Blogs },
          { path: ':id', element: BlogDetail }
        ]
      },
      {
        path: 'price_tickets',
        element: TicketOrder
      },
      {
        path: 'success-noti',
        element: SuccessOrderNotification
      }
    ]
  },

  {
    path: 'unauthorized',
    element: Error403
  },

  {
    path: 'dashboard',
    element: <AuthGuard allowedRoles={['ADMIN', 'STAFF', 'TRAINER']} />,
    loader: GetInfoUser,
    id: 'dashboard',
    children: [
      {
        //private
        element: <MainLayout />,
        children: [
          { index: true, element: Dashboard },
          // { path: 'staffs', element: Staff },

          {
            path: 'accounts',
            element: <AuthGuard allowedRoles={['ADMIN']} />,
            children: [
              { index: true, element: Accounts },
              {
                path: ':id',
                element: AccountDetail,
                loader: loaderAccountDetail(queryClient)
              }
            ]
          },
          {
            path: 'staffs',
            element: <AuthGuard allowedRoles={['STAFF']} />,
            children: [
              { index: true, element: Staffs },
              {
                path: ':id',
                element: TrainerDetail,
                loader: loaderAccountDetail(queryClient)
              }
            ]
          },

          {
            path: 'news',
            element: <AuthGuard allowedRoles={['ADMIN', 'STAFF']} />,
            children: [
              { index: true, element: News },
              {
                path: 'create',
                element: CreateNew
              },
              {
                path: ':id',
                element: NewDetail,
                loader: loaderNewDetail(queryClient)
              },
              {
                path: 'update/:id',
                element: UpdateNew,
                loader: loaderNewDetail(queryClient)
              }
            ]
          },

          {
            id: 'animal_species',
            path: 'animal_species',
            element: <AuthGuard allowedRoles={['ADMIN', 'STAFF']} />,
            children: [
              { index: true, element: Species },
              { path: ':id', element: SpeciesDetail, loader: loaderSpeciesDetail(queryClient) }
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
            element: <AuthGuard allowedRoles={['ADMIN', 'STAFF']} />,
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
            element: <AuthGuard allowedRoles={['ADMIN']} />,
            children: [{ index: true, element: Ticket }]
          },
          {
            path: 'orders',
            element: <AuthGuard allowedRoles={['ADMIN', 'STAFF']} />,
            children: [
              { index: true, element: Order },
              { path: 'create', element: OrderCreate },
              { path: ':id', element: OrderDetail }
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
    path: 'qrcode',
    element: <Qrcode />
  },
  {
    path: '*',
    element: <Error />
  }
]
const router = createBrowserRouter(routes)
export default router
