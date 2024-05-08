import { Outlet } from "react-router-dom"
// components
import Header from "./layout/Header"
import Sidebar from "./layout/Sidebar"
import Footer from "./layout/Footer"

const RootLayout = () => {
    return (
        <div className="grid h-full">
            <div className="col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-10">
                <div className="main-content">
                    <Header />
                    <div className="main">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default RootLayout
