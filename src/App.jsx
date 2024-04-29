import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/dashboard/Dashboard";
import Araclar from "./_root/pages/araclar";
import { useState } from "react";
import VehicleDetail from "./_root/pages/araclar/VehicleDetail";

const App = () => {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(false)

  // Check if the token is expired
  const isTokenExpired = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (!tokenExpiration) return true;
    const expirationTime = new Date(tokenExpiration).getTime();
    const currentTime = new Date().getTime();
    return currentTime >= expirationTime;
  };

  if (!localStorage.getItem('token') || isTokenExpired()) {
    navigate("/login");
    setHasToken(true)
  }

  return (
    <Routes>
      {hasToken ? <Route path="/login" element={<AuthLayout />} /> : (
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/araclar" element={<Araclar />} />
          <Route path="/detay/:id" element={<VehicleDetail />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
