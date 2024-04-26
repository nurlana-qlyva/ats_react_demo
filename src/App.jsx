import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/dashboard/Dashboard";
import Araclar from "./_root/pages/araclar";

const App = () => {
  const navigate = useNavigate();

  // Check if the token is expired
  const isTokenExpired = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (!tokenExpiration) return true; // Token expiration not set
    const expirationTime = new Date(tokenExpiration).getTime();
    const currentTime = new Date().getTime();
    return currentTime >= expirationTime;
  };

  if (!localStorage.getItem('token') || isTokenExpired()) {
    navigate("/login");
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<AuthLayout />} />

      {/* Private Routes */}
      <Route path="/" element={<RootLayout />}>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Araclar */}
        <Route path="/araclar" element={<Araclar />} />
      </Route>
    </Routes>
  );
};

export default App;
