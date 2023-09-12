import { Outlet } from 'react-router-dom'
type Props = {}

const Layout = (props: Props) => {
  return (
    <>
      <div>Layout</div>
      <Outlet></Outlet>
    </>
  )
}

export default Layout
