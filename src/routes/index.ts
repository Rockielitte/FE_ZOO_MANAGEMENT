import Dashboard from '../pages/DashBoard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import type { RouteObject } from 'react-router';

export const publicRoutes: RouteObject[] = [
  {
    path: '',
    element:<Home/>,
  },
  {
    path: '/login',
    element: Login
  }
]
export const privateRoutes:IRoute[] = [
  {
    path: '/dashboard',
    roles:[],
    element: <Dashboard/>,
  }
]
