import { Route, Routes } from 'react-router-dom'
import Layout from './layouts'
import Home from './pages/Home'
import Dashboard from './pages/DashBoard'
import { publicRoutes } from './routes'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route>
            {publicRoutes.map((route: I,index)=>{
              <Route path={route.path} element={<route.element/>
            })}
          </Route>

          <Route index element={<Home />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
