import { Route, Routes } from "react-router-dom"

// page components
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import Dashboard from "./_root/pages/dashboard/Dashboard"
import Araclar from "./_root/pages/araclar"



const App = () => {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<AuthLayout />} />

      {/* private */}
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/araclar" element={<Araclar />} />
      </Route>
    </Routes>
  )
}

export default App
