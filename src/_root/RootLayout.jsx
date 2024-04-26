
// components
import { Outlet } from 'react-router-dom'
import Header from './layout/Header'
import SideMenu from './layout/SideMenu'
import Footer from './layout/Footer'

const RootLayout = () => {
  return (
    <div className="container-fluid">
      <div className="grid" style={{margin: 0}}>
        <div className="col-2" style={{ padding: 0, width: "12.678%" }}>
          <SideMenu />
        </div>
        <div className="col-10" style={{ padding: 0, width: 'calc(100% - 12.678%)' }}>
          <div className='content'>
            <Header />
            <div className="main">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RootLayout
